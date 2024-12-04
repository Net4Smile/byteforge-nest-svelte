import { GET_CATEGORIES_QUERY, GET_CATEGORY_QUERY } from '$lib/handlers/gql/queries/category';
import type { FetchType, QueryResult } from './types';
import { executeQuery } from './executor';
import type { QueryGetCategoriesArgs, QueryGetCategoryArgs } from '../../../generated/graphql';

export function getCategory(id: string, fetch?: FetchType, options?: QueryGetCategoryArgs): Promise<QueryResult<"getCategory">> {
  const ERROR_MESSAGE = 'No category found';
  return executeQuery("getCategory", GET_CATEGORY_QUERY, ERROR_MESSAGE, fetch, { id, ...options });
}

export function getCategories(fetch?: FetchType, options?: QueryGetCategoriesArgs): Promise<QueryResult<"getCategories">> {
  const ERROR_MESSAGE = 'No categories found';
  return executeQuery("getCategories", GET_CATEGORIES_QUERY, ERROR_MESSAGE, fetch, options);
}