'use client'
import React from 'react'
import BillingForm from '@/components/checkout/BillingForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import {
  selectCartItems,
  selectCartTotal,
} from "@/redux/selectors/cartSelectors";

function CheckoutPage() {
  const items = useSelector(selectCartItems);
  const total: number = useSelector(selectCartTotal);

  return (
    <section className="w-full bg-[#F8FAF7] md:pt-[25vh] md:pb-[10vh]">
      <section className="container flex flex-col md:flex-row md:gap-32 justify-end">
        <BillingForm />
        <OrderSummary items={items} total={total} />
      </section>
    </section>
  );
}

export default CheckoutPage;
