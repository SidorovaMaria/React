import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log("MongoDB connected:", conn.connection.name);
	} catch (error) {
		console.log("Failed to connect to MONGODB");
		process.exit();
	}
};
