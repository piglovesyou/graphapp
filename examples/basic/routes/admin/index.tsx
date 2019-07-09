import useStyles from 'uwf/useStyles';
import React from 'react';
import Layout from '../../components/Layout';
import s from './Admin.css';

type PropTypes = {};

export const title = 'Admin Page';

const Admin = (_props: PropTypes) => {
  useStyles(s);
  return (
    <Layout>
      <div className={ s.root }>
        <div className={ s.container }>
          <h1>{ title }</h1>
          <p>...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
