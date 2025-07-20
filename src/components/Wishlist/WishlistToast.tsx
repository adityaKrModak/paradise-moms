"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WishlistToastProps {
  show: boolean;
  message: string;
  type: "added" | "removed";
  onClose: () => void;
  productName?: string;
}

export default function WishlistToast({
  show,
  message,
  type,
  onClose,
  productName,
}: WishlistToastProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);

    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div
            className={`
            flex items-center gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-sm
            ${
              type === "added"
                ? "bg-green-50/95 border-green-200 text-green-800"
                : "bg-red-50/95 border-red-200 text-red-800"
            }
          `}
          >
            <div
              className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${type === "added" ? "bg-green-100" : "bg-red-100"}
            `}
            >
              {type === "added" ? (
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              ) : (
                <Heart className="w-4 h-4 text-gray-500" />
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium text-sm">
                {type === "added"
                  ? "Added to Wishlist"
                  : "Removed from Wishlist"}
              </p>
              {productName && (
                <p className="text-xs opacity-80 truncate">{productName}</p>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-6 h-6 hover:bg-white/50"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
