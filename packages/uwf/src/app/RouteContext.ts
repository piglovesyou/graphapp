import { createContext } from 'react';
import { ParsedQuery } from 'query-string';

export type RouteContextTypes = {
  pathname: string;
  query?: ParsedQuery<string>;
  params?: { [s: string]: string };
};

const RouteContext = createContext<RouteContextTypes>({
  pathname: '',
  query: {},
  params: {},
});

export default RouteContext;
