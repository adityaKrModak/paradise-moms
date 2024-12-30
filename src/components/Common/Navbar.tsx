"use client";
import React, { useState,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import plant from "@/assets/plant.svg";
import phone from "@/assets/PhoneCall 1.svg";
import user from "@/assets/Icons/user.svg";
import Search from "@/components/common/Search";
import Dropdown from "@/components/common/Dropdown";
import bag from "@/assets/tote-bag.png";
import Navlinks from "./Navlinks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogIn, ShoppingBag, User } from 'lucide-react'
import { useSelector } from "react-redux";
function Navbar() {
  const itemsLength = useSelector((state: any) => state.cart.items.length);
  const shouldRenderDiv = itemsLength > 0;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for token client-side
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <nav className="hidden md:block fixed top-0 w-full bg-white z-50">
      <div className="flex items-center justify-around py-3 bg-[#ffff]">
        <div className="flex items-center gap-2">
          <Image src={plant} alt="" />
          <div className="text-2xl font-bold">Paradise Moms</div>
        </div>

        <div className="search">
          <Search />
        </div>

        <div className="flex items-center gap-3 mr-11">
          
           
            {isLoggedIn ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Link href="/loginlogout">
              <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
                <Image className="w-[30px]" src={user} alt="" />
              </Button>
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
       
        </>
      ) : (
        <Link href="/loginlogout">
        <Button 
          variant="ghost" 
          className="text-green-600 hover:text-green-700 gap-2"
        >
          <LogIn className="h-5 w-5" />
          Login / Sign up
        </Button>
        </Link>
      )}
         
          <div className="w-[1.5px]  h-[22px] bg-slate-300"></div>
          <Link href="/shopCart">
            <Image className="w-[34px] mb-[4px]" src={bag} alt="bag" />
          </Link>
          {shouldRenderDiv && (
            <div className="overlay-elementpc">
              <p>{itemsLength}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex ps-[9vw] pt-2 gap-3 justify-between  items-center bg-[#ffff]  ">
        <div className="flex gap-6 justify-between ">
          <Dropdown />

          <Navlinks />
        </div>

        <div className="flex items-center pr-[7vw]">
          <Image className="w-[25px]" src={phone} alt="" />
          &nbsp;1234567890
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
