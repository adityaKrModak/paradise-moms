import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { GetProductsQuery } from "@/graphql/generated/graphql";

type Product = GetProductsQuery["products"][0];

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  currency: string;
  imageUrls: Array<{ url: string; rank: number }>;
  description: string;
  stock: number;
  addedAt: string; // ISO timestamp
}

export interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

// Helper function to convert Product to WishlistItem
const productToWishlistItem = (product: Product): WishlistItem => ({
  id: product.id,
  name: product.name,
  price: product.price,
  currency: product.currency,
  imageUrls: product.imageUrls,
  description: product.description,
  stock: product.stock,
  addedAt: new Date().toISOString(),
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add item to wishlist
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        const wishlistItem = productToWishlistItem(action.payload);
        state.items.unshift(wishlistItem); // Add to beginning for recent-first order
        state.error = null;
      }
    },

    // Remove item from wishlist
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.error = null;
    },

    // Toggle item in wishlist
    toggleWishlistItem: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // Remove if exists
        state.items.splice(existingItemIndex, 1);
      } else {
        // Add if doesn't exist
        const wishlistItem = productToWishlistItem(action.payload);
        state.items.unshift(wishlistItem);
      }
      state.error = null;
    },

    // Clear entire wishlist
    clearWishlist: (state) => {
      state.items = [];
      state.error = null;
    },

    // Move item to cart and remove from wishlist
    moveToCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.error = null;
    },

    // Bulk operations
    addMultipleToWishlist: (state, action: PayloadAction<Product[]>) => {
      action.payload.forEach((product) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (!existingItem) {
          const wishlistItem = productToWishlistItem(product);
          state.items.unshift(wishlistItem);
        }
      });
      state.error = null;
    },

    removeMultipleFromWishlist: (state, action: PayloadAction<number[]>) => {
      state.items = state.items.filter(
        (item) => !action.payload.includes(item.id)
      );
      state.error = null;
    },

    // Loading states
    setWishlistLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setWishlistError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Sync with server (for future backend integration)
    syncWishlistFromServer: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    // Update item details (in case product info changes)
    updateWishlistItem: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<WishlistItem> }>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex] = {
          ...state.items[itemIndex],
          ...action.payload.updates,
        };
      }
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlistItem,
  clearWishlist,
  moveToCart,
  addMultipleToWishlist,
  removeMultipleFromWishlist,
  setWishlistLoading,
  setWishlistError,
  syncWishlistFromServer,
  updateWishlistItem,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
