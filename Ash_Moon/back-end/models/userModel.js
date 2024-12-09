import { dbUsers } from "../db/connection.js";
import { ObjectId } from "mongodb";

export const getUserByEmail = async (email) => {
  const collection = dbUsers.collection("allUsers");
  return await collection.findOne({ email });
};

export const createUser = async (user) => {
  const collection = dbUsers.collection("allUsers");
  return await collection.insertOne(user);
};
