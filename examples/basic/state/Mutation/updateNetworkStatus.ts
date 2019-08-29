import { IFieldResolver } from 'snapp/types';

const updateNetworkStatus: IFieldResolver<any, any> = (
  _: any,
  { isConnected }: any,
  { cache }: any,
) => {
  const data = {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected,
    },
  };
  cache.writeData({ data });
  return null;
};

export default updateNetworkStatus;
