import useStyles from 'uwf/useStyles';
import React from 'react';
import Layout from '../../components/Layout';
import s from './Register.css';

type PropTypes = {
  title: string;
};

export const title = 'New User Registration';

const Register = (props: PropTypes) => {
  useStyles(s);
  return (
    <Layout>
      <div className={ s.root }>
        <div className={ s.container }>
          <h1>{ props.title }</h1>
          <p>...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
