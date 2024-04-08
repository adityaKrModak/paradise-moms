import React from "react";
import arrow from "@/assets/arrow.svg";
import Image from "next/image";

function Banners() {
  return (
    <div className="">
      <div className="flex items-center mt-10 justify-center gap-[20px] md:gap-5 pt-5 pb-12 overflow-x-scroll ">
        <div className="banner flex flex-col justify-center bg-cover items-end  w-[350px] h-[160px] rounded-lg p-5">
          <p className="text-sm me-[3vw]">PICKLE SALE</p>
          <p className="text-xl font-[700] mt-1 me-8">
            Organic <br />
            Pickles
          </p>
          <button className="bg-white font-[500] mt-3 text-sm text-[#00B207]  rounded-2xl px-3 flex items-center gap-2 py-1 ">
            Shop Now <Image className="w-[13px] mt-[2px]" src={arrow} alt="" />
          </button>
        </div>
        <div className="banner flex flex-col bg-cover justify-center items-end w-[300px] h-[160px] rounded-lg p-5">
          <p className="text-sm me-[3vw]">PICKLE SALE</p>
          <p className="text-xl font-[700] mt-1 me-8">
            Organic <br />
            Pickles
          </p>
          <button className="bg-white font-[500] mt-3 text-sm text-[#00B207] rounded-2xl px-3 flex items-center gap-2 py-1 ">
            Shop Now <Image className="w-[13px] mt-[2px]" src={arrow} alt="" />
          </button>
        </div>
        <div className="banner1 text-[green] flex bg-cover flex-col justify-center items-end w-[300px] h-[160px] rounded-lg p-5">
          <p className="text-sm me-[3vw]">ORGANIC SOAP</p>
          <p className="text-xl font-[700] mt-1 me-8">
            Organic <br />
            Pickles
          </p>
          <button className="bg-white font-[500] mt-3 text-sm text-[#00B207] rounded-2xl px-3 flex items-center gap-2 py-1 ">
            Shop Now <Image className="w-[13px] mt-[2px]" src={arrow} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banners;
