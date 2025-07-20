"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/redux/slices/cartSlice";
import type { GetProductsQuery } from "@/graphql/generated/graphql";
import type { RootState } from "@/redux/rootReducer";
import { Heart, ShoppingCart, Leaf } from "lucide-react";
import { useWishlist, useIsInWishlist } from "@/hooks/useWishlist";

type Product = GetProductsQuery["products"][0];

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const { toggleItem } = useWishlist();
  const isItemInStore = useSelector((state: RootState) =>
    state.cart.items.some((item) => item.id === product.id)
  );
  const isInWishlist = useIsInWishlist(product.id);

  const handleAddCart = () => {
    if (!isItemInStore) {
      const newItem = {
        ...product,
        quantity: 1,
      };
      dispatch(addItem(newItem));
    } else {
      dispatch(removeItem(product.id));
    }
  };

  const handleWishlistToggle = () => {
    toggleItem(product);
  };

  const price = product.price / 100;

  return (
    <Card className="group w-full max-w-sm mx-auto bg-white rounded-2xl shadow-sm border border-green-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-orange-50">
        <Image
          src={
            product.imageUrls[0]?.url ||
            "/placeholder.svg?height=240&width=300&query=organic+product"
          }
          alt={product.name}
          width={300}
          height={240}
          className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Organic Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-green-600 text-white border-0 shadow-lg">
            <Leaf className="w-3 h-3 mr-1" />
            Organic
          </Badge>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 group/heart"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-200 ${
              isInWishlist
                ? "text-red-500 fill-red-500"
                : "text-gray-600 group-hover/heart:text-red-500 group-hover/heart:fill-red-500"
            }`}
          />
        </button>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-green-700 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">
            ₹{price.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className={`w-full h-12 rounded-xl font-medium transition-all duration-300 ${
            isItemInStore
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
          }`}
          onClick={handleAddCart}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {isItemInStore ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
