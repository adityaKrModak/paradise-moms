"use client";
import { useState, useEffect, useRef } from "react";
import { ProductCard } from "../common/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
  type GetProductsQuery,
  type GetCategoriesQuery,
} from "@/graphql/generated/graphql";

type Product = GetProductsQuery["products"][0];
type Category = GetCategoriesQuery["categories"][0];

function Features() {
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
    setCurrentIndex(0); // Reset scroll position when filter changes
  }, [selectedItem, products]);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && filteredProducts.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(0, filteredProducts.length - 4); // Show 4 products at once
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, filteredProducts.length]);

  // Scroll to current index
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 280; // Width of each card + gap
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
      <div className="flex-col bg-gray-50 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (productsError || categoriesError) {
    return (
      <div className="flex-col bg-gray-50 py-16">
        <div className="text-center">
          <p className="text-red-600">
            Error fetching products. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Introducing Our Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our fresh, organic, and locally sourced products
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center items-center gap-1 mb-8 flex-wrap">
          <button
            onClick={() => handleSelectedItem("All")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedItem === "All"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:text-green-600 hover:bg-green-50"
            }`}
          >
            All
          </button>
          {categories.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
              <button
                onClick={() => handleSelectedItem(item.name)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedItem === item.name
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                {item.name}
              </button>
            </div>
          ))}
        </div>

        {/* Products Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {filteredProducts.length > 4 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-green-200 text-green-700 hover:bg-green-50 shadow-lg"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-green-200 text-green-700 hover:bg-green-50 shadow-lg"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {filteredProducts.length > 4 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / 4) },
              (_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / 4) === index
                      ? "bg-green-600 scale-125"
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
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              {isAutoPlaying ? "Pause Auto-scroll" : "Resume Auto-scroll"}
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
    </section>
  );
}

export default Features;
