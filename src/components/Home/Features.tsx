"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Leaf,
  Truck,
  Shield,
  Heart,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
  type GetProductsQuery,
  type GetCategoriesQuery,
} from "@/graphql/generated/graphql";
import ProductCard from "@/components/Common/ProductCard";

type Product = GetProductsQuery["products"][0];
type Category = GetCategoriesQuery["categories"][0];

const features = [
  {
    id: "organic",
    icon: Leaf,
    title: "100% Organic Certified",
    description:
      "All our products are certified organic, grown without harmful pesticides or chemicals.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "No harmful pesticides",
      "Rich in nutrients",
      "Better taste",
      "Environmentally friendly",
    ],
    color: "green",
  },
  {
    id: "delivery",
    icon: Truck,
    title: "Fast & Fresh Delivery",
    description:
      "Same-day delivery for orders placed before 2 PM. Fresh products delivered to your doorstep.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Same-day delivery",
      "Temperature controlled",
      "Contactless delivery",
      "Real-time tracking",
    ],
    color: "orange",
  },
  {
    id: "quality",
    icon: Shield,
    title: "Quality Guarantee",
    description:
      "We guarantee the freshness and quality of our products. Not satisfied? Get a full refund.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Freshness guarantee",
      "Quality checked",
      "Full refund policy",
      "Customer satisfaction",
    ],
    color: "green",
  },
  {
    id: "community",
    icon: Heart,
    title: "Supporting Local Farmers",
    description:
      "We work directly with local organic farmers, ensuring fair prices and sustainable farming.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Fair trade practices",
      "Local community support",
      "Sustainable farming",
      "Direct from farmers",
    ],
    color: "orange",
  },
];

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers", color: "green" },
  { icon: Award, value: "500+", label: "Organic Products", color: "orange" },
  { icon: Truck, value: "50+", label: "Cities Served", color: "green" },
  { icon: Leaf, value: "100%", label: "Organic Certified", color: "orange" },
];

