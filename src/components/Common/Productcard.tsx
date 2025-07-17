"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/redux/slices/cartSlice";
import type { GetProductsQuery } from "@/graphql/generated/graphql";
import type { RootState } from "@/redux/rootReducer";
import {
  Heart,
  ShoppingCart,
  Star,
  Leaf,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";

type Product = GetProductsQuery["products"][0];

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const isItemInStore = useSelector((state: RootState) =>
    state.cart.items.some((item) => item.id === product.id)
  );

  // State for description expansion
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const price = product.price / 100;
  const originalPrice = price * 1.2;

  // Description handling logic
  const description = product.description || "";
  const SHORT_LIMIT = 80;
  const MEDIUM_LIMIT = 200;
  const LONG_LIMIT = 300;

  const getDescriptionDisplay = () => {
    if (description.length <= SHORT_LIMIT) {
      // Short description - show as is
      return {
        text: description,
        showReadMore: false,
        showModal: false,
        canExpand: false,
      };
    } else if (description.length <= MEDIUM_LIMIT) {
      // Medium description - expandable inline
      return {
        text: isExpanded
          ? description
          : `${description.substring(0, SHORT_LIMIT)}...`,
        showReadMore: true,
        showModal: false,
        canExpanded: true,
      };
    } else if (description.length <= LONG_LIMIT) {
      // Long description - expandable inline with more content
      return {
        text: isExpanded
          ? description
          : `${description.substring(0, SHORT_LIMIT)}...`,
        showReadMore: true,
        showModal: false,
        canExpand: true,
      };
    } else {
      // Very long description - modal only
      return {
        text: `${description.substring(0, SHORT_LIMIT)}...`,
        showReadMore: false,
        showModal: true,
        canExpand: false,
      };
    }
  };

  const descriptionDisplay = getDescriptionDisplay();

  return (
    <Card className="group w-full max-w-sm mx-auto bg-white rounded-lg border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Image
          src={
            product.imageUrls[0]?.url ||
            "/placeholder.svg?height=240&width=300&query=organic+product"
          }
          alt={product.name}
          width={300}
          height={240}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Row: Organic Badge + Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <Badge className="bg-green-600 text-white border-0 text-xs">
            <Leaf className="w-3 h-3 mr-1" />
            Organic
          </Badge>
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 group/heart">
            <Heart className="w-4 h-4 text-gray-600 group-hover/heart:text-red-500 transition-all duration-200" />
          </button>
        </div>

        {/* Bottom: Discount Badge */}
        <Badge className="absolute bottom-3 left-3 bg-orange-500 text-white border-0 text-xs">
          15% OFF
        </Badge>
      </div>

      <CardContent className="p-4">
        {/* Header: Name + Rating in one clean row */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-base leading-tight flex-1 mr-3">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <div className={`text-sm text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
            {descriptionDisplay.text}
          </div>

          {descriptionDisplay.showReadMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-green-600 hover:text-green-700 font-medium mt-1"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}

          {descriptionDisplay.showModal && (
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogTrigger asChild>
                <button className="text-xs text-green-600 hover:text-green-700 font-medium mt-1">
                  View details
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl text-green-800 flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    {product.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative">
                    <Image
                      src={
                        product.imageUrls[0]?.url ||
                        "/placeholder.svg?height=200&width=400&query=organic+product"
                      }
                      alt={product.name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      Product Description
                    </h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">
                        ₹{price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        handleAddCart();
                        setShowModal(false);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {isItemInStore ? "Remove from Cart" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Price Row + Review Count */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">₹{price.toFixed(2)}</span>
            <span className="text-sm text-gray-400 line-through">₹{originalPrice.toFixed(2)}</span>
          </div>
          <span className="text-xs text-gray-500">127 reviews</span>
        </div>


      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className={`w-full h-11 rounded-lg font-medium transition-all duration-300 ${
            isItemInStore
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
          onClick={handleAddCart}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isItemInStore ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}