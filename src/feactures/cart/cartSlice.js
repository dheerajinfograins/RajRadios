import { createSlice } from "@reduxjs/toolkit";

const getCartFromStorage = () => {
  try {
    const item = window.localStorage.getItem("cartItems");
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error("Error loading cart from storage", error);
    return [];
  }
};

const setCartToStorage = (cartItems) => {
  try {
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart to storage", error);
  }
};

const initialState = {
  cartItems: getCartFromStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      setCartToStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      setCartToStorage(state.cartItems);
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: type === "inc" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
            }
          : item
      );
      setCartToStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      setCartToStorage(state.cartItems);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
