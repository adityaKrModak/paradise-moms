"use client";
import { useState, Fragment } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Package,
  RefreshCw,
  Eye,
  CreditCard,
  User,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Truck,
  X,
  RotateCcw,
} from "lucide-react";
import {
  useGetAllOrdersAdminQuery,
  useUpdateOrderMutation,
  useSyncAllPendingPaymentsMutation,
  useSyncOrderPaymentsStatusMutation,
  OrderStatus,
} from "@/graphql/generated/graphql";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AdminOrdersPage() {
  const { data, loading, error, refetch } = useGetAllOrdersAdminQuery();
  const [updateOrder, { loading: updateLoading }] = useUpdateOrderMutation();
  const [syncAllPayments, { loading: syncAllLoading }] =
    useSyncAllPendingPaymentsMutation();
  const [syncOrderPayments, { loading: syncOrderLoading }] =
    useSyncOrderPaymentsStatusMutation();

  const [openOrderId, setOpenOrderId] = useState<number | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
  const [syncingOrderId, setSyncingOrderId] = useState<number | null>(null);

  const orders = data?.orders || [];

  const handleToggleOrder = (orderId: number) => {
    setOpenOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const handleUpdateOrderStatus = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    setUpdatingOrderId(orderId);
    try {
      await updateOrder({
        variables: {
          updateOrderInput: {
            id: orderId,
            status: newStatus,
          },
        },
      });
      toast.success("Order status updated successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status. Please try again.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleSyncAllPayments = async () => {
    try {
      const { data: syncData } = await syncAllPayments();
      if (syncData?.syncAllPendingPayments) {
        const { totalPayments, successfulSyncs, failedSyncs } =
          syncData.syncAllPendingPayments;
        toast.success(
          `Sync completed! ${successfulSyncs}/${totalPayments} payments synced successfully. ${failedSyncs} failed.`
        );
        refetch();
      }
    } catch (error) {
      console.error("Failed to sync payments:", error);
      toast.error("Failed to sync payments. Please try again.");
    }
  };

  const handleSyncOrderPayments = async (orderId: number) => {
    setSyncingOrderId(orderId);
    try {
      const { data: syncData } = await syncOrderPayments({
        variables: { orderId },
      });
      if (syncData?.syncOrderPaymentsStatus) {
        const { totalPayments, syncResults } = syncData.syncOrderPaymentsStatus;
        const successfulSyncs = syncResults.filter(
          (result) => result.statusChanged
        ).length;
        toast.success(
          `Order payments synced! ${successfulSyncs}/${totalPayments} payments updated.`
        );
        refetch();
      }
    } catch (error) {
      console.error("Failed to sync order payments:", error);
      toast.error("Failed to sync order payments. Please try again.");
    } finally {
      setSyncingOrderId(null);
    }
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

  const getOrderStatusOptions = () => [
    { value: OrderStatus.Pending, label: "Pending" },
    { value: OrderStatus.Processing, label: "Processing" },
    { value: OrderStatus.Shipped, label: "Shipped" },
    { value: OrderStatus.Delivered, label: "Delivered" },
    { value: OrderStatus.Cancelled, label: "Cancelled" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-3 text-gray-600">Loading orders...</span>
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Orders Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage customer orders and payment status
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleSyncAllPayments}
            disabled={syncAllLoading}
            variant="outline"
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            {syncAllLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RotateCcw className="h-4 w-4 mr-2" />
            )}
            Sync All Payments
          </Button>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="border-green-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Package className="h-5 w-5" />
            All Orders ({orders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-600">
                No customer orders have been placed yet.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(
                  (order) =>
                    order && (
                      <Fragment key={order.id}>
                        <TableRow className="hover:bg-green-50/50">
                          <TableCell className="font-medium">
                            PM-{order.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-800">
                                  {order.user?.firstName} {order.user?.lastName}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {order.user?.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">
                                {format(
                                  new Date(order.createdAt),
                                  "MMM dd, yyyy"
                                )}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium">
                                ₹{(order.totalPrice / 100).toFixed(2)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getOrderStatusBadge(order.status)}
                              <Select
                                value={order.status}
                                onValueChange={(value: OrderStatus) =>
                                  handleUpdateOrderStatus(order.id, value)
                                }
                                disabled={updatingOrderId === order.id}
                              >
                                <SelectTrigger className="w-32 h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {getOrderStatusOptions().map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="text-xs">
                              {order.orderItems?.length || 0} items
                            </Badge>
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
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSyncOrderPayments(order.id)
                                }
                                disabled={syncingOrderId === order.id}
                                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                              >
                                {syncingOrderId === order.id ? (
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <CreditCard className="h-4 w-4 mr-1" />
                                )}
                                Sync Payment
                              </Button>
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
                                      Order Details
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
                                          Created:
                                        </span>
                                        <span className="font-medium">
                                          {format(
                                            new Date(order.createdAt),
                                            "PPpp"
                                          )}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Updated:
                                        </span>
                                        <span className="font-medium">
                                          {format(
                                            new Date(order.updatedAt),
                                            "PPpp"
                                          )}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Status:
                                        </span>
                                        {getOrderStatusBadge(order.status)}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Customer Information */}
                                  <div>
                                    <h4 className="text-lg font-semibold mb-3 text-green-800 flex items-center gap-2">
                                      <User className="h-5 w-5" />
                                      Customer Details
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Name:
                                        </span>
                                        <span className="font-medium">
                                          {order.user?.firstName}{" "}
                                          {order.user?.lastName}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Email:
                                        </span>
                                        <span className="font-medium">
                                          {order.user?.email}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Customer ID:
                                        </span>
                                        <span className="font-medium">
                                          #{order.user?.id}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                  <h4 className="text-lg font-semibold mb-4 text-green-800">
                                    Order Items ({order.orderItems?.length || 0}
                                    )
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
                                                    item.product.imageUrls[0]
                                                      .url
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
                                                  Qty: {item.quantity}
                                                </span>
                                                <span>
                                                  Price: ₹
                                                  {(item.price / 100).toFixed(
                                                    2
                                                  )}{" "}
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
    </div>
  );
}
