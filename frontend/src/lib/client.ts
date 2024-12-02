import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';
import { browser } from '$app/environment';

let client: ApolloClient<any>;

export function getClient(fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {
  if (client && browser) return client;

  const httpLink = new HttpLink({
    uri: '/api/graphql',
    fetch: fetch || (browser ? window.fetch.bind(window) : undefined) as any,
    credentials: 'include',
  });

  client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    ssrMode: !browser,
  });

  return client;
}