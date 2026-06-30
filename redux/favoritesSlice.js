import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.favorites.some(fav => fav.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;