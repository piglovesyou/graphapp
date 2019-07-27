import Head from 'uwf/Head';
import useStyles from 'uwf/useStyles';
import React from 'react';
import Layout from '../../components/Layout';
import s from './contact.css';

type PropTypes = {};

const title = 'Contact Us';

const Contact = (_: PropTypes) => {
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

export default Contact;
