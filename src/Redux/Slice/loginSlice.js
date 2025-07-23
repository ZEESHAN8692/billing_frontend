import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { login_end } from "../../api/api_url";

export const LoginUser = createAsyncThunk("login/LoginUser", async (data) => {
  const response = await axiosInstance.post(login_end, data);
  console.log("Login Response ", response);
  return response.data;
});

const initialState = {
  data: {},
  loading: false,
  error: null,
  success: false,
};

const LoginSlice = createSlice({
  name: "login",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      console.log("Action for fulfilled", action);
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      console.log("Action for rejected", action);
      state.loading = false;
      state.data = {};
      state.error = action.error.message;
      state.success = false;
    });
  },
});

export default LoginSlice.reducer;
