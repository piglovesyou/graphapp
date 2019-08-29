import { ComponentType, ReactNode } from 'react';
import { IFieldResolver } from 'graphql-tools';
import { RouteContextTypes } from 'snapp/RouteContext';

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
  default: ComponentType<RouteProps>;
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
  context: RouteContextTypes;
  children?: ReactNode;
};

export type RouteProps = {
  routeContext: RouteContextTypes;
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
