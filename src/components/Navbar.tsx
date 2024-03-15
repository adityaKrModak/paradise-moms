

import Image from 'next/image';
import React from 'react'
import logo from "@/utils/Logo.png"
import phone from "@/utils/PhoneCall 1.svg"
import like from "@/assets/Heart.svg"
import searchIcon from "@/assets/Search.svg"
import userIcon from "@/assets/user_3 1.svg"
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown';

  
function navbar() {


  return (
    <div >

       
        <div className="flex items-center justify-around py-3 bg-[#F2F2F2]">

        

      <Image src={logo} alt="" />

      <div className='search'>

        <Search/>



      </div>

      <div className='flex items-center gap-3'>
      <Image className='w-[25px]' src={like} alt="" />
      <div className='w-[1.5px]  h-[22px] bg-slate-300'></div>
  
      </div>
      </div>



        <div className="flex ms-[15vw] gap-3 justify-between items-center bg-[#F2F2F2]  ">



        {/* <Image src={phone} alt="" />1234567890
            <div  className="flex gap-3 justify-center items-center">
        
        <Image src={searchIcon} alt="" />
        <Image src={userIcon} alt="" />
        </div> */}
         <div className="flex gap-6 justify-between ">

         <Dropdown/>
        
        <div className='flex gap-8 mt-1 text-[#808080]'>

        <div>Home</div>
        <div>Shop</div>
        <div>About Us</div>
        </div>

        </div>
        
        <div className='flex items-center'>

        <Image className='w-[25px]' src={phone} alt="" />1234567890
        </div>

        </div>




    </div>
  )
}

export default navbar
