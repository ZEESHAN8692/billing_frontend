import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { updateCustomer_end, getSingleCustomer_end } from "../../api/api_url";

export const updateCustomer = createAsyncThunk(
  "customerUpdate/updateCustomer",
  async ({ id, data }) => {
    try {
      console.log("Data in updateCustomer", data);
      const response = await axiosInstance.put(
        `${updateCustomer_end}/${id}`,
        data
      );
      console.log("Update Customer Response ", response);
      return response.data;
    } catch (error) {
      console.error("Error in updateCustomer", error);
      //   return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSingleCustomer = createAsyncThunk(
  "customerUpdate/getSingleCustomer",
  async (id) => {
    try {
      const response = await axiosInstance.get(
        `${getSingleCustomer_end}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching single customer:", error);
      // return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  customer: {},
  loading: false,
  success: false,
  error: null,
};

const customerUpdateSlice = createSlice({
  name: "customerUpdate",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(updateCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      console.log("Action for fulfilled", action);
      state.loading = false;
      state.customer = action.payload;
      state.error = null;
      state.success = true;
    });
    builder
      .addCase(updateCustomer.rejected, (state, action) => {
        console.log("Action for rejected", action);
        state.loading = false;
        state.customer = {};
        state.error = action.payload || "Unknown error occurred";
        state.success = false;
      })
      .addCase(getSingleCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleCustomer.fulfilled, (state, action) => {
        console.log("Action for fulfilled", action);
        state.loading = false;
        state.customer = action.payload;
        state.error = null;
        state.success = true;
      })
      .addCase(getSingleCustomer.rejected, (state, action) => {
        console.log("Action for rejected", action);
        state.loading = false;
        state.customer = {};
        state.error = action.payload || "Unknown error occurred";
        state.success = false;
      });
  },
});

export default customerUpdateSlice.reducer;
