/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { DocumentNode } from 'graphql';
import merge from 'lodash.merge';

import serverResolverDeps from '../../__generated__/serverResolverDeps';
import serverGraphqlDeps from '../../__generated__/serverGraphqlDeps';
import clientResolverDeps from '../../__generated__/clientResolverDeps';
import clientGraphqlDeps from '../../__generated__/clientGraphqlDeps';

const buildResolver = (rootDir: string, resolverDeps: uwf.ResolverDeps[]) => {
  return resolverDeps.reduce((acc, [{ default: fn }, path]) => {
    const [target, type, name] = path.split('/');
    if (target !== rootDir) throw new Error('never');
    if (!name.endsWith('.ts')) throw new Error('never');
    return merge({}, acc, { [type]: fn });
  }, {});
};

const resolvers = merge(
  {},
  buildResolver('data', serverResolverDeps),
  buildResolver('state', clientResolverDeps),
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
  ...serverGraphqlDeps.map(([module]) => module.default),
  ...clientGraphqlDeps.map(([module]) => module.default),
];

export default {
  typeDefs: (schema as any) as DocumentNode[],
  resolvers,
  parseOptions: { allowLegacySDLEmptyFields: true },
  ...(__DEV__ ? { log: (e: any) => console.error(e.stack) } : {}),
};
