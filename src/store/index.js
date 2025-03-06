import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: JSON.parse(localStorage.getItem("session"))
      ? { isAuthenticated: true }
      : { isAuthenticated: false },
  },
});

export default store;