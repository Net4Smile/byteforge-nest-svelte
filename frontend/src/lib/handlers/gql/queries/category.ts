import type { Query } from "../../../../generated/graphql";
import { gql, type TypedDocumentNode } from "@apollo/client/core";

export const GET_CATEGORY_QUERY: TypedDocumentNode<Pick<Query, "getCategory">, { id: string }> = gql`
  query GetCategory($id: String!, $getProducts: Boolean! = false, $getIsParent: Boolean! = false) {
    getCategory(id: $id, getProducts: $getProducts, getIsParent: $getIsParent) {
      id
      name
      products @include(if: $getProducts) {
        id
        name
        description
        price
      }
      isParent @include(if: $getIsParent)
    }
  }
`;

export const GET_CATEGORIES_QUERY: TypedDocumentNode<Pick<Query, "getCategories">, {}> = gql`
  query GetCategories($getProducts: Boolean! = false, $getIsParent: Boolean! = false, $getSpecifications: Boolean! = false) {
    getCategories(getProducts: $getProducts, getIsParent: $getIsParent, getSpecifications: $getSpecifications) {
      id
      name
      products @include(if: $getProducts) {
        id
        name
        description
        price
      }
      isParent @include(if: $getIsParent)
      specifications @include(if: $getSpecifications) {
        id
        name
        value
      }
    }
  }
`;
