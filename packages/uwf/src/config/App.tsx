import React, { ReactNode } from 'react';
import { ApolloProvider } from 'react-apollo';
import StyleContext from '@piglovesyou/isomorphic-style-loader/StyleContext';
import AppContext, { AppContextTypes } from '../app/AppContext';

interface Props {
  insertCss: Function;
  client: any;
  context: AppContextTypes;
  children: ReactNode;
}

const App = ({ client, insertCss, context, children }: Props) => (
  // NOTE: If you need to add or modify header, footer etc. of the app,
  // please do that inside the Layout component.
  <ApolloProvider client={client}>
    <AppContext.Provider value={context}>
      <StyleContext.Provider value={{ insertCss }}>
        {children}
      </StyleContext.Provider>
    </AppContext.Provider>
  </ApolloProvider>
);

export default App;
