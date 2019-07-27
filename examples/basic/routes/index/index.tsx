/* eslint-disable react/no-danger */

import Link from 'uwf/Link';
import Head from 'uwf/Head';
import useStyles from 'uwf/useStyles';
import React from 'react';
import { withHomeNews } from './news.graphql';
import Layout from '../../components/Layout';
import s from './home.css';

const title = 'React Starter Kit - www.reactstarterkit.com';

const Home = withHomeNews()(props => {
  useStyles(s);

  const {
    loading,
    reactjsGetAllNews,
    networkStatus: { isConnected },
  } = props.data!;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>

      <div className={s.root}>
        <div className={s.container}>
          <p className={s.networkStatusMessage}>
            {isConnected ? 'Online' : 'Offline'}
          </p>
          <h1>React.js News</h1>
          {loading || !reactjsGetAllNews
            ? 'Loading...'
            : reactjsGetAllNews.map(item => {
                const content =
                  item.content.length <= 200
                    ? item.content
                    : `${item.content.slice(0, 200)}...`;
                return (
                  <article key={item.link} className={s.newsItem}>
                    <h2 className={s.newsTitle}>
                      <Link to={`/posts/${encodeURIComponent(item.link)}`}>
                        {item.title}
                      </Link>
                    </h2>
                    <div
                      className={s.newsDesc}
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </article>
                );
              })}
        </div>
      </div>
    </Layout>
  );
});

export default Home;
