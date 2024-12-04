import type { DocumentNode } from "graphql";
import { GraphQLValidationError, NetworkError, QueryErrorHandler } from "./errors";
import type { FetchType, QueryResult } from './types';
import type { Query, QueryGetCategoriesArgs, QueryGetCategoryArgs, QueryGetProductArgs, QueryGetProductsArgs, QueryGetSpecificationArgs, QueryGetSpecificationsArgs } from "../../generated/graphql";
import { getClient } from "$lib/client";
import { ApolloError } from "@apollo/client/errors";

export async function executeQuery<T extends keyof Query>(
  operationName: string,
  query: DocumentNode,
  errorMessage: string,
  fetch?: FetchType,
  variables?: QueryGetCategoryArgs | QueryGetCategoriesArgs | QueryGetSpecificationArgs | QueryGetProductArgs | QueryGetProductsArgs | QueryGetSpecificationsArgs,
): Promise<QueryResult<T>> {
  const client = getClient(fetch);
  try {
    const result = await client.query({ query, variables });

    if (!result.data) throw new QueryErrorHandler(errorMessage, { operationName, query, variables });

    return result;
  } catch (error) {
    if (error instanceof ApolloError) {
      if (error.networkError) {
        console.log(error.networkError)
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

    throw new QueryErrorHandler(errorMessage, { operationName, query, variables });
  }
}