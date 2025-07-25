import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { updatePurchase_end, getSinglePurchase_end } from "../../api/api_url";

export const updatePurchase = createAsyncThunk(
  "purchase/updatePurchase",
  async ({ id, data }) => {
    try {
      console.log("Data in updatePurchase", data);
      const response = await axiosInstance.put(
        `${updatePurchase_end}/${id}`,
        data
      );
      console.log("Update Purchase Response ", response);
      return response.data;
    } catch (error) {
      console.error("Error in updatePurchase", error);
      // return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSinglePurchase = createAsyncThunk(
  "purchaseUpdate/getSinglePurchase",
  async (id) => {
    try {
      const response = await axiosInstance.get(
        `${getSinglePurchase_end}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching single purchase:", error);
      // return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  purchase: {},
  loading: false,
  success: false,
  error: null,
};

const purchaseUpdateSlice = createSlice({
  name: "purchaseUpdate",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(updatePurchase.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePurchase.fulfilled, (state, action) => {
      console.log("Action for fulfilled", action);
      state.loading = false;
      state.purchase = action.payload;
      state.error = null;
      state.success = true;
    });
    builder
      .addCase(updatePurchase.rejected, (state, action) => {
        console.log("Action for rejected", action);
        state.loading = false;
        state.purchase = {};
        state.error = action.payload || "Unknown error occurred";
        state.success = false;
      })
      .addCase(getSinglePurchase.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSinglePurchase.fulfilled, (state, action) => {
        console.log("Action for fulfilled", action);
        state.loading = false;
        state.purchase = action.payload;
        state.error = null;
        state.success = true;
      })
      .addCase(getSinglePurchase.rejected, (state, action) => {
        console.log("Action for rejected", action);
        state.loading = false;
        state.purchase = {};
        state.error = action.payload || "Unknown error occurred";
        state.success = false;
      });
  },
});

export default purchaseUpdateSlice.reducer;
