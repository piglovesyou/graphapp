import { createContext } from 'react';
import { ParsedQuery } from 'query-string';

export type AppContextTypes = {
  pathname: string;
  query?: ParsedQuery<string>;
  params?: { [s: string]: string };
};

const AppContext = createContext<AppContextTypes>({
  pathname: '',
  query: {},
  params: {},
});

export default AppContext;
