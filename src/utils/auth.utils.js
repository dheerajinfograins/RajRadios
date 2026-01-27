// utils/auth.utils.js

/**
 * Save token after successful login
 * Called from redux thunk OR component
 */
export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * Get token anywhere in app
 */
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem("token");
};
