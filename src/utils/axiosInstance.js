// api/axiosInstance.js

import axios from "axios";
import { getAuthToken } from "../utils/auth.utils.js";

export const SERVER_URL = "https://backendofvijayradios.onrender.com";

// ✅ Create axios instance
const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api`, // 🔁 change if needed
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
      localStorage.removeItem("vijayToken");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
