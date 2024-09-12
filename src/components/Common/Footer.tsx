import React from "react";
import Image from "next/image";
import facebook from "@/assets/social/facebook.svg";
import twitter from "@/assets/social/twitter.svg";
import pinterest from "@/assets/social/pinsert.svg";
import instagram from "@/assets/social/instagram.svg";
import visa from "@/assets/paymentsIcon/Visa.svg";
import mastercard from "@/assets/paymentsIcon/Mastercard.svg";
import securePayments from "@/assets/paymentsIcon/securePayments.svg";

function Footer() {
  return (
    <div className="text-white bg-[#173B1A] pb-5 mt-[10vh]">
      <div className="flex md:flex-row flex-col h-[35vh] justify-center items-center md:items-start md:gap-20 gap-7 ">
        <div className="flex flex-col md:mt-12 mt-[5vh]">
          <h6 className="font-[500] ">About Paradise Moms</h6>
          <p className="text-[#618062] md:w-[30vw] w-[326px] text-xs mt-3">
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
            dui, eget bibendum magna congue nec.
          </p>
          <span className="mt-3 text-sm">
            <span className="border-b">2264654577</span>
            <span className="text-[#618062]"> or </span>
            <span className="border-b">Paradisemoms@gmail.com</span>
          </span>
        </div>

        <div>
          <table className=" border-collapse text-[0.7rem] ms-3 md:ms-1  m-auto md:mt-12 text-[#618062]">
            <thead className="text-white font-[500] text-[16px]">
              <tr>
                <td>My Account</td>
                <td>Helps</td>
                <td>Proxy</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>My Account</td>
                <td>Contact</td>
                <td>About</td>
              </tr>

              <tr>
                <td>Order History</td>
                <td>Faq</td>
                <td>Shop</td>
              </tr>

              <tr>
                <td>Shopping Cart </td>
                <td>Terms & Condition</td>
                <td>Product</td>
              </tr>
              <tr>
                <td>Wishlist</td>
                <td>Privacy Policy</td>
                <td>Track Order</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-[1px] rounded-lg w-[70vw] bg-[#2B572E] m-auto mt-[5vh] md:mt-10"></div>
      <div className="flex md:flex-row flex-col items-center m-auto justify-center md:justify-between gap-3 md:gap-0 w-[80vw] mt-6">
        <div className="flex gap-2">
          <Image className="w-[30px]" src={facebook} alt="" />
          <Image src={twitter} alt="" />
          <Image src={pinterest} alt="" />
          <Image src={instagram} alt="" />
        </div>

        <div className="text-[12px] text-[#618062] w-[350px]">
          Paradise Moms eCommerce © 2021. All Rights Reserved
        </div>

        <div className="flex items-center gap-2">
          <Image className="mt-[6.5px]" src={visa} alt="" />
          <Image src={mastercard} alt="" />
          <Image src={securePayments} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
