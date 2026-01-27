import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// ================= SEND CONTACT MESSAGE =================
export const sendContactMessage = createAsyncThunk(
  "contact",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:5000/contactForm/contact`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
