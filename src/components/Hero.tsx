"use client";
import Image from "next/image";
import bg from "@/assets/BG.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroProduct from "@/assets/Image.svg";

function Hero() {
  return (
    <div className="w-[100vw] h-[70vh] justify-center flex m-auto">
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
                className="object-contain w-[100vw] h-[70vh] "
                alt=""
              />

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-center z-50">
                <Image src={heroProduct} alt="productImage" />
                <h1>slkjdflksejdkfl</h1>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Hero;
