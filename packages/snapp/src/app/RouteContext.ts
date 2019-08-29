import { createContext, useContext } from 'react';
import { ParsedQuery } from 'query-string';
import { QueryParams } from 'universal-router';

export type RouteContextTypes = {
  pathname: string;
  query?: ParsedQuery<string>;
  params?: QueryParams;
};

const RouteContext = createContext<RouteContextTypes>({
  pathname: '',
  query: {},
  params: {},
});

export const useRouteContext = () => useContext(RouteContext);

export default RouteContext;
