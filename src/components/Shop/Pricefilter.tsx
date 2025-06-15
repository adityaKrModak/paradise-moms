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

function Pricefilter() {
    const [Price, Setprice] = useState<string>("Select Price");
  const priceList = useRef(["200", "300", "500"]);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-between p-1 md:p-2 gap-1 md:gap-2 w-[80px] md:w-[118px] font-[400] mt-2 ms-2 text-[9px] md:text-[13px]  text-[#535353] items-center outline rounded-sm">
          <div>
             {Price}
            </div>
          <Image src={arrow} alt="" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[100px]">
          <DropdownMenuLabel>Prices</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => Setprice("Select Price")}>
          Select Price
          </DropdownMenuItem>
          {priceList.current.map((price, index) => (
            <DropdownMenuItem key={index} onClick={() => Setprice(price)}>
              {price}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Pricefilter
