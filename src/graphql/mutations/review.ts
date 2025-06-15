import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
  mutation CreateReview($createReviewInput: CreateReviewInput!) {
    createReview(createReviewInput: $createReviewInput) {
      id
      rating
      comment
      product {
        id
      }
      user {
        id
      }
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation RemoveReview($id: Int!) {
    removeReview(id: $id) {
      id
    }
  }
`;
