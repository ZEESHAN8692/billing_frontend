import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register_end } from "../../api/api_url";
import axiosInstance from "../../api/axiosInstance";

export const signupUser = createAsyncThunk(
  "registration/signipUser",
  async (data) => {
    console.log("Data in signupUser", data);
    const response = await axiosInstance.post(register_end, data);
    console.log("Signup Response ", response);
    return response.data;
  }
);

const initialState = {
  user: {},
  loading: false,
  success: false,
  error: null,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      console.log("Action for fulfilled", action);
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      console.log("Action for rejected", action);
      state.loading = false;
      state.user = {};
      state.error = action.error.message;
      state.success = false;
    });
  },
});

export default registrationSlice.reducer;
