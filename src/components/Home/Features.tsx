"use client";
import { useState, useRef } from "react";
import Productcard from "../Common/ProductCard";
import product from "@/data";
function Features() {
  const [selectedItem, setselectedItem] = useState<string>("All");

  //this will be come from backend
  const categoryList = useRef(["Pickles", "Soaps", "item3"]);

  const [allItem, setAllItem] = useState(product);

  const [item, setItem] = useState(allItem);
  // const productList

  const handleselectedItem = (selectedItem: string) => {
    setselectedItem(selectedItem);
    //api call
    // const newProductList = fetch('api call to get list')
    // setItem()
  };

  return (
    <div className="flex-col bg-[#F2F2F2] md:pt-5 w-[100%] pt-8 ">
      <h2 className="font-semibold text-center md:text-2xl text-lg">
        Introducing Our Products
      </h2>

      <div className="flex justify-center items-center gap-3 w-25 text-[#808080]">
        <div className="mt-6 flex gap-3 items-center">
          <div
            onClick={() => handleselectedItem("All")}
            className={
              selectedItem === "All"
                ? "text-[#00B207] md:text-base text-sm"
                : "cursor-pointer md:text-base text-sm"
            }
          >
            All
          </div>
        </div>

        {categoryList.current.map((item, index) => (
          <div key={index} className="mt-6 flex gap-3 items-center">
            <div className="w-[1.5px]  h-[16px] bg-slate-300"></div>
            <div
              onClick={() => handleselectedItem(item)}
              className={
                selectedItem === item
                  ? "text-[#00B207] md:text-base text-sm"
                  : "cursor-pointer text-sm"
              }
            >
              {item}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12  md:mt-8 md:m-auto ms-2 me-2 justify-center  flex flex-wrap md:gap-8 pb-12">
        {item.map((product, index) => (
          <Productcard key={index} />
        ))}
      </div>
    </div>
  );
}

export default Features;
