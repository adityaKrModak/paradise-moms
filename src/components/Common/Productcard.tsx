"use client";

import React from "react";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/redux/slices/cartSlice";
import AddToBag from "@/assets/Addt to Card.svg";
import AddToCartGreen from "@/assets/Icons/AddToCartGreen.svg";
import Rating from "@/assets/Rating.svg";
import { GetProductsQuery } from "@/graphql/generated/graphql";
import { RootState } from "@/redux/rootReducer";

type Product = GetProductsQuery["products"][0];

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const isItemInStore = useSelector((state: RootState) =>
    state.cart.items.some((item) => item.id === product.id)
  );

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

  return (
    <Card className="md:w-[260px] md:h-[380px] max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-100">
      <div className="relative group">
        <Image
          src={product.imageUrls[0].url}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-[200px]"
        />
      </div>
      <CardContent className="pt-3 pb-1 px-4">
        <h3 className=" font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center">
          <span className="text-lg font-bold text-green-600">
            ₹{product.price / 100}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-1 flex justify-center bg-gray-50">
        <Button
          className="w-[92%] bg-[#00B207] hover:bg-green-700 text-white transition-colors duration-300"
          onClick={handleAddCart}
        >
          {isItemInStore ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
