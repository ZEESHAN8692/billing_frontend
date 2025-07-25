import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { updateProduct_end, getSingleProduct_end } from "../../api/api_url";

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }) => {
    try {
      console.log("Data in updateProduct", data);
      const response = await axiosInstance.put(
        `${updateProduct_end}/${id}`,
        data
      );
      console.log("Update Product Response ", response);
      return response.data;
    } catch (error) {
      console.error("Error in updateProduct", error);
      //   return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "productUpdate/getSingleProduct",
  async (id) => {
    try {
      const response = await axiosInstance.get(`${getSingleProduct_end}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching single product:", error);
      // return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  product: {},
  loading: false,
  success: false,
  error: null,
};

const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      console.log("Action for fulfilled", action);
      state.loading = false;
      state.product = action.payload;
      state.error = null;
      state.success = true;
    });
    builder
      .addCase(updateProduct.rejected, (state, action) => {
        console.log("Action for rejected", action);
        state.loading = false;
        state.product = {};
        state.error = action.payload || "Unknown error occurred";
        state.success = false;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        console.log("Action for fulfilled", action);
        state.loading = false;
        state.product = action.payload;
        state.error = null;
        state.success = true;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        console.log("Action for rejected", action);
        state.loading = false;
        state.product = {};
        state.error = action.payload || "Unknown error occurred";
        state.success = false;
      });
  },
});

export default productUpdateSlice.reducer;
