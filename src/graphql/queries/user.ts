import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
      role
      createdAt
    }
  }
`;
