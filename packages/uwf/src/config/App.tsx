import React from 'react';
import { ApolloProvider } from 'react-apollo';
import StyleContext from '@piglovesyou/isomorphic-style-loader/StyleContext';
import { AppProps } from 'uwf/types';
import AppContext from '../app/AppContext';

const App = ({ client, insertCss, context, children }: AppProps) => (
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
