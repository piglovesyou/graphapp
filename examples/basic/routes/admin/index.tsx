import useStyles from 'uwf/useStyles';
import Head from 'uwf/Head';
import React from 'react';
import Layout from '../../components/Layout';
import s from './admin.css';

type PropTypes = {};

const title = 'Admin Page';

const Admin = (_props: PropTypes) => {
  useStyles(s);
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
