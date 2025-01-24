import React, { useEffect } from "react";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { Route, Routes, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import ProductsPage from "./pages/ProductsPage";
import { refreshUser } from "./app/feature/authSlice";

function App() {
	const dispatch = useDispatch();
	const { user, isAuthenticated } = useSelector((state) => state.auth);
	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	return (
		<div className="min-h-screen relative">
			<div className="relative z-10">
				<NavBar />
				<main className="">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/products" element={<ProductsPage />} />
						<Route
							path="/products/:categories"
							element={<ProductsPage />}
						/>
					</Routes>
				</main>
			</div>
		</div>
	);
}

export default App;
