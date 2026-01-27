import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js"; // ✅ USE AXIOS INSTANCE

const API_URL = "/auth"; // ✅ baseURL already set in axiosInstance

// 🔹 Get token safely (SINGLE SOURCE OF TRUTH)
const getToken = () => localStorage.getItem("vijayToken");

// ================= REGISTER =================
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`${API_URL}/register`, userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);

// ================= LOGIN =================
export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`${API_URL}/login`, loginData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    token: getToken(),                 // ✅ sync from localStorage
    isAuthorized: Boolean(getToken()), // ✅ instant auth check
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthorized = false;

      localStorage.removeItem("vijayToken"); // ✅ clear token
    },
  },

  extraReducers: (builder) => {
    builder
      // ================= REGISTER =================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;

        // ❗ Register does NOT auto-login
        state.isAuthorized = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= LOGIN =================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ Safe payload handling
        state.user = action.payload.user || null;
        state.token = action.payload.token;
        state.isAuthorized = true;

        // ✅ Persist token
        localStorage.setItem("vijayToken", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
