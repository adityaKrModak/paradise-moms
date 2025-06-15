"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";
import googleIcon from "@/assets/Icons/google.png";

export default function AuthPage() {
  return (
    <div className="h-[95vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md p-8 relative overflow-hidden bg-white/80 backdrop-blur-sm mt-36">
        {/* Decorative leaves */}
        <div className="absolute -top-6 -right-6 text-[#00B517]/10 w-24 h-24 rotate-45">
          <Leaf className="w-full h-full" />
        </div>
        <div className="absolute -bottom-6 -left-6 text-[#00B517]/10 w-24 h-24 -rotate-45">
          <Leaf className="w-full h-full" />
        </div>

        {/* Organic blob shapes */}
        <div className="absolute top-1/2 right-0 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-1/2 left-0 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

        <div className="relative space-y-6">
          <div className="flex items-center justify-center mb-2">
            <Leaf className="w-8 h-8 text-[#00B517]" />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">
              Welcome to Paradise Moms
            </h1>
            <p className="text-green-600">
              Your gateway to natural and organic products
            </p>
          </div>

          <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-[#00B517] hover:bg-[#00B517]/90 text-white px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <Image src={googleIcon} alt="Google" width={20} height={20} />
              <span className="font-medium">Continue with Google</span>
            </motion.button>
          </a>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-green-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-green-600">Secure Login</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <a href="#" className="text-[#00B517] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#00B517] hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
