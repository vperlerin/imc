import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const loadAuthState = () => ({
  oauth: null,  
  user: null, 
  isAuthenticated: false,
  isAdmin: false,
});

const initialState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOauth: (state, action) => {
      state.oauth = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUser: (state, action) => {
      state.user = { ...action.payload };
      state.isAuthenticated = true;
      state.isAdmin = action.payload.is_admin ?? false;  // ✅ Ensure this comes from backend
    },
    logout: (state) => {
      state.oauth = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      localStorage.removeItem('auth'); 
    },
  },
});

// ✅ Define `fetchUser` directly here
export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, { withCredentials: true });

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to fetch user data");
    }

    dispatch(authSlice.actions.setUser(response.data.user));
  } catch (error) {
    console.error('Error fetching user:', error);
    dispatch(authSlice.actions.logout());
  }
};

// ✅ Export actions and reducer
export const authActions = { ...authSlice.actions, fetchUser };
export const authSelectors = {
  getUser: (state) => state.auth.user,
  isAdmin: (state) => state.auth.isAdmin,
  isLoggedIn: (state) => state.auth.isAuthenticated,
};
export const authReducer = authSlice.reducer;
export default authSlice;
