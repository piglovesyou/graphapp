import React, { FunctionComponent } from 'react';
import Link from '../../app/Link';

type PropTypes = {
  title: string;
};

const NotFound: FunctionComponent<PropTypes> = () => (
  <div>
    <h1>404 Page Not Found</h1>
    <p>Sorry, the page you were trying to view does not exist.</p>
    <p>
      <Link to="/">Go to Top</Link>
    </p>
  </div>
);

export default NotFound;
