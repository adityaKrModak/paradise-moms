import Image from "next/image";
import React from "react";
import logo from "@/utils/Logo.png";
import phone from "@/utils/PhoneCall 1.svg";
import like from "@/assets/Heart.svg";
import Search from "@/components/Search";
import Dropdown from "@/components/Dropdown";
import bag from "@/assets/tote-bag.png";

function navbar() {
  return (
    <div>
      <div className="flex items-center justify-around py-3 bg-[#ffff]">
        <Image src={logo} alt="" />

        <div className="search">
          <Search />
        </div>

        <div className="flex items-center gap-3 mr-11">
          <Image className="w-[30px]" src={like} alt="" />
          <div className="w-[1.5px]  h-[22px] bg-slate-300"></div>
          <Image className="w-[34px]" src={bag} alt="bag" />
        </div>
      </div>

      <div className="flex  ps-[9vw] gap-3 justify-between items-center bg-[#ffff]  ">
        <div className="flex gap-6 justify-between ">
          <Dropdown />

          <div className="flex gap-8 mt-[7px] text-[#808080]">
            <div>Home</div>
            <div>Shop</div>
            <div>About Us</div>
          </div>
        </div>

        <div className="flex items-center pr-[7vw]">
          <Image className="w-[25px]" src={phone} alt="" />
          1234567890
        </div>
      </div>
    </div>
  );
}

export default navbar;
