import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/ash-moon";

const initialState = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
};
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetError(state) {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		//SignUp
		builder.addCase(signup.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(signup.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
			state.isAuthenticated = true;
		});
		builder.addCase(signup.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		// Login
		builder.addCase(login.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload.data;
			state.isAuthenticated = true;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});

		// Logout
		builder.addCase(logout.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.isLoading = false;
			state.user = null;
			state.isAuthenticated = false;
		});
		builder.addCase(logout.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		// Refresh Token
		builder.addCase(refreshUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
		});
		builder.addCase(refreshUser.rejected, (state) => {
			state.user = null;
			state.isAuthenticated = false;
		});
	},
});

export const signup = createAsyncThunk(
	"auth/signup",
	async (userData, thunkAPI) => {
		try {
			console.log("Sending signup request with data:", userData); // Debugging

			const response = await axios.post(
				`${API_BASE_URL}/auth/sign-up`,
				userData,
				{
					withCredentials: true, // Ensure cookies are sent for authentication
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error in signup front-end:", error?.response?.data);
			return thunkAPI.rejectWithValue(
				error.response?.data || { message: "Unknown error" }
			);
		}
	}
);
export const login = createAsyncThunk(
	"auth/login",
	async (userData, thunkAPI) => {
		try {
			const response = await axios.post(
				`${API_BASE_URL}/auth/login`,
				userData,
				{
					withCredentials: true,
				}
			);
			console.log(response.data);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/auth/logout`,
			{},
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		console.log("frontend Error:", error.message);
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

export const refreshUser = createAsyncThunk(
	"auth/refreshUser",
	async (_, thunkAPI) => {
		try {
			const response = await axios.post(
				`${API_BASE_URL}/auth/refresh-token`,
				{},
				{ withCredentials: true }
			);
			return response.data.user;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data || { message: "Session expired" }
			);
		}
	}
);

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
