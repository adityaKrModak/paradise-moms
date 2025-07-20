import { gql } from "@apollo/client";

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrder($updateOrderInput: UpdateOrderInput!) {
    updateOrder(updateOrderInput: $updateOrderInput) {
      id
      status
      totalPrice
      currency
      createdAt
      updatedAt
      orderItems {
        id
        quantity
        price
        product {
          id
          name
        }
      }
    }
  }
`;

export const SYNC_ALL_PENDING_PAYMENTS = gql`
  mutation SyncAllPendingPayments {
    syncAllPendingPayments {
      totalPayments
      successfulSyncs
      failedSyncs
      syncResults {
        payment {
          id
          status
          gatewayPaymentId
          intent {
            order {
              id
              status
            }
          }
        }
        statusChanged
        previousStatus
        currentStatus
        error
      }
    }
  }
`;

export const GET_ALL_ORDERS_ADMIN = gql`
  query GetAllOrdersAdmin {
    orders {
      id
      totalPrice
      status
      currency
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        email
      }
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
