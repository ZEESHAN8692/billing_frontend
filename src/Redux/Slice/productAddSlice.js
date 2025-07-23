import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addproduct_end } from "../../api/api_url";
import axiosInstance from "../../api/axiosInstance";

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data) => {
    console.log("Data in addProduct", data);
    const response = await axiosInstance.post(addproduct_end, data);
    console.log("Add Product Response ", response);
    return response.data;
  }
);

const initialState = {
  product: {},
  loading: false,
  success: false,
  error: null,
};

const productAddSlice = createSlice({
  name: "productAdd",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      console.log("Action for fulfilled", action);
      state.loading = false;
      state.product = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      console.log("Action for rejected", action);
      state.loading = false;
      state.product = {};
      state.error = action.error.message;
      state.success = false;
    });
  },
});

export default productAddSlice.reducer;
