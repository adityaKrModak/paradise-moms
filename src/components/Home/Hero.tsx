"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ArrowRight,
  Leaf,
  Truck,
  Shield,
  Star,
  Play,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const heroSlides = [
  {
    id: 1,
    title: "Fresh Organic Vegetables",
    subtitle: "Farm to Table Excellence",
    description:
      "Discover the finest selection of organic vegetables, grown with love and harvested at peak freshness for your family's health.",
    image: "/placeholder.svg?height=600&width=800",
    cta: "Shop Vegetables",
    badge: "100% Organic",
    color: "green",
  },
  {
    id: 2,
    title: "Premium Organic Fruits",
    subtitle: "Nature's Sweet Bounty",
    description:
      "Indulge in our handpicked organic fruits, bursting with natural flavors and packed with essential nutrients.",
    image: "/placeholder.svg?height=600&width=800",
    cta: "Shop Fruits",
    badge: "Pesticide Free",
    color: "orange",
  },
  {
    id: 3,
    title: "Artisan Organic Products",
    subtitle: "Crafted with Care",
    description:
      "Explore our curated collection of artisan organic products, from herbs and spices to specialty items.",
    image: "/placeholder.svg?height=600&width=800",
    cta: "Explore Collection",
    badge: "Locally Sourced",
    color: "green",
  },
];

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "Certified organic products",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders above ₹500",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Fresh guarantee or refund",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Hand-picked selection",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pb-16 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeInLeft pt-4">
            {/* Badge */}
            <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium">
              <Leaf className="w-4 h-4 mr-2" />
              {heroSlides[currentSlide].badge}
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                {heroSlides[currentSlide].title
                  .split(" ")
                  .slice(0, 1)
                  .join(" ")}
                <br />
                <span className="text-gradient">
                  {heroSlides[currentSlide].title.split(" ").slice(1).join(" ")}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-green-600 font-medium">
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              {heroSlides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/products" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-2xl shadow-green group">
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg rounded-2xl group bg-transparent"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Story
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center pt-8">
              <div>
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Organic</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="relative animate-fadeInRight w-full">
            <div className="relative">
              <Carousel
                className="w-full max-w-2xl mx-auto"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <CarouselContent>
                  {heroSlides.map((slide, index) => (
                    <CarouselItem key={slide.id}>
                      <Card className="border-0 shadow-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-0">
                          <div className="relative aspect-[4/3]">
                            <Image
                              src={slide.image || "/placeholder.svg"}
                              alt={slide.title}
                              width={800}
                              height={600}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                            {/* Floating Elements */}
                            <div className="absolute top-6 right-6">
                              <Badge
                                className={`${
                                  slide.color === "green"
                                    ? "bg-green-600"
                                    : "bg-orange-500"
                                } text-white shadow-lg`}
                              >
                                Premium Quality
                              </Badge>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="font-semibold text-gray-900">
                                      Fresh Daily
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      Delivered to your door
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className="w-4 h-4 fill-orange-400 text-orange-400"
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/80 backdrop-blur-sm border-green-200 text-green-600 hover:bg-green-50" />
                <CarouselNext className="right-4 bg-white/80 backdrop-blur-sm border-green-200 text-green-600 hover:bg-green-50" />
              </Carousel>

              {/* Slide Indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-green-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-green-100 hover:shadow-lg transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToProducts}
            className="flex flex-col items-center gap-2 text-green-600 hover:text-green-700 transition-colors duration-300 group"
          >
            <span className="text-sm font-medium">Explore Products</span>
            <ChevronDown className="w-6 h-6 animate-bounce group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div> */}
      </div>
    </section>
  );
}
