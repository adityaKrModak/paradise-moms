import React from "react";
import Image from "next/image";
import Link from "next/link";
import facebook from "@/assets/social/facebook.svg";
import twitter from "@/assets/social/twitter.svg";
import pinterest from "@/assets/social/pinsert.svg";
import instagram from "@/assets/social/instagram.svg";
import visa from "@/assets/paymentsIcon/Visa.svg";
import mastercard from "@/assets/paymentsIcon/Mastercard.svg";
import securePayments from "@/assets/paymentsIcon/securePayments.svg";
import plant from "@/assets/plant.svg";

import { Phone, Mail, MapPin } from "lucide-react";

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

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-800 to-green-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-orange-500">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Fresh with Paradise Moms!
              </h3>
              <p className="text-orange-100">
                Get the latest updates on fresh products and exclusive offers.
              </p>
            </div>
            <div className="flex w-full md:w-auto max-w-md gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white border-0 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-white"
              />
              <Button className="bg-green-700 hover:bg-green-800 text-white px-6 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image src={plant} alt="Paradise Moms" width={32} height={32} />
              <h3 className="text-xl font-bold">Paradise Moms</h3>
            </div>
            <p className="text-green-200 text-sm leading-relaxed mb-6">
              Your trusted partner for fresh, organic, and locally sourced
              products. We&apos;re committed to bringing the best quality food to
              your family&apos;s table.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <Link
                  href="tel:2264654577"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  (226) 465-4577
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <Link
                  href="mailto:Paradisemoms@gmail.com"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Paradisemoms@gmail.com
                </Link>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-green-200">
                  123 Fresh Market St, Organic Valley, ON M5V 3A8
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">
              My Account
            </h4>
            <ul className="space-y-3">
              {footerLinks.myAccount.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">
              Help & Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
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
      <div className="border-t border-green-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-green-200 mr-2">Follow us:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-green-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={20}
                    height={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm text-green-200">
                © 2024 Paradise Moms eCommerce. All Rights Reserved
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-green-200 mr-2">We accept:</span>
              {paymentMethods.map((payment, index) => (
                <div
                  key={index}
                  className="bg-white rounded-md p-2 hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={payment.icon}
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
