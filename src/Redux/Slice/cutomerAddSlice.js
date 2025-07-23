import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCustomer_end } from "../../api/api_url";
import axiosInstance from "../../api/axiosInstance";

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (data) => {
    console.log("Data in addCustomer", data);
    const response = await axiosInstance.post(addCustomer_end, data);
    console.log("Add Customer Response ", response);
    return response.data;
  }
);

const initialState = {
  customer: {},
  loading: false,
  success: false,
  error: null,
};

const customerAddSlice = createSlice({
  name: "customerAdd",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(addCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCustomer.fulfilled, (state, action) => {
      console.log("Action for fulfilled", action);
      state.loading = false;
      state.customer = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(addCustomer.rejected, (state, action) => {
      console.log("Action for rejected", action);
      state.loading = false;
      state.customer = {};
      state.error = action.error.message;
      state.success = false;
    });
  },
});

export default customerAddSlice.reducer;
