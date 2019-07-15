import { genDir } from './dirs';
import { makeDir } from './fs';
import generateRoutesDeps from './generateRoutesDeps';
import generateDeps from './generateDeps';

export default async function prepareDeps() {
  await makeDir(genDir);
  await generateDeps(
    'data/rootValue.ts',
    '',
    'serverRootValueDeps',
    'uwf.ResolverDeps',
  );
  await generateDeps(
    'data/*/*.ts',
    '',
    'serverResolverDeps',
    'uwf.ResolverDeps',
  );
  await generateDeps(
    'data/*.graphql',
    '',
    'serverGraphqlDeps',
    'uwf.GraphqlDeps',
  );
  await generateDeps(
    'state/rootValue.ts',
    '',
    'clientRootValueDeps',
    'uwf.ResolverDeps',
  );
  await generateDeps(
    'state/*/*.ts',
    '',
    'clientResolverDeps',
    'uwf.ResolverDeps',
  );
  await generateDeps(
    'state/*.graphql',
    '',
    'clientGraphqlDeps',
    'uwf.GraphqlDeps',
  );
  await generateRoutesDeps();
}
