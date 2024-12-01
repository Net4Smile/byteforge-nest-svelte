import type { Query } from "../../../generated/graphql";
import { gql, type TypedDocumentNode } from "@apollo/client/core";

export const GET_PRODUCT_QUERY: TypedDocumentNode<Pick<Query, "getProduct">, { id: string }> = gql`
  query GetProduct($id: String!, $getImage: Boolean! = false, $getSpecs: Boolean! = false, $getCategories: Boolean! = false) {
    getProduct(id: $id, getImage: $getImage, getSpecs: $getSpecs, getCategories: $getCategories) {
      id
      name
      description
      price
      image @include(if: $getImage) {
        src
        alt
      }
      specs @include(if: $getSpecs) {
        id
        name
        value
      }
      categories @include(if: $getCategories) {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY: TypedDocumentNode<Pick<Query, "getProducts">, {}> = gql`
  query GetProducts($getImage: Boolean! = false, $getSpecs: Boolean! = false, $getCategories: Boolean! = false) {
    getProducts(getImage: $getImage, getSpecs: $getSpecs, getCategories: $getCategories) {
      id
      name
      description
      price
      image @include(if: $getImage) {
        src
        alt
      }
      specs @include(if: $getSpecs) {
        id
        name
        value
      }
      categories @include(if: $getCategories) {
        id
        name
      }
    }
  }
`;
