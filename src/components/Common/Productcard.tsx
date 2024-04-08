import React from "react";
import Image from "next/image";
import addToBag from "@/assets/Addt to Card.svg";
import rating from "@/assets/Rating.svg";

function Productcard({ details }: any) {
  return (
    <div className="bg-white flex flex-col items-center p-3 pe-4 w-[200px] h-[230px] md:w-[210px] md:h-[230px] border">
      <img
        className="w-[110px] h-[110px] mt-2"
        src={details.image}
        alt="item"
      />

      <div className="flex justify-between items-center w-full mt-5">
        <div className="flex flex-col items-start gap-1">
          <span className="text-[14px] text-[#2B572E]">{details.name}</span>
          <span className="text-[12px] font-semibold">
            ₹{details.price}{" "}
            <span className="line-through text-[10px] text-[grey]">₹ 100</span>
          </span>
          <Image className="w-[90px]" src={rating} alt="rating" />
        </div>
        <Image className="w-[35px]" src={addToBag} alt="" />
      </div>
    </div>
  );
}

export default Productcard;
