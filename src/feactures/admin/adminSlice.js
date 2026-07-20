import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch dashboard stats from backend
export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Assuming you have auth token stored in auth state
      const { auth: { user, token } } = getState();
      
      const config = {
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem("token")}`, // Fallback if token is in localstorage
        },
      };

      const { data } = await axios.get("http://localhost:5000/api/admin/dashboard-stats", config);
      return data.data; // ServerResponse wrapper has {success, data, message, error}
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    dashboardData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
