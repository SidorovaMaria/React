import { dbUsers } from "../db/connection.js";
import { ObjectId } from "mongodb";

export const getUserByEmail = async (email) => {
  try {
    const collection = dbUsers.collection("allUsers");
    return await collection.findOne({ email });
  } catch (err) {
    console.error("Error fetching user by email:", err);
    return null;
  }
};

export const createUser = async (user) => {
  try {
    const collection = dbUsers.collection("allUsers");
    return await collection.insertOne(user);
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Error creating user");
  }
};
export const updateUser = async (userId, updateFields) => {
  try {
    const collection = dbUsers.collection("allUsers");
    // Update the user document based on the userId
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) }, // Ensure _id is in ObjectId format
      { $set: updateFields } // Set the updated fields
    );
    return result.modifiedCount > 0; // Return true if something was modified
  } catch (err) {
    console.error("Error updating user:", err);
    throw new Error("Error updating user");
  }
};
