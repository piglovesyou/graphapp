import React from 'react';
import withStyles from '@piglovesyou/isomorphic-style-loader/withStyles';
import { ErrorPagePropTypes } from '../../app/types';
import s from './ErrorPage.css';

const ErrorPage = ({ error }: ErrorPagePropTypes) => {
  if (__DEV__ && error) {
    return (
      <div>
        <h1>{error.name}</h1>
        <pre>{error.stack}</pre>
      </div>
    );
  }

  return (
    <div>
      <h1>Error</h1>
      <p>Sorry, a critical error occurred on this page.</p>
    </div>
  );
};

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(s)(ErrorPage);
