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

function Ratingfilter() {
  const [Rating, Setrating] = useState<string>("Select Rating");
  const ratingList = useRef(["3 Star", "4 Star", "5 Star"]);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-between p-1 md:p-2 gap-1 md:gap-2 w-[90px] md:w-[125px] font-[400] mt-2 ms-2 text-[9px] md:text-[13px] text-[#535353] items-center outline rounded-sm">
          <div>{Rating}</div>
          <Image src={arrow} alt="" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ratings</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => Setrating("Select Rating")}>
            Select Rating
          </DropdownMenuItem>
          {ratingList.current.map((Rating, index) => (
            <DropdownMenuItem key={index} onClick={() => Setrating(Rating)}>
              {Rating}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Ratingfilter;