export default function Features() {
  const [selectedItem, setSelectedItem] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useGetProductsQuery();
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();

  useEffect(() => {
    if (productsData?.products) {
      const validProducts = productsData.products.filter(
        (p): p is NonNullable<Product> => p !== null
      );
      setProducts(validProducts);
      setFilteredProducts(validProducts);
    }
  }, [productsData]);

  useEffect(() => {
    if (categoriesData?.categories) {
      const validCategories = categoriesData.categories.filter(
        (c): c is NonNullable<Category> => c !== null
      );
      setCategories(validCategories);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (selectedItem === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product?.categories?.some(
            (category) => category?.name === selectedItem
          )
        )
      );
    }
    setCurrentIndex(0);
  }, [selectedItem, products]);

  useEffect(() => {
    if (isAutoPlaying && filteredProducts.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(0, filteredProducts.length - 4);
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, filteredProducts.length]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 280;
      const scrollPosition = currentIndex * cardWidth;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, filteredProducts.length - 4);
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, filteredProducts.length - 4);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const handleSelectedItem = (selectedItem: string) => {
    setSelectedItem(selectedItem);
    setIsAutoPlaying(false);
  };

  if (productsLoading || categoriesLoading) {
    return (
      <section className="bg-gradient-to-br from-green-50 via-white to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="loading-shimmer rounded-full h-16 w-16 mx-auto mb-6"></div>
            <div className="loading-shimmer h-8 w-64 mx-auto mb-4 rounded-lg"></div>
            <div className="loading-shimmer h-4 w-96 mx-auto rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  if (productsError || categoriesError) {
    return (
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-red-600 mb-4">
              We couldn&apos;t load our amazing products right now.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    // <section className="bg-gradient-to-br from-green-50 via-white to-orange-50 py-20 relative overflow-hidden">
    //   <div className="container mx-auto px-4">
    // {/* Header */}
    // {/* <div className="text-center space-y-4 mb-16">
    //   <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
    //     <Leaf className="w-4 h-4 mr-2" />
    //     Why Choose Us
    //   </Badge>
    //   <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
    //     Pure <span className="text-gradient">Organic Goodness</span>
    //   </h2>
    //   <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
    //     Experience the difference with our premium organic products, sourced
    //     directly from certified organic farms across India.
    //   </p>
    // </div> */}

    // {/* Features Tabs */}
    // {/* <div className="mb-20">
    //   <Tabs
    //     value={activeFeature}
    //     onValueChange={setActiveFeature}
    //     className="w-full"
    //   >
    //     <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 bg-white border border-green-100 rounded-2xl p-2">
    //       {features.map((feature) => (
    //         <TabsTrigger
    //           key={feature.id}
    //           value={feature.id}
    //           className="flex items-center gap-2 px-4 py-3 rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-300"
    //         >
    //           <feature.icon className="w-5 h-5" />
    //           <span className="hidden sm:inline">
    //             {feature.title.split(" ")[0]}
    //           </span>
    //         </TabsTrigger>
    //       ))}
    //     </TabsList>

    //     {features.map((feature) => (
    //       <TabsContent key={feature.id} value={feature.id} className="mt-0">
    //         <Card className="border-green-100 shadow-xl overflow-hidden">
    //           <div className="grid md:grid-cols-2 gap-0">
    //             <div className="relative">
    //               <Image
    //                 src={feature.image || "/placeholder.svg"}
    //                 alt={feature.title}
    //                 width={600}
    //                 height={400}
    //                 className="w-full h-full object-cover"
    //               />
    //               <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
    //             </div>
    //             <CardContent className="p-8 md:p-12 flex flex-col justify-center">
    //               <div className="space-y-6">
    //                 <div className="flex items-center gap-4">
    //                   <div
    //                     className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
    //                       feature.color === "green"
    //                         ? "bg-green-100"
    //                         : "bg-orange-100"
    //                     }`}
    //                   >
    //                     <feature.icon
    //                       className={`w-8 h-8 ${
    //                         feature.color === "green"
    //                           ? "text-green-600"
    //                           : "text-orange-600"
    //                       }`}
    //                     />
    //                   </div>
    //                   <div>
    //                     <h3 className="text-2xl font-bold text-gray-900">
    //                       {feature.title}
    //                     </h3>
    //                     <Badge
    //                       className={`mt-2 ${
    //                         feature.color === "green"
    //                           ? "bg-green-100 text-green-800 border-green-200"
    //                           : "bg-orange-100 text-orange-800 border-orange-200"
    //                       }`}
    //                     >
    //                       Premium Feature
    //                     </Badge>
    //                   </div>
    //                 </div>

    //                 <p className="text-lg text-gray-600 leading-relaxed">
    //                   {feature.description}
    //                 </p>

    //                 <div className="space-y-3">
    //                   {feature.benefits.map((benefit, index) => (
    //                     <div
    //                       key={index}
    //                       className="flex items-center gap-3"
    //                     >
    //                       <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
    //                       <span className="text-gray-700">{benefit}</span>
    //                     </div>
    //                   ))}
    //                 </div>

    //                 <Link href="/products">
    //                   <Button
    //                     className={`${
    //                       feature.color === "green"
    //                         ? "bg-green-600 hover:bg-green-700 shadow-green"
    //                         : "bg-orange-500 hover:bg-orange-600 shadow-orange"
    //                     } text-white px-8 py-3 rounded-xl group`}
    //                   >
    //                     Explore Products
    //                     <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
    //                   </Button>
    //                 </Link>
    //               </div>
    //             </CardContent>
    //           </div>
    //         </Card>
    //       </TabsContent>
    //     ))}
    //   </Tabs>
    // </div> */}

    <section className="bg-gradient-to-br from-green-50 via-white to-orange-50 py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-orange-200 rounded-full opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            FEATURED PRODUCTS
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Our
            <span className="text-gradient block">Premium Collection</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Handpicked organic products from trusted local farmers, bringing you
            the finest quality natural ingredients for a healthier lifestyle.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center items-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-green-100 flex flex-wrap gap-2 max-w-4xl">
            <button
              onClick={() => handleSelectedItem("All")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedItem === "All"
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              All Products
            </button>
            {categories.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelectedItem(item.name)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedItem === item.name
                    ? "bg-green-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {filteredProducts.length > 4 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm border-green-200 text-green-700 hover:bg-green-50 shadow-xl rounded-full"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm border-green-200 text-green-700 hover:bg-green-50 shadow-xl rounded-full"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide px-16 py-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 animate-fadeInUp">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {filteredProducts.length > 4 && (
          <div className="flex justify-center gap-3 mt-12">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / 4) },
              (_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / 4) === index
                      ? "bg-green-600 scale-125 shadow-lg"
                      : "bg-green-200 hover:bg-green-300"
                  }`}
                  onClick={() => {
                    setCurrentIndex(index * 4);
                    setIsAutoPlaying(false);
                  }}
                />
              )
            )}
          </div>
        )}

        {/* Auto-play Control */}
        {filteredProducts.length > 4 && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="border-green-300 text-green-700 hover:bg-green-50 rounded-full px-6"
            >
              {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"} Auto-scroll
            </Button>
          </div>
        )}
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-green-100 text-center group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                    stat.color === "green"
                      ? "bg-green-100 group-hover:bg-green-600"
                      : "bg-orange-100 group-hover:bg-orange-500"
                  }`}
                >
                  <stat.icon
                    className={`w-8 h-8 transition-colors duration-300 ${
                      stat.color === "green"
                        ? "text-green-600 group-hover:text-white"
                        : "text-orange-500 group-hover:text-white"
                    }`}
                  />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    //     {/* Stats Section */}
    //   {/* </div>
    // </section> */}
  );
}
