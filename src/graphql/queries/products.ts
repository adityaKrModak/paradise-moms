// src/graphql/queries/products.ts
import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
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

export const GET_PRODUCT = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
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

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation RemoveCategory($id: Int!) {
    removeCategory(id: $id) {
      id
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews {
    reviews {
      id
      rating
      comment
      createdAt
      user {
        id
        email
        firstName
        lastName
      }
      product {
        id
        name
        imageUrls {
          url
        }
      }
    }
  }
`;
