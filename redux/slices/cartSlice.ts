// redux/slices/cartSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  // total: number;
}

const initialState: CartState = {
  items: [],
  // total: 0,
};

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
    },
    removeItem(state, action: PayloadAction<string>) {
      const removeItemId = action.payload;
      const itemIndex = state.items.findIndex((item)=> item.id === removeItemId);
      // find index -> return 'true' if match found or '-1' if not found

      if(itemIndex !== -1){
        state.items.splice(itemIndex,1);
      }

    },
    
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
