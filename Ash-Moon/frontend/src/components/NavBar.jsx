import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Icon } from "@mui/material";
import { useSelector } from "react-redux";
import MenuButton from "./MenuButton";
import { isRejected } from "@reduxjs/toolkit";
const NavBar = () => {
	const user = useSelector((state) => state.auth.user);
	useEffect(() => {
		if (user) {
			console.log("User is signed in:", user);
		}
	}, [user]);
	return (
		<header className="fixed top-0 left-0 w-full backdrop-blur-sm  z-50 rounded-b-xl bg-gradient-to-b from-[#000031] to-[#00003100]">
			<div className="container mx-auto py-8 flex justify-between items-center ">
				{/* Icon */}
				<Link
					to="/"
					className="text-white zen-dots text-3xl font-bold hover:scale-110 transition-transform duration-200"
				>
					Ash <span className="text-2xl font-light">&</span> Moon
				</Link>
				{/* Main NavBar */}

				{/* */}
				<nav className="hidden md:flex items-center justify-center space-x-10 zen-dots tracking-wide ">
					<Link to="/" className="main-link">
						Home
					</Link>
					<Link to="/women" className="main-link">
						Women
					</Link>
					<Link to="/men" className="main-link">
						Men
					</Link>
				</nav>

				<div className="flex justify-center items-center gap-5 zen-dots">
					{user ? (
						<MenuButton
							name={user.name}
							profileImg={user.profileImg}
						/>
					) : (
						<Link to="/login" className="main-link">
							Log In
						</Link> // Show login button when no user is found
					)}

					<Link to="/cart">
						<LocalMallOutlinedIcon fontSize="large" color="white" />
					</Link>
				</div>
			</div>
		</header>
	);
};

export default NavBar;
