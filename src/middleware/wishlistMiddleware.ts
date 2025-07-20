import { Middleware } from "@reduxjs/toolkit";
import { saveWishlistToStorage } from "@/utils/wishlistPersistence";
import type { RootState } from "@/redux/rootReducer";

// Middleware to automatically save wishlist to localStorage
export const wishlistPersistenceMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    // Save to localStorage after any wishlist action
    if (
      typeof action === "object" &&
      action !== null &&
      "type" in action &&
      typeof action.type === "string" &&
      action.type.startsWith("wishlist/")
    ) {
      const state = store.getState();
      saveWishlistToStorage(state.wishlist);
    }

    return result;
  };
