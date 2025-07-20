// Wishlist persistence utilities
import type { WishlistState } from "@/redux/slices/wishlistSlice";

const WISHLIST_STORAGE_KEY = "paradise-moms-wishlist";

export const saveWishlistToStorage = (wishlistState: WishlistState) => {
  try {
    const dataToSave = {
      items: wishlistState.items,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error("Failed to save wishlist to localStorage:", error);
  }
};

export const loadWishlistFromStorage = (): WishlistState["items"] => {
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (saved) {
      const parsedData = JSON.parse(saved);

      // Check if data is not too old (optional: expire after 30 days)
      const savedDate = new Date(parsedData.timestamp);
      const now = new Date();
      const daysDiff =
        (now.getTime() - savedDate.getTime()) / (1000 * 3600 * 24);

      if (daysDiff > 30) {
        // Data is too old, clear it
        localStorage.removeItem(WISHLIST_STORAGE_KEY);
        return [];
      }

      return parsedData.items || [];
    }
  } catch (error) {
    console.error("Failed to load wishlist from localStorage:", error);
    // Clear corrupted data
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  }
  return [];
};

export const clearWishlistFromStorage = () => {
  try {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear wishlist from localStorage:", error);
  }
};
