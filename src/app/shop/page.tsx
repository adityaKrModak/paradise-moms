"use client";
import Image from "next/image";
import shopBanner from "@/assets/shapBanner.svg";
import Categoryfilters from "@/components/shop/Categoryfilters";
import Pricefilter from "@/components/shop/Pricefilter";
import Ratingfilter from "@/components/shop/Ratingfilter";
import ProductCard from "@/components/common/ProductCard";
// import product from "@/data";
import { useGetProductsQuery } from '@/graphql/generated/graphql';

export default function Home() {
  const { data, loading, error } = useGetProductsQuery();
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div className="mt-[18vh] md:mt-[25vh] h-[100vh] ">
      <Image src={shopBanner} alt="" />

      <div className="flex md:ms-[12vw] gap-2 md:gap-5 mt-4 md:mt-5">
        <Categoryfilters />
        <Pricefilter />
        <Ratingfilter />
      </div>
      <hr className="mt-6 md:mt-8" />
      <div className="mt-12  md:mt-8 justify-center  ms-2 me-2 flex flex-wrap md:gap-8 ">
        {data?.products?.map((product, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
}
