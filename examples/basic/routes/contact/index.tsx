import useStyles from 'uwf/useStyles';
import React from 'react';
import Layout from '../../components/Layout';
import s from './contact.css';

type PropTypes = {};

export const title = 'Contact Us';

const Contact = (_: PropTypes) => {
  useStyles(s);
  return (
    <Layout>
      <div className={s.root}>
        <div className={s.container}>
          <h1>(TODO: render title)</h1>
          <p>...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
