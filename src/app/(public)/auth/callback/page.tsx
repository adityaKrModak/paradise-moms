"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AuthCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    console.log("Auth callback: Token received:", !!token);
    console.log("Auth callback: Full token:", token);

    if (token) {
      // Store the token in localStorage
      localStorage.setItem("accessToken", token);
      console.log("Auth callback: Token stored in localStorage");

      // Verify token was stored
      const storedToken = localStorage.getItem("accessToken");
      console.log("Auth callback: Verified stored token:", !!storedToken);

      // Dispatch a custom event to notify AuthInitializer
      window.dispatchEvent(
        new CustomEvent("tokenStored", { detail: { token } })
      );

      // Small delay to allow backend to process the token before redirect
      setTimeout(() => {
        router.push("/");
      }, 500);
    } else {
      // Handle cases where no token is provided
      console.log("Auth callback: No token provided, redirecting to signin");
      router.push("/signin");
    }
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Finalizing authentication, please wait...</p>
    </div>
  );
};

const AuthCallbackPage = () => {
  return (
    <Suspense>
      <AuthCallbackContent />
    </Suspense>
  );
};

export default AuthCallbackPage;
