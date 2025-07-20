"use client";
import { useEffect, useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  ArrowRight,
  Home,
  Receipt,
  Loader2,
} from "lucide-react";
import { useMeQuery } from "@/graphql/generated/graphql";

function CheckoutSuccessContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: meData } = useMeQuery();

  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    paymentId: "",
    orderNumber: "",
    estimatedDelivery: "Few business days",
    // trackingNumber: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [orderTime, setOrderTime] = useState("");

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    const paymentId = searchParams.get("paymentId");

    if (orderId && paymentId) {
      const now = new Date();
      setOrderTime(now.toLocaleString());

      setOrderDetails({
        orderId,
        paymentId,
        orderNumber: `#${orderId}`,
        estimatedDelivery: "Few business days",
        // trackingNumber: `TRK${orderId}${Math.random()
        //   .toString(36)
        //   .substr(2, 6)
        //   .toUpperCase()}`,
        email: meData?.me?.email || "your-email@example.com",
      });
      setIsLoading(false);
    } else {
      // If no order details, redirect to home after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [searchParams, meData, router]);

  if (isLoading && !orderDetails.orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8 animate-in fade-in-50 duration-700">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in-50 duration-500 delay-200">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-green-800 mb-2 animate-in slide-in-from-bottom-4 duration-500 delay-300">
                Order Confirmed! 🎉
              </h1>
              <p className="text-gray-600 animate-in slide-in-from-bottom-4 duration-500 delay-400">
                Thank you for your purchase. Your order has been successfully
                placed and will be processed shortly.
              </p>
              {orderDetails.paymentId && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 animate-in slide-in-from-bottom-4 duration-500 delay-500">
                  <p className="text-sm text-green-700">
                    <strong>Payment ID:</strong> {orderDetails.paymentId}
                  </p>
                </div>
              )}
            </div>

            {/* Order Details */}
            <Card className="border-green-100 mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Order Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Number:</span>
                        <span className="font-medium">
                          {orderDetails.orderNumber}
                        </span>
                      </div>
                      {/* <div className="flex justify-between">
                        <span className="text-gray-600">Tracking Number:</span>
                        <span className="font-medium">
                          {orderDetails.trackingNumber}
                        </span>
                      </div> */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Estimated Delivery:
                        </span>
                        <Badge className="bg-green-100 text-green-800">
                          {orderDetails.estimatedDelivery}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Confirmation
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-green-600">
                        <Package className="h-4 w-4" />
                        <span>Order is being prepared</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <Truck className="h-4 w-4" />
                        <span>Tracking updates will be updated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-green-100 mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  What happens next?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-semibold text-green-600">
                        1
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        Order Confirmation
                      </h4>
                      <p className="text-sm text-gray-600">
                        You&apos;ll confirmation with your order details is
                        being updated in your orders section.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-semibold text-green-600">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        Order Preparation
                      </h4>
                      <p className="text-sm text-gray-600">
                        Our team will carefully prepare your fresh, organic
                        products for delivery.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-semibold text-green-600">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Delivery</h4>
                      <p className="text-sm text-gray-600">
                        Your order will be delivered within{" "}
                        {orderDetails.estimatedDelivery} to your specified
                        address.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push("/")}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Home className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/profile")}
                className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
              >
                <Receipt className="h-4 w-4 mr-2" />
                View My Profile
              </Button>
            </div>

            {/* Support */}
            <Card className="border-green-100 mt-6">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions about your order, our customer
                  support team is here to help.
                </p>
                <Button
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  Contact Support
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}