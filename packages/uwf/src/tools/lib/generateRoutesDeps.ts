import path from 'path';
import { genDir, userDir } from './dirs';
import { readDir, writeFile } from './fs';

type PathInfo = {
  routePath: string;
  modulePath: string;
  chunkName: string;
  ext: string;
};

const buildRouteChildScript = ({
  routePath,
  modulePath,
  chunkName,
  ext,
}: PathInfo): string => `
  {
    path: '${routePath}',
    load: async (): Promise<uwf.RouteInfo> => ({
      module: await import(/* webpackChunkName: '${chunkName}' */ '${modulePath}'),
      chunkName: '${chunkName}',
      ext: '${ext}',
    }),
  },
`;

const buildRoutesScript = (
  pathInfoArray: PathInfo[],
): string => `/* Auto-generated. Do not edit. */

const routes = [
${pathInfoArray.map(buildRouteChildScript).join('')}
];
  
export default routes;
`;
const omitIndex = (p: string): string => {
  if (p.endsWith('/index')) {
    const shortened = p.slice(0, p.length - '/index'.length);
    return omitIndex(shortened);
  }
  return p;
};

const createpathInfo = (f: string): PathInfo => {
  // TODO refactor
  const dir = path.dirname(f);
  const ext = path.extname(f);
  const file = path.basename(f);
  const base = path.basename(f, ext);

  let routePath = path
    .relative(
      userDir,
      // TODO: Replace intermediate paths like "/_thisone/x" too?
      path.join(dir, base.replace(/^_/, ':')),
    )
    .slice('routes'.length);
  routePath = omitIndex(routePath) || '/';

  const chunkName = routePath.split('/')[1] || 'home';

  const modulePath = path.join(
    path.relative(genDir, dir),
    ext.startsWith('.ts') ? base : file,
  );

  return { routePath, modulePath, chunkName, ext };
};

export default async function generateRoutesDeps() {
  const files = await readDir('routes/**/*.tsx');
  if (files.length === 0)
    throw new Error('Please put .tsx in ./routes at least one.');
  const pathInfoArray = files.map(createpathInfo);
  const scriptContent = buildRoutesScript(pathInfoArray);
  await writeFile(path.resolve(genDir, 'routesDeps.ts'), scriptContent);
}

if (require.main === module) {
  generateRoutesDeps();
}
