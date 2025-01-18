import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
const corsOptions = {
	origin: "http://localhost:5173", // Specify the front-end URL
	methods: "GET,POST,PUT,DELETE", // Allow necessary HTTP methods
	credentials: true, // Allow cookies or authorization headers
};

app.use(cors(corsOptions));

app.use(cookieParser());

//TODO AUTHENTICATION ROUTE
app.use("/ash-moon/auth", authRoutes);
//TODO PRODUCT ROUTE
// app.use("/ash&moon/products", productRoutes);

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});
