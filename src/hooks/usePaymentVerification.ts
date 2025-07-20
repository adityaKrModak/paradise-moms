import { useState, useCallback } from "react";
import {
  useGetPaymentIntentByOrderLazyQuery,
  useSyncPaymentStatusByGatewayIdMutation,
  useSyncOrderPaymentsStatusMutation,
} from "@/graphql/generated/graphql";

export interface PaymentVerificationResult {
  success: boolean;
  status: string;
  attempts: number;
  error?: string;
}

export const usePaymentVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("");

  const [getPaymentIntent] = useGetPaymentIntentByOrderLazyQuery();
  const [syncByGatewayId] = useSyncPaymentStatusByGatewayIdMutation();
  const [syncOrderPayments] = useSyncOrderPaymentsStatusMutation();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const verifyPaymentStatus = useCallback(
    async (
      orderId: number,
      gatewayPaymentId?: string,
      maxAttempts: number = 10
    ): Promise<PaymentVerificationResult> => {
      setIsVerifying(true);
      setVerificationProgress(0);
      setCurrentStatus("Starting payment verification...");

      try {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          setVerificationProgress((attempt / maxAttempts) * 100);
          setCurrentStatus(
            `Checking payment status... (${attempt}/${maxAttempts})`
          );

          // First, try to sync the payment status
          if (gatewayPaymentId && attempt === 1) {
            try {
              setCurrentStatus("Syncing with payment gateway...");
              await syncByGatewayId({
                variables: { gatewayPaymentId },
              });
            } catch (syncError) {
              console.warn(
                "Payment sync failed, continuing with status check:",
                syncError
              );
            }
          }

          // Check current payment status
          const { data } = await getPaymentIntent({
            variables: { orderId },
          });

          const paymentIntent = data?.paymentIntentByOrder;
          if (paymentIntent) {
            const status = paymentIntent.status?.toLowerCase();
            const hasSuccessfulPayment = paymentIntent.payments?.some(
              (payment) =>
                payment.status?.toLowerCase().includes("success") ||
                payment.status?.toLowerCase().includes("paid")
            );

            if (
              hasSuccessfulPayment ||
              status?.includes("success") ||
              status?.includes("paid")
            ) {
              setCurrentStatus("Payment verified successfully!");
              return { success: true, status: "SUCCESS", attempts: attempt };
            }

            if (status?.includes("failed") || status?.includes("cancelled")) {
              setCurrentStatus("Payment failed");
              return { success: false, status: "FAILED", attempts: attempt };
            }
          }

          // Wait before next attempt with exponential backoff
          if (attempt < maxAttempts) {
            const waitTime = Math.min(1000 * Math.pow(1.5, attempt), 5000);
            setCurrentStatus(
              `Waiting ${Math.round(waitTime / 1000)}s before next check...`
            );
            await delay(waitTime);
          }
        }

        setCurrentStatus("Payment verification timed out");
        return { success: false, status: "TIMEOUT", attempts: maxAttempts };
      } catch (error) {
        console.error("Payment verification error:", error);
        setCurrentStatus("Verification failed");
        return {
          success: false,
          status: "ERROR",
          attempts: 0,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      } finally {
        setIsVerifying(false);
        setVerificationProgress(100);
      }
    },
    [getPaymentIntent, syncByGatewayId]
  );

  const syncPaymentStatus = useCallback(
    async (orderId: number, gatewayPaymentId?: string) => {
      try {
        if (gatewayPaymentId) {
          const { data } = await syncByGatewayId({
            variables: { gatewayPaymentId },
          });
          return data?.syncPaymentStatusByGatewayId;
        } else {
          const { data } = await syncOrderPayments({
            variables: { orderId },
          });
          return data?.syncOrderPaymentsStatus;
        }
      } catch (error) {
        console.error("Payment sync error:", error);
        throw error;
      }
    },
    [syncByGatewayId, syncOrderPayments]
  );

  return {
    verifyPaymentStatus,
    syncPaymentStatus,
    isVerifying,
    verificationProgress,
    currentStatus,
  };
};
