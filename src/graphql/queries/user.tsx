import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
      phoneNumber
      role
      createdAt
      addresses {
        id
        street
        city
        state
        zip
        country
      }
      orders {
        id
      }
    }
  }
`;
