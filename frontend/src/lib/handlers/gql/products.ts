import { GET_PRODUCTS_QUERY, GET_PRODUCT_QUERY } from '$lib/handlers/gql/queries/product';
import type { FetchType, QueryResult } from './types';
import { executeQuery } from './executor';
import type { QueryGetProductArgs, QueryGetProductsArgs } from '../../../generated/graphql';

export function getProduct(id: string, fetch?: FetchType, options?: QueryGetProductArgs): Promise<QueryResult<"getProduct">> {
  const ERROR_MESSAGE = 'No product found';
  return executeQuery("getProduct", GET_PRODUCT_QUERY, ERROR_MESSAGE, fetch, { id, ...options });
}

export function getProducts(fetch?: FetchType, options?: QueryGetProductsArgs): Promise<QueryResult<"getProducts">> {
  const ERROR_MESSAGE = 'No products found';
  return executeQuery("getProducts", GET_PRODUCTS_QUERY, ERROR_MESSAGE, fetch, options);
}