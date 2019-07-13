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
