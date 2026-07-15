import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feactures/auth/authSlice.js";
import contactReducer from "../feactures/contact/contactSlice.js";
import repairReducer from "../feactures/repair/repairServiceSlice.js";
import cartReducer from "../feactures/cart/cartSlice.js";
import wishlistReducer from "../feactures/wishlist/wishlistSlice.js";
import orderReducer from "../feactures/order/orderSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer, // ✅ REQUIRED
    repair: repairReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});
