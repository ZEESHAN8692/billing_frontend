import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { addPurchase_end } from "../../api/api_url";

export const addPurchase = createAsyncThunk(
  "purchase/addPurchase",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Data in addPurchase", data);
      const response = await axiosInstance.post(addPurchase_end, data);
      console.log("Add Purchase Response ", response);
      return response.data;
    } catch (error) {
      console.error("Error in addPurchase", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  purchase: {},
  loading: false,
  success: false,
  error: null,
};

const purchaseAddSlice = createSlice({
  name: "purchaseAdd",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(addPurchase.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPurchase.fulfilled, (state, action) => {
      console.log("Action for fulfilled", action);
      state.loading = false;
      state.purchase = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(addPurchase.rejected, (state, action) => {
      console.log("Action for rejected", action);
      state.loading = false;
      state.purchase = {};
      state.error = action.payload || "Unknown error occurred";
      state.success = false;
    });
  },
});

export default purchaseAddSlice.reducer;

