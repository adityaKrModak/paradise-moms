import React from "react";
import Image from "next/image";
import colon from "@/assets/colon.svg";
import customer from "@/assets/customer.png";
import video from "@/assets/Video.svg";
function Testimonials() {
  return (
    <div className="">
      <div className="bg-[#F2F2F2] flex flex-col items-center md:h-[55vw]">
        <h2 className="mt-10 font-bold text-2xl">What our Clients Says</h2>

        <div className="flex md:flex-row flex-col justify-evenly mt-8 gap-8">
          <div className="w-[330px] h-[165px] bg-white mt-6 md:mt-1 flex flex-col p-4 rounded-lg items-center ">
            <Image className="mt-2 w-[30px]" src={colon} alt="" />
            <p className="text-xs mt-5 m-auto ms-3 text-[#406B42]">
              “Aenean et nisl eget eros consectetur vestibulum vel id erat.
              Aliquam feugiat massa dui. Sed sagittis diam sit amet ante sodales
              semper. Aliquam commodo lorem laoreet ultricies ele. ”
            </p>
            <div className=" flex flex-col items-center mt-8 md:mt-12">
              <Image src={customer} alt="" />
              <p className="mt-2 text-sm">Joe biden</p>
              <p className="text-[#618062] text-xs">customer</p>
            </div>
          </div>
          <div className="w-[330px] h-[165px] bg-white flex flex-col mt-28 md:mt-1 p-4 rounded-lg items-center ">
            <Image className="mt-2 w-[30px]" src={colon} alt="" />
            <p className="text-xs mt-5 m-auto ms-3 text-[#406B42]">
              “Aenean et nisl eget eros consectetur vestibulum vel id erat.
              Aliquam feugiat massa dui. Sed sagittis diam sit amet ante sodales
              semper. Aliquam commodo lorem laoreet ultricies ele. ”
            </p>
            <div className=" flex flex-col items-center mt-8 md:mt-12">
              <Image src={customer} alt="" />
              <p className="mt-2 text-sm">Joe biden</p>
              <p className="text-[#618062] text-xs">customer</p>
            </div>
          </div>
          <div className="w-[330px] h-[165px] bg-white flex flex-col mt-28 md:mt-1 p-4 rounded-lg items-center ">
            <Image className="mt-2 w-[30px]" src={colon} alt="" />
            <p className="text-xs mt-5 m-auto ms-3 text-[#406B42]">
              “Aenean et nisl eget eros consectetur vestibulum vel id erat.
              Aliquam feugiat massa dui. Sed sagittis diam sit amet ante sodales
              semper. Aliquam commodo lorem laoreet ultricies ele. ”
            </p>
            <div className=" flex flex-col items-center mt-8 md:mt-12">
              <Image src={customer} alt="" />
              <p className="mt-2 text-sm">Joe biden</p>
              <p className="text-[#618062] text-xs">customer</p>
            </div>
          </div>
        </div>

        <Image className="md:w-[55vw] w-[350px] mt-[9vh] translate-y-24 md:translate-y-0  md:mt-[38vh]" src={video} alt="" />
      </div>
    </div>
  );
}

export default Testimonials;
