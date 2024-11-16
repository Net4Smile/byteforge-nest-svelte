import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import type { NormalizedCacheObject } from '@apollo/client/core';

export const client = new ApolloClient<NormalizedCacheObject>({
  uri: '/api/graphql',
  cache: new InMemoryCache()
});