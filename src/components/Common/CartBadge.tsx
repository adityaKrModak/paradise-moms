"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";

const CartBadge = () => {
  const cartItemCount = useSelector(
    (state: RootState) => state.cart.items.length
  );

  if (cartItemCount === 0) {
    return null;
  }

  return (
    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
      {cartItemCount > 9 ? "9+" : cartItemCount}
    </span>
  );
};

export default CartBadge;
