"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, logout } from "@/redux/slices/authSlice";
import { useLazyQuery } from "@apollo/client";
import { ME_QUERY } from "@/graphql/queries/user";
import { User } from "@/graphql/generated/graphql";
import { RootState } from "@/redux/rootReducer";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const [getMe, { error }] = useLazyQuery<{ me: User }>(ME_QUERY, {
    onCompleted: (data) => {
      if (data && data.me) {
        dispatch(loginSuccess(data.me));
      } else {
        dispatch(logout());
      }
    },
    onError: () => {
      dispatch(logout());
    },
    fetchPolicy: "network-only",
  });

  // Initial authentication check on app load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(loginStart());
      getMe();
    } else {
      dispatch(logout());
    }
  }, [dispatch, getMe]);

  // Listen for loginStart actions and trigger getMe query
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (isLoading && token) {
      getMe();
    }
  }, [isLoading, getMe]);

  useEffect(() => {
    if (error) {
      console.error("Authentication error on getMe query:", error);
    }
  }, [error]);

  return null;
};

export default AuthInitializer;
