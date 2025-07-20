import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import type { RootState } from "@/redux/rootReducer";
import type { GetProductsQuery } from "@/graphql/generated/graphql";
import {
  addToWishlist,
  removeFromWishlist,
  toggleWishlistItem,
  clearWishlist,
  moveToCart,
  addMultipleToWishlist,
  removeMultipleFromWishlist,
} from "@/redux/slices/wishlistSlice";
import { addItem as addToCart } from "@/redux/slices/cartSlice";
import {
  selectWishlistItems,
  selectWishlistCount,
  selectWishlistTotal,
  selectIsItemInWishlist,
  selectWishlistLoading,
  selectWishlistError,
  selectWishlistStats,
  selectRecentWishlistItems,
  selectInStockWishlistItems,
  selectOutOfStockWishlistItems,
} from "@/redux/selectors/wishlistSelectors";

type Product = GetProductsQuery["products"][0];

export const useWishlist = () => {
  const dispatch = useDispatch();

  // Selectors
  const items = useSelector(selectWishlistItems);
  const count = useSelector(selectWishlistCount);
  const total = useSelector(selectWishlistTotal);
  const isLoading = useSelector(selectWishlistLoading);
  const error = useSelector(selectWishlistError);
  const stats = useSelector(selectWishlistStats);
  const recentItems = useSelector(selectRecentWishlistItems);
  const inStockItems = useSelector(selectInStockWishlistItems);
  const outOfStockItems = useSelector(selectOutOfStockWishlistItems);

  // Actions
  const addItem = useCallback(
    (product: Product) => {
      dispatch(addToWishlist(product));
    },
    [dispatch]
  );

  const removeItem = useCallback(
    (productId: number) => {
      dispatch(removeFromWishlist(productId));
    },
    [dispatch]
  );

  const toggleItem = useCallback(
    (product: Product) => {
      dispatch(toggleWishlistItem(product));
    },
    [dispatch]
  );

  const clearAll = useCallback(() => {
    dispatch(clearWishlist());
  }, [dispatch]);

  const addMultiple = useCallback(
    (products: Product[]) => {
      dispatch(addMultipleToWishlist(products));
    },
    [dispatch]
  );

  const removeMultiple = useCallback(
    (productIds: number[]) => {
      dispatch(removeMultipleFromWishlist(productIds));
    },
    [dispatch]
  );

  const moveItemToCart = useCallback(
    (productId: number) => {
      const item = items.find((item) => item.id === productId);
      if (item) {
        // Add to cart
        dispatch(
          addToCart({
            ...item,
            quantity: 1,
          })
        );
        // Remove from wishlist
        dispatch(moveToCart(productId));
      }
    },
    [dispatch, items]
  );

  const moveAllToCart = useCallback(() => {
    inStockItems.forEach((item) => {
      dispatch(
        addToCart({
          ...item,
          quantity: 1,
        })
      );
    });
    dispatch(clearWishlist());
  }, [dispatch, inStockItems]);

  // Utility functions
  const isItemInWishlist = useCallback(
    (productId: number) => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  const getItemById = useCallback(
    (productId: number) => {
      return items.find((item) => item.id === productId);
    },
    [items]
  );

  // Persistence functions (for localStorage)
  const saveToStorage = useCallback(() => {
    try {
      localStorage.setItem("paradise-moms-wishlist", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  }, [items]);

  const loadFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem("paradise-moms-wishlist");
      if (saved) {
        const parsedItems = JSON.parse(saved);
        // You would dispatch an action to load these items
        // For now, we'll just return them
        return parsedItems;
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error);
    }
    return [];
  }, []);

  return {
    // State
    items,
    count,
    total,
    isLoading,
    error,
    stats,
    recentItems,
    inStockItems,
    outOfStockItems,

    // Actions
    addItem,
    removeItem,
    toggleItem,
    clearAll,
    addMultiple,
    removeMultiple,
    moveItemToCart,
    moveAllToCart,

    // Utilities
    isItemInWishlist,
    getItemById,
    saveToStorage,
    loadFromStorage,

    // Computed values
    isEmpty: count === 0,
    hasItems: count > 0,
    hasOutOfStockItems: outOfStockItems.length > 0,
    allItemsInStock: outOfStockItems.length === 0,
  };
};

// Hook for checking if a specific item is in wishlist
export const useIsInWishlist = (productId: number) => {
  return useSelector((state: RootState) =>
    selectIsItemInWishlist(state, productId)
  );
};
