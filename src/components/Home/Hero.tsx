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
import arrow from "@/assets/arrrowWhite.svg"

function Hero() {
  return (
    <div className="md:w-[100%] md:h-[75vh] justify-center flex m-auto bg-[#ffff] h-auto mt-32 md:mt-36 md:pt-1 md:pb-1 pb-6">
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
                className="object-contain md:w-[100vw] md:h-[70vh] w-[100vw] h-[45vw]"
                alt=""
              />

              <div className="flex justify-start absolute top-1/2 left-1/2 transform -translate-x-[33vw] -translate-y-1/2 w-[80vw] ">
                <Image
                  className="w-[40vw] mr-[5vw]"
                  src={heroProduct}
                  alt="productImage"
                />
                <div className="mt-[4vw] flex-col gap-5 items-start justify-start">
                  <p className="text-[#00B207] mb-3 md:text-sm text-[8px]">
                    WELCOME TO PARADISE MOMS{" "}
                  </p>
                  <p className="md:text-5xl font-bold">
                    Fresh & Healthy <br />
                    Organic Food
                  </p>
                  <p className="md:mt-5 font-[450] md:text-xl text-sm">
                    Sale up to{" "}
                    <span className="text-[#FF8A00] font-semibold md:text-2xl">
                      30% OFF
                    </span>
                  </p>
                  <p className="mt-1 md:text-lg text-xs">
                    We deliver, you enjoy
                  </p>
                  <button className="bg-[#00B207] justify-center md:gap-4 gap-2 flex py-2 md:w-[150px] md:text-lg text-[8px] px-3 items-center mt-6 text-white rounded-2xl">
                    Shop Now <Image className="md:w-auto w-[10px]" src={arrow} alt=""/>
                  </button>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/1">
            <div className="object-contain w-full h-full flex relative">
              <Image
                src={bg}
                className="object-contain md:w-[100vw] md:h-[70vh] w-[100vw] h-[45vw]"
                alt=""
              />

              <div className="flex justify-start absolute top-1/2 left-1/2 transform -translate-x-[33vw] -translate-y-1/2 w-[80vw] ">
                <Image
                  className="w-[40vw] mr-[5vw]"
                  src={heroProduct}
                  alt="productImage"
                />
                <div className="mt-[4vw] flex-col gap-5 items-start justify-start">
                  <p className="text-[#00B207] mb-3 md:text-sm text-[8px]">
                    WELCOME TO PARADISE MOMS{" "}
                  </p>
                  <p className="md:text-5xl font-bold">
                    Fresh & Healthy <br />
                    Organic Food
                  </p>
                  <p className="md:mt-5 font-[450] md:text-xl text-sm">
                    Sale up to{" "}
                    <span className="text-[#FF8A00] font-semibold md:text-2xl">
                      30% OFF
                    </span>
                  </p>
                  <p className="mt-1 md:text-lg text-xs">
                    We deliver, you enjoy
                  </p>
                  <button className="bg-[#00B207] justify-center md:gap-4 gap-2 flex py-2 md:w-[150px] md:text-lg text-[8px] px-3 items-center mt-6 text-white rounded-2xl">
                    Shop Now <Image className="md:w-auto w-[10px]" src={arrow} alt=""/>
                  </button>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/1">
            <div className="object-contain w-full h-full flex relative">
              <Image
                src={bg}
                className="object-contain md:w-[100vw] md:h-[70vh] w-[100vw] h-[45vw]"
                alt=""
              />

              <div className="flex justify-start absolute top-1/2 left-1/2 transform -translate-x-[33vw] -translate-y-1/2 w-[80vw] ">
                <Image
                  className="w-[40vw] mr-[5vw]"
                  src={heroProduct}
                  alt="productImage"
                />
                <div className="mt-[4vw] flex-col gap-5 items-start justify-start">
                  <p className="text-[#00B207] mb-3 md:text-sm text-[8px]">
                    WELCOME TO PARADISE MOMS{" "}
                  </p>
                  <p className="md:text-5xl font-bold">
                    Fresh & Healthy <br />
                    Organic Food
                  </p>
                  <p className="md:mt-5 font-[450] md:text-xl text-sm">
                    Sale up to{" "}
                    <span className="text-[#FF8A00] font-semibold md:text-2xl">
                      30% OFF
                    </span>
                  </p>
                  <p className="mt-1 md:text-lg text-xs">
                    We deliver, you enjoy
                  </p>
                  <button className="bg-[#00B207] justify-center md:gap-4 gap-2 flex py-2 md:w-[150px] md:text-lg text-[8px] px-3 items-center mt-6 text-white rounded-2xl">
                    Shop Now <Image className="md:w-auto w-[10px]" src={arrow} alt=""/>
                  </button>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/1">
            <div className="object-contain w-full h-full flex relative">
              <Image
                src={bg}
                className="object-contain md:w-[100vw] md:h-[70vh] w-[100vw] h-[45vw]"
                alt=""
              />

              <div className="flex justify-start absolute top-1/2 left-1/2 transform -translate-x-[33vw] -translate-y-1/2 w-[80vw] ">
                <Image
                  className="w-[40vw] mr-[5vw]"
                  src={heroProduct}
                  alt="productImage"
                />
                <div className="mt-[4vw] flex-col gap-5 items-start justify-start">
                  <p className="text-[#00B207] mb-3 md:text-sm text-[8px]">
                    WELCOME TO PARADISE MOMS{" "}
                  </p>
                  <p className="md:text-5xl font-bold">
                    Fresh & Healthy <br />
                    Organic Food
                  </p>
                  <p className="md:mt-5 font-[450] md:text-xl text-sm">
                    Sale up to{" "}
                    <span className="text-[#FF8A00] font-semibold md:text-2xl">
                      30% OFF
                    </span>
                  </p>
                  <p className="mt-1 md:text-lg text-xs">
                    We deliver, you enjoy
                  </p>
                  <button className="bg-[#00B207] justify-center md:gap-4 gap-2 flex py-2 md:w-[11vw] md:text-lg text-[8px] px-3 items-center mt-6 text-white rounded-2xl">
                    Shop Now <Image className="md:w-auto w-[10px]" src={arrow} alt=""/>
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
