import { getClient } from '$lib/client';
import { ApolloError, type ApolloQueryResult, type DocumentNode } from '@apollo/client/core';
import type { Query } from '../../generated/graphql';
import { GET_PRODUCTS_QUERY, GET_PRODUCT_QUERY } from '$lib/handlers/gql-queries/product';
import { GraphQLValidationError, NetworkError, QueryErrorHandler } from './errors';

type FetchType = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

type QueryResult<T extends keyof Query> = ApolloQueryResult<Pick<Query, T>>

type Options = {
  getImage?: boolean,
  getSpecs?: boolean,
  getCategories?: boolean
}

export function getProduct(id: string, fetch?: FetchType, options?: Options): Promise<QueryResult<"getProduct">> {
  const errorHandler = new QueryErrorHandler('Failed to fetch product');
  return executeQuery("getProduct", GET_PRODUCT_QUERY, { id, ...options }, errorHandler, fetch);
}

export function getProducts(fetch?: FetchType, options?: Options): Promise<QueryResult<"getProducts">> {
  const errorHandler = new QueryErrorHandler('Failed to fetch products');
  return executeQuery("getProducts", GET_PRODUCTS_QUERY, options, errorHandler, fetch);
}

async function executeQuery<T extends keyof Query>(
  operationName: string,
  query: DocumentNode,
  variables: any,
  errorHandler: InstanceType<typeof QueryErrorHandler>,
  fetch?: FetchType,
): Promise<QueryResult<T>> {
  const client = getClient(fetch);
  try {
    const result = await client.query({ query, variables });

    if (!result.data) throw errorHandler;

    return result;
  } catch (error) {
    if (error instanceof ApolloError) {
      if (error.networkError) {
        throw new NetworkError('Unable to connect to the server');
      } else if (error.graphQLErrors) {
        throw new GraphQLValidationError('GraphQL query validation failed');
      }
    } else if (error instanceof Error) {
      console.error('Unexpected error:', error.message);
    } else if (error instanceof QueryErrorHandler) {
      console.error('Query error:', error.toString());
    } else {
      console.error('Unknown error:', error);
    }

    throw new QueryErrorHandler(errorHandler.message, { operationName, query, variables });
  }
}