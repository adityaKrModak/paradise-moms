import { gql } from "@apollo/client";

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent(
    $createPaymentIntentInput: CreatePaymentIntentInput!
  ) {
    createPaymentIntent(createPaymentIntentInput: $createPaymentIntentInput) {
      id
      gatewayIntentId
      status
      amount
      currency
    }
  }
`;

export const SYNC_PAYMENT_STATUS_BY_GATEWAY_ID = gql`
  mutation SyncPaymentStatusByGatewayId($gatewayPaymentId: String!) {
    syncPaymentStatusByGatewayId(gatewayPaymentId: $gatewayPaymentId) {
      payment {
        id
        status
        amount
        currency
        gatewayPaymentId
        intent {
          id
          status
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
`;

export const SYNC_ORDER_PAYMENTS_STATUS = gql`
  mutation SyncOrderPaymentsStatus($orderId: Int!) {
    syncOrderPaymentsStatus(orderId: $orderId) {
      orderId
      totalPayments
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
