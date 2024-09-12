import Image from "next/image";
import shopBanner from "@/assets/shapBanner.svg";
import Categoryfilters from "@/components/Shop/Categoryfilters";
import Pricefilter from "@/components/Shop/Pricefilter";
import Ratingfilter from "@/components/Shop/Ratingfilter";
import ProductCard from "@/components/Common/ProductCard";
import product from "@/data";

export default function Home() {
  //list of cart items added
  return (
    <div className="mt-[18vh] md:mt-[25vh]">
      <Image src={shopBanner} alt="" />

      <div className="flex md:ms-[12vw] gap-2 md:gap-5 mt-4 md:mt-5">
        <Categoryfilters />
        <Pricefilter />
        <Ratingfilter />
      </div>
      <hr className="mt-6 md:mt-8" />

      {/* <div className="mt-12  md:mt-8 md:mx-16 ms-2 me-2 md:gap-6 gap-4 grid grid-cols-2 md:grid-cols-4  ">
        {product.map((product, index) => (
          <ProductCard key={index} />
        ))}
      </div> */}

      
      <div className="mt-12  md:mt-8 justify-center  ms-2 me-2 flex flex-wrap md:gap-8">
        {product.map((product, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
}
