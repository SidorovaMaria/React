import { redis } from "../lib/redis.js";
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
	try {
		const { name, description, price, category, sizes, isFeatured } =
			req.body;

		const product = await Product.create({
			name,
			description,
			price,
			category,
			sizes,
			isFeatured,
		});
		res.status(201).json(product);
	} catch (error) {
		console.log("error in CreateProduct", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("FeaturedProducts");
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}
		//if not in redis, fetch from mongoBD
		//Lean() is gonna return a plane jaascript object instead of mongodb document, which is good for performance
		featuredProducts = await Product.find({ isFeatured: true }).lean();
		if (!featuredProducts) {
			return res
				.status(400)
				.json({ message: "No featured products found" });
		}

		//store in Redis for Feature Quick access
		await redis.set("featured_products", JSON.stringify(featuredProducts));
		res.json(featuredProducts);
	} catch (error) {
		console.log("Error in getFeaturedProducts", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json({ products });
	} catch (error) {
		console.log(`Error fetching all products:${error.message}`);
		res.status(500).json({
			message: "Server Error",
			error: error.messages,
		});
	}
};
export const getProductsByCategory = async (req, res) => {
	const { categories } = req.params; // Fix variable name
	const categoryArray = categories.split(","); // Convert to an array

	try {
		const products = await Product.find({
			category: { $all: categoryArray },
		}); // Ensure all categories exist
		res.json(products);
	} catch (error) {
		console.error("Error in getProductsByCategory:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
