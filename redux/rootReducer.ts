// redux/rootReducer.ts

import { combineReducers } from 'redux';
import cartReducer from './slices/cartSlice';
import authReducer from "./slices/authSlice";
import wishlistReducer from "./slices/wishlistSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  wishlist: wishlistReducer,
  // Add other slice reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
