import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";

const isJSON = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed && typeof parsed === "object" ? parsed : false;
  } catch (e) {
    return false;
  }
};

const session = localStorage.getItem("session");
const parsedSession = isJSON(session);

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: parsedSession
      ? { isAuthenticated: !!parsedSession.isAuthenticated }
      : { isAuthenticated: false },
  },
});

export default store;
