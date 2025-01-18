import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetError } from "../app/feature/authSlice";
import { motion } from "motion/react";
import EmailIcon from "@mui/icons-material/Email";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
	const [userForm, setUserForm] = useState({
		email: "",
		password: "",
		phone: "",
	});
	const [error, setError] = useState("");
	const [signInOption, setSignInOption] = useState("email");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await dispatch(
				login({
					email: userForm.email,
					password: userForm.password,
					phone: userForm.phone,
				})
			).unwrap(); // Unwrap to get direct response or throw an error
			// TODO implement notification banner
			console.log("Login successful:", response);
			navigate("/");
		} catch (error) {
			setError(error.error || "An error occurred during login");
			console.error("Login failed:", error);
		}
	};
	return (
		<div className="flex flex-col justify-center py-12 sm:px-6 lg:px-12">
			<motion.div
				className="sm:mx-auto sm:w-full sm:max-w-md mx-auto text-center rounded-2xl "
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				<h2 className="zen-dots text-3xl py-3 px-3 shadow-2xl  rounded-2xl ">
					Login Into Your Account
				</h2>

				<ToggleButtonGroup
					value={signInOption}
					exclusive
					aria-label="Sign In Option"
					onChange={(e, option) => {
						setSignInOption(option);
					}}
					sx={{
						margin: "10px",
						marginTop: "20px",
						borderWidth: "4px",
						borderColor: "#000031",
						borderRadius: "10px", // Customizing border radius
						backgroundColor: "transparent", // Background color for the group
						"& .MuiToggleButton-root": {
							color: "white", // Default color for all buttons
							fontSize: "10px",
							fontFamily: "Zen Dots",
							// Font size for the buttons
							"&.Mui-selected": {
								backgroundColor: "#000031",
								color: "white",
							},
						},
					}}
				>
					<ToggleButton value="email">Email</ToggleButton>
					<ToggleButton value="phone">Phone</ToggleButton>
				</ToggleButtonGroup>
				<p className="capitalize text-red-400 max-w-56 mx-auto">
					{error}
				</p>

				<div className="py-4 pb-10 px-10 shadow-2xl rounded-2xl">
					<form onSubmit={handleSubmit} className="space-y-8">
						{/* Email && Password */}
						{signInOption === "email" ? (
							<div className="flex flex-col justify-center items-left w-fit mx-auto gap-1">
								<label
									htmlFor="email"
									className="
                                 text-sm tracking-wide zen-dots text-left"
								>
									Email Address
								</label>
								<div className="relative">
									<EmailIcon className="absolute text-zinc-400 top-2 left-2" />
									<input
										className="pl-10 py-2 text-center rounded-lg w-fit placeholder:text-zinc-400 text-[#000031]"
										id="email"
										type="email"
										required
										onChange={(e) =>
											setUserForm((prev) => ({
												...prev,
												email: e.target.value, //
											}))
										}
										value={userForm.email}
										placeholder="you@example.com"
									/>
								</div>
							</div>
						) : (
							<div className="flex flex-col justify-center items-left w-fit mx-auto gap-1">
								<label
									htmlFor="phone"
									className="
                                 text-sm tracking-wide zen-dots text-left"
								>
									Phone Number
								</label>
								<div className="relative">
									<LocalPhoneIcon className="absolute text-zinc-400 top-2 left-3" />
									<input
										className="pl-10 py-2 rounded-lg placeholder:text-zinc-400 text-center placeholder:text-left text-[#000031]"
										id="phone"
										type="phone"
										required
										value={userForm.phone}
										onChange={(e) =>
											setUserForm((prev) => ({
												...prev,
												phone: e.target.value, //
											}))
										}
										placeholder="+44"
									/>
								</div>
							</div>
						)}
						<div className="flex flex-col justify-center items-left w-fit mx-auto gap-1">
							<label
								htmlFor="password"
								className="
                                 text-sm tracking-wide zen-dots text-left"
							>
								Password
							</label>
							<div className="relative">
								<EmailIcon className="absolute text-zinc-400 top-2 left-2" />
								<input
									className="pl-10 py-2 text-center rounded-lg w-fit placeholder:text-zinc-400 text-[#000031]"
									id="password"
									type="password"
									required
									onChange={(e) =>
										setUserForm((prev) => ({
											...prev,
											password: e.target.value, //
										}))
									}
									value={userForm.password}
									placeholder="********"
								/>
							</div>
						</div>
						<button
							className=" px-4 py-3 shadow-md shadow-slate-50 border rounded-xl
                            hover:shadow-none hover:bg-[#000031] hover:border-[#000031] active:scale-95 active:border-slate-50 active:shadow-sm "
							type="submit"
						>
							Sign In
						</button>
					</form>
					<motion.div
						className="m-5"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 1, duration: 1 }}
					>
						<p>
							Not yet registered?
							<br />
							<span className="underline hover:translate-y-2">
								<Link to="/signup">Sign Up</Link>
							</span>{" "}
							instead
						</p>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginPage;
