import * as React from "react";
import { motion } from "framer-motion"; // Ensure framer-motion is correctly imported
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import PasswordIcon from "@mui/icons-material/Password";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { InputAdornment, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, signup } from "../app/feature/authSlice";
import { useState } from "react";
import BasicButton from "../design/BasicButton";

const SignUpDialog = ({ handleClose, open, setAuth, handleClickOpen }) => {
	const [userForm, setUserForm] = useState({
		email: "",
		name: "",
		password: "",
		confirmPassword: "",
		phone: "",
		dob: "",
	});
	const [error, setError] = React.useState("");
	const [signInOption, setSignInOption] = React.useState("email");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (userForm.confirmPassword === userForm.password) {
				const response = await dispatch(
					signup({
						email: userForm.email,
						name: userForm.name,
						password: userForm.password,
						phone: userForm.phone,
						dob: userForm.dob,
					})
				).unwrap();
				console.log("SignUP Successfull", response);
				navigate("/");
			}
		} catch (error) {
			console.log(error.message, "error full");
			setError(error.message || "An error occurred during signup");
			console.error("Signup failed:", error);
		}
		dispatch(signup(userForm));

		handleClose();
	};

	return (
		<Dialog
			fullWidth={true}
			maxWidth="md"
			open={open}
			onClose={handleClose}
			BackdropProps={{
				sx: {
					backdropFilter: "blur(5px)", // Apply the blur effect
				},
			}}
			PaperProps={{
				sx: {
					backdropFilter: "blur(10px)",
					backgroundColor: "#07060f",
					borderColor: "white",
					borderWidth: "2px",
					borderRadius: "20px",
					// padding: "7px",
					color: "white",
				}, // Change this to your desired color
				component: "form",
				onSubmit: handleSubmit,
			}}
		>
			<motion.div
				className="w-full text-center rounded-2xl flex flex-col "
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<DialogTitle
					sx={{
						fontSize: "1.875rem",
						padding: "12px 12px",
						backgroundColor: "transparent",
						borderRadius: "1rem", // Equivalent to rounded-2xl
						fontFamily: "Zen Dots, sans-serif", // Custom font for zen-dots
					}}
				>
					Create an Account
				</DialogTitle>
				<DialogContent
					dividers
					sx={{
						borderColor: "white",
					}}
				>
					<p className="capitalize text-red-400 max-w-56 mx-auto m-1">
						{error}
					</p>
					{/* Name */}
					<div className="md:flex  gap-10 gap-y-12 items-center justify-center">
						<div>
							<div className="flex flex-col justify-center items-left w-fit mx-auto gap-1  pb-5">
								<label
									htmlFor="name"
									className="text-sm tracking-wide zen-dots text-left"
								>
									Full Name
								</label>
								<div className="relative">
									<TextField
										id="name"
										type="name"
										required
										fullWidth
										value={userForm.name}
										onChange={(e) =>
											setUserForm((prev) => ({
												...prev,
												name: e.target.value,
											}))
										}
										placeholder="John Doe"
										sx={{
											outlineColor: "white",
											border: "2px solid white",
											borderRadius: "0.5rem",
											backgroundColor: "transparent",
											"& .MuiInputBase-input": {
												color: "white",
												fontFamily:
													"Zen Dots, sans-serif",
											},
											"& .MuiOutlinedInput-root": {
												"&:hover fieldset": {
													borderColor: "white",
												},
												"&.Mui-focused fieldset": {
													borderColor: "03468f80", //
												},
											},
										}}
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">
														<PersonIcon
															sx={{
																color: "white",
															}}
														/>
													</InputAdornment>
												),
											},
										}}
										variant="outlined"
									/>
								</div>
							</div>
							{/* Email */}
							<div className="flex flex-col justify-center items-left w-fit mx-auto gap-1  pb-5">
								<label
									htmlFor="email"
									className="text-sm tracking-wide zen-dots text-left"
								>
									Email
								</label>
								<div className="relative">
									<TextField
										id="email"
										type="email"
										required
										fullWidth
										value={userForm.email}
										onChange={(e) =>
											setUserForm((prev) => ({
												...prev,
												email: e.target.value,
											}))
										}
										placeholder="you@example.com"
										sx={{
											outlineColor: "white",
											border: "2px solid white",
											borderRadius: "0.5rem",
											backgroundColor: "transparent",
											"& .MuiInputBase-input": {
												color: "white",
												fontFamily:
													"Zen Dots, sans-serif",
											},
											"& .MuiOutlinedInput-root": {
												"&:hover fieldset": {
													borderColor: "white",
												},
												"&.Mui-focused fieldset": {
													borderColor: "03468f80", //
												},
											},
										}}
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">
														<EmailIcon
															sx={{
																color: "white",
															}}
														/>
													</InputAdornment>
												),
											},
										}}
										variant="outlined"
									/>
								</div>
							</div>
							{/* Phone */}
							<div className="flex flex-col justify-center items-left w-fit mx-auto gap-1  pb-5">
								<label
									htmlFor="phone"
									className="text-sm tracking-wide zen-dots text-left"
								>
									Phone Number
								</label>
								<div className="relative">
									<TextField
										id="phone"
										type="phone"
										required
										fullWidth
										value={userForm.phone}
										onChange={(e) =>
											setUserForm((prev) => ({
												...prev,
												phone: e.target.value,
											}))
										}
										placeholder="+44"
										sx={{
											outlineColor: "white",
											border: "2px solid white",
											borderRadius: "0.5rem",
											backgroundColor: "transparent",
											"& .MuiInputBase-input": {
												color: "white",
												fontFamily:
													"Zen Dots, sans-serif",
											},
											"& .MuiOutlinedInput-root": {
												"&:hover fieldset": {
													borderColor: "white",
												},
												"&.Mui-focused fieldset": {
													borderColor: "03468f80", //
												},
											},
										}}
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">
														<LocalPhoneIcon
															sx={{
																color: "white",
															}}
														/>
													</InputAdornment>
												),
											},
										}}
										variant="outlined"
									/>
								</div>
							</div>
						</div>
						<div>
							{/* DOB */}
							<div className="flex flex-col justify-center items-left mx-auto gap-1 pb-5">
								<label
									htmlFor="dob"
									className="
                                                                                         text-sm tracking-wide zen-dots text-left"
								>
									Date of Birth
								</label>
								<div className="relative">
									<TextField
										id="dob"
										type="date"
										required
										fullWidth
										value={userForm.dob}
										onChange={(e) =>
											setUserForm((prev) => ({
												...prev,
												dob: e.target.value,
											}))
										}
										placeholder=""
										sx={{
											outlineColor: "white",
											border: "2px solid white",
											borderRadius: "0.5rem",
											backgroundColor: "transparent",
											"& .MuiInputBase-input": {
												color: "white",
												fontFamily:
													"Zen Dots, sans-serif",
											},
											"& .MuiOutlinedInput-root": {
												"&:hover fieldset": {
													borderColor: "white",
												},
												"&.Mui-focused fieldset": {
													borderColor: "03468f80", //
												},
											},
										}}
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">
														<CalendarTodayIcon
															sx={{
																color: "white",
															}}
														/>
													</InputAdornment>
												),
											},
										}}
										variant="outlined"
									/>
								</div>
							</div>
							{/* Password */}
							<div className="flex flex-col justify-center items-left mx-auto gap-1 pb-5">
								<label
									htmlFor="password"
									className="
                                                                                         text-sm tracking-wide zen-dots text-left"
								>
									Password
								</label>
								<div className="relative">
									<TextField
										id="password"
										type="password"
										required
										fullWidth
										value={userForm.password}
										onChange={(e) =>
											setUserForm((prev) => ({
												...prev,
												password: e.target.value,
											}))
										}
										placeholder=""
										sx={{
											outlineColor: "white",
											border: "2px solid white",
											borderRadius: "0.5rem",
											backgroundColor: "transparent",
											"& .MuiInputBase-input": {
												color: "white",
												fontFamily:
													"Zen Dots, sans-serif",
											},
											"& .MuiOutlinedInput-root": {
												"&:hover fieldset": {
													borderColor: "white",
												},
												"&.Mui-focused fieldset": {
													borderColor: "03468f80", //
												},
											},
										}}
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">
														<PasswordIcon
															sx={{
																color: "white",
															}}
														/>
													</InputAdornment>
												),
											},
										}}
										variant="outlined"
									/>
								</div>
							</div>
							{/* ConfirmPassword */}
							<div className="flex flex-col justify-center items-left mx-auto gap-1 pb-5">
								<label
									htmlFor="confirmPassword"
									className="
                                                                                         text-sm tracking-wide zen-dots text-left"
								>
									Confirm Password
								</label>
								<div className="relative">
									<TextField
										id="confirmPassword"
										type="password"
										required
										fullWidth
										value={userForm.confirmPassword}
										onChange={(e) =>
											setUserForm((prev) => ({
												...prev,
												confirmPassword: e.target.value,
											}))
										}
										placeholder=""
										sx={{
											outlineColor: "white",
											border: "2px solid white",
											borderRadius: "0.5rem",
											backgroundColor: "transparent",
											"& .MuiInputBase-input": {
												color: "white",
												fontFamily:
													"Zen Dots, sans-serif",
											},
											"& .MuiOutlinedInput-root": {
												"&:hover fieldset": {
													borderColor: "white",
												},
												"&.Mui-focused fieldset": {
													borderColor: "white", //
												},
											},
										}}
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">
														<PasswordIcon
															sx={{
																color: "white",
															}}
														/>
													</InputAdornment>
												),
											},
										}}
										variant="outlined"
									/>
								</div>
							</div>
						</div>
					</div>
					<motion.div
						className="mb-2"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 1, duration: 1 }}
					>
						<p>Already have an account?</p>
						<span className="underline hover:translate-y-2">
							<BasicButton
								variant=""
								sx={{ padding: "0px 2px" }}
								onClick={() => {
									handleClose();
									setAuth("login");
									handleClickOpen();
								}}
							>
								Log In
							</BasicButton>
						</span>{" "}
						instead
					</motion.div>
				</DialogContent>
				<DialogActions
					sx={{
						margin: "5px 0",
						alignItems: "center",
						justifyContent: "space-around",
						gap: "2rem",
						display: "flex",
					}}
				>
					<Button
						sx={{
							padding: "12px 16px",
							color: "#7e0000",
							fontFamily: "Zen Dots",
							border: "2px solid #7e0000",
							borderRadius: "0.75rem",
							boxShadow: "0px 2px 10px #7e0000",
							transition: "all 0.3s ease",
							"&:hover": {
								backgroundColor: "#03468f80", // Dark background on hover
								borderColor: "#03468f80", // Dark border on hover
								boxShadow: "none", // Remove shadow on hover
							},
							"&:active": {
								transform: "scale(0.95)", // Scale down on click
								borderColor: "slategray", // Active border color
								boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", // Active shadow
							},
						}}
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						sx={{
							padding: "12px 16px",
							color: "white",
							fontFamily: "Zen Dots",
							border: "2px solid white",
							borderRadius: "0.75rem",
							boxShadow: "0px 2px 6px white",
							transition: "all 0.3s ease",
							"&:hover": {
								backgroundColor: "#03468f80", // Dark background on hover
								borderColor: "#03468f80", // Dark border on hover
								boxShadow: "none", // Remove shadow on hover
							},
							"&:active": {
								transform: "scale(0.95)", // Scale down on click
								borderColor: "slategray", // Active border color
								boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", // Active shadow
							},
						}}
					>
						Sign Up
					</Button>
				</DialogActions>
			</motion.div>
		</Dialog>
	);
};

export default SignUpDialog;
