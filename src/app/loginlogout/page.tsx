"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/slices/authSlice";
import { logoutSuccess } from "../../../redux/slices/authSlice";
import google from "@/assets/Icons/google.png";
import Image from "next/image";


function page() {
  const dispatch = useDispatch();

  const handleLogin = (e: any) => {
    e.preventDefault();
    const user = { userid: "akljakf123", password: "dsfsad" };
    // Call your authentication API and dispatch loginSuccess action on successful login
    dispatch(loginSuccess(user));
  };
  const handleLogout = () => {
    // Dispatch logoutSuccess action on logout
    dispatch(logoutSuccess());
  };
  return (
    <div className="mt-[28vh] flex mb-12 justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="m-auto border h-[200px] w-[300px] flex justify-center items-center rounded-sm shadow-md"
      >
        <button type="submit" className="bg-[#00B207] gap-3 flex items-center justify-center  rounded-[8px] text-white py-2 px-8 ">
          <Image className="w-[20px]" src={google} alt="" />
          Sign up with Google
        </button>
      </form>
      {/* <button onClick={handleLogout}>Logout</button> */}
     
    </div>
  );
}

export default page;
