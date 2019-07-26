import { generate } from '@graphql-codegen/cli';
import getPort from 'get-port';
import path from 'path';
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'apollo-server-express';
import glob from 'fast-glob';
import { fromStream } from 'hole';
import { writeFile } from './lib/fs';
import generateDts from './lib/generateDts';
import { buildDir, genDir, srcDir, userDir } from './lib/dirs';
import prepareDeps from './lib/prepareDeps';
import runWebpack from './lib/runWebpack';
import webpackConfig from './webpack.config';

const [, serverConfig] = webpackConfig;

const decorateDtsContent = (dtsContent: string) =>
  dtsContent
    // Bind RouteContext to HOC function
    .replace(/^/, `import { RouteProps } from 'uwf/types'\n`)
    .replace(
      /function with(.+?)<TProps,/,
      'function with$1<TProps = RouteProps,',
    );

/**
 * Generate Flow declarations from GraphQL. Since it requires
 * a running GraphQL server, it launches a server for the use.
 */
export default async function codegen() {
  // const promiseRemoveOldTypes = new Promise(resolve =>
  //   rimraf(path.resolve(userDir, '{./,src/**/}__generated__'), resolve),
  // );

  await prepareDeps();

  const promiseCompileSchemaJs = await runWebpack(
    {
      ...serverConfig,
      entry: path.join(srcDir, 'app/schema'),
      output: {
        path: serverConfig!.output!.path,
        filename: 'schema.js',
        libraryTarget: 'commonjs2',
      },
    },
    // @ts-ignore
    serverConfig.stats,
  );

  const promisePort = getPort();

  const [port] = await Promise.all([
    promisePort,
    // promiseRemoveOldTypes,
    promiseCompileSchemaJs,
  ]);

  // eslint-disable-next-line global-require, import/no-dynamic-require, import/no-unresolved
  const builtSchema = require(path.join(buildDir, 'schema')).default;
  const server = new ApolloServer({
    schema: makeExecutableSchema(builtSchema),
  });
  const { server: httpServer } = await server.listen({ port });

  const gqlDocSearchPattern = path.join(
    userDir,
    '{routes,components}/**/*.graphql',
  );
  // @ts-ignore
  await fromStream(glob.stream(gqlDocSearchPattern)).pipe(
    async (gqlDocPath: any) => {
      const dir = path.relative(userDir, path.dirname(gqlDocPath));
      const baseName = path.basename(gqlDocPath, path.extname(gqlDocPath));
      const tsxPath = path.join(genDir, dir, `${baseName}.tsx`);
      await generate(
        {
          schema: `http://localhost:${port}/graphql`,
          documents: gqlDocPath,
          generates: {
            [tsxPath]: {
              plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
              ],
              config: {
                // withHOC: false,
                withHooks: true,
              },
            },
          },
        },
        true,
      );
      const gqlRelPath = path.relative(userDir, gqlDocPath);
      const dtsContent = generateDts(tsxPath);
      const dtsPath = `${gqlRelPath}.d.ts`;
      await writeFile(dtsPath, decorateDtsContent(dtsContent));
    },
  );

  await new Promise(resolve => httpServer.close(resolve));
}
