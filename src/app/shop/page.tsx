import Image from "next/image";
import shopBanner from "@/assets/shapBanner.svg";
import Categoryfilters from "@/components/Shop/Categoryfilters";
import Pricefilter from "@/components/Shop/Pricefilter";
import Ratingfilter from "@/components/Shop/Ratingfilter";
import Productcard from "@/components/Common/Productcard";
import product from "@/data";

export default function Home() {
  return (
    <div className="mt-[18vh] md:mt-[25vh]">
      <Image src={shopBanner} alt="" />

      <div className="flex md:ms-[12vw] gap-2 md:gap-5 mt-4 md:mt-5">
        <Categoryfilters />
        <Pricefilter />
        <Ratingfilter />
      </div>
      <hr className="mt-6 md:mt-8" />

      <div className="mt-12  md:mt-8 md:m-auto ms-2 me-2 md:gap-3 gap-3 grid grid-cols-2 md:grid-cols-4 md:w-[880px] ">
        {product.map((product, index) => (
          <Productcard key={index} details={product} />
        ))}
      </div>
    </div>
  );
}
