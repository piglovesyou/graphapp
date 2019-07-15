import { IFieldResolver } from 'uwf/types';
import getNews from './lib/getNews';

const reactjsGetAllNews: IFieldResolver<any, any> = async () => {
  return getNews();
};

export default reactjsGetAllNews;
