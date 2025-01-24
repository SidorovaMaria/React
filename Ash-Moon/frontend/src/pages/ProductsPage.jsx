import React from "react";
import { motion } from "framer-motion";
import BasicButton from "../design/BasicButton";
import { useNavigate, useParams } from "react-router-dom";
import ProductsGallery from "../components/products/ProductsGallery";

const ProductsPage = () => {
	const { categories } = useParams();
	const navigate = useNavigate();
	const categoriesList = ["hoodie", "sweatshirt", "sweater", "jacket"];

	// Extract category and subcategory from the URL
	const [category, subcategory] = categories ? categories.split(",") : [];

	const handleCategoryOption = (cat) => {
		if (category === cat) {
			navigate("/products");
		} else {
			navigate(`/products/${cat}${subcategory ? "," + subcategory : ""}`);
		}
	};

	const handleSubcategoryOption = (cat, subcat) => {
		if (subcategory === subcat) {
			navigate(`/products/${cat}`);
		} else {
			navigate(`/products/${cat},${subcat}`);
		}
	};

	return (
		<div className="">
			{/* Banner Section */}
			<motion.div
				className="pt-24 px-10 lg:px-20 lg:pt-28 pb-5 relative"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				<div
					className={`h-full w-full absolute top-0 right-0 contrast-200 -z-50 transition-all ease-out duration-500 ${
						category ? "h-[105%]" : "h-full"
					}`}
					style={{
						backgroundImage: "url('/assets/night.png')",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				></div>

				<div className="md:flex md:justify-between lg:mx-20">
					<h1 className="uppercase text-4xl my-5 text-center md:text-left">
						Shop All
					</h1>

					{/* Category Selection */}
					<div className="flex flex-col items-end">
						<div className="flex gap-7">
							<BasicButton
								onClick={() => handleCategoryOption("woman")}
								variant={
									category === "woman"
										? "filled outlined"
										: "outlined"
								}
							>
								Woman
							</BasicButton>
							<BasicButton
								onClick={() => handleCategoryOption("man")}
								variant={
									category === "man"
										? "filled outlined"
										: "outlined"
								}
							>
								Man
							</BasicButton>
						</div>

						{/* Animated Divider */}
						<hr
							className={`bg-white text-white transition-all ease-out duration-1000 h-1 w-full z-10 my-5 rounded-xl ${
								category ? "w-full" : "w-[90%]"
							}`}
						/>

						{/* Subcategories (Only visible if a category is selected) */}
						{category && (
							<motion.div
								className="flex gap-5 items-center justify-end flex-wrap max-w-md"
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								{categoriesList.map((cat) => (
									<BasicButton
										sx={{
											fontSize: "0.7rem",
											padding: "0.6rem 1rem",
										}}
										key={cat}
										onClick={() =>
											handleSubcategoryOption(
												category,
												cat
											)
										}
										variant={
											subcategory === cat
												? "filled outlined"
												: "outlined"
										}
									>
										{cat}
									</BasicButton>
								))}
							</motion.div>
						)}
					</div>
				</div>
			</motion.div>

			{/* Products Gallery */}
			<motion.div
				className="my-16 mx-20"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5, duration: 1 }}
			>
				<ProductsGallery categories={categories} />
			</motion.div>
		</div>
	);
};

export default ProductsPage;
