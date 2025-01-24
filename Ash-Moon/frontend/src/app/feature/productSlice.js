import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/ash-moon";

// Async thunk to fetch featured products
export const getFeaturedProducts = createAsyncThunk(
	"product/getFeaturedProducts",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${API_BASE_URL}/products/featured`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
export const getAllProducts = createAsyncThunk(
	"product/getAllProducts",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_BASE_URL}/products`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
export const getProductsByCategory = createAsyncThunk(
	"product/getProductsByCategory",
	async (categories, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${API_BASE_URL}/products/category/${categories}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const initialState = {
	products: null,
	featuredProducts: null,
	isLoading: false,
	error: null,
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getFeaturedProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getFeaturedProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.featuredProducts = action.payload;
			})
			.addCase(getFeaturedProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getAllProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action.payload.products;
			})
			.addCase(getAllProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getProductsByCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProductsByCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action.payload;
			})
			.addCase(getProductsByCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default productSlice.reducer;
