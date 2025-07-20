"use client";
import { Fragment, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Package,
  RefreshCw,
  X,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Truck,
  Eye,
  ShoppingCart,
} from "lucide-react";
import {
  useGetMyOrdersQuery,
  useGetPaymentIntentByOrderLazyQuery,
  useCreatePaymentIntentMutation,
  useSyncPaymentStatusByGatewayIdMutation,
  useSyncOrderPaymentsStatusMutation,
  OrderStatus,
} from "@/graphql/generated/graphql";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMeQuery } from "@/graphql/generated/graphql";

function OrdersPageContent() {
  const router = useRouter();
  const { data, loading, error, refetch } = useGetMyOrdersQuery();
  const [getPaymentIntent, { loading: paymentLoading }] =
    useGetPaymentIntentByOrderLazyQuery();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const { data: meData } = useMeQuery();
  const [syncByGatewayId] = useSyncPaymentStatusByGatewayIdMutation();
  const [syncOrderPayments] = useSyncOrderPaymentsStatusMutation();

  const [openOrderId, setOpenOrderId] = useState<number | null>(null);
  const [paymentStatuses, setPaymentStatuses] = useState<Record<number, any>>(
    {}
  );
  const [retryingPayment, setRetryingPayment] = useState<number | null>(null);
  const [syncingPayment, setSyncingPayment] = useState<number | null>(null);

  const orders = data?.myOrders || [];

  // NO AUTOMATIC LOADING - Payment status only loaded when user manually syncs

  const handleToggleOrder = (orderId: number) => {
    setOpenOrderId((prevId) => (prevId === orderId ? null : orderId));
    // NO AUTOMATIC PAYMENT STATUS LOADING - User must click "Sync Status" manually
  };

  const getOrderStatusBadge = (status: OrderStatus) => {
    const statusConfig = {
      [OrderStatus.Pending]: {
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
      },
      [OrderStatus.Processing]: {
        color: "bg-blue-100 text-blue-800",
        icon: Package,
      },
      [OrderStatus.Shipped]: {
        color: "bg-purple-100 text-purple-800",
        icon: Truck,
      },
      [OrderStatus.Delivered]: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
      },
      [OrderStatus.Cancelled]: { color: "bg-red-100 text-red-800", icon: X },
    };

    const config = statusConfig[status] || statusConfig[OrderStatus.Pending];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border-0 flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    const isSuccess =
      paymentStatus?.toLowerCase().includes("success") ||
      paymentStatus?.toLowerCase().includes("paid");
    const isPending =
      paymentStatus?.toLowerCase().includes("pending") ||
      paymentStatus?.toLowerCase().includes("created");
    const isFailed =
      paymentStatus?.toLowerCase().includes("failed") ||
      paymentStatus?.toLowerCase().includes("error");

    if (isSuccess) {
      return (
        <Badge className="bg-green-100 text-green-800 border-0 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Paid
        </Badge>
      );
    } else if (isPending) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-0 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      );
    } else if (isFailed) {
      return (
        <Badge className="bg-red-100 text-red-800 border-0 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Failed
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-gray-100 text-gray-800 border-0 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Unpaid
        </Badge>
      );
    }
  };

  const handleSyncPaymentStatus = async (orderId: number) => {
    setSyncingPayment(orderId);
    try {
      // Step 1: Sync all payments for the order with payment gateway
      const { data } = await syncOrderPayments({
        variables: { orderId },
      });

      // Step 2: Check if any status changed
      const hasStatusChanged = data?.syncOrderPaymentsStatus?.syncResults?.some(
        (result) => result.statusChanged
      );

      if (hasStatusChanged) {
        toast.success("Payment status updated!");
      } else {
        toast.info("Payment status is already up to date");
      }

      // Step 3: Fetch the updated payment status after sync
      const { data: paymentData } = await getPaymentIntent({
        variables: { orderId },
      });

      if (paymentData?.paymentIntentByOrder) {
        setPaymentStatuses((prev) => ({
          ...prev,
          [orderId]: paymentData.paymentIntentByOrder,
        }));
      }
    } catch (error) {
      console.error("Failed to sync payment status:", error);
      toast.error("Failed to sync payment status. Please try again.");
    } finally {
      setSyncingPayment(null);
    }
  };

  const handleRetryPayment = async (orderId: number, totalAmount: number) => {
    setRetryingPayment(orderId);
    try {
      // Create new payment intent for retry
      const { data: paymentIntentData } = await createPaymentIntent({
        variables: {
          createPaymentIntentInput: {
            orderId: orderId,
            amount: Math.round(totalAmount * 100), // Convert to paisa
            currency: "INR",
            gatewayId: 1, // Razorpay gateway ID
            email: meData?.me?.email || "",
          },
        },
      });

      if (paymentIntentData?.createPaymentIntent?.gatewayIntentId) {
        // Redirect to a payment page or open Razorpay directly
        toast.success("Redirecting to payment...");
        window.location.href = `/payment/retry?orderId=${orderId}&gatewayIntentId=${paymentIntentData.createPaymentIntent.gatewayIntentId}`;
      } else {
        throw new Error("Failed to create payment intent");
      }
    } catch (error) {
      console.error("Failed to retry payment:", error);
      toast.error("Failed to retry payment. Please try again.");
    } finally {
      setRetryingPayment(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading orders: {error.message}</p>
        <Button onClick={() => refetch()} className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-green-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-green-800 flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order History ({orders.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Orders Yet
            </h3>
            <p className="text-gray-600 mb-4">
              You haven't placed any orders yet. Start shopping to see your
              order history here.
            </p>
            <Button
              onClick={() => router.push("/products")}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(
                (order) =>
                  order && (
                    <Fragment key={order.id}>
                      <TableRow
                        data-state={
                          openOrderId === order.id ? "open" : "closed"
                        }
                        className="hover:bg-green-50/50"
                      >
                        <TableCell className="font-medium">
                          PM-{order.id}
                        </TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          ₹{(order.totalPrice / 100).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {getOrderStatusBadge(order.status)}
                        </TableCell>
                        <TableCell>
                          {paymentStatuses[order.id] ? (
                            getPaymentStatusBadge(
                              paymentStatuses[order.id].status
                            )
                          ) : (
                            <Badge className="bg-gray-100 text-gray-600 border-0">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Unknown
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {order.orderItems?.length || 0}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleOrder(order.id)}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              {openOrderId === order.id ? "Hide" : "View"}
                            </Button>

                            {/* Sync Payment Status Button - Always available for manual sync */}
                            {!paymentStatuses[order.id] ||
                            (!paymentStatuses[order.id].status
                              ?.toLowerCase()
                              .includes("success") &&
                              !paymentStatuses[order.id].status
                                ?.toLowerCase()
                                .includes("paid")) ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSyncPaymentStatus(order.id)
                                }
                                disabled={syncingPayment === order.id}
                                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                              >
                                {syncingPayment === order.id ? (
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <RefreshCw className="h-4 w-4 mr-1" />
                                )}
                                Sync Status
                              </Button>
                            ) : null}

                            {/* Retry Payment Button - for failed payments */}
                            {paymentStatuses[order.id] &&
                              (paymentStatuses[order.id].status
                                ?.toLowerCase()
                                .includes("failed") ||
                                paymentStatuses[order.id].status
                                  ?.toLowerCase()
                                  .includes("error")) && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleRetryPayment(
                                      order.id,
                                      order.totalPrice / 100
                                    )
                                  }
                                  disabled={retryingPayment === order.id}
                                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                                >
                                  {retryingPayment === order.id ? (
                                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                  ) : (
                                    <CreditCard className="h-4 w-4 mr-1" />
                                  )}
                                  Retry Payment
                                </Button>
                              )}
                          </div>
                        </TableCell>
                      </TableRow>
                      {openOrderId === order.id && (
                        <TableRow>
                          <TableCell colSpan={7} className="p-0">
                            <div className="p-6 bg-green-50/30 border-t">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                {/* Order Information */}
                                <div>
                                  <h4 className="text-lg font-semibold mb-3 text-green-800 flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Order Information
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Order ID:
                                      </span>
                                      <span className="font-medium">
                                        PM-{order.id}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Order Date:
                                      </span>
                                      <span className="font-medium">
                                        {new Date(
                                          order.createdAt
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Order Status:
                                      </span>
                                      {getOrderStatusBadge(order.status)}
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Total Items:
                                      </span>
                                      <span className="font-medium">
                                        {order.orderItems?.length || 0}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Payment Information */}
                                <div>
                                  <h4 className="text-lg font-semibold mb-3 text-green-800 flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Payment Information
                                  </h4>
                                  {paymentLoading ? (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                      Loading payment details...
                                    </div>
                                  ) : paymentStatuses[order.id] ? (
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Payment Status:
                                        </span>
                                        {getPaymentStatusBadge(
                                          paymentStatuses[order.id].status
                                        )}
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Amount:
                                        </span>
                                        <span className="font-medium">
                                          ₹
                                          {(
                                            paymentStatuses[order.id].amount /
                                            100
                                          ).toFixed(2)}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Currency:
                                        </span>
                                        <span className="font-medium">
                                          {paymentStatuses[order.id].currency}
                                        </span>
                                      </div>
                                      {paymentStatuses[order.id].payments
                                        ?.length > 0 && (
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">
                                            Payment ID:
                                          </span>
                                          <span className="font-medium text-xs">
                                            {
                                              paymentStatuses[order.id]
                                                .payments[0].gatewayPaymentId
                                            }
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-sm text-gray-600">
                                      Payment information not available
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Order Items */}
                              <div>
                                <h4 className="text-lg font-semibold mb-4 text-green-800">
                                  Order Items ({order.orderItems?.length || 0})
                                </h4>
                                <div className="space-y-4">
                                  {order.orderItems?.map(
                                    (item) =>
                                      item && (
                                        <div
                                          key={item.id}
                                          className="flex items-start gap-4 p-4 bg-white rounded-lg border border-green-100"
                                        >
                                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                            {item.product.imageUrls?.[0]
                                              ?.url ? (
                                              <Image
                                                src={
                                                  item.product.imageUrls[0].url
                                                }
                                                alt={item.product.name}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                              />
                                            ) : (
                                              <Package className="h-8 w-8 text-gray-400" />
                                            )}
                                          </div>
                                          <div className="flex-1">
                                            <h5 className="font-semibold text-gray-800 mb-1">
                                              {item.product.name}
                                            </h5>
                                            {item.product.description && (
                                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                {item.product.description}
                                              </p>
                                            )}
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                              <span>
                                                Quantity: {item.quantity}
                                              </span>
                                              <span>
                                                Price: ₹
                                                {(item.price / 100).toFixed(2)}{" "}
                                                each
                                              </span>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <div className="font-semibold text-gray-800 text-lg">
                                              ₹
                                              {(
                                                (item.quantity * item.price) /
                                                100
                                              ).toFixed(2)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                              {item.currency}
                                            </div>
                                          </div>
                                        </div>
                                      )
                                  )}
                                </div>
                              </div>

                              <Separator className="my-6" />

                              {/* Order Total */}
                              <div className="flex justify-end">
                                <div className="bg-white p-4 rounded-lg border border-green-200">
                                  <div className="flex items-center gap-8">
                                    <span className="text-lg font-medium text-gray-600">
                                      Order Total:
                                    </span>
                                    <span className="text-2xl font-bold text-green-700">
                                      ₹{(order.totalPrice / 100).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  )
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
export default OrdersPageContent;
