import { gql } from "@apollo/client";

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
          quantity
          price
          product {
            id
            name
            imageUrls {
              url
            }
          }
        }
      }
    }
  }
`;
