"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
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
} from "lucide-react";

export default function CheckoutSuccessPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Mock order details
  const orderDetails = {
    orderNumber: "PM-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    estimatedDelivery: "2-3 business days",
    trackingNumber:
      "TRK" + Math.random().toString(36).substr(2, 12).toUpperCase(),
    email: "sarah@example.com",
  };

  useEffect(() => {
    // Clear cart after successful order
    // dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-[140px] md:pt-[140px]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                Order Confirmed!
              </h1>
              <p className="text-gray-600">
                Thank you for your purchase. Your order has been successfully
                placed.
              </p>
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
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tracking Number:</span>
                        <span className="font-medium">
                          {orderDetails.trackingNumber}
                        </span>
                      </div>
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
                        <Mail className="h-4 w-4" />
                        <span>
                          Confirmation email sent to {orderDetails.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <Package className="h-4 w-4" />
                        <span>Order is being prepared</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <Truck className="h-4 w-4" />
                        <span>Tracking updates will be sent</span>
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
                        You&apos;ll receive an email confirmation with your order
                        details and tracking information.
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
                onClick={() => router.push("/orders")}
                className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
              >
                <Receipt className="h-4 w-4 mr-2" />
                View Order Details
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
