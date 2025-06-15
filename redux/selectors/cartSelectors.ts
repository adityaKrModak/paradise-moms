import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

const selectCart = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.items
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);
