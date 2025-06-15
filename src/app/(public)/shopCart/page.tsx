"use client";

import { useSelector, useDispatch } from "react-redux";
import { updateItemQuantity, removeItem } from "@/redux/slices/cartSlice";
import Image from "next/image";
import shopBanner from "@/assets/shapBanner.svg";
import CartItems from "@/components/ShoppingCart/CartItems";
import CartTotal from "@/components/ShoppingCart/CartTotal";
import {
  selectCartItems,
  selectCartTotal,
} from "@/redux/selectors/cartSelectors";
import { CartItem } from "@/redux/slices/cartSlice";

function ShopCartPage() {
  const dispatch = useDispatch();
  const items: CartItem[] = useSelector(selectCartItems);
  const subtotal: number = useSelector(selectCartTotal);
  const shipping = 0; // Assuming free shipping for now
  const total = subtotal + shipping;

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ id, quantity }));
    } else {
      dispatch(removeItem(id));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  return (
    <section className="mt-[18vh] w-full md:mt-[25vh] bg-[#F8FAF7] pb-10">
      <Image src={shopBanner} alt="" />

      <section className="ms-[18vw] w-[70vw] container px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>

        <section className="flex md:flex-row flex-col md:gap-6 md:mt-5">
          <CartItems
            items={items}
            updateQuantity={handleUpdateQuantity}
            removeItem={handleRemoveItem}
          />

          <CartTotal subtotal={subtotal} shipping={shipping} total={total} />
        </section>
      </section>
    </section>
  );
}

export default ShopCartPage;
