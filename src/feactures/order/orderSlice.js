import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const API_URL = "/order";

// Fetch all orders for admin
export const fetchAdminOrders = createAsyncThunk(
  "order/fetchAdminOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/all`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch orders for customer
export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (userId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/my-orders/${userId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/create`, orderData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`${API_URL}/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    addOrder: (state, action) => {
      const newOrder = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...action.payload,
      };
      state.orders.push(newOrder);
      localStorage.setItem("vijayOrders", JSON.stringify(state.orders));
    },
    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem("vijayOrders");
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Admin Orders
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch My Orders (Customer)
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.orders.findIndex(o => o._id === action.payload._id);
        if (index !== -1) {
          // Only update the status to preserve the populated items.productId data
          state.orders[index].status = action.payload.status;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderStatus, clearOrders, addOrder } = orderSlice.actions;
export default orderSlice.reducer;
