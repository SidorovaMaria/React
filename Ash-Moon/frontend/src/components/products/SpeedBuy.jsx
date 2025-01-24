import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";

import axios from "axios";

export default function BasicSpeedDial({ id }) {
	const [sizes, setSizes] = useState(null);

	useEffect(() => {
		const fetchSizes = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/ash-moon/products/sizes/${id}`
				);
				setSizes(response.data); // ✅ Set sizes from API
			} catch (error) {
				console.error("Error fetching sizes:", error);
			}
		};

		fetchSizes();
	}, [id]);
	return (
		<Box
			sx={{
				position: "absolute",
				bottom: 0,
				right: 0,
				zIndex: 50,
			}}
		>
			<SpeedDial
				ariaLabel="Buy Now"
				direction="up"
				sx={{
					"& .MuiSpeedDial-fab": {
						width: { s: "1rem", md: "3.5rem" },
						backgroundColor: "transparent",
						color: "white",
						backgroundSize: "cover",
						transition: "background-image 0.3s ease-in-out",
					},
					"& .MuiSpeedDial-fab:hover": {
						backgroundImage: `url("/assets/night.png")`,
						backgroundColor: "transparent",
					},
				}}
				icon={<SpeedDialIcon openIcon={<AddShoppingCartIcon />} />}
			>
				{sizes &&
					sizes.map((size) =>
						size.stock !== 0 ? (
							<SpeedDialAction
								key={size._id}
								icon={size.size}
								tooltipTitle={
									size.stock < 10 ? "LOW ON STOCK" : ""
								}
								sx={{
									fontSize: { s: "0.5rem", md: "1.2rem" },
									width: { s: "1rem", md: "3rem" },
									height: { s: "1rem", md: "3rem" },
									backdropFilter: "blur(20px)",
									backgroundColor: "transparent",
									color: "white",
									border: "1px solid",
									"&:hover": {
										backgroundColor: "#0e0d1d",
										borderColor: "white",
									},
								}}
							/>
						) : null
					)}
			</SpeedDial>
		</Box>
	);
}
