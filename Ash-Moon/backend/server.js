import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDB } from "./lib/db.js";
dotenv.config();

// Start App
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
	console.log(`Server Running on port: ${PORT}`);
	connectToDB();
});
