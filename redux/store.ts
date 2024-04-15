import { configureStore } from "@reduxjs/toolkit";
  
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  // Optionally, configure middleware, dev tools, etc.
});

export default store;
