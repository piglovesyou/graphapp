import gql from 'graphql-tag';
import { buildResolver } from 'uwf/utils';
import graphqlDeps from '../../__generated__/clientGraphqlDeps';
import clientResolverDeps from '../../__generated__/clientResolverDeps';
import rootValue from '../../__generated__/clientRootValueDeps';

export const clientGraphqlStrs = graphqlDeps.map(
  ([{ default: gqlStr }]) => gqlStr,
);
export const clientTypeDefs = gql(clientGraphqlStrs.join('\n'));
export const clientDefaults = rootValue[0] ? rootValue[0][0].default : {};
export const clientResolvers = buildResolver('state', clientResolverDeps);
