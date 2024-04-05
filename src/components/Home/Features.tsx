"use client";
import { useState, useRef } from "react";
import Productcard from "./Productcard";
function Features() {
  const [selectedItem, setselectedItem] = useState<string>("All");

  //this will be come from backend
  const categoryList = useRef(["Pickles", "Soaps", "item3"]);

  const [allItem, setAllItem] = useState([
    {
      name: "Cucumber Pickle",
      price: 200,
      rating: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbgSs8WxEmyymSLG2pUhIJpsKpqQ11hrcI2KaZt8Kxg&s",
    },
    {
      name: "Carrot Pickle",
      price: 170,
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc1LZuEVonVMefj874wkctUmcDSKiATpLQSw&s",
    },
    {
      name: "Mango Pickle",
      price: 200,
      rating: 5,
      image: "https://nishamadhulika.com/imgpst/featured/avakaya_pachadi.jpg",
    },
    {
      name: "Lemon Pickle",
      price: 150,
      rating: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT33AFxSGo4RX60ORuejAdcT9lSUiYDoHi4yg&s",
    },
    {
      name: "Neem Soap",
      price: 110,
      rating: 5,
      image:
        "https://manaayurvedam.com/cdn/shop/files/38A5A109-82AA-4A18-8511-E5446CB08736.jpg?v=1695390235",
    },
    {
      name: "Turmeric Soap",
      price: 130,
      rating: 4,
      image:
        "https://puremitti.com/cdn/shop/products/Turmericsoap_b7aba38e-b4a9-4dfb-908d-78394c842989.jpg?v=1696606780&width=1445",
    },
    {
      name: "Sandal Soap",
      price: 150,
      rating: 3,
      image:
        "https://www.rusticart.in/cdn/shop/products/SandalSoap-3_300x300.png?v=1643113530",
    },
    {
      name: "Charcoal Soap",
      price: 160,
      rating: 5,
      image: "https://deyga.in/cdn/shop/files/Charc_800x.png?v=1703270387",
    },
  ]);

  const [item, setItem] = useState(allItem);
  // const productList

  const handleselectedItem = (selectedItem: string) => {
    setselectedItem(selectedItem);
    //api call
    // const newProductList = fetch('api call to get list')
    // setItem()
  };

  return (
    <div className="flex-col text-center bg-[#F2F2F2] pt-5 w-[100%]">
      <h2 className="font-semibold text-2xl">Introducing Our Products</h2>

      <div className="flex justify-center items-center gap-3 w-25 text-[#808080]">
        <div className="mt-6 flex gap-3 items-center">
          <div
            onClick={() => handleselectedItem("All")}
            className={
              selectedItem === "All" ? "text-[#00B207] " : "cursor-pointer"
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
                selectedItem === item ? "text-[#00B207] " : "cursor-pointer"
              }
            >
              {item}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 m-auto grid grid-cols-4 items-center w-[67vw] justify-center pb-12">
        {item.map((product, index) => (
          <Productcard key={index} details={product} />
        ))}
      </div>
    </div>
  );
}

export default Features;
