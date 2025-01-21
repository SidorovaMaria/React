import express from "express";
import {
	createProduct,
	getAllProducts,
	getFeaturedProducts,
	getProductsByCategory,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/featured", getFeaturedProducts);
router.get("/", getAllProducts);
router.get("/category/:categories", getProductsByCategory);
export default router;
