"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, logout } from "@/redux/slices/authSlice";
import { useLazyQuery } from "@apollo/client";
import { ME_QUERY } from "@/graphql/queries/user";
import { User } from "@/graphql/generated/graphql";
import { RootState } from "@/redux/rootReducer";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const retryCount = useRef(0);
  const maxRetries = 3;

  const [getMe, { error }] = useLazyQuery<{ me: User }>(ME_QUERY, {
    onCompleted: (data) => {
      retryCount.current = 0; // Reset retry count on success
      if (data && data.me) {
        dispatch(loginSuccess(data.me));
      } else {
        localStorage.removeItem("accessToken");
        dispatch(logout());
      }
    },
    onError: (error) => {
      if (
        (error.message.includes("Invalid token") ||
          error.message.includes("Unauthorized")) &&
        retryCount.current < maxRetries
      ) {
        retryCount.current++;
        console.log(
          `Retrying authentication (${retryCount.current}/${maxRetries}) in 1 second...`
        );

        setTimeout(() => {
          const token = localStorage.getItem("accessToken");
          if (token) {
            console.log("Retrying getMe query...");
            getMe();
          }
        }, 1000);
        return;
      }
      localStorage.removeItem("accessToken");
      dispatch(logout());
    },
    fetchPolicy: "network-only",
  });

  // Initial authentication check on app load
  useEffect(() => {
    // Check multiple possible token keys
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("auth_token") ||
      localStorage.getItem("paradise_moms_token");

    console.log("AuthInitializer: Token found:", !!token);
    console.log("AuthInitializer: Full token:", token);
    console.log(
      "AuthInitializer: localStorage keys:",
      Object.keys(localStorage)
    );

    if (token && !localStorage.getItem("accessToken")) {
      localStorage.setItem("accessToken", token);
    }

    if (token) {
      dispatch(loginStart());
      setTimeout(() => {
        getMe();
      }, 200);
    } else {
      console.log("AuthInitializer: No token, logging out");
      dispatch(logout());
    }
  }, [dispatch, getMe]);

  // Listen for token storage events from auth callback
  useEffect(() => {
    const handleTokenStored = () => {
      console.log(
        "AuthInitializer: Received tokenStored event, re-checking auth"
      );
      const token = localStorage.getItem("accessToken");
      if (token) {
        console.log("AuthInitializer: Token found after event, starting login");
        dispatch(loginStart());
        setTimeout(() => {
          getMe();
        }, 200);
      }
    };

    window.addEventListener("tokenStored", handleTokenStored);

    return () => {
      window.removeEventListener("tokenStored", handleTokenStored);
    };
  }, [dispatch, getMe]);

  useEffect(() => {
    if (error) {
      console.error("Authentication error on getMe query:", error);
    }
  }, [error]);

  return null;
};

export default AuthInitializer;
