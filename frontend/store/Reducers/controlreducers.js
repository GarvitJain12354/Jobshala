import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: [],
  isAuthenticated: false,
};

export const counterReducer = createSlice({
  name: "internshala student",
  initialState,
  reducers: {
    isError: (state, action) => {
      state.error.push(action.payload);
    },
    RemoveError: (state, action) => {
      state.error = [];
    },
    studentLogin: (state, action) => {
      state.isAuthenticated = true;
    },
    studentLogout: (state, action) => {
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.message = true;
    },
    removeMessage: (state, action) => {
      state.message = false;
    },
    getstudentSuccess: (state, action) => {
      state.user = action.payload;
    },
    msgRequest: (state, action) => {
      (state.loading = true), (state.msg = null);
    },
    getmessage: (state, action) => {
      (state.msg = action.payload.message), (state.loading = false);
    },
    msgFail: (state, action) => {
      (state.loading = false), (state.msg = "Error");
    },
    clearmessage: (state, action) => {
      state.msg = null;
    },
  },
});

export const {
  isError,
  RemoveError,
  studentLogin,
  studentLogout,
  loginSuccess,
  removeMessage,
  getstudentSuccess,
  getmessage,
  clearmessage,
  msgRequest,
  msgFail,
} = counterReducer.actions;
export default counterReducer.reducer;
