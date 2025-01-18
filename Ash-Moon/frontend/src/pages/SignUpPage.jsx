import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "motion/react";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LockIcon from "@mui/icons-material/Lock";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { signup } from "../app/feature/authSlice";
const SignUpPage = () => {
	const [userForm, setUserForm] = useState({
		email: "",
		name: "",
		password: "",
		confirmPassword: "",
		phone: "",
		dob: "",
	});
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const handleChange = (e) => {
		setUserForm({
			...userForm,
			[e.target.name]: e.target.value,
		});
	};
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
	};
	return (
		<div className="flex flex-col justify-center py-12 sm:px-6 lg:px-12 ">
			<motion.div
				className="sm:mx-auto sm:w-full sm:max-w-2xl mx-auto text-center rounded-2xl "
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				<h2 className="zen-dots text-3xl py-3 px-3 shadow-2xl  rounded-2xl capitalize ">
					Create an Account
				</h2>
				<p className="capitalize text-red-400 max-w-56 mx-auto">
					{error}
				</p>
				<div className="py-4 pb-10 px-10 shadow-2xl rounded-2xl">
					<form className="space-y-10" onSubmit={handleSubmit}>
						<div className="flex gap-10 gap-y-12 ">
							<div className="space-y-4">
								{/* Name */}
								<div className="flex flex-col justify-center items-left w-fit mx-auto gap-1">
									<label
										htmlFor="name"
										className="
                                                                 text-sm tracking-wide zen-dots text-left"
									>
										Full Name
									</label>
									<div className="relative">
										<PersonIcon className="absolute text-zinc-400 top-2 left-3" />
										<input
											className="pl-10 py-2 rounded-lg placeholder:text-zinc-400 text-center placeholder:text-left text-[#000031]"
											id="name"
											name="name"
											type="text"
											required
											value={userForm.name}
											onChange={handleChange}
											placeholder="John Doe"
										/>
									</div>
								</div>
								{/* Email */}
								<div className="flex flex-col justify-center items-left w-fit mx-auto gap-1">
									<label
										htmlFor="email"
										className="
                                                                 text-sm tracking-wide zen-dots text-left"
									>
										Email
									</label>
									<div className="relative">
										<EmailIcon className="absolute text-zinc-400 top-2 left-3" />
										<input
											className="pl-10 py-2 rounded-lg placeholder:text-zinc-400 text-center placeholder:text-left text-[#000031]"
											id="email"
											name="email"
											type="email"
											required
											value={userForm.email}
											onChange={handleChange}
											placeholder="you@email.com"
										/>
									</div>
								</div>
								{/* Phone */}
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
											name="phone"
											type="phone"
											required
											value={userForm.phone}
											onChange={handleChange}
											placeholder="+44"
										/>
									</div>
								</div>
							</div>
							<div className="space-y-4">
								{/* Date of Birth */}
								<div className="flex flex-col justify-center items-left w-full mx-auto gap-1">
									<label
										htmlFor="dob"
										className="
                                                                                         text-sm tracking-wide zen-dots text-left"
									>
										Date of Birth
									</label>
									<div className="relative">
										<CalendarTodayIcon className="absolute text-zinc-400 top-2 left-3" />
										<input
											className="pl-10 py-2 rounded-lg w-full placeholder:text-zinc-400 text-center placeholder:text-left text-[#000031]"
											id="dob"
											name="dob"
											type="date"
											required
											value={userForm.dob}
											onChange={handleChange}
											placeholder="10/07/2001"
										/>
									</div>
								</div>
								{/* Password */}
								<div className="flex flex-col justify-center items-left w-full mx-auto gap-1">
									<label
										htmlFor="password"
										className="
                                                                                         text-sm tracking-wide zen-dots text-left"
									>
										Password
									</label>
									<div className="relative">
										<LockIcon className="absolute text-zinc-400 top-2 left-3" />
										<input
											className="pl-10 py-2 rounded-lg w-full placeholder:text-zinc-400 text-center placeholder:text-left text-[#000031]"
											id="password"
											name="password"
											type="password"
											required
											value={userForm.password}
											onChange={handleChange}
										/>
									</div>
								</div>
								{/* Confirm Password */}
								<div className="flex flex-col justify-center items-left w-full mx-auto gap-1">
									<label
										htmlFor="confirmPassword"
										className="
                                                                                         text-sm tracking-wide zen-dots text-left"
									>
										Confirm Password
									</label>
									<div className="relative">
										<LockIcon className="absolute text-zinc-400 top-2 left-3" />
										<input
											className="pl-10 py-2 rounded-lg w-full placeholder:text-zinc-400 text-center placeholder:text-left text-[#000031]"
											id="confirmPassword"
											name="confirmPassword"
											type="password"
											required
											value={userForm.confirmPassword}
											onChange={handleChange}
										/>
									</div>
								</div>
							</div>
						</div>
						<button
							className=" px-4 py-3 shadow-md shadow-slate-50 border rounded-xl
                            hover:shadow-none hover:bg-[#000031] hover:border-[#000031] active:scale-95 active:border-slate-50 active:shadow-sm "
							type="submit"
						>
							Sign Up
						</button>
					</form>
					<motion.div
						className="m-5"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 1, duration: 1 }}
					>
						<p>
							Already have an account?
							<br />
							<span className="underline hover:translate-y-2">
								<Link to="/login">Log In</Link>
							</span>{" "}
							instead
						</p>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
};

export default SignUpPage;
