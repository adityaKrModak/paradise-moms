"use client";

import { useSelector, useDispatch } from "react-redux";
import { updateItemQuantity, removeItem } from "@/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Package,
  Truck,
  Shield,
  CreditCard,
} from "lucide-react";
import {
  selectCartItems,
  selectCartTotal,
} from "@/redux/selectors/cartSelectors";
import type { CartItem } from "@/redux/slices/cartSlice";

export default function CartPageContent() {
  const dispatch = useDispatch();
  const items: CartItem[] = useSelector(selectCartItems);
  const subtotal: number = useSelector(selectCartTotal);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ id, quantity }));
    } else {
      dispatch(removeItem(id));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-green-800">Shopping Cart</h1>
          </div>

          <Card className="border-green-100 max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Add some fresh products to get started!
              </p>
              <Link href="/products">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Package className="h-4 w-4 mr-2" />
                  Browse Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-green-800">Shopping Cart</h1>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              {items.length} {items.length === 1 ? "item" : "items"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-green-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Cart Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {items.map((item, index) => (
                  <div key={item.id}>
                    {/* Mobile Layout */}
                    <div className="block md:hidden">
                      <div className="bg-white rounded-lg border border-green-50 p-4 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <Image
                              src={
                                item.imageUrls[0]?.url ||
                                "/placeholder.svg?height=60&width=60&query=product" ||
                                "/placeholder.svg"
                              }
                              alt={item.name}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover border border-green-100"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:bg-red-50 h-8 w-8"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="text-lg font-bold text-green-600">
                              ₹{(item.price / 100).toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">per item</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-green-200 rounded-lg bg-white">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 text-green-600 hover:bg-green-50"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <div className="w-12 text-center">
                                <span className="font-medium text-gray-800">
                                  {item.quantity}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 text-green-600 hover:bg-green-50"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <span className="text-sm text-gray-600">Total:</span>
                          <span className="text-lg font-bold text-gray-800">
                            ₹{((item.price / 100) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-green-50">
                        <div className="flex-shrink-0">
                          <Image
                            src={
                              item.imageUrls[0]?.url ||
                              "/placeholder.svg?height=80&width=80&query=product" ||
                              "/placeholder.svg"
                            }
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover border border-green-100"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                          <p className="text-lg font-bold text-green-600 mt-2">
                            ₹{(item.price / 100).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-green-200 rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-600 hover:bg-green-50"
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleUpdateQuantity(
                                  item.id,
                                  Number.parseInt(e.target.value) || 1
                                )
                              }
                              className="w-16 h-8 text-center border-0 focus:ring-0 focus:border-0"
                              min="1"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-600 hover:bg-green-50"
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-gray-800">
                            ₹{((item.price / 100) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {index < items.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="border-green-100 sticky top-4">
              <CardHeader>
                <CardTitle className="text-green-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `₹${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {subtotal < 50 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-sm text-orange-700">
                      <Truck className="h-4 w-4 inline mr-1" />
                      Add ₹{(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Proceed to Checkout
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  Secure checkout
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800 text-lg">
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                  <Button
                    variant="outline"
                    className="border-green-300 text-green-700 hover:bg-green-50"
                  >
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">
                      Free shipping on orders over $50
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">
                      Secure payment processing
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Package className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">
                      Fresh products guaranteed
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
