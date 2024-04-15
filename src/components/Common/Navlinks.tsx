"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navlinks() {
  const pathname = usePathname();

  return (
    <div className="flex md:flex-row flex-col gap-4 md:gap-8 md:ms-2 mt-[10px] font-[500] text-sm text-[#808080]">
      <Link href="/">
        <div
          className={pathname === "/" ? "text-[#00B207] " : "cursor-pointer"}
        >
          Home
        </div>
      </Link>

      <Link href="/shop">
        <div
          className={
            pathname === "/shop" ? "text-[#00B207] " : "cursor-pointer"
          }
        >
          Shop
        </div>
      </Link>

      <div
        className={pathname === "/about" ? "text-[#00B207] " : "cursor-pointer"}
      >
        About Us
      </div>
    </div>
  );
}

export default Navlinks;
