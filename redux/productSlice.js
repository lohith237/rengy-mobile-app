import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    categories: [],
    selectedCategory: 'All',
    products: [],
    loading: false,
    searchQuery: "",
    selectedProduct: null,
    sortBy: "title",
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setCategories: (state, action) => {
            state.categories = action.payload;
        },

        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },

        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },

        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setLoading,
    setCategories,
    setSelectedCategory,
    setProducts,
    setError,
    clearError,
    setSearchQuery,
    setSortBy,
    setSelectedProduct
} = productSlice.actions;

export default productSlice.reducer;