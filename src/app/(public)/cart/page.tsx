"use client";
import dynamic from "next/dynamic";
import { ShoppingCart } from "lucide-react";

const CartPageContent = dynamic(
  () => import("@/components/cart/CartPageContent"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    ),
  }
);

export default function ShopCartPage() {
  return <CartPageContent />;
}
