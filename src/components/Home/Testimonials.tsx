"use client";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useGetReviewsQuery } from "@/graphql/generated/graphql";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Testimonials() {
  const { data, loading, error } = useGetReviewsQuery();

  const testimonials = data?.reviews?.slice(0, 6) || []; // Show more reviews

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % Math.max(1, testimonials.length - 2)
        );
      }, 5000); // Slower auto-scroll for better readability
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
      const cardWidth = 380; // Increased card width
      const scrollPosition = currentIndex * cardWidth;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    const maxIndex = Math.max(0, testimonials.length - 3);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    const maxIndex = Math.max(0, testimonials.length - 3);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
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

  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  };

  const truncateText = (text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
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
    <section className="bg-gradient-to-br from-gray-50 to-green-50 py-10 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 border-green-200 mb-4">
            Customer Reviews
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Real experiences from real customers who trust Paradise Moms for
            their fresh, organic needs.
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {testimonials.length > 3 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm border-green-200 text-green-700 hover:bg-green-50 shadow-xl h-12 w-12"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm border-green-200 text-green-700 hover:bg-green-50 shadow-xl h-12 w-12"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide px-16 py-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {testimonials.map((review, index) => (
              <Card
                key={review.id}
                className={`flex-shrink-0 w-96 border-green-100 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer ${
                  Math.floor(currentIndex) <= index &&
                  index < Math.floor(currentIndex) + 3
                    ? "ring-2 ring-green-200 scale-105"
                    : "hover:scale-102"
                }`}
              >
                <CardContent className="p-8">
                  {/* Header with Quote and Rating */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                      <Quote className="h-7 w-7 text-green-600" />
                    </div>
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  {/* Comment with Read More */}
                  <div className="mb-8">
                    <blockquote className="text-gray-700 leading-relaxed text-base">
                      <p className="italic">
                        "{truncateText(review.comment || "", 140)}"
                      </p>
                    </blockquote>

                    {review.comment?.length && review.comment.length > 140 && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-3 text-green-600 hover:text-green-700 hover:bg-green-50 p-0 h-auto font-medium"
                          >
                            Read full review
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={undefined}
                                  alt={`${review.user.firstName} ${review.user.lastName}`}
                                />
                                <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                                  {getUserInitials(
                                    review.user.firstName,
                                    review.user.lastName || ""
                                  )}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-gray-800">
                                  {review.user.firstName} {review.user.lastName}
                                </p>
                                <div className="flex gap-1 mt-1">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                            </DialogTitle>
                          </DialogHeader>
                          <div className="mt-6">
                            <blockquote className="text-gray-700 leading-relaxed text-lg italic border-l-4 border-green-200 pl-6">
                              "{review.comment}"
                            </blockquote>
                            <div className="mt-6 pt-6 border-t border-gray-100">
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>
                                  Product:{" "}
                                  <span className="font-medium text-green-600">
                                    {review.product.name}
                                  </span>
                                </span>
                                <span>Verified Purchase</span>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  {/* User Info */}
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
        {testimonials.length > 3 && (
          <div className="flex justify-center gap-3 mt-12">
            {Array.from(
              { length: Math.max(1, testimonials.length - 2) },
              (_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-green-600 scale-125 shadow-lg"
                      : "bg-green-200 hover:bg-green-300 hover:scale-110"
                  }`}
                  onClick={() => handleDotClick(index)}
                />
              )
            )}
          </div>
        )}

        {/* Auto-play Control */}
        {testimonials.length > 3 && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="border-green-300 text-green-700 hover:bg-green-50 shadow-md"
            >
              {isAutoPlaying ? "Pause Auto-scroll" : "Resume Auto-scroll"}
            </Button>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-green-600 fill-current" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">4.9/5 Rating</h3>
            <p className="text-gray-600 text-sm">Based on 500+ reviews</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Quote className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">100% Verified</h3>
            <p className="text-gray-600 text-sm">
              All reviews from real customers
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <ExternalLink className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Trusted Platform
            </h3>
            <p className="text-gray-600 text-sm">Secure and reliable service</p>
          </div>
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
