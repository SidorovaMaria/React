import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Badge, Button, Icon } from "@mui/material";
import { useSelector } from "react-redux";
import MenuButton from "./MenuButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { isRejected } from "@reduxjs/toolkit";
import LogInDialog from "./LogInDialog";
import AuthDialog from "./AuthDialog";
import NavMenu from "./NavMenu";
import { links } from "../data/data";
const NavBar = () => {
	const user = useSelector((state) => state.auth.user);
	useEffect(() => {
		if (user) {
			console.log("User is signed in:", user);
		}
	}, [user]);
	return (
		<header className="fixed top-0 left-0 w-full backdrop-blur-sm z-50 rounded-b-xl">
			<div className=" flex justify-between px-10 items-center py-5  w-full  ">
				{/* Icon */}
				<Link
					to="/"
					className="text-white zen-dots text-xl md:text-3xl font-bold hover:scale-110  transition-transform duration-200  "
				>
					Ash <span className="text-2xl font-light">&</span> Moon
				</Link>
				{/* Main NavBar */}

				{/* */}
				<nav className="hidden lg:flex items-center justify-center space-x-8 zen-dots tracking-wide mx-auto   ">
					{links.map((link, key) => (
						<Link
							key={key}
							to={`${link.link} `}
							className="main-link"
						>
							{link.title}
						</Link>
					))}
				</nav>

				<div className="flex justify-center items-center gap-5 zen-dots ">
					{user ? (
						<MenuButton
							name={user.name}
							profileImg={user.profileImg}
						/>
					) : (
						<AuthDialog />
					)}

					<Link to="/cart">
						<Badge
							badgeContent={4}
							overlap="circular"
							sx={{
								"& .MuiBadge-badge": {
									backgroundColor: "white",
									color: "#0e0d1d",
								},
							}}
						>
							<LocalMallOutlinedIcon
								fontSize="large"
								color="white"
							/>
						</Badge>
					</Link>
					<NavMenu />
				</div>
			</div>
		</header>
	);
};

export default NavBar;
