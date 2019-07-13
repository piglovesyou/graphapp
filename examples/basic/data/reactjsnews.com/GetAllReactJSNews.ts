import fetch from 'node-fetch';
import { ReactJsNewsItem } from 'uwf/dataBinders';
import { IResolvers } from 'uwf/types';

export const schema = `
  type ReactJSNewsItem {
    # The news item's title
    title: String!

    # A direct link URL to this news item on reactjsnews.com
    link: String!

    # The name of the news item's author
    author: String!

    # The date this news item was published
    pubDate: String!

    # News article in HTML format
    content: String!
  }
  
  extend type Query {
    reactjsGetAllNews: [ReactJSNewsItem!]!
    reactjsGetNews(link: String!): ReactJSNewsItem
  }
`;

// React.js News Feed (RSS)
const url =
  'https://api.rss2json.com/v1/api.json' +
  '?rss_url=https%3A%2F%2Freactjsnews.com%2Ffeed.xml';

const getNews = (() => {
  let items: ReactJsNewsItem[] | null = null;
  return (): Promise<ReactJsNewsItem[]> => {
    if (items) return Promise.resolve(items);
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          items = data.items as ReactJsNewsItem[];
          // Clear cache after a moment
          setTimeout(() => {
            items = null;
          }, 60 * 1000);
          return items;
        }
        throw new Error('Cannot fetch React News');
      });
  };
})();

export const resolvers: IResolvers = {
  Query: {
    reactjsGetAllNews() {
      return getNews();
    },
    async reactjsGetNews(_parent, { link }) {
      const items = await getNews();
      const item = items.find((i: any) => i.link === link);
      if (item) return item;
      throw new Error(`React News of link "${link}" was not found`);
    },
  },
};
