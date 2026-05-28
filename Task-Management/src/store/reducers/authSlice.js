import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: sessionStorage.getItem('token') || null,
  isAuthenticated: !!sessionStorage.getItem('token'),
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadingStart: (state) => {
      state.loading = true;
    },
    loadingEnd: (state) => {
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { loadingStart, loadingEnd, loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
