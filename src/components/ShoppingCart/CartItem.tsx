"use client";
import React from "react";
import { useSelector } from "react-redux";
function CartItem() {
  const items = useSelector((state: any) => state.cart.items);

  return (
    <div className="flex gap-10">
      {items.map((item: any) => (
        <div key={item.id} className="flex gap-6">
          <img className="w-[50px] h-[50px]" src={item.image} alt="" />
          <p>name-{item.name}</p>

          <p>price-{item.price}</p>

          <p>quantity-{item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default CartItem;
