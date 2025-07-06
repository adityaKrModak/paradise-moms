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



export const ME_QUERY = gql`
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
        fullName
        phoneNumber
        street
        city
        state
        zip
        country
        addressType
      }
      
    }
  }
`;
