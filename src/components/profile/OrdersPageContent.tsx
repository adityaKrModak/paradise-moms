"use client";
import { useState } from "react";
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
import { Loader2, Package, RefreshCw, ShoppingBag, X } from "lucide-react";
import { useGetMyOrdersQuery, GetMyOrdersQuery } from "@/graphql/generated/graphql";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Order = NonNullable<NonNullable<GetMyOrdersQuery["me"]>["orders"]>[0];

 function OrdersPageContent() {
   const { data, loading, error, refetch } = useGetMyOrdersQuery();
   const [openOrderId, setOpenOrderId] = useState<number | null>(null);

   const orders = data?.me?.orders || [];

   const handleToggleOrder = (orderId: number) => {
     setOpenOrderId((prevId) => (prevId === orderId ? null : orderId));
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
     <div className="container mx-auto px-4 py-8">
       <Card className="border-green-100 shadow-sm">
         <CardHeader>
           <CardTitle className="text-green-800 flex items-center gap-2">
             <Package className="h-5 w-5" />
             Recent Orders
           </CardTitle>
         </CardHeader>
         <CardContent>
           {orders.length === 0 ? (
             <div className="text-center py-12">
               <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
               <h3 className="text-lg font-semibold text-gray-800 mb-2">
                 Order History
               </h3>
               <p className="text-gray-600 mb-4">
                 Your order history will appear here
               </p>
               <Button className="bg-green-600 hover:bg-green-700 text-white">
                 Browse Products
               </Button>
             </div>
           ) : (
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Order ID</TableHead>
                   <TableHead>Date</TableHead>
                   <TableHead>Total</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead className="text-right">Items</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {orders.map(
                   (order) =>
                     order && (
                       <React.Fragment key={order.id}>
                         <TableRow
                           data-state={
                             openOrderId === order.id ? "open" : "closed"
                           }
                           onClick={() => handleToggleOrder(order.id)}
                           className="cursor-pointer hover:bg-green-50/50"
                         >
                           <TableCell className="font-medium">
                             #{order.id}
                           </TableCell>
                           <TableCell>
                             {new Date(order.createdAt).toLocaleDateString()}
                           </TableCell>
                           <TableCell>₹{order.totalPrice.toFixed(2)}</TableCell>
                           <TableCell>
                             <Badge>{order.status}</Badge>
                           </TableCell>
                           <TableCell className="text-right">
                             {order.orderItems?.length || 0}
                           </TableCell>
                         </TableRow>
                         {openOrderId === order.id && (
                           <TableRow>
                             <TableCell colSpan={5} className="p-0">
                               <div className="p-6 bg-green-50/30">
                                 <h4 className="text-lg font-semibold mb-4 text-green-800">
                                   Order Details
                                 </h4>
                                 <div className="space-y-4">
                                   {order.orderItems?.map(
                                     (item) =>
                                       item && (
                                         <div
                                           key={item.id}
                                           className="flex items-start gap-4"
                                         >
                                           <Image
                                             src={
                                               item.product.imageUrls[0]?.url ||
                                               "/placeholder.svg"
                                             }
                                             alt={item.product.name}
                                             width={60}
                                             height={60}
                                             className="rounded-md border border-green-100"
                                           />
                                           <div className="flex-1">
                                             <p className="font-semibold text-gray-800">
                                               {item.product.name}
                                             </p>
                                             <p className="text-sm text-gray-600">
                                               {item.quantity} x ₹
                                               {(item.price / 100).toFixed(2)}
                                             </p>
                                           </div>
                                           <div className="text-right font-semibold text-gray-800">
                                             ₹
                                             {(
                                               (item.quantity * item.price) /
                                               100
                                             ).toFixed(2)}
                                           </div>
                                         </div>
                                       )
                                   )}
                                 </div>
                                 <Separator className="my-4" />
                                 <div className="flex justify-end gap-8 font-semibold">
                                   <span className=" text-gray-600">
                                     Total:
                                   </span>
                                   <span className=" text-green-700">
                                     ₹{order.totalPrice.toFixed(2)}
                                   </span>
                                 </div>
                               </div>
                             </TableCell>
                           </TableRow>
                         )}
                       </React.Fragment>
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
 export default OrdersPageContent;
