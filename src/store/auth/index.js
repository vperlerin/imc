import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loadAuthState = () => {
  const session = localStorage.getItem("session");
  return {
    oauth: session || null, 
    user: null,  
    isAuthenticated: !!session,
    isAdmin: false,  
  };
};

const initialState = loadAuthState();
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.oauth = action.payload;
      state.isAuthenticated = !!action.payload;
      localStorage.setItem("session", action.payload); // Store session token
    },
    setUser: (state, action) => {
      state.user = { ...action.payload };
      state.isAdmin = action.payload.is_admin ?? false;
    },
    logout: (state) => {
      state.oauth = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      localStorage.removeItem("session"); // Only remove session token
    },
  },
});
export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/user.php`,
      { withCredentials: true }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to fetch user data");
    }
 
    const user = {
      ...response.data.user,
      is_admin: !!response.data.user?.is_admin,  
    };

    dispatch(authActions.setUser(user));
  } catch (error) {
    console.error("Error fetching user:", error);
    dispatch(authActions.logout());
  }
};


export const authActions = {
  ...authSlice.actions,
  fetchUser,
};
export const authSelectors = {
  getUser: (state) => state.auth.user,
  isAdmin: (state) => state.auth.isAdmin,
  isLoggedIn: (state) => state.auth.isAuthenticated,
};
export const authReducer = authSlice.reducer;
export default authSlice;