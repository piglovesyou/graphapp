import { ComponentType, ReactNode } from 'react';
import { IFieldResolver } from 'graphql-tools';
import { AppContextTypes } from 'uwf/AppContext';

export * from 'graphql';
export * from 'graphql-tools';

//
// For deps resolvers
//

export type ModuleInfo<T> = [T, string];

// TODO: Type it
export type RootValueDeps = ModuleInfo<{ default: any }>;

export type GraphQLResolverDeps = ModuleInfo<{
  default: IFieldResolver<any, any>;
}>;

export type GraphqlSchemaDeps = ModuleInfo<{ default: string }>;

export type RouteModule = {
  title?: string;
  default: ComponentType;
};

export type RouteInfo = {
  module: RouteModule;
  chunkName?: string;
  ext?: string;
};

//
// For React
//

export type AppProps = {
  insertCss: Function;
  client: any;
  context: AppContextTypes;
  children?: ReactNode;
};
export type HtmlPropTypes = {
  title: string;
  description: string;
  styles?: Array<{
    id: string;
    cssText: string;
  }>;
  scripts?: string[];
  app: any;
  children: string;
};
export type ErrorPagePropTypes = {
  error?: {
    name: string;
    message: string;
    stack: string;
  };
};
