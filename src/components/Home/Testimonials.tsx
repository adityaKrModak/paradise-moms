"use client";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote, Loader2 } from "lucide-react";
import { useGetReviewsQuery } from "@/graphql/generated/graphql";

export default function Testimonials() {
  const { data, loading, error } = useGetReviewsQuery();

  const testimonials = data?.reviews?.slice(0, 3) || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);

  // Scroll to current testimonial
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 320; // Width of each card + gap
      const scrollPosition = currentIndex * cardWidth;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-orange-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  // Generate user initials
  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              What Our Clients Say
            </h2>
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-green-700" />
              <span className="ml-3 text-gray-600">
                Loading testimonials...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              What Our Clients Say
            </h2>
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">
                Could not load testimonials. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-green-50 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers
            have to say about their experience with Paradise Moms.
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Navigation Buttons */}
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

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {testimonials.map((review, index) => (
              <Card
                key={review.id}
                className={`flex-shrink-0 w-80 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  index === currentIndex
                    ? "ring-2 ring-green-200 scale-105"
                    : ""
                }`}
              >
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Quote className="h-6 w-6 text-green-600" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-4">
                    {renderStars(review.rating)}
                  </div>

                  {/* Comment */}
                  <blockquote className="text-gray-700 text-center mb-6 min-h-[80px] flex items-center">
                    <p className="italic leading-relaxed">"{review.comment}"</p>
                  </blockquote>

                  {/* User Info */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3">
                      <Avatar className="h-16 w-16 border-3 border-green-100">
                        <AvatarImage
                          src={undefined}
                          alt={`${review.user.firstName} ${review.user.lastName}`}
                        />
                        <AvatarFallback className="bg-green-100 text-green-700 text-lg font-semibold">
                          {getUserInitials(
                            review.user.firstName,
                            review.user.lastName || ""
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white fill-current" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {review.user.firstName} {review.user.lastName}
                    </h4>
                    <p className="text-sm text-green-600 mb-1">
                      Verified Customer
                    </p>
                    <p className="text-xs text-gray-500">
                      Purchased: {review.product.name}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-green-600 scale-125"
                  : "bg-green-200 hover:bg-green-300"
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>

        {/* Auto-play Control */}
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
