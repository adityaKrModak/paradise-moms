import Image from "next/image";
import Link from "next/link";
import plant from "@/assets/plant.svg";
import phone from "@/assets/PhoneCall 1.svg";
import like from "@/assets/Heart.svg";
import Search from "@/components/Common/Search";
import Dropdown from "@/components/Common/Dropdown";
import bag from "@/assets/tote-bag.png";
import Navlinks from "./Navlinks";
function Navbar() {
  return (
    <div className="hidden md:block fixed top-0 w-full bg-white z-50">
      <div className="flex items-center justify-around py-3 bg-[#ffff]">
        <div className="flex items-center gap-2">
          <Image src={plant} alt="" />
          <div className="text-2xl font-bold">Paradise Moms</div>
        </div>

        <div className="search">
          <Search />
        </div>

        <div className="flex items-center gap-3 mr-11">
          <Image className="w-[30px]" src={like} alt="" />
          <div className="w-[1.5px]  h-[22px] bg-slate-300"></div>
          <Link href="/shoppingCart">
            <Image className="w-[34px] mb-[4px]" src={bag} alt="bag" />
          </Link>
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
    </div>
  );
}

export default Navbar;
