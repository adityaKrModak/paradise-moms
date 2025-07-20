"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/hooks/useWishlist";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Package,
  Star,
  Calendar,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function WishlistPage() {
  const {
    items,
    count,
    total,
    stats,
    removeItem,
    moveItemToCart,
    moveAllToCart,
    clearAll,
    isEmpty,
    hasOutOfStockItems,
    inStockItems,
    outOfStockItems,
  } = useWishlist();

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center">
              <Heart className="w-16 h-16 text-red-300" />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Your Wishlist is Empty
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Start adding products you love to your wishlist. It's a great way
              to keep track of items you want to buy later!
            </p>

            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              <Link href="/products" className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-green-800 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                My Wishlist
              </h1>
              <p className="text-gray-600 mt-2">
                {count} {count === 1 ? "item" : "items"} • Total value: ₹
                {total.toFixed(2)}
              </p>
            </div>

            <div className="flex gap-3">
              {inStockItems.length > 0 && (
                <Button
                  onClick={moveAllToCart}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add All to Cart
                </Button>
              )}

              <Button
                onClick={clearAll}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-green-100">
              <CardContent className="p-4 text-center">
                <Package className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">
                  {stats.totalItems}
                </p>
                <p className="text-sm text-gray-600">Total Items</p>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">
                  ₹{stats.totalValue.toFixed(0)}
                </p>
                <p className="text-sm text-gray-600">Total Value</p>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardContent className="p-4 text-center">
                <ShoppingCart className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">
                  {stats.inStockItems}
                </p>
                <p className="text-sm text-gray-600">In Stock</p>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">
                  ₹{stats.averagePrice.toFixed(0)}
                </p>
                <p className="text-sm text-gray-600">Avg. Price</p>
              </CardContent>
            </Card>
          </div>

          {hasOutOfStockItems && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-orange-800 text-sm">
                <span className="font-semibold">{outOfStockItems.length}</span>{" "}
                item(s) in your wishlist are currently out of stock.
              </p>
            </div>
          )}
        </motion.div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="group bg-white rounded-2xl shadow-sm border border-green-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-orange-50">
                  <Image
                    src={
                      item.imageUrls[0]?.url ||
                      "/placeholder.svg?height=200&width=300&query=organic+product"
                    }
                    alt={item.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Stock Status */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={`${
                        item.stock > 0
                          ? "bg-green-600 text-white"
                          : "bg-red-500 text-white"
                      } border-0 shadow-lg`}
                    >
                      {item.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 group/remove"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600 group-hover/remove:text-red-500 transition-colors duration-200" />
                  </button>
                </div>

                <CardContent className="p-4 space-y-3">
                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Added Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    Added {new Date(item.addedAt).toLocaleDateString()}
                  </div>

                  <Separator />

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600">
                      ₹{(item.price / 100).toFixed(2)}
                    </span>

                    <Button
                      onClick={() => moveItemToCart(item.id)}
                      disabled={item.stock === 0}
                      size="sm"
                      className={`${
                        item.stock > 0
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Continue Shopping */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <Link href="/products" className="flex items-center gap-2">
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
