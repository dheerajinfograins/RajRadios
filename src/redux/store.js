import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feactures/auth/authSlice.js";
import contactReducer from "../feactures/contact/contactSlice.js";
import repairReducer from "../feactures/repair/repairServiceSlice.js"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer, // ✅ REQUIRED
    repair: repairReducer,
  },
});
