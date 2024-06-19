import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PZRest } from "../../api/PZRest";

const initialState = {
  dialogs: [],
  status: 'idle',
  unreadChatsCount: 0,
};

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    addDialogs(state, action) {
      // check on having
      state.dialogs = action.payload;
    },
    clearDialogs(state, action) {
      state.dialogs = [];
    },
  },
});

export const { addDialogs, clearDialogs } = dialogsSlice.actions;
export const dialogsReducer = dialogsSlice.reducer;
