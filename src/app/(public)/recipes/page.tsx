"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  ChefHat,
  Clock,
  Users,
  Heart,
  ArrowLeft,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RecipesPage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const upcomingFeatures = [
    {
      icon: ChefHat,
      title: "Organic Recipe Collection",
      description: "Curated recipes using our fresh organic ingredients",
    },
    {
      icon: Clock,
      title: "Quick & Healthy Meals",
      description: "15-minute recipes for busy families",
    },
    {
      icon: Users,
      title: "Community Recipes",
      description: "Share and discover recipes from other Paradise Moms",
    },
    {
      icon: Heart,
      title: "Nutritional Guides",
      description:
        "Health benefits and nutritional information for each recipe",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 ">
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
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChefHat className="w-12 h-12 text-white" />
            </div>

            <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-4">
              <Leaf className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
              Organic Recipes
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              We're cooking up something special! Get ready for delicious,
              healthy recipes using fresh organic ingredients from Paradise
              Moms.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {upcomingFeatures.map((feature, index) => (
              <Card
                key={index}
                className="border-green-100 hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <Card className="border-green-200 bg-green-50/50 max-w-md mx-auto">
            <CardContent className="p-8">
              {!isSubscribed ? (
                <>
                  <Bell className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Get Notified
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    Be the first to know when our recipe collection launches!
                  </p>
                  <form onSubmit={handleNotifyMe} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none"
                    />
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Notify Me
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We'll notify you as soon as our recipes are ready to share.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="mt-12">
            <p className="text-gray-600 mb-6">
              In the meantime, explore our fresh organic products
            </p>
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Shop Organic Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
