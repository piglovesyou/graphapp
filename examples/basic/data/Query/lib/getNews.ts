import fetch from 'node-fetch';
import { ReactJsNewsItem } from 'uwf/dataBinders';

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

export default getNews;
