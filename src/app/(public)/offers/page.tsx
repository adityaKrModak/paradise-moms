"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Gift,
  Percent,
  Star,
  Heart,
  ArrowLeft,
  Bell,
  Sparkles,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function OffersPage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const upcomingOffers = [
    {
      icon: Percent,
      title: "Seasonal Discounts",
      description: "Up to 30% off on seasonal organic produce",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: Gift,
      title: "Bundle Deals",
      description: "Special combo offers on organic essentials",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Star,
      title: "Loyalty Rewards",
      description: "Earn points with every purchase and get exclusive benefits",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Sparkles,
      title: "Flash Sales",
      description: "Limited-time offers on premium organic products",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 ">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/products">
            <Button
              variant="ghost"
              className="text-green-700 hover:bg-green-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Tag className="w-12 h-12 text-white" />
            </div>

            <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Special Offers
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Amazing deals are on the way! Get ready for exclusive discounts,
              bundle offers, and special promotions on your favorite organic
              products.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {upcomingOffers.map((offer, index) => (
              <Card
                key={index}
                className="border-orange-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${offer.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <offer.icon className={`w-8 h-8 ${offer.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{offer.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Special Preview */}
          <Card className="border-2 border-dashed border-orange-300 bg-gradient-to-r from-orange-50 to-pink-50 mb-12">
            <CardContent className="p-8">
              <Gift className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                First Launch Special
              </h3>
              <p className="text-gray-600 mb-4">
                When we launch, the first 100 customers will get an exclusive
                <span className="font-semibold text-orange-600">
                  {" "}
                  25% discount{" "}
                </span>
                on their first order!
              </p>
              <Badge className="bg-orange-500 text-white">
                Limited Time Only
              </Badge>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card className="border-orange-200 bg-orange-50/50 max-w-md mx-auto">
            <CardContent className="p-8">
              {!isSubscribed ? (
                <>
                  <Bell className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-orange-800 mb-2">
                    Don't Miss Out!
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    Be the first to know about our exclusive offers and deals!
                  </p>
                  <form onSubmit={handleNotifyMe} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
                    />
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                    >
                      Get Exclusive Offers
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-orange-800 mb-2">
                    You're In!
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We'll send you the best deals as soon as they're available.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="mt-12">
            <p className="text-gray-600 mb-6">
              While you wait, check out our current organic products at great
              prices
            </p>
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
