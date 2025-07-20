"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  CreditCard,
  Clock,
  RefreshCw,
} from "lucide-react";
import { usePaymentVerification } from "@/hooks/usePaymentVerification";

export default function PaymentVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    verifyPaymentStatus,
    isVerifying,
    verificationProgress,
    currentStatus,
  } = usePaymentVerification();

  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [orderId, setOrderId] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string>("");

  const handleVerification = useCallback(
    async (orderIdNum: number, gatewayPaymentId: string) => {
      const result = await verifyPaymentStatus(orderIdNum, gatewayPaymentId);
      setVerificationResult(result);

      // Handle the result
      if (result.success) {
        // Redirect to success page after a short delay
        setTimeout(() => {
          router.push(
            `/checkout/success?orderId=${orderIdNum}&paymentId=${gatewayPaymentId}`
          );
        }, 2000);
      }
    },
    [verifyPaymentStatus, router]
  );

  useEffect(() => {
    const orderIdParam = searchParams.get("orderId");
    const paymentIdParam = searchParams.get("paymentId");

    if (orderIdParam && paymentIdParam) {
      setOrderId(orderIdParam);
      setPaymentId(paymentIdParam);

      // Start verification automatically
      handleVerification(parseInt(orderIdParam), paymentIdParam);
    } else {
      // Invalid parameters, redirect to home
      router.push("/");
    }
  }, [handleVerification, router, searchParams]);

  const handleRetry = () => {
    if (orderId && paymentId) {
      handleVerification(parseInt(orderId), paymentId);
    }
  };

  const handleGoToRetryPayment = () => {
    router.push(`/payment/retry?orderId=${orderId}`);
  };

  const handleGoToOrders = () => {
    router.push("/profile?tab=orders");
  };

  if (!orderId || !paymentId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Invalid payment verification request</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-100 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-green-800 flex items-center justify-center gap-2">
                {isVerifying ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : verificationResult?.success ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : verificationResult ? (
                  <AlertCircle className="h-6 w-6 text-red-500" />
                ) : (
                  <Clock className="h-6 w-6" />
                )}
                Payment Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Information */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Order #PM-{orderId}
                </h3>
                <p className="text-gray-600">Payment ID: {paymentId}</p>
              </div>

              {/* Progress Bar */}
              {isVerifying && (
                <div className="space-y-2">
                  <Progress value={verificationProgress} className="w-full" />
                  <p className="text-sm text-gray-600 text-center">
                    {currentStatus}
                  </p>
                </div>
              )}

              {/* Verification Status */}
              {!isVerifying && verificationResult && (
                <div className="text-center">
                  {verificationResult.success ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">
                          Payment Verified!
                        </h3>
                        <p className="text-gray-600">
                          Your payment has been successfully verified.
                          Redirecting to order confirmation...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle className="h-10 w-10 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-red-800 mb-2">
                          {verificationResult.status === "TIMEOUT"
                            ? "Verification Timeout"
                            : verificationResult.status === "FAILED"
                            ? "Payment Failed"
                            : "Verification Error"}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {verificationResult.status === "TIMEOUT"
                            ? "We couldn't verify your payment status in time. This doesn't mean your payment failed."
                            : verificationResult.status === "FAILED"
                            ? "Your payment was not successful. You can try again."
                            : "There was an error verifying your payment status."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Loading State */}
              {isVerifying && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-2">
                      Verifying Payment...
                    </h3>
                    <p className="text-gray-600">
                      Please wait while we confirm your payment with the bank.
                      This usually takes a few seconds.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {!isVerifying && verificationResult && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {verificationResult.success ? (
                    <Button
                      onClick={() =>
                        router.push(
                          `/checkout/success?orderId=${orderId}&paymentId=${paymentId}`
                        )
                      }
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      View Order Confirmation
                    </Button>
                  ) : (
                    <>
                      {verificationResult.status === "FAILED" ? (
                        <Button
                          onClick={handleGoToRetryPayment}
                          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Retry Payment
                        </Button>
                      ) : (
                        <Button
                          onClick={handleRetry}
                          variant="outline"
                          className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Check Again
                        </Button>
                      )}
                      <Button
                        onClick={handleGoToOrders}
                        variant="outline"
                        className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                      >
                        View My Orders
                      </Button>
                    </>
                  )}
                </div>
              )}

              {/* Help Text */}
              <div className="text-center text-sm text-gray-500 border-t pt-4">
                <p>Having trouble? Contact our support team for assistance.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
