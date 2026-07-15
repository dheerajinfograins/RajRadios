import { createSlice } from "@reduxjs/toolkit";

const getWishlistFromStorage = () => {
  try {
    const item = window.localStorage.getItem("wishlistItems");
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error("Error loading wishlist from storage", error);
    return [];
  }
};

const setWishlistToStorage = (wishlistItems) => {
  try {
    window.localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  } catch (error) {
    console.error("Error saving wishlist to storage", error);
  }
};

const initialState = {
  wishlistItems: getWishlistFromStorage(),
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.wishlistItems.some((x) => x.id === item.id);

      if (exists) {
        // Remove from wishlist
        state.wishlistItems = state.wishlistItems.filter((x) => x.id !== item.id);
      } else {
        // Add to wishlist
        state.wishlistItems.push(item);
      }
      setWishlistToStorage(state.wishlistItems);
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      setWishlistToStorage(state.wishlistItems);
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
