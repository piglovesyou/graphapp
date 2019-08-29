import React from 'react';
import useStyles from 'snapp/useStyles';
import Head from 'snapp/Head';
import s from './Page.css';

interface PropTypes {
  title: string;
  html: string;
}

const Page = ({ title, html }: PropTypes) => {
  useStyles(s);
  return (
    <div className={s.root}>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={s.container}>
        <h1>{title}</h1>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export default Page;
