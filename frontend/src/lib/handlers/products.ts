import { getClient } from '$lib/client';
import { gql, type ApolloQueryResult, type TypedDocumentNode } from '@apollo/client/core';
import type { Query } from '../../generated/graphql';

export async function getProduct(id: string, fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>): Promise<ApolloQueryResult<Pick<Query, "getProduct">>> {
  const client = getClient(fetch)
  const PRODUCT_QUERY: TypedDocumentNode<Pick<Query, "getProduct">> = gql`
    query Product($id: String!) {
      getProduct(id: $id) {
        description
        id
        image {
          src
          alt
        }
        name
        price
      }
    }
  `

  const request = await client.query<Pick<Query, "getProduct">>({
    query: PRODUCT_QUERY,
    variables: {
      id
    }
  });

  return request;
}

export async function getProducts(fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>): Promise<ApolloQueryResult<Pick<Query, "getProducts">>> {
  const client = getClient(fetch);
  const PRODUCTS_QUERY: TypedDocumentNode<Pick<Query, "getProducts">, {}> = gql`
    query Products {
      getProducts {
        id
        name
        description
        price
        image {
          src
          alt
        }
      }
    }
  `;

  try {
    const result = await client.query<Pick<Query, "getProducts">>({
      query: PRODUCTS_QUERY
    });
    return result;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}