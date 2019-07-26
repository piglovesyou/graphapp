/* eslint-disable react/no-danger */

import React, { useContext } from 'react';
import RouteContext, { RouteContextTypes } from 'uwf/RouteContext';
import useStyles from 'uwf/useStyles';
import { withNews } from './id.graphql';
import Layout from '../../components/Layout';
import s from './id.css';

type Props = {
  context: RouteContextTypes;
};

export const title = 'React Starter Kit';

const Home = withNews<Props>({
  options: props => {
    const {
      context: { params },
    } = props;
    if (!params || !params.id) throw new Error('never');
    return {
      variables: {
        link: Array.isArray(params.id) ? params.id[0] : params.id,
      },
    };
  },
})(props => {
  useStyles(s);

  const { loading, reactjsGetNews: item } = props.data!;

  if (loading) return <div>Loading</div>;

  if (!item) return <div>Not found</div>;

  return (
    <Layout>
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
});

const HomeWithContext = () => {
  const context = useContext(RouteContext);
  return <Home context={context} />;
};

export default HomeWithContext;
