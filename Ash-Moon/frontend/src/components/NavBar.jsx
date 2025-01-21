import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Button, Icon } from "@mui/material";
import { useSelector } from "react-redux";
import MenuButton from "./MenuButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { isRejected } from "@reduxjs/toolkit";
import LogInDialog from "./LogInDialog";
import AuthDialog from "./AuthDialog";
const NavBar = () => {
	const user = useSelector((state) => state.auth.user);
	useEffect(() => {
		if (user) {
			console.log("User is signed in:", user);
		}
	}, [user]);
	return (
		<header className="fixed top-0 left-0 w-full backdrop-blur-sm z-50 rounded-b-xl  ">
			<div className="container mx-auto py-5 flex justify-between items-center ">
				{/* Icon */}
				<Link
					to="/"
					className="text-white zen-dots text-xl md:text-3xl font-bold hover:scale-110 mx-auto  transition-transform duration-200"
				>
					Ash <span className="text-2xl font-light">&</span> Moon
				</Link>
				{/* Main NavBar */}

				{/* */}
				<nav className="hidden lg:flex items-center justify-center space-x-8 zen-dots tracking-wide ">
					<Link to="/" className="main-link">
						Home
					</Link>
					<Link to="/products" className="main-link">
						Products
					</Link>

					<Link to="/about us" className="main-link">
						About us
					</Link>
					<Link to="/about us" className="main-link">
						Blog
					</Link>
					<Link to="/blog" className="main-link">
						Contact Us
					</Link>
				</nav>

				<div className="flex justify-center items-center gap-5 zen-dots mr-auto">
					{user ? (
						<MenuButton
							name={user.name}
							profileImg={user.profileImg}
						/>
					) : (
						<AuthDialog />
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
