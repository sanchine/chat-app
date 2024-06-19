import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  isAuth: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload
      state.isAuth = true
    },
    logout(state, action) {
      state.currentUser = {}
      state.isAuth = false
    }
  }
});

export const {
  login, logout
} = authSlice.actions;
export const authReducer = authSlice.reducer;
