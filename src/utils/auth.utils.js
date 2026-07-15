// utils/auth.utils.js

/**
 * Save token after successful login
 * Called from redux thunk OR component
 */
export const setAuthToken = (token) => {
  localStorage.setItem("vijayToken", token);
};

/**
 * Get token anywhere in app
 */
export const getAuthToken = () => {
  return localStorage.getItem("vijayToken");
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("vijayToken");
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem("vijayToken");
};
