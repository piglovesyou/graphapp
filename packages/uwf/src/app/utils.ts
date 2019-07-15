import merge from 'lodash.merge';
import { basename, extname } from 'path';
import { GraphQLResolveInfo, FieldNode } from './types';

export type FieldMap = Map<string, FieldNode>;

export const getRequestedFieldMap = (info: GraphQLResolveInfo): FieldMap => {
  const fieldNode = info.fieldNodes[0];
  if (!fieldNode || !fieldNode.selectionSet) throw new Error('never');
  return fieldNode.selectionSet.selections.reduce(
    (map: FieldMap, field) =>
      field.kind === 'Field' ? map.set(field.name.value, field) : map,
    new Map() as FieldMap,
  );
};

export const buildResolver = (
  rootDir: string,
  resolverDeps: uwf.ResolverDeps[],
) => {
  return resolverDeps.reduce((acc, [{ default: fn }, path]) => {
    const [target, type, name] = path.split('/');
    if (target !== rootDir) throw new Error('never');
    if (!name.endsWith('.ts')) throw new Error('never');
    return merge({}, acc, { [type]: { [basename(name, extname(name))]: fn } });
  }, {});
};
