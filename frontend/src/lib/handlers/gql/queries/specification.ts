import type { Query } from "../../../../generated/graphql";
import { gql, type TypedDocumentNode } from "@apollo/client/core";

export const GET_SPECIFICATION_QUERY: TypedDocumentNode<Pick<Query, "getSpecification">, { id: string }> = gql`
  query GetSpecification($id: String!, $getProducts: Boolean! = false) {
    getSpecification(id: $id, getProducts: $getProducts) {
      id
      name
      value
      products @include(if: $getProducts) {
        id
        name
        description
        price
      }
    }
  }
`;

export const GET_SPECIFICATIONS_QUERY: TypedDocumentNode<Pick<Query, "getSpecifications">, {}> = gql`
  query GetSpecifications($getProducts: Boolean! = false, $getCategories: Boolean! = false) {
    getSpecifications(getProducts: $getProducts) {
      id
      name
      value
      products @include(if: $getProducts) {
        id
        name
        description
        price
      }
      categories @include(if: $getCategories) {
        id
        name
        subcategories {
          id
          name
          value
        }
      }
    }
  }
`;
