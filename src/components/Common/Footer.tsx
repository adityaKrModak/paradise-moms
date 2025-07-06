import Image from "next/image";
import Link from "next/link";
import facebook from "@/assets/social/facebook.svg";
import twitter from "@/assets/social/twitter.svg";
import pinterest from "@/assets/social/pinsert.svg";
import instagram from "@/assets/social/instagram.svg";
import visa from "@/assets/paymentsIcon/Visa.svg";
import mastercard from "@/assets/paymentsIcon/Mastercard.svg";
import securePayments from "@/assets/paymentsIcon/securePayments.svg";

import { Phone, Mail, MapPin, Leaf, Heart, Shield, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  myAccount: [
    { label: "My Account", href: "/account" },
    { label: "Order History", href: "/orders" },
    { label: "Shopping Cart", href: "/cart" },
    { label: "Wishlist", href: "/wishlist" },
  ],
  help: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/story" },
    { label: "Careers", href: "/careers" },
    { label: "Track Order", href: "/track" },
  ],
};

const socialLinks = [
  {
    icon: facebook,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: twitter,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: pinterest,
    href: "https://pinterest.com",
    label: "Pinterest",
  },
  {
    icon: instagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
];

const paymentMethods = [
  { icon: visa, alt: "Visa" },
  { icon: mastercard, alt: "Mastercard" },
  { icon: securePayments, alt: "Secure Payments" },
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
    description: "Premium quality guarantee",
  },
  {
    icon: Heart,
    title: "Family Trusted",
    description: "Loved by 10,000+ families",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-orange-400 rounded-full animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-green-400 rounded-full animate-blob animation-delay-2000"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 shadow-2xl">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold text-white mb-3">
                Stay Fresh with Paradise Moms! 🌱
              </h3>
              <p className="text-orange-100 text-lg max-w-2xl">
                Join our organic family and get exclusive offers, healthy
                recipes, and the latest updates on fresh arrivals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full lg:w-auto max-w-md gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/95 backdrop-blur-sm border-0 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-white h-12 rounded-xl"
              />
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 h-12 rounded-xl font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-200">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative border-b border-green-600/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-green-300 group-hover:text-orange-300 transition-colors duration-300" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-green-200 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Paradise Moms</h3>
                <p className="text-green-300 text-sm">Organic & Natural</p>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed mb-8">
              Your trusted partner for fresh, organic, and locally sourced
              products. We're committed to bringing the best quality food to
              your family's table while supporting sustainable farming
              practices.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-orange-400" />
                </div>
                <Link
                  href="tel:2264654577"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  (226) 465-4577
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-orange-400" />
                </div>
                <Link
                  href="mailto:Paradisemoms@gmail.com"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Paradisemoms@gmail.com
                </Link>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-orange-400" />
                </div>
                <span className="text-green-200">
                  123 Fresh Market St, Organic Valley, ON M5V 3A8
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-8 text-orange-400">
              My Account
            </h4>
            <ul className="space-y-4">
              {footerLinks.myAccount.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-8 text-orange-400">
              Help & Support
            </h4>
            <ul className="space-y-4">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-8 text-orange-400">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative border-t border-green-600/30 bg-green-900/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <span className="text-sm text-green-200 font-medium">
                Follow us:
              </span>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 bg-green-600/20 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
                  aria-label={social.label}
                >
                  <Image
                    src={social.icon || "/placeholder.svg"}
                    alt={social.label}
                    width={20}
                    height={20}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm text-green-200">
                © 2024 Paradise Moms eCommerce. All Rights Reserved
              </p>
              <p className="text-xs text-green-300 mt-1">
                Made with 💚 for organic food lovers
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-green-200 font-medium">
                We accept:
              </span>
              {paymentMethods.map((payment, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <Image
                    src={payment.icon || "/placeholder.svg"}
                    alt={payment.alt}
                    width={32}
                    height={20}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
