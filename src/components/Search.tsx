"use client";
import React from "react";
import Image from "next/image";
import searchIcon from "@/assets/Search.svg";
import { useState } from "react";

function Search() {
  const [SearchParam, SetSearchParam] = useState<string>("");
  return (
    <div className="flex bg-[#ffff]  border-[2px] rounded-md h-[7vh] w-[28vw]">
      <Image className="w-[20px] ms-2 me-1" src={searchIcon} alt="searchicon" />
      <input
        onChange={(e) => {
          SetSearchParam(e.target.value);
        }}
        className="bg-[#ffff] outline-none px-1 w-[22vw]"
        placeholder="Search"
        type="text"
      />
      <button className="bg-[#00B207] w-[7vw] text-[#F2F2F2]  font-semibold text-sm">
        Search
      </button>
    </div>
  );
}

export default Search;
