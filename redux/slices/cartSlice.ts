import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetProductsQuery } from "@/graphql/generated/graphql";

type Product = GetProductsQuery["products"][0];
export type CartItem = Product & { quantity: number };

interface CartState {
  items: CartItem[];
}

const loadState = (): CartState => {
  if (typeof window === "undefined") {
    return { items: [] };
  }
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return { items: [] };
    }
    const parsedState = JSON.parse(serializedState);
    return { items: parsedState.items || [] };
  } catch (err) {
    return { items: [] };
  }
};

const saveState = (state: CartState) => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState: CartState = loadState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      saveState(state);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveState(state);
    },
    updateItemQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
      saveState(state);
    },
  },
});

export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
