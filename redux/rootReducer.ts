// redux/rootReducer.ts

import { combineReducers } from 'redux';
import cartReducer from './slices/cartSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other slice reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
