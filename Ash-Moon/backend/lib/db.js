import mongoose from "mongoose";
export const connectToDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`MongoDB connected:${conn.connection.host}`);
	} catch (error) {
		console.log(error.message, "Error connecting to Database");
		process.exit(1);
	}
};
