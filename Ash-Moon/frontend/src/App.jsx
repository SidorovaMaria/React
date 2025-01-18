import React, { useEffect } from "react";
import Background from "./design/Background";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useSelector } from "react-redux";

function App() {
	const user = useSelector((state) => state.auth.user);
	useEffect(() => {
		if (user) {
			console.log("User is signed in:", user);
		}
	}, [user]);
	return (
		<div className="min-h-screen text-white relative font-sans">
			<Background />
			<div className="relative z-10">
				<NavBar />
				<main className="pt-36">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route
							path="/signup"
							element={
								!user ? <SignUpPage /> : <Navigate to="/" />
							}
						/>
					</Routes>
				</main>
			</div>
		</div>
	);
}

export default App;
