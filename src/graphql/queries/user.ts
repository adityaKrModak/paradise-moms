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

export const GET_MY_ORDERS = gql`
  query GetMyOrders {
    me {
      orders {
        id
        totalPrice
        status
        createdAt
        orderItems {
          id
        }
      }
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
      orders {
        id
        status
        totalPrice
        createdAt
        orderItems {
          id
        }
      }
    }
  }
`;
