import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loadAuthState = () => {
  const session = localStorage.getItem("session");
  return {
    oauth: session || null,
    user: null,
    isAuthenticated: !!session,
    role: null,
    participantId: null,
    adminId: null,
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
      localStorage.setItem("session", action.payload);
    },
    setUser: (state, action) => {
      state.user = { ...action.payload };
      state.role = action.payload.role || "participant"; // Default role
      state.participantId = action.payload.participant_id || null;
      state.adminId = action.payload.admin_id || null;
    },
    logout: (state) => {
      state.oauth = null;
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
      state.participantId = null;
      state.adminId = null;
      localStorage.removeItem("session");
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
      role: response.data.user?.role || "participant",
      participant_id: response.data.user?.participant_id || null,
      admin_id: response.data.user?.admin_id || null,
      is_admin: response.data.user?.is_admin || false,
    };

    dispatch(authActions.setUser(user));
  } catch (error) {
    dispatch(authActions.logout());
  }
};

export const authActions = {
  ...authSlice.actions,
  fetchUser,
};

export const authSelectors = {
  getUser: (state) => state.auth.user,
  isAdmin: (state) => !!state.auth.user?.is_admin,  
  isParticipant: (state) => !!state.auth.participantId,  
  isSoc: (state) => state.auth.user?.role === "soc",
  isLoc: (state) => state.auth.user?.role === "loc",
  isLoggedIn: (state) => !!state.auth.user,
};

export const authReducer = authSlice.reducer;
export default authSlice;
