import { GET_PRODUCTS_QUERY, GET_PRODUCT_QUERY } from '$lib/handlers/gql/queries/product';
import type { FetchType, QueryResult } from './types';
import { executeQuery } from './executor';
import type { QueryGetSpecificationArgs, QueryGetSpecificationsArgs } from '../../../generated/graphql';

export function getSpecification(id: string, fetch?: FetchType, options?: QueryGetSpecificationArgs): Promise<QueryResult<"getSpecification">> {
  const ERROR_MESSAGE = 'No specification found';
  return executeQuery("getSpecification", GET_PRODUCT_QUERY, ERROR_MESSAGE, fetch, { id, ...options });
}

export function getSpecifications(fetch?: FetchType, options?: QueryGetSpecificationsArgs): Promise<QueryResult<"getSpecifications">> {
  const ERROR_MESSAGE = 'No specifications found';
  return executeQuery("getSpecifications", GET_PRODUCTS_QUERY, ERROR_MESSAGE, fetch, options);
}