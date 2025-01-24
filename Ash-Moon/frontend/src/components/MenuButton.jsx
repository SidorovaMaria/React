import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../app/feature/authSlice";
import store from "../app/store";

export default function MenuButton({ profileImg, name }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const dispatch = useDispatch();
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		console.log("loging Out");

		dispatch(logout());
	};

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<Typography
					sx={{
						minWidth: 50,
						fontFamily: "Zen Dots",
						textDecoration: "underline",
						cursor: "pointer",
					}}
				>
					{name}
				</Typography>
				<Tooltip title="Account settings">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? "account-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
					>
						<Avatar
							sx={{
								width: 40,
								height: 40,
								backgroundColor: "white",
							}}
						>
							<img src={profileImg} alt="profile image" />
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
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
				<MenuItem
					onClick={handleClose}
					sx={{ marginBottom: "2px", fontFamily: "Zen Dots" }}
				>
					<Avatar
						sx={{
							width: 40,
							height: 40,
							backgroundColor: "white",
						}}
					>
						<img src={profileImg} alt="profile image" />
					</Avatar>
					Profile
				</MenuItem>
				<MenuItem
					onClick={handleClose}
					sx={{ marginBottom: "2px", fontFamily: "Zen Dots" }}
				>
					<Avatar
						sx={{
							width: 40,
							height: 40,
							borderWidth: "1px",
							backgroundColor: "white",
							borderColor: "black",
						}}
					>
						<ShoppingBagIcon sx={{ color: "#000031" }} />
					</Avatar>
					My orders
				</MenuItem>
				<Divider sx={{ backgroundColor: "white" }} />
				<MenuItem
					onClick={handleClose}
					sx={{ marginBottom: "2px", fontFamily: "Zen Dots" }}
				>
					<ListItemIcon>
						<Settings fontSize="small" sx={{ color: "white" }} />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem
					sx={{ fontFamily: "Zen Dots" }}
					onClick={() => {
						handleClose();
						handleLogout();
					}}
				>
					<ListItemIcon>
						<Logout fontSize="small" sx={{ color: "white" }} />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
}
