import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			requried: [true, "Name is Required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
			match: [
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Please fill a valid email address",
			], // Regular expression for email validation
		},
		phone: {
			type: String,
			required: [true, "Phone number is required"],
			match: [/^\+?[1-9]\d{1,14}$/, "Please fill a valid phone number"], // E.164 format validation
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [8, "Password must contains at least 8 characters"],
			match: [
				/^(?=.*[!@#$%^&*(),.?":{}|<>])/, // Require at least one special character
				"Password must contain at least one special character",
			],
		},
		profileImg: {
			type: String,
			default: "../assets/profile-boy-icon.png",
		},
		cartItems: [
			{
				quantity: {
					type: Number,
					default: 1,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
				options: {
					size: {
						type: String,
						enum: ["S", "M", "L", "XL"],
					},
					color: {
						type: String,
					},
				},
			},
		],
		favItems: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
			},
		],
		role: {
			type: String,
			enum: ["customer", "admin"],
			default: "customer",
		},
	},
	{
		timestamps: true,
	}
);
// Hash Password before saving to the databse!
userSchema.pre("save", async (next) => {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});
userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
