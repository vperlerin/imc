import { batch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('auth');
    return serializedState ? JSON.parse(serializedState) : { oauth: null, user: null };
  } catch (err) {
    console.error('Error loading auth state:', err);
    return { oauth: null, user: null };
  }
};

const initialState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOauth: (state, action) => {
      state.oauth = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.oauth = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth'); 
    },
  },
});

// Thunk to handle setting authentication and persisting it
authSlice.actions.setAuth = (data) => (dispatch) => {
  batch(() => {
    dispatch(authSlice.actions.setOauth(data.oauth));
    dispatch(authSlice.actions.setUser(data.user));
  });

  try {
    localStorage.setItem('auth', JSON.stringify({ oauth: data.oauth, user: data.user }));
  } catch (err) {
    console.error('Error saving auth state:', err);
  }
};

authSlice.selectors = {
  getUser: (state) => state.auth.user,
  isAdmin: (state) => state.auth.user?.is_admin ?? false,
  isLoggedIn: (state) => state.auth.user != null && !state.auth.user.is_guest,
};

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelectors = authSlice.selectors;

export default authSlice;
