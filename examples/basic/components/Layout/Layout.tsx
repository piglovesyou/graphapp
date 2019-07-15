import React, { FunctionComponent } from 'react';
import useStyles from 'uwf/useStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

interface PropTypes {}

const Layout: FunctionComponent<PropTypes> = ({ children }) => {
  useStyles(normalizeCss, s);
  return (
    <div>
      <Header />
      {children}
      <Feedback />
      <Footer />
    </div>
  );
};

export default Layout;
