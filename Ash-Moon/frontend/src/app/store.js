import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice";
import productReducer from "./feature/productSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		product: productReducer,
	},
});

export default store;
