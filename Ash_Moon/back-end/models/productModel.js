import { ObjectId } from "mongodb";
import { dbProducts } from "../db/connection.js";

// GET ALL products in the collection "AllProducts"
export async function getAllProducts() {
  try {
    let collection = await dbProducts.collection("allProducts");
    return await collection.find({}).toArray();
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw new Error("Error fetching all products");
  }
}

// Get a single product by ID
export async function getProductById(id) {
  try {
    let collection = await dbProducts.collection("allProducts");
    let query = { _id: new ObjectId(id) };
    return await collection.findOne(query);
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw new Error("Error fetching product");
  }
}

// Add a new product
export async function addProduct(newProduct) {
  try {
    let collection = await dbProducts.collection("allProducts");
    return await collection.insertOne(newProduct);
  } catch (error) {
    console.error("Error adding new product:", error);
    throw new Error("Error adding new product");
  }
}

// Update a product by ID
export async function updateProduct(id, updatedProduct) {
  try {
    let collection = await dbProducts.collection("allProducts");
    let query = { _id: new ObjectId(id) };
    return await collection.updateOne(query, { $set: updatedProduct });
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw new Error("Error updating product");
  }
}

// Delete a product by ID
export async function deleteProduct(id) {
  try {
    let collection = await dbProducts.collection("allProducts");
    let query = { _id: new ObjectId(id) };
    return await collection.deleteOne(query);
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw new Error("Error deleting product");
  }
}
