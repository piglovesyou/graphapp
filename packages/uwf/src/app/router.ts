import React from 'react';
import UniversalRouter, { Route } from 'universal-router';
import { RouteContextTypes } from 'uwf/RouteContext';
import children from '../../__generated__/routesDeps';

async function action(context: any) {
  const { next } = context;
  const route = await next();

  // Provide default values for title, description etc.
  route.title = `${route.title || 'Untitled Page'} - www.reactstarterkit.com`;
  route.description = route.description || '';

  return route;
}

const notFoundRoute = {
  path: '(.*)',
  load: async () => {
    const loaded = {
      module: await import(
        /* webpackChunkName: 'not-found' */ '@config@/not-found/NotFound'
      ),
      chunkName: 'not-found',
      ext: '.tsx',
    };
    return loaded;
  },
};

const routes: Route = {
  path: '',
  children: [...children, notFoundRoute],
  action,
};

export default new UniversalRouter(routes, {
  resolveRoute(context, params) {
    if (typeof context.route.load === 'function') {
      return context.route.load().then(({ module, chunkName }: any) => {
        const routeContext: RouteContextTypes = {
          pathname: context.pathname,
          query: context.query,
          params,
        };
        const component = React.createElement(module.default, { routeContext });
        return {
          chunks: [chunkName],
          title: module.title,
          component,
          params,
        };
      });
    }
    if (typeof context.route.action === 'function') {
      return context.route.action(context, params);
    }
    return undefined;
  },
});
