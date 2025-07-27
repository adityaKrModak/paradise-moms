"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toteBag from "@/assets/tote-bag.png";

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
  Leaf,
  Heart,
  MapPin,
} from "lucide-react";
import { useDispatch } from "react-redux";
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
import { useGetCategoriesQuery } from "@/graphql/generated/graphql";
import dynamic from "next/dynamic";

const CartBadge = dynamic(() => import("./CartBadge"), { ssr: false });
const WishlistBadge = dynamic(() => import("./WishlistBadge"), { ssr: false });

const navigationLinks = [
  { href: "/products", label: "All Products", icon: Package },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/offers", label: "Special Offers", icon: Heart },
  { href: "/recipes", label: "Recipes", icon: Leaf },
  { href: "/about", label: "About Us", icon: UserCircle },
];

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const client = useApolloClient();

  // Fetch categories from GraphQL
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories =
    categoriesData?.categories?.filter((cat) => cat !== null) || [];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    client.resetStore();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100">
      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-green-700 hover:bg-green-50"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0 bg-white">
              <SheetHeader className="p-6 bg-gradient-to-r from-green-600 to-green-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">
                    Paradise Moms
                  </span>
                </div>
              </SheetHeader>

              <div className="flex flex-col h-full">
                {/* Mobile User Section */}
                {isLoading ? (
                  <div className="p-6 border-b border-green-100">
                    <div className="w-8 h-8 animate-pulse bg-green-200 rounded-full mx-auto"></div>
                  </div>
                ) : isAuthenticated ? (
                  <div className="p-6 border-b border-green-100 bg-green-50">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage alt={user?.firstName} />
                        <AvatarFallback className="bg-green-600 text-white text-lg">
                          {user?.firstName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-800 text-lg">
                          {user?.firstName}
                        </p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-green-700 hover:bg-green-100 rounded-xl transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <UserCircle className="h-5 w-5 mr-3" />
                        My Profile
                      </Link>
                      <Link
                        href="/profile/?tab=orders"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-green-700 hover:bg-green-100 rounded-xl transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <Package className="h-5 w-5 mr-3" />
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 border-b border-green-100">
                    <Button
                      onClick={() => {
                        router.push("/signin");
                        setIsOpen(false);
                      }}
                      className="w-full btn-primary"
                    >
                      <LogIn className="h-5 w-5 mr-2" />
                      Sign In / Sign Up
                    </Button>
                  </div>
                )}

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-2">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <link.icon className="h-5 w-5 mr-3" />
                        {link.label}
                      </Link>
                    ))}

                    <Separator className="my-6" />

                    {/* Mobile Categories */}
                    <div className="space-y-2">
                      <h3 className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        Categories
                      </h3>
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/products?category=${encodeURIComponent(
                            category.name
                          )}`}
                          className="flex items-center px-4 py-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          <Leaf className="h-4 w-4 mr-3 text-green-500" />
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Footer */}
                <div className="mt-auto p-6 border-t border-green-100 bg-green-50">
                  <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                    <Phone className="h-4 w-4 mr-2 text-green-600" />
                    +91 9031955563
                  </div>
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    Delivering fresh & organic
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Mobile Logo */}
          <Link href="/" className="flex-1 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-green-700">
                Paradise Moms
              </span>
            </div>
          </Link>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2">
            {!isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/signin")}
                className="text-green-700 hover:bg-green-50"
              >
                <User className="h-6 w-6" />
                <span className="sr-only">Sign In</span>
              </Button>
            )}

            {/* Mobile Wishlist Button */}
            <div className="relative">
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-700 hover:bg-green-50"
                >
                  <Heart className="h-6 w-6" />
                </Button>
              </Link>
              <WishlistBadge />
            </div>

            {/* Mobile Cart Button */}
            <div className="relative">
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-700 hover:bg-green-50"
                >
                  <Image
                    src={toteBag || "/placeholder.svg"}
                    alt="Cart"
                    width={24}
                    height={24}
                  />
                </Button>
              </Link>
              <CartBadge />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search organic products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-green-200 rounded-2xl bg-green-50/70 focus:bg-white focus:border-green-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </form>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        {/* Top Bar */}
        <div className="border-b border-green-100 bg-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 9031955563</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Free delivery on orders above ₹500</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span>🌱 100% Organic Certified</span>
                <span>🚚 Prime Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white/95 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* Desktop Logo */}
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-green-700">
                    Paradise Moms
                  </span>
                  <p className="text-xs text-gray-500 -mt-1">
                    Organic & Natural
                  </p>
                </div>
              </Link>

              {/* Desktop Search */}
              <div className="flex-1 max-w-xl mx-8">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="Search for organic products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 border-green-200 focus:border-green-500 focus:ring-green-500 rounded-xl bg-green-50/50"
                  />
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500" />
                </form>
              </div>

              {/* Desktop Actions */}
              <div className="flex items-center space-x-4">
                {(() => {
                  if (isLoading) {
                    return (
                      <div className="w-8 h-8 animate-pulse bg-green-200 rounded-full"></div>
                    );
                  } else if (isAuthenticated) {
                    console.log("Rendering profile dropdown");
                    return (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="flex items-center gap-3 text-green-700 hover:text-green-800 hover:bg-green-50 rounded-xl px-4 py-2"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage alt={user?.firstName} />
                              <AvatarFallback className="bg-green-600 text-white text-sm">
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
                        <DropdownMenuContent
                          align="end"
                          className="w-64 bg-white border-green-100 shadow-xl rounded-xl"
                        >
                          <DropdownMenuLabel className="p-4">
                            <div>
                              <p className="font-semibold text-gray-800">
                                {user?.firstName}
                              </p>
                              <p className="text-sm text-gray-600 font-normal">
                                {user?.email}
                              </p>
                            </div>
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-green-100" />
                          <DropdownMenuItem asChild>
                            <Link
                              href="/profile"
                              className="flex items-center p-3 hover:bg-green-50"
                            >
                              <UserCircle className="h-4 w-4 mr-3 text-green-600" />
                              My Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/profile/?tab=orders"
                              className="flex items-center p-3 hover:bg-green-50"
                            >
                              <Package className="h-4 w-4 mr-3 text-green-600" />
                              My Orders
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/profile/?tab=settings"
                              className="flex items-center p-3 hover:bg-green-50"
                            >
                              <Settings className="h-4 w-4 mr-3 text-green-600" />
                              Settings
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-green-100" />
                          <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-red-600 focus:text-red-600 focus:bg-red-50 p-3"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            Sign Out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  } else {
                    return (
                      <Button
                        onClick={() => router.push("/signin")}
                        className="btn-primary"
                      >
                        <LogIn className="h-5 w-5 mr-2" />
                        Sign In
                      </Button>
                    );
                  }
                })()}

                <Separator
                  orientation="vertical"
                  className="h-8 bg-green-200"
                />

                {/* Wishlist Button */}
                <div className="relative">
                  <Link href="/wishlist">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-700 hover:bg-green-50 w-12 h-12 rounded-xl"
                    >
                      <Heart className="w-6 h-6" />
                    </Button>
                  </Link>
                  <WishlistBadge />
                </div>

                {/* Cart Button */}
                <div className="relative">
                  <Link href="/cart">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-700 hover:bg-green-50 w-12 h-12 rounded-xl"
                    >
                      <Image
                        src={toteBag || "/placeholder.svg"}
                        alt="Cart"
                        width={28}
                        height={28}
                      />
                    </Button>
                  </Link>
                  <CartBadge />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="bg-green-50/80 backdrop-blur-sm border-t border-green-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              {/* Categories Dropdown */}
              <div className="flex items-center space-x-8">
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-green-700 border-green-300 hover:bg-green-100 rounded-xl px-6 py-2 bg-transparent"
                    >
                      <Menu className="h-4 w-4 mr-2" />
                      All Categories
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-white border-green-100 shadow-xl rounded-xl">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category} asChild>
                        <Link
                          href={`/category/${category
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="flex items-center p-3 hover:bg-green-50"
                        >
                          <Leaf className="h-4 w-4 mr-3 text-green-500" />
                          {category}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu> */}

                {/* Desktop Navigation Links */}
                <nav className="flex items-center space-x-8">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors duration-200 flex items-center gap-2"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Contact Info */}
              <div className="flex items-center text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-xl">
                <Heart className="h-4 w-4 mr-2 text-orange-500" />
                <span className="font-medium">Trusted by 500+ families</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
