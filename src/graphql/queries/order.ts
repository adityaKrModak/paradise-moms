import { gql } from "@apollo/client";

export const GET_MY_ORDERS = gql`
  query GetMyOrders {
    myOrders {
      id
      totalPrice
      status
      currency
      createdAt
      updatedAt
      orderItems {
        id
        quantity
        price
        currency
        product {
          id
          name
          description
          imageUrls {
            url
            rank
          }
        }
      }
    }
  }
`;

export const GET_PAYMENT_INTENT_BY_ORDER = gql`
  query GetPaymentIntentByOrder($orderId: Int!) {
    paymentIntentByOrder(orderId: $orderId) {
      id
      status
      amount
      currency
      gatewayIntentId
      createdAt
      updatedAt
      payments {
        id
        status
        amount
        currency
        gatewayPaymentId
        createdAt
      }
    }
  }
`;
