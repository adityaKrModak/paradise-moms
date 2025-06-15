"use client";
import React from "react";
import Image from "next/image";
import searchIcon from "@/assets/Search.svg";
import { useState } from "react";

function Search() {
  const [SearchParam, SetSearchParam] = useState<string>("");
  return (
    
    <div className="flex md:bg-[#ffff] md:border-[2px] rounded-md md:h-[7vh] md:w-[28vw] w-[91vw] h-[6vh] ms-4 mt-3 bg-[#EDF2EE]">
      <Image className="w-[20px] ms-2 me-1" src={searchIcon} alt="searchicon" />
      <input
        onChange={(e) => {
          SetSearchParam(e.target.value);
        }}
        className="md:bg-[#ffff] bg-[#EDF2EE] outline-none px-1 md:w-[22vw] w-[74vw]"
        placeholder="Search"
        type="text"
      />
      <button className="bg-[#00B207] translate-x-[1px] h-[6.8vh] -translate-y-[1px] md:w-[8vw] md:block hidden md:ms-0 ms-[35vw] text-[#F2F2F2] px-3 font-[500] md:text-base text-sm">
        Search
      </button>  
    </div>
  );
}

export default Search;
