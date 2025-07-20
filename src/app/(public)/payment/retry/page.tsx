"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useMeQuery, useGetMyOrdersQuery } from "@/graphql/generated/graphql";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RetryPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: meData } = useMeQuery();
  const { data: ordersData, loading: ordersLoading } = useGetMyOrdersQuery();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    orderId: "",
    gatewayIntentId: "",
    amount: 0,
  });
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    const gatewayIntentId = searchParams.get("gatewayIntentId");

    if (orderId && gatewayIntentId) {
      setPaymentDetails({
        orderId,
        gatewayIntentId,
        amount: 0, // Will be set from order data
      });
    } else {
      toast.error("Invalid payment details");
      router.push("/profile?tab=orders");
    }
  }, [searchParams, router]);

  // Fetch order details when orders data is available
  useEffect(() => {
    if (ordersData?.myOrders && paymentDetails.orderId) {
      const order = ordersData.myOrders.find(
        (order) => order?.id.toString() === paymentDetails.orderId
      );

      if (order) {
        setOrderData(order);
        setPaymentDetails((prev) => ({
          ...prev,
          amount: order.totalPrice / 100, // Convert from paisa to rupees
        }));
      } else {
        toast.error("Order not found");
        router.push("/profile?tab=orders");
      }
    }
  }, [ordersData, paymentDetails.orderId, router]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleRetryPayment = async () => {
    if (!window.Razorpay) {
      toast.error("Payment gateway not loaded. Please refresh and try again.");
      return;
    }

    setIsProcessing(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_key",
      amount: paymentDetails.amount * 100, // Amount in paise
      currency: "INR",
      name: "Paradise Moms",
      description: `Retry Payment for Order #PM-${paymentDetails.orderId}`,
      order_id: paymentDetails.gatewayIntentId,
      handler: async (response: any) => {
        try {
          console.log("Payment successful:", response);
          toast.success("Payment successful!");
          router.push(
            `/checkout/success?orderId=${paymentDetails.orderId}&paymentId=${response.razorpay_payment_id}`
          );
        } catch (error) {
          console.error("Payment verification error:", error);
          toast.error("Payment verification failed. Please contact support.");
        } finally {
          setIsProcessing(false);
        }
      },
      prefill: {
        name: `${meData?.me?.firstName || ""} ${
          meData?.me?.lastName || ""
        }`.trim(),
        email: meData?.me?.email || "",
        contact: meData?.me?.phoneNumber || "",
      },
      theme: {
        color: "#00B207",
      },
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
          toast.error("Payment cancelled");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  if (!paymentDetails.orderId || ordersLoading || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">
            {!paymentDetails.orderId
              ? "Loading payment details..."
              : ordersLoading
              ? "Loading order information..."
              : "Preparing payment details..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/profile?tab=orders")}
            className="text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-green-800">
                Retry Payment
              </h1>
              <p className="text-gray-600 mt-2">
                Complete your payment for Order #PM-{paymentDetails.orderId}
              </p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Payment Card */}
          <Card className="border-green-100 shadow-lg mb-6">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="text-green-800 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">
                    PM-{paymentDetails.orderId}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-xl text-green-700">
                    ₹{paymentDetails.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Status:</span>
                  <Badge className="bg-red-100 text-red-800 border-0 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Payment Required
                  </Badge>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Payment Required</p>
                    <p>
                      Your order has been created but payment is still pending.
                      Please complete the payment to process your order.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleRetryPayment}
                disabled={isProcessing}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay ₹{paymentDetails.amount.toFixed(2)}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Payment Methods Info */}
          <Card className="border-green-100 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Accepted Payment Methods
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <CreditCard className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <span className="text-xs text-gray-600">Credit Card</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <CreditCard className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <span className="text-xs text-gray-600">Debit Card</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <CreditCard className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <span className="text-xs text-gray-600">UPI</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <CreditCard className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <span className="text-xs text-gray-600">Net Banking</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
