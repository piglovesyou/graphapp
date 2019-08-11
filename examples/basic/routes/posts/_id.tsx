/* eslint-disable react/no-danger */

import React, { FunctionComponent } from 'react';
import { RouteProps } from 'uwf/types';
import useStyles from 'uwf/useStyles';
import Head from 'uwf/Head';
import { useNewsQuery } from './id.graphql';
import Layout from '../../components/Layout';
import s from './id.css';

export const title = 'React Starter Kit';

const Home: FunctionComponent<RouteProps> = ({ routeContext: { params } }) => {
  useStyles(s);

  if (!params || !params.id) throw new Error('never');
  const { loading, data } = useNewsQuery({
    variables: { link: params.id as string },
  });
  const { reactjsGetNews: item } = data!;

  if (loading) return <div>Loading</div>;
  if (!item) return <div>Not found</div>;

  return (
    <Layout>
      <Head>
        <title>{item.title}</title>
      </Head>
      <div className={s.root}>
        <div className={s.container}>
          <article key={item.link} className={s.newsItem}>
            <h2 className={s.newsTitle}>
              <a href={item.link}>{item.title}</a>
            </h2>
            <div
              className={s.newsDesc}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
