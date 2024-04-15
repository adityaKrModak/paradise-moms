import React from "react";
import Image from "next/image";
import shopBanner from "@/assets/shapBanner.svg";
import CartItem from "@/components/ShoppingCart/CartItem";

function page() {
  return (
    <div className="mt-[18vh] md:mt-[25vh] bg-[#E6E6E6] pb-10">
      <Image src={shopBanner} alt="" />

      <center>
        <h2 className="mt-5 font-semibold">My Shopping Cart</h2>
      </center>

      <div className="card mt-5 ms-8 border w-[350px] flex flex-col items-center rounded-lg h-[300px] bg-white">
       <CartItem/>
      </div>
    </div>
  );
}

export default page;
