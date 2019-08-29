import { IFieldResolver } from 'snapp/types';
import getNews from './lib/getNews';

const reactjsGetNews: IFieldResolver<any, any> = async (_parent, { link }) => {
  const items = await getNews();
  const item = items.find((i: any) => i.link === link);
  if (item) return item;
  throw new Error(`React News of link "${link}" was not found`);
};

export default reactjsGetNews;
