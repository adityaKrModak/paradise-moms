"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import burgerIcon from "@/assets/burger icon.svg";
import plant from "@/assets/plant.svg";
import like from "@/assets/Heart.svg";
import bag from "@/assets/tote-bag.png";
import Search from "@/components/Common/Search";
import cross from "@/assets/Icons/close.png";
import vegies from "@/assets/vegies.svg";
import veggies2 from "@/assets/veggies2.svg";

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setShowContent(true);
      }, 600);
    } else {
      setShowContent(false);
    }
  };
  return (
    <div className="block md:hidden">
      <div className="fixed  bg-white w-full top-0 z-30 pb-2">
        <div className="flex bg-white justify-between items-center mt-4 w-full ">
          <Image
            onClick={toggleSidebar}
            className="w-[10vw] ms-4 rounded-[5px]"
            src={burgerIcon}
            alt=""
          />

          <div className="flex me-[60px] gap-2 items-center justify-center">
            <Image className="w-[6vw] " src={plant} alt="" />
            <div className="text-[16px] font-bold ">Paradise Moms</div>
          </div>

          <div className="flex items-center gap-3 me-4">
            <Image className="w-[30px]" src={like} alt="" />
            <div className="w-[1.5px]  h-[22px] bg-slate-400"></div>
            <Image className="w-[34px] mb-[4px]" src={bag} alt="bag" />
          </div>
        </div>

        <Search />
      </div>
      <div
        className={`fixed top-0 left-0 h-full z-50 bg-[#ffff] text-[#808080] transition-all duration-500 ease-in delay-100 ${
          isOpen ? "w-60" : "w-0"
        }`}
      >
        {/* Sidebar Content */}
        {isOpen && showContent && (
          <div className="p-3 pt-4 flex flex-col border-green-400">
            <div className="mb-4 flex gap-2">
              <div className="flex gap-1 mt-2">
                <Image className="w-[6vw] " src={plant} alt="" />
                <div className="text-[16px] font-bold mt-[1px]">
                  Paradise Moms
                </div>
              </div>
              <Image
                onClick={toggleSidebar}
                className="w-[16px] h-[16px] translate-x-9 -translate-y-2"
                src={cross}
                alt="cross"
              />
            </div>
            <hr className="h-1" />
            <div className="flex flex-col mt-4 gap-2">
              <p>Home</p>
              <p>Shop</p>
              <p>About Us</p>
            </div>
            <Image
              className="translate-y-[50vh] -translate-x-[3vw]"
              src={vegies}
              alt=""
            />
            {/* <Image className="translate-y-[40vh]" src={veggies2} alt="" /> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileNavbar;
