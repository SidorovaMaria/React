import React, { useEffect, useRef, useState } from "react";
import OpenIconSpeedDial from "./SpeedBuy";
import {
	getAllProducts,
	getProductsByCategory,
} from "../../app/feature/productSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductsGallery = ({ categories }) => {
	const dispatch = useDispatch();
	const { products, isLoading, error } = useSelector(
		(state) => state.product
	);
	const [hoveredProduct, setHoveredProduct] = useState(null);

	useEffect(() => {
		if (categories) {
			dispatch(getProductsByCategory(categories));
		} else {
			dispatch(getAllProducts());
		}
	}, [categories, dispatch]);

	return (
		<div>
			{products && products.length > 0 ? (
				<>
					<div
						className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-y-5 gap-x-20"
						style={{ maxWidth: "100%" }} // Ensure the container is wide enough to scroll
					>
						{products.map((product) => {
							const isHovered = hoveredProduct === product._id;

							return (
								<div
									key={product._id}
									className="flex flex-col items-center justify-center gap-2 relative py-10"
								>
									<div
										className="w-60 relative rounded-3xl overflow-hidden "
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
											className={`w-full transition-opacity duration-500 ease-in-out ${
												isHovered
													? "opacity-0"
													: "opacity-100"
											}`}
										/>
										{/* Second Image */}
										<img
											src={product.productImages[1]}
											alt={product.name}
											className={`w-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${
												isHovered
													? "opacity-100"
													: "opacity-0"
											}`}
										/>
									</div>
									<OpenIconSpeedDial
										id={product._id}
										className="bottom-0"
									/>
									<h3 className="text-center  uppercase text-xl pl-2 w-fit">
										{product.name}
									</h3>
									<p className="text-xl">$ {product.price}</p>
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

export default ProductsGallery;
