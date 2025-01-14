import { redis } from "../lib/redis.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// HELPER FUNCTIONS
const generateTokens = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15m",
	});
	const refreshToken = jwt.sign(
		{ userId },
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: "7d",
		}
	);
	return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
	await redis.set(
		`refresh_token:${userId}`,
		refreshToken,
		"EX",
		7 * 24 * 60 * 60
	); // 7days
};

const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
};

//TODO SIGNUP Controller
export const signup = async (req, res) => {
	const { email, password, name, dob, phone } = req.body;
	if (!email && !password && !name && !dob && !phone) {
		res.status(404).json({ error: "Not all the field are filled in!" });
	}

	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		const userData = {
			name,
			email,
			password,
			phone,
			dob,
		};

		const user = await User.create(userData);
		// AUTHENTICATION TOKEN
		const { accessToken, refreshToken } = generateTokens(user._id);
		await storeRefreshToken(user._id, refreshToken);
		setCookies(res, accessToken, refreshToken);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			dob: user.dob,
			phone: user.phone,
			role: user.role,
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

//TODO LOGIN Controller
export const login = async (req, res) => {
	const { email, password, phone } = req.body;
	if ((!email && !phone) || !password) {
		return res
			.status(400)
			.json({ error: "Email/Phone and Password are required" });
	}
	try {
		const query = {};
		if (email) query.email = email;
		if (phone) query.phone = phone;
		const user = await User.findOne(query);
		if (!user) {
			return res.status(404).json({ error: "User Not Found" });
		}
		if (await user.comparePassword(password)) {
			// AUHNETICATION
			const { accessToken, refreshToken } = generateTokens(user._id);
			await storeRefreshToken(user._id, refreshToken);
			setCookies(res, accessToken, refreshToken);
			res.json({
				success: true,
				message: "Login Successful",
				data: {
					_id: user._id,
					name: user.name,
					email: user.email,
					phone: user.phone,
					dob: user.dob,
					role: user.role,
					profileImg: user.profileImg,
				},
			});
		} else {
			res.status(404).json({ error: "Invalid credentials" });
		}
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

//TODO LOGOUT Controller
export const logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (refreshToken) {
			const decoded = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			);
			await redis.del(`refresh_token:${decoded.userId}`);
		} else {
			return res.status(400).json({ message: "No refresh token found" });
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully", user: decoded.userId });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
