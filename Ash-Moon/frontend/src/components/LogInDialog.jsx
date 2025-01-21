import * as React from "react";
import { motion } from "framer-motion"; // Ensure framer-motion is correctly imported
import Button from "@mui/material/Button";
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
import { login } from "../app/feature/authSlice";
import BasicButton from "../design/BasicButton";

const LogInDialog = ({ handleClose, open, setAuth, handleClickOpen }) => {
	const [userForm, setUserForm] = React.useState({
		email: "",
		password: "",
		phone: "",
	});
	const [error, setError] = React.useState("");
	const [signInOption, setSignInOption] = React.useState("email");
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
			).unwrap(); // Call your login function (API call)
			console.log("Login successful:", response);
			handleClose();
		} catch (error) {
			setError(error.error || "An error occurred during login");
			console.error("Login failed:", error);
		}
	};

	return (
		<>
			<Dialog
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
						padding: "7px",
						color: "white",
					}, // Change this to your desired color
					component: "form",
					onSubmit: handleSubmit,
				}}
			>
				<motion.div
					className="sm:mx-auto sm:w-full sm:max-w-md mx-auto text-center rounded-2xl"
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
						Login Into Your Account
					</DialogTitle>
					<DialogContent dividers sx={{ borderColor: "white" }}>
						<ToggleButtonGroup
							value={signInOption}
							exclusive
							aria-label="Sign In Option"
							onChange={(e, option) => {
								setSignInOption(option);
							}}
							sx={{
								margin: "5px",
								marginTop: "5px",
								borderWidth: "4px",
								marginBottom: "10px",
								borderColor: "#03468f80",

								borderRadius: "10px",
								backgroundColor: "tranredsparent", // Background color for the group
								"& .MuiToggleButton-root": {
									color: "white", // Default color for all buttons
									fontSize: "10px",
									fontFamily: "Zen Dots",
									"&.Mui-selected": {
										backgroundColor: "#03468f80",
										color: "white",
									},
								},
							}}
						>
							<ToggleButton value="email">Email</ToggleButton>
							<ToggleButton value="phone">Phone</ToggleButton>
						</ToggleButtonGroup>

						<p className="capitalize text-red-400 max-w-56 mx-auto m-1">
							{error}
						</p>

						{/* Conditional Form for Email or Phone */}
						{signInOption === "email" ? (
							<div className="flex flex-col justify-center items-left w-fit mx-auto gap-1  pb-5">
								<label
									htmlFor="email"
									className="text-sm tracking-wide zen-dots text-left"
								>
									Email Address
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
						) : (
							<div className="flex flex-col justify-center items-left w-fit mx-auto gap-1 pb-5">
								<label
									htmlFor="phone"
									className="text-sm tracking-wide zen-dots text-left"
								>
									Phone Number
								</label>
								<div className="relative">
									<TextField
										id="phone"
										type="tel"
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
						)}

						{/* Password Input */}
						<div className="flex flex-col justify-center items-left w-fit mx-auto gap-1 pb-5">
							<label
								htmlFor="password"
								className="text-sm tracking-wide zen-dots text-left"
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
									sx={{
										outlineColor: "white",
										border: "2px solid white",
										borderRadius: "0.5rem",

										backgroundColor: "transparent",
										"& .MuiInputBase-input": {
											color: "white",
											fontFamily: "Zen Dots, sans-serif",
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
									placeholder="********"
								/>
							</div>
						</div>
						<motion.div
							className="mb-2"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 1, duration: 1 }}
						>
							<p>Not yet registered?</p>
							<span className="underline hover:translate-y-2">
								<BasicButton
									variant=""
									sx={{ padding: "0px 2px" }}
									onClick={() => {
										handleClose();
										setAuth("signup");
										handleClickOpen();
									}}
								>
									Sign Up
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
						<BasicButton
							sx={{
								color: "#7e0000",
							}}
							onClick={handleClose}
							variant=""
						>
							Cancel
						</BasicButton>
						<BasicButton variant="outlined shadows" type="submit">
							Login
						</BasicButton>
					</DialogActions>
				</motion.div>
			</Dialog>
		</>
	);
};

export default LogInDialog;
