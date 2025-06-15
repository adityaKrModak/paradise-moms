"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginStart } from "@/redux/slices/authSlice";

const AuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // Store the token in localStorage
      localStorage.setItem("accessToken", token);

      // Dispatch loginStart to trigger the getMe query in AuthInitializer
      dispatch(loginStart());

      // Redirect to the homepage
      router.push("/");
    } else {
      // Handle cases where no token is provided
      router.push("/signin");
    }
  }, []); // Run only once on component mount

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Finalizing authentication, please wait...</p>
    </div>
  );
};

export default AuthCallbackPage;
