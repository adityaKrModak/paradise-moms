'use client'
import Image from 'next/image';
import bg from '@/assets/BG.svg'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
  import Autoplay from "embla-carousel-autoplay"


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
       <div className="object-contain w-full h-full">
        {/* <Image src={bg} className='object-contain w-full h-full' alt=''/> */}
       </div>
        </CarouselItem>




    </CarouselContent>

    </Carousel>

    
    
    </div>
  
)
}

export default Hero
