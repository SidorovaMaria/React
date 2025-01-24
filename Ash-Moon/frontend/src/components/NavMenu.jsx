import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { links } from "../data/data"; // Make sure links array exists
import { useNavigate } from "react-router-dom";

const NavMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	// Handle the button click to open or close the menu
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget); // Set the anchor element to the button
		setOpen(!open); // Toggle the open state of the menu
	};

	// Handle closing the menu and navigating to the selected link
	const handleClose = (link = null) => {
		setOpen(false); // Close the menu
		setAnchorEl(null); // Reset the anchor element

		// Only navigate if a valid link is passed
		if (link) {
			navigate(link);
		}
	};

	return (
		<div className="block lg:hidden">
			<Button
				id="Navigation-Menu"
				aria-controls={open ? "nav-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				<MenuIcon sx={{ color: "white", fontSize: "2.2rem" }} />
			</Button>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={() => handleClose()}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
							mt: 1.5,
							padding: "10px",
							borderRadius: "10px",
							backdropFilter: "blur(10px)",
							backgroundColor: "#00003123",
							borderWidth: "1px",
							borderColor: "white",
							color: "white",
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							"&::before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 14,
								height: 14,
								bgcolor: "#000031",
								borderTop: "2px solid white",
								borderLeft: "2px solid white",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0,
							},
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				{links.map((link, key) => (
					<MenuItem
						key={key}
						onClick={() => handleClose(link.link)}
						sx={{ marginBottom: "2px", fontFamily: "Zen Dots" }}
					>
						{link.title}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};

export default NavMenu;
