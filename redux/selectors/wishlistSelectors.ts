import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../rootReducer";

// Basic selectors
export const selectWishlistState = (state: RootState) => state.wishlist;
export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistLoading = (state: RootState) =>
  state.wishlist.isLoading;
export const selectWishlistError = (state: RootState) => state.wishlist.error;

// Memoized selectors
export const selectWishlistCount = createSelector(
  [selectWishlistItems],
  (items) => items.length
);

export const selectWishlistTotal = createSelector(
  [selectWishlistItems],
  (items) => items.reduce((total, item) => total + item.price / 100, 0)
);

export const selectIsItemInWishlist = createSelector(
  [selectWishlistItems, (state: RootState, productId: number) => productId],
  (items, productId) => items.some((item) => item.id === productId)
);

export const selectWishlistItemById = createSelector(
  [selectWishlistItems, (state: RootState, productId: number) => productId],
  (items, productId) => items.find((item) => item.id === productId)
);

export const selectRecentWishlistItems = createSelector(
  [selectWishlistItems],
  (items) => items.slice(0, 5) // Get 5 most recent items
);

export const selectWishlistItemsSortedByPrice = createSelector(
  [selectWishlistItems],
  (items) => [...items].sort((a, b) => a.price - b.price)
);

export const selectWishlistItemsSortedByName = createSelector(
  [selectWishlistItems],
  (items) => [...items].sort((a, b) => a.name.localeCompare(b.name))
);

export const selectWishlistItemsSortedByDate = createSelector(
  [selectWishlistItems],
  (items) =>
    [...items].sort(
      (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    )
);

export const selectOutOfStockWishlistItems = createSelector(
  [selectWishlistItems],
  (items) => items.filter((item) => item.stock === 0)
);

export const selectInStockWishlistItems = createSelector(
  [selectWishlistItems],
  (items) => items.filter((item) => item.stock > 0)
);

export const selectWishlistStats = createSelector(
  [selectWishlistItems],
  (items) => ({
    totalItems: items.length,
    totalValue: items.reduce((total, item) => total + item.price / 100, 0),
    inStockItems: items.filter((item) => item.stock > 0).length,
    outOfStockItems: items.filter((item) => item.stock === 0).length,
    averagePrice:
      items.length > 0
        ? items.reduce((total, item) => total + item.price / 100, 0) /
          items.length
        : 0,
  })
);
