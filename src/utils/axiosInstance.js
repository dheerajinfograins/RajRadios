// api/axiosInstance.js

import axios from "axios";
import { getAuthToken } from "../utils/auth.utils.js";

// ✅ Create axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // 🔁 change if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ Optional: handle unauthorized globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
