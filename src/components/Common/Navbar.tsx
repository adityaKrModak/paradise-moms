"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import plant from "@/assets/plant.svg";
import toteBag from "@/assets/tote-bag.png";
import vegies from "@/assets/vegies.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  Package,
  Phone,
  Search,
  Settings,
  User,
  UserCircle,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { useApolloClient } from "@apollo/client";

const navigationLinks = [
  { href: "/products", label: "All Products" },
  { href: "/offers", label: "Special Offers" },
  { href: "/recipes", label: "Recipes" },
  { href: "/about", label: "About Us" },
];

const categories = [
  "Fresh Vegetables",
  "Organic Fruits",
  "Dairy & Eggs",
  "Bakery Items",
  "Pantry Essentials",
];

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();
  const cartItemCount = useSelector(
    (state: RootState) => state.cart.items.length
  );
  const [isOpen, setIsOpen] = useState(false);
  const client = useApolloClient();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    client.resetStore();
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-green-100">
      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-green-700">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="p-4 border-b border-green-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={plant}
                      alt="Paradise Moms"
                      width={24}
                      height={24}
                    />
                    <span className="text-lg font-bold text-green-700">
                      Paradise Moms
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>
              </SheetHeader>

              <div className="flex flex-col h-full">
                {/* Mobile User Section */}
                {isAuthenticated ? (
                  <div className="p-4 border-b border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage alt={user?.firstName} />
                        <AvatarFallback className="bg-green-100 text-green-700">
                          {user?.firstName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {user?.firstName}
                        </p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <UserCircle className="h-4 w-4 mr-3" />
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Package className="h-4 w-4 mr-3" />
                        My Orders
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="flex items-center w-full px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-b border-green-100">
                    <Button
                      onClick={() => {
                        router.push("/signin"); // For demo - replace with router.push("/signin")
                        setIsOpen(false);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In / Sign Up
                    </Button>
                  </div>
                )}

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-y-auto">
                  <div className="flex flex-col p-4 space-y-1">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center px-3 py-3 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}

                    <Separator className="my-4" />

                    {/* Mobile Categories */}
                    <div className="space-y-1">
                      <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        Categories
                      </h3>
                      {categories.map((category) => (
                        <Link
                          key={category}
                          href={`/category/${category
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="flex items-center px-3 py-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Footer with Contact & Vegies */}
                <div className="mt-auto p-4 border-t border-green-100">
                  <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                    <Phone className="h-4 w-4 mr-2 text-green-600" />
                    +1 (234) 567-890
                  </div>
                  <Image
                    src={vegies}
                    alt="Fresh vegetables"
                    width={140}
                    height={140}
                    className="mx-auto opacity-80"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={plant} alt="Paradise Moms" width={28} height={28} />
            <span className="text-xl font-bold text-green-700">
              Paradise Moms
            </span>
          </Link>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2">
            {!isAuthenticated && (
              <Button
                onClick={() => router.push("/signin")} // For demo - replace with router.push("/signin")
                variant="ghost"
                size="icon"
                className="text-green-700"
              >
                <User className="h-5 w-5" />
              </Button>
            )}
            <div className="relative">
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="text-green-700">
                  <Image src={toteBag} alt="Cart" width={24} height={24} />
                </Button>
              </Link>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search fresh products..."
              className="pl-10 h-10 border-green-200 focus:border-green-500 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        {/* Top Bar */}
        <div className="border-b border-green-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* Desktop Logo */}
              <Link href="/" className="flex items-center gap-3">
                <Image src={plant} alt="Paradise Moms" width={32} height={32} />
                <span className="text-2xl font-bold text-green-700">
                  Paradise Moms
                </span>
              </Link>

              {/* Desktop Search */}
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search fresh products..."
                    className="pl-10 h-11 border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Desktop Actions */}
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 text-green-700 hover:text-green-800 hover:bg-green-50"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage alt={user?.firstName} />
                          <AvatarFallback className="bg-green-100 text-green-700 text-sm">
                            {user?.firstName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden lg:block font-medium">
                          {user?.firstName.split(" ")[0]}
                        </span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div>
                          <p className="font-semibold">{user?.firstName}</p>
                          <p className="text-sm text-gray-600 font-normal">
                            {user?.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <UserCircle className="h-4 w-4 mr-2" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="flex items-center">
                          <Package className="h-4 w-4 mr-2" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    onClick={() => router.push("/signin")} // For demo - replace with router.push("/signin")
                    variant="ghost"
                    className="text-green-700 hover:text-green-800 hover:bg-green-50"
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In / Sign Up
                  </Button>
                )}

                <Separator
                  orientation="vertical"
                  className="h-6 bg-green-200"
                />

                <div className="relative">
                  <Link href="/cart">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-700 hover:bg-green-50"
                    >
                      <Image src={toteBag} alt="Cart" width={28} height={28} />
                    </Button>
                  </Link>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                      {cartItemCount > 9 ? "9+" : cartItemCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="bg-green-50/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              {/* Categories Dropdown */}
              <div className="flex items-center space-x-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-green-700 border-green-300 hover:bg-green-100"
                    >
                      <Menu className="h-4 w-4 mr-2" />
                      All Categories
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category} asChild>
                        <Link
                          href={`/category/${category
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {category}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Desktop Navigation Links */}
                <nav className="flex items-center space-x-6">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Contact Info */}
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-medium">+1 (234) 567-890</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
