"use client";

import React from "react";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../../redux/slices/cartSlice";
import AddToBag from "@/assets/Addt to Card.svg";
import AddToCartGreen from "@/assets/Icons/AddToCartGreen.svg";
import Rating from "@/assets/Rating.svg";

// Define the interface for the details prop
interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
}

interface ProductCardProps {
  details: ProductDetails;
}

export function ProductCard({ details }: ProductCardProps) {
  const dispatch = useDispatch();
  const isItemInStore = useSelector((state: any) =>
    state.cart.items.some((item: any) => item.id === details.id)
  );
  const imageSource = isItemInStore ? AddToCartGreen : AddToBag;
  const discount = Math.round(
    ((details.originalPrice - details.price) / details.originalPrice) * 100
  );

  const handleAddCart = () => {
    if (!isItemInStore) {
      const newItem = {
        id: details.id.toString(),
        name: details.name,
        price: details.price,
        image: details.image,
        quantity: 1,
      };
      dispatch(addItem(newItem));
    } else {
      dispatch(removeItem(details.id));
    }
  };

  return (
    <Card className="md:w-[260px] md:h-[380px] max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-100">
      <div className="relative group">
        <Image
          src={details.image}
          alt={details.name}
          width={300}
          height={300}
          className="w-full h-[200px]"
        />
        <Badge className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold">
          {discount}% OFF
        </Badge>
      </div>
      <CardContent className="pt-3 pb-1 px-4">
        <h3 className=" font-semibold text-gray-800 mb-1">
          {details.name}
        </h3>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {details.description}
        </p>
        <div className="flex items-center mb-2">
          <Image className="w-[90px]" src={Rating} alt="rating" />
        </div>
        <div className="flex items-center">
          <span className="text-lg font-bold text-green-600">
            ₹{details.price}
          </span>
          <span className="ml-2 text-sm text-gray-500 line-through">
            ₹{details.originalPrice}
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

export default function Component() {
  const exampleProduct: ProductDetails = {
    id: "1",
    name: "Organic Mixed Berries",
    description:
      "Fresh Pickle",
    price: 299,
    originalPrice: 399,
    rating: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbgSs8WxEmyymSLG2pUhIJpsKpqQ11hrcI2KaZt8Kxg&s",
  };

  return (
    <>
      <ProductCard details={exampleProduct} />
    </>
  );
}
