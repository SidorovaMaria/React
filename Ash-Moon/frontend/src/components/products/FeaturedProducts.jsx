import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedProducts } from "../../app/feature/productSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import OpenIconSpeedDial from "./SpeedBuy";

const FeaturedProducts = () => {
	const dispatch = useDispatch();
	const { featuredProducts, isLoading, error } = useSelector(
		(state) => state.product
	);

	const [hoveredProduct, setHoveredProduct] = useState(null);

	useEffect(() => {
		dispatch(getFeaturedProducts());
	}, [dispatch]);

	if (isLoading) {
		return (
			<Box sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<div className="">
			{featuredProducts && featuredProducts.length > 0 ? (
				<>
					<div
						className="flex component-with-scrollbar overflow-x-scroll snap-x space-x-4 lg:space-x-12 py-4"
						style={{ maxWidth: "100%" }}
					>
						{featuredProducts.map((product) => {
							const isHovered = hoveredProduct === product._id;

							return (
								<div
									key={product._id}
									className="flex flex-col items-center justify-center gap-2 relative pb-5"
								>
									<div
										className="w-24 md:w-36 lg:w-60 relative "
										onMouseEnter={() =>
											setHoveredProduct(product._id)
										}
										onMouseLeave={() =>
											setHoveredProduct(null)
										}
									>
										{/* First Image */}
										<img
											src={product.productImages[0]}
											alt={product.name}
											className={`w-full rounded-3xl  transition-opacity duration-500 ease-in-out ${
												isHovered
													? "opacity-0"
													: "opacity-100"
											}`}
										/>
										{/* Second Image */}
										<img
											src={product.productImages[1]}
											alt={product.name}
											className={`w-full rounded-3xl  absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${
												isHovered
													? "opacity-100"
													: "opacity-0"
											}`}
										/>
									</div>

									<h3 className="text-center uppercase text-xs lg:text-lg pl-2 w-fit">
										{product.name}
									</h3>
									<p className=" text-xs lg:text-xl">
										$ {product.price}
									</p>
									<OpenIconSpeedDial id={product._id} />
								</div>
							);
						})}
					</div>
				</>
			) : (
				<p>No featured products available.</p>
			)}
		</div>
	);
};

export default FeaturedProducts;
