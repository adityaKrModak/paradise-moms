import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      description
      price
      currency
      stock
      imageUrls {
        url
        rank
      }
      categories {
        id
        name
      }
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: Int!) {
    removeProduct(id: $id) {
      id
    }
  }
`;
