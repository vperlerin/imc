import { batch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  oauth: null,
  user: null,
};

if (typeof window !== 'undefined' && window.__PRELOAD_STATE__?.['/account']) {
  initialState.oauth = window.__PRELOAD_STATE__['/account'].oauth;
  initialState.user = window.__PRELOAD_STATE__['/account'].user;
  window.__PRELOAD_STATE__['/account'] = undefined;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOauth: (state, action) => {
      state.oauth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Add a custom thunk action
authSlice.actions.setAuth = (data) => {
  return (dispatch) => {
    batch(() => {
      dispatch(authSlice.actions.setOauth(data.oauth));
      dispatch(authSlice.actions.setUser(data.user));
    });
  };
};

// Helper function
function isLoggedIn(state) {
  return state.auth.user != null && state.auth.user.is_guest === false;
}

// Attach extra selectors
authSlice.selectors = {
  getUser: (state) => state.auth.user,
  isAdmin: (state) => isLoggedIn(state) && !!state.auth.user?.isAdmin,
  isLoggedIn,
};

// Export the actions, reducer, and selectors
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelectors = authSlice.selectors;

// Optional default export if needed
export default authSlice;