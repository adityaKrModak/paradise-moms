"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRef, useState } from "react";
import React from "react";
import Image from "next/image";
import menuicon from "@/assets/menu 1.svg";
import downarrow from "@/assets/Chevron Down.svg";
function Dropdown() {
  const [catagory, Setcatagory] = useState<string>("All catagory");
  const categoryList = useRef(["Category 1", "Category 2", "Category 3"]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex pt-1 justify-between items-center outline-none h-[5vh] w-[15vw] gap-2 bg-[#00B207] text-[#F2F2F2] py-1 px-3">
          <Image className="w-[23px]" src={menuicon} alt="" />
          {catagory}
          <Image className="w-[20px]" src={downarrow} alt="" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Different Catagories</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => Setcatagory("All Catagories")}>
            All Catagories
          </DropdownMenuItem>
          {categoryList.current.map((category, index) => (
            <DropdownMenuItem key={index} onClick={() => Setcatagory(category)}>
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Dropdown;
