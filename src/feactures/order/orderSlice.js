import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: JSON.parse(localStorage.getItem("vijayOrders")) || [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: new Date().getTime().toString(),
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
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
