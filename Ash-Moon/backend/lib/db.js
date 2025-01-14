import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log("MongoDB connected:", conn.connection.name);
	} catch (error) {
		console.log("Failed to connect to MONGODB", error.message);
		process.exit(1);
	}
};
