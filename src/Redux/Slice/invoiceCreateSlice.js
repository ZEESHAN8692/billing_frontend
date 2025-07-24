import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createInvoice_end } from "../../api/api_url";
import axiosInstance from "../../api/axiosInstance";

export const createInvoice = createAsyncThunk(
  "invoice/createInvoice",
  async (data) => {
    console.log("Data in createInvoice", data);
    const response = await axiosInstance.post(createInvoice_end, data);
    console.log("Create Invoice Response ", response);
    return response.data;
  }
);

const initialState = {
  invoice: {},
  loading: false,
  success: false,
  error: null,
};

const invoiceCreateSlice = createSlice({
  name: "invoiceCreate",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(createInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createInvoice.fulfilled, (state, action) => {
      console.log("Action for fulfilled", action);
      state.loading = false;
      state.invoice = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(createInvoice.rejected, (state, action) => {
      console.log("Action for rejected", action);
      state.loading = false;
      state.invoice = {};
      state.error = action.error.message;
      state.success = false;
    });
  },
});

export default invoiceCreateSlice.reducer;
