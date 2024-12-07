import express from "express";
import {
  getAllProducts,
  getProductById,
  deleteProduct,
} from "../models/productModel.js";
import { dbProducts } from "../db/connection.js";

const router = express.Router();

// Route to get all products
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Error fetching products: " + error.message);
  }
});

// Route to get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    //Validate the ID format before querying
    if (!ObjectId.isValid(productId)) {
      return res.status(400).send("Invalid product ID format");
    }

    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("Error fetching product: " + error.message);
  }
});

// ! Will need to change later
// Route to add a new product
router.post("/", async (req, res) => {
  try {
    let newProduct = {
      name: req.body.name, //Name of the colthing item
      price: req.body.price, // Full price of the item
      category: req.body.category,
      // Possible Categories:
      // Shirts
      // Hoodies
      // Jacket
      // T-Shirt
      // Cargo
      // Denim
      images: req.body.images,
      // Array of images
      colors: req.body.colors,
      // Array of colors
      sizes: req.body.sizes,
      // Available sizes
      stock: req.body.stock,
      //Array of stocks by color:
      /** {color:'ColorTest',
       *   X: 25,
       *   XS: 34 } */
      IsFeatured: req.body.IsFeatured,
      //Is the item displayed on the Featured Page or Filter
      discount: req.body.discount,
      // Is item discounted?
      createdAt: req.body.createdAt,
      // Time when the product added to the database
    };
    let collection = await dbProducts.collection("allProducts");
    let result = await collection.insertOne(newProduct);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// Delete product by Id
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Optionally, validate the ID format
    if (!ObjectId.isValid(productId)) {
      return res.status(400).send("Invalid product ID format");
    }

    const result = await deleteProduct(productId); // Call model to delete the product
    if (result.deletedCount === 0) {
      return res.status(404).send("Product not found"); // If no matching product was found
    }

    res.status(200).send("Product deleted successfully"); // Send success response
  } catch (error) {
    res.status(500).send("Error deleting product: " + error.message); // Handle errors
  }
});

export default router;
