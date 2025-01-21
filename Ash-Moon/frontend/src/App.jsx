import React, { useEffect } from "react";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { Route, Routes, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

function App() {
	const user = useSelector((state) => state.auth.user);
	useEffect(() => {
		if (user) {
			console.log("User is signed in:", user);
		}
	}, [user]);
	return (
		<div className="min-h-screen relative">
			<div className="relative z-10">
				<NavBar />
				<main className="">
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</main>
			</div>
		</div>
	);
}

export default App;
