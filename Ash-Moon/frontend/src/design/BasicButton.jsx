import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

// Create a variable button component using styled
const BasicButton = styled(Button, {
	shouldForwardProp: (prop) => prop !== "variant", // Allow passing 'variant' prop to style the button dynamically
})(({ theme, variant }) => ({
	padding: theme.spacing(1.5, 4),
	fontFamily: "Zen Dots, sans-serif",
	fontWeight: 600,
	letterSpacing: "0.025em",
	borderRadius: "0.75rem",
	border: variant.includes("outlined") ? "2px solid white" : "none", // Always provide a border style
	color: variant === "outlined" ? "white" : theme.palette.background.paper,
	backgroundColor: variant.includes("filled") ? "#03468f" : "transparent",
	transition: "all 0.3s ease",
	boxShadow: variant.includes("shadows") ? "2px 2px 10px white" : "none",
	"&:hover": {
		backgroundColor: variant.includes("outlined") ? "#0d2042" : "",
		boxShadow: variant.includes("outlined") ? "2px 2px 0px white" : "",
		textDecoration: variant.includes("outlined") ? "" : "underline",
		transform: variant.includes("outlined") ? "" : "scale(1.15)",
	},
	"&:active": {
		transform: "scale(0.95)",
		borderColor: "white",
	},
}));

export default BasicButton;
