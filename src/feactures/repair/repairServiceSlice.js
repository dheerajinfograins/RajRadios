import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js";

// ================= CREATE REPAIR =================
export const createRepair = createAsyncThunk(
  "repair/create",
  async (repairData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/repair/create", repairData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unauthorized or request failed"
      );
    }
  }
);

const repairSlice = createSlice({
  name: "repair",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetRepairState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createRepair.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRepair.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createRepair.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRepairState } = repairSlice.actions;
export default repairSlice.reducer;
