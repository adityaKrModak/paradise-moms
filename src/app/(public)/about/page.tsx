"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf, Heart, Users, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section with Background Animation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Leaves Animation */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                rotate: 0,
                opacity: 0.7,
              }}
              animate={{
                y: -100,
                rotate: 360,
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            >
              <Leaf className="text-green-300" size={Math.random() * 20 + 10} />
            </motion.div>
          ))}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-transparent to-orange-100/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-green-800 mb-6">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-orange-500">
                Story
              </span>
            </h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Some background animation story about Paradise Moms - where
              tradition meets innovation, and every product tells a story of
              nature's bounty.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Heart className="text-red-500" size={24} />
                <span className="font-semibold text-gray-800">
                  Made with Love
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Leaf className="text-green-500" size={24} />
                <span className="font-semibold text-gray-800">
                  100% Organic
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Users className="text-blue-500" size={24} />
                <span className="font-semibold text-gray-800">
                  Family First
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-600 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* First Content Section - Image Left, Text Right */}
        <motion.section
          className="grid md:grid-cols-2 gap-12 items-center mb-32"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-orange-400 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
              <Image
                src="/placeholder.svg?height=400&width=500&text=Paradise+Moms+Story"
                alt="Paradise Moms Story"
                width={500}
                height={400}
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-6">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-green-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Our Journey Began
            </motion.h2>

            <motion.p
              className="text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              In the heart of India, where tradition runs deep and nature's
              wisdom guides every decision, Paradise Moms was born from a simple
              belief: that eating organic isn't just a trend, it's a return to
              our roots.
            </motion.p>

            <motion.p
              className="text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Founded by mothers who understood the importance of nourishing
              their families with pure, wholesome ingredients, we've dedicated
              ourselves to bringing you nature's finest offerings.
            </motion.p>

            <motion.div
              className="flex items-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Award className="text-orange-500" size={32} />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Certified Organic
                </h4>
                <p className="text-gray-600">
                  Trusted by families across India
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Second Content Section - Text Left, Image Right */}
        <motion.section
          className="grid md:grid-cols-2 gap-12 items-center mb-32"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6 md:order-1">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-green-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Nature's Promise
            </motion.h2>

            <motion.p
              className="text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Every product in our collection tells a story of careful
              cultivation, sustainable farming, and the ancient wisdom passed
              down through generations. We work directly with local farmers who
              share our commitment to organic practices.
            </motion.p>

            <motion.p
              className="text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              From our signature pickles that burst with traditional flavors to
              our carefully curated selection of organic staples, each item is
              chosen with love and tested by our own families.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="text-2xl font-bold text-green-600">500+</h4>
                <p className="text-gray-600">Happy Families</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h4 className="text-2xl font-bold text-orange-600">100%</h4>
                <p className="text-gray-600">Organic Products</p>
              </div>
            </motion.div>
          </div>

          <div className="relative md:order-2">
            <div className="absolute -inset-4 bg-gradient-to-l from-green-400 to-orange-400 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
              <Image
                src="/placeholder.svg?height=400&width=500&text=Organic+Products"
                alt="Organic Products"
                width={500}
                height={400}
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          className="text-center py-20 bg-gradient-to-r from-green-600 to-orange-500 rounded-3xl text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Join Our Family
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Experience the difference that comes from choosing organic,
              choosing tradition, choosing Paradise Moms.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Link href="/products" className="flex items-center gap-2">
                  Shop Now <ArrowRight size={20} />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                <Link
                  href="https://www.instagram.com/paradise_moms/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow Our Journey
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
