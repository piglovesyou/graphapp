import { genDir } from './dirs';
import { makeDir } from './fs';
import generateRoutesDeps from './generateRoutesDeps';
import generateDeps from './generateDeps';

export default async function prepareDeps() {
  await makeDir(genDir);
  await generateDeps(
    'data/rootValue.ts',
    'serverRootValueDeps',
    'RootValueDeps',
  );
  await generateDeps(
    'data/*/*.ts',
    'serverResolverDeps',
    'GraphQLResolverDeps',
  );
  await generateDeps(
    'data/*.graphql',
    'serverGraphqlDeps',
    'GraphqlSchemaDeps',
  );
  await generateDeps(
    'state/rootValue.ts',
    'clientRootValueDeps',
    'RootValueDeps',
  );
  await generateDeps(
    'state/*/*.ts',
    'clientResolverDeps',
    'GraphQLResolverDeps',
  );
  await generateDeps(
    'state/*.graphql',
    'clientGraphqlDeps',
    'GraphqlSchemaDeps',
  );
  await generateRoutesDeps();
}
