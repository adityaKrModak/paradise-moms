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

 function ProductCard({ product }: ProductCardProps) {
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
        canExpand: true,
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

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className="bg-green-600 text-white border-0 shadow-lg">
            <Leaf className="w-3 h-3 mr-1" />
            Organic
          </Badge>
          <Badge className="bg-orange-500 text-white border-0 shadow-lg">
            15% OFF
          </Badge>
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 group/heart">
          <Heart className="w-5 h-5 text-gray-600 group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-all duration-200" />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white text-green-700 hover:bg-green-50 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            Quick View
          </Button>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-green-700 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Description with Smart Handling */}
        <div className="space-y-2">
          <div
            className={`text-sm text-gray-600 leading-relaxed transition-all duration-300 ${
              isExpanded ? "max-h-none" : "max-h-12 overflow-hidden"
            }`}
          >
            {descriptionDisplay.text}
          </div>

          {/* Read More/Less Button for Expandable Content */}
          {descriptionDisplay.showReadMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
            >
              {isExpanded ? (
                <>
                  <span>Read Less</span>
                  <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  <span>Read More</span>
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}

          {/* Modal Trigger for Very Long Descriptions */}
          {descriptionDisplay.showModal && (
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogTrigger asChild>
                <button className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                  <span>View Details</span>
                  <Info className="w-3 h-3" />
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

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-4 h-4 fill-orange-400 text-orange-400"
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">(4.8)</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">127 reviews</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">
            ₹{price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{originalPrice.toFixed(2)}
          </span>
          <Badge
            variant="outline"
            className="text-xs text-green-600 border-green-200"
          >
            Save ₹{(originalPrice - price).toFixed(2)}
          </Badge>
        </div>

        {/* Product Features */}
        <div className="flex flex-wrap gap-1">
          <Badge
            variant="outline"
            className="text-xs text-gray-600 border-gray-200"
          >
            Fresh
          </Badge>
          <Badge
            variant="outline"
            className="text-xs text-gray-600 border-gray-200"
          >
            Local
          </Badge>
          <Badge
            variant="outline"
            className="text-xs text-gray-600 border-gray-200"
          >
            Premium
          </Badge>
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
export default ProductCard
