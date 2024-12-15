"use client";
import React,{useEffect} from "react";
import google from "@/assets/Icons/google.png";
import Image from "next/image";
import { loginSignup } from "../api/auth/callback/google";
import { useRouter } from 'next/router';


function page() {
 


  const handleLogout = () => {
   
  };
  const AuthCallback = () => {
    const router = useRouter();
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      if (token) {
        // Store token in localStorage or state management solution
        localStorage.setItem('accessToken', token);
        // Redirect to dashboard or home page
        router.push('/');
      }
    }, [router]);
    return <div>Loading...</div>;
};
  const handleLoginSignup = async () => {
    await loginSignup();
  };
  return (
    <div className="mt-[28vh] flex mb-12 justify-center items-center">
      <div
        className="m-auto border h-[200px] w-[300px] flex justify-center items-center rounded-sm shadow-md"
      >
        <button onClick={handleLoginSignup} className="bg-[#00B207] gap-3 flex items-center justify-center  rounded-[8px] text-white py-2 px-8 ">
          <Image className="w-[20px]" src={google} alt="" />
          Sign up with Google
        </button>
      </div>
      {/* <button onClick={handleLogout}>Logout</button> */}
     
    </div>
  );
}

export default page;

