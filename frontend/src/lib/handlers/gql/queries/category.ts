import type { Query } from "../../../../generated/graphql";
import { gql, type TypedDocumentNode } from "@apollo/client/core";

export const GET_CATEGORY_QUERY: TypedDocumentNode<Pick<Query, "getCategory">, { id: string }> = gql`
  query GetCategory($id: String!, $getProducts: Boolean! = false) {
    getCategory(id: $id, getProducts: $getProducts) {
      id
      name
      products @include(if: $getProducts) {
        id
        name
        description
        price
      }
      subcategories {
        id
        name
        value
      }
    }
  }
`;

export const GET_CATEGORIES_QUERY: TypedDocumentNode<Pick<Query, "getCategories">, {}> = gql`
  query GetCategories(
    $getProducts: Boolean! = false
    $getSpecifications: Boolean! = false
  ) {
    getCategories(
      getProducts: $getProducts
      getSpecifications: $getSpecifications
    ) {
      id
      name
      products @include(if: $getProducts) {
        id
        name
        description
        price
      }
      specifications @include(if: $getSpecifications) {
        id
        name
        value
      }
      subcategories {
        id
        name
        value
      }
    }
}

`;
