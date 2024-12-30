"use client";

import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import shopBanner from "@/assets/shapBanner.svg";
import ItemsSummaryAndSubTotal from "@/components/shoppingCart/ItemsSummaryAndSubTotal";
import CartTotal from "@/components/shoppingCart/CartTotal";

function Page() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const updateQuantity = (id: string, change: number) => {
    const item = items.find((item: any) => item.id === id);
    if (item) {
      dispatch(addItem({ ...item, quantity: item.quantity + change }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const shipping = "Free";
  const total = subtotal;

  return (
    <section className="mt-[18vh] w-full md:mt-[25vh] bg-[#F8FAF7] pb-10">
      <Image src={shopBanner} alt="" />

      <section className="ms-[18vw] w-[70vw] container px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>

        <section className="flex md:flex-row flex-col md:gap-6 md:mt-5">
          <ItemsSummaryAndSubTotal
            items={items}
            updateQuantity={updateQuantity}
            removeItem={handleRemoveItem}
            total={total}
          />

          <CartTotal
            items={items}
            updateQuantity={updateQuantity}
            removeItem={handleRemoveItem}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </section>
      </section>
    </section>
  );
}

export default Page;
