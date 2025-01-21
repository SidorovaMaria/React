import mongoose from "mongoose";
import monfoose from "mongoose";
const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Product name is required!"],
		},
		description: {
			type: String,
			required: [true, "Description is required!"],
		},
		price: {
			type: Number,
			requried: [true, "Price is requried"],
			min: 0,
		},
		image: {
			type: String,
			// required: [true, "Image URL is requried"],
		},
		category: {
			type: [String], // Ensures category is an array of strings
			required: true,
			default: [],
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		sizes: [
			{
				size: {
					type: String,
					required: true,
					enum: [, "XS", "S", "M", "L", "XL"],
				},
				stock: { type: Number, required: true, min: 0 }, // Stock per size
			},
		],
	},
	{
		timestamps: true,
	}
);
const Product = mongoose.model("Product", productSchema);
export default Product;
