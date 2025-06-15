"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRef, useState } from "react";
import arrow from "@/assets/down arrow.svg";
function Categoryfilters() {
  const [catagory, Setcatagory] = useState<string>("Select Category");
  const categoryList = useRef(["Category 1", "Category 2", "Category 3"]);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-between p-1 md:p-2 gap-1 md:gap-2 w-[100px] md:w-[145px] font-[400] mt-2 ms-2 text-[9px] md:text-[13px] text-[#535353] items-center outline rounded-sm">
          <div>{catagory}</div>
          <Image src={arrow} alt="" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Catagories</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => Setcatagory("Select Category")}>
            Select Category
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

export default Categoryfilters;
