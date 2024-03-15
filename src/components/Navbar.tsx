import Image from 'next/image';
import React from 'react'
import logo from "@/utils/Logo.png"
import phone from "@/utils/PhoneCall 1.svg"
import like from "@/assets/Heart.svg"
import searchIcon from "@/assets/Search.svg"
import userIcon from "@/assets/user_3 1.svg"

  
function navbar() {
  return (
    <div >

       
        <div className="flex items-center justify-around py-3 bg-[#F2F2F2]">

        

      <Image src={logo} alt="" />

      <div className='search'>

      


      </div>

      <div className='flex items-center gap-3'>
      <Image src={like} alt="" />
      <div className='w-[1.5px]  h-[25px] bg-slate-300'></div>
  
      </div>
      </div>



        <div className="flex gap-3 justify-around items-center bg-[#F2F2F2] py-1 ">



        {/* <Image src={phone} alt="" />1234567890
            <div  className="flex gap-3 justify-center items-center">
        
        <Image src={searchIcon} alt="" />
        <Image src={userIcon} alt="" />
        </div> */}
         <div className="flex gap-3 justify-center">

        <div>Home</div>
        <div>Shop</div>
        <div>About Us</div>

        </div>
        
        <div className='flex items-center'>

        <Image className='w-[25px]' src={phone} alt="" />1234567890
        </div>

        </div>




    </div>
  )
}

export default navbar
