"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { syncWishlistFromServer } from "@/redux/slices/wishlistSlice";
import { loadWishlistFromStorage } from "@/utils/wishlistPersistence";

export default function WishlistInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load wishlist from localStorage on app initialization
    const savedWishlistItems = loadWishlistFromStorage();
    if (savedWishlistItems.length > 0) {
      dispatch(syncWishlistFromServer(savedWishlistItems));
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
}
