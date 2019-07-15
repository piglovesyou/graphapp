import { DocumentNode } from 'graphql';
import merge from 'lodash.merge';
import { buildResolver } from './utils';

import serverResolverDeps from '../../__generated__/serverResolverDeps';
import serverGraphqlDeps from '../../__generated__/serverGraphqlDeps';
import { clientResolvers, clientGraphqlStrs } from './clientSchema';

const resolvers = merge(
  {},
  buildResolver('data', serverResolverDeps),
  clientResolvers,
);

const SchemaDefinition = `
  type Query { }
  ${'Mutation' in resolvers ? 'type Mutation { }' : ''}
  ${'Subscription' in resolvers ? 'type Subscription { }' : ''}

  schema {
    query: Query
    ${'Mutation' in resolvers ? 'mutation: Mutation' : ''}
    ${'Subscription' in resolvers ? 'subscription: Subscription' : ''}
  }
`;

const schema = [
  SchemaDefinition,
  ...serverGraphqlDeps.map(([{ default: graphqlStr }]) => graphqlStr),
  ...clientGraphqlStrs,
];

export default {
  typeDefs: (schema as any) as DocumentNode[],
  resolvers,
  parseOptions: { allowLegacySDLEmptyFields: true },
  ...(__DEV__ ? { log: (e: any) => console.error(e.stack) } : {}),
};
