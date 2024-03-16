"use client";
import Image from "next/image";
import bg from "@/assets/BG.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroProduct from "@/assets/basket.svg";

function Hero() {
  return (
    <div className="w-[100vw] h-[70vh] justify-center flex m-auto bg-[#F2F2F2] pt-4">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem className="basis-1/1">
            <div className="object-contain w-full h-full flex relative">
              <Image
                src={bg}
                className="object-contain w-[100vw] h-[70vh]  "
                alt=""
              />

              <div className="flex justify-start absolute top-1/2 left-1/2 transform -translate-x-[33vw] -translate-y-1/2 w-[75vw] ">
                <Image
                  className="w-[40vw] mr-[5vw]"
                  src={heroProduct}
                  alt="productImage"
                />
                <div className="mt-[6vw] flex-col gap-5 items-start justify-start">
                  <p className="text-[#00B207] mb-3 text-sm">
                    WELCOME TO PARADISE MOMS{" "}
                  </p>
                  <p className="text-5xl font-bold">
                    Fresh & Healthy <br />
                    Organic Food
                  </p>
                  <p className="mt-5 font-[450] text-xl">
                    Sale up to{" "}
                    <span className="text-[#FF8A00] font-semibold text-2xl">
                      30% OFF
                    </span>
                  </p>
                  <p className="mt-1">We deliver, you enjoy</p>
                  <button className="bg-[#00B207] py-2 w-[10vw] mt-6 text-white rounded-2xl">
                    Shop Now {"->"}{" "}
                  </button>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Hero;
