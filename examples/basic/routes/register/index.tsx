import useStyles from 'snapp/useStyles';
import React from 'react';
import Head from 'snapp/Head';
import Layout from '../../components/Layout';
import s from './Register.css';

type PropTypes = {};

const title = 'New User Registration';

const Register = (_props: PropTypes) => {
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

export default Register;
