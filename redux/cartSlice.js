import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

const updateCartSummary = (state) => {
  state.totalItems = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  state.totalPrice = state.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.cartItems.find(
        item => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...product,
          quantity: product.minimumOrderQuantity || 1,
        });
      }

      updateCartSummary(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        item => item.id === action.payload
      );

      if (!item) return;

      if (item.quantity < item.stock) {
        item.quantity += 1;
      }

      updateCartSummary(state);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        item => item.id === action.payload
      );

      if (!item) return;

      if (item.quantity > item.minimumOrderQuantity) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          cartItem => cartItem.id !== action.payload
        );
      }

      updateCartSummary(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );

      updateCartSummary(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;