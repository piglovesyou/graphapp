import { createContext } from 'react';

export type AppContextTypes = {
  pathname: string;
  query?: { [s: string]: string | string[] };
  params?: { [s: string]: string };
};

const AppContext = createContext<AppContextTypes>({
  pathname: '',
  query: {},
  params: {},
});

export default AppContext;
