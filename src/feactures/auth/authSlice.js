import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js"; // ✅ USE AXIOS INSTANCE

const API_URL = "/auth"; // ✅ baseURL already set in axiosInstance

// 🔹 Get token and user safely (SINGLE SOURCE OF TRUTH)
const getToken = () => localStorage.getItem("vijayToken");
const getUser = () => {
  const user = localStorage.getItem("vijayUser");
  return user ? JSON.parse(user) : null;
};

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
    user: getUser(),
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
      localStorage.removeItem("vijayUser"); // ✅ clear user data
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("vijayUser", JSON.stringify(state.user));
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

        // ✅ Persist token and user
        localStorage.setItem("vijayToken", action.payload.token);
        if (action.payload.user) {
          localStorage.setItem("vijayUser", JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
