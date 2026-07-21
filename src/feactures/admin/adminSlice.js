import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Thunk to fetch dashboard stats from backend
export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/admin/dashboard-stats");
      return data.data; // ServerResponse wrapper has {success, data, message, error}
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk to fetch all users from backend
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/admin/users");
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk to update user status (isActive/isDeleted)
export const updateUserStatus = createAsyncThunk(
  "admin/updateUserStatus",
  async ({ id, isActive, isDeleted }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/admin/users/${id}/status`, { isActive, isDeleted });
      return data.data; // The updated user
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk to fetch all repairs from backend
export const fetchAllRepairs = createAsyncThunk(
  "admin/fetchAllRepairs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/repair/all");
      return data.data; // data array of repairs
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk to update repair status
export const updateRepairStatusAdmin = createAsyncThunk(
  "admin/updateRepairStatusAdmin",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/repair/${id}/status`, { status });
      return data.data; // The updated repair
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk to fetch all contact messages from backend
export const fetchAllContacts = createAsyncThunk(
  "admin/fetchAllContacts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/contactForm/contact");
      return data.data; // Server returns { success, count, data }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk to delete contact message
export const deleteContactAdmin = createAsyncThunk(
  "admin/deleteContactAdmin",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/contactForm/contact/${id}`);
      return id; // Return id to remove from state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    dashboardData: null,
    users: [],
    repairs: [],
    contacts: [],
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
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(u => u._id === action.payload._id);
        if (index !== -1) {
          state.users[index].isActive = action.payload.isActive;
          state.users[index].isDeleted = action.payload.isDeleted;
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllRepairs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRepairs.fulfilled, (state, action) => {
        state.loading = false;
        state.repairs = action.payload;
      })
      .addCase(fetchAllRepairs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRepairStatusAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRepairStatusAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.repairs.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.repairs[index].status = action.payload.status;
        }
      })
      .addCase(updateRepairStatusAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContactAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContactAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(c => c._id !== action.payload);
      })
      .addCase(deleteContactAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
