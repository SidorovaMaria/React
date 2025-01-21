import React, { useState } from "react";
import { motion } from "motion/react";
import LogInDialog from "../components/LogInDialog";
import AuthDialog from "../components/AuthDialog";
import BasicButton from "../design/BasicButton";
const HomePage = () => {
	const [featuredProducts, setFeaturedProducts] = useState(null);
	return (
		<div className="">
			{/* Main Banner */}
			<motion.div
				className="sm:mx-auto sm:w-full flex  flex-col items-center justify-around relative pt-20 lg:pt-[6.5rem]"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				<div
					className=" h-full w-full absolute  bottom-0 right-0  contrast-200 -z-50 "
					style={{
						backgroundImage: "url('/assets/night.png')",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				></div>
				<h1 className="text-3xl md:text-5xl py-10 text-center leading-snug  max-w-xs md:max-w-xl uppercase ">
					Find Your Signature Look with Us!
				</h1>
				{/* Buttons  */}
				<div className="flex gap-10 pt-5 pb-10 ">
					<BasicButton variant="outlined shadows">
						Shop Now
					</BasicButton>
					<BasicButton variant=" ">Learn More</BasicButton>
				</div>
			</motion.div>
			<motion.div
				className="sm:mx-auto sm:w-full max-w-7xl my-20  mx-auto relative "
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 1, duration: 1 }}
			>
				<h1 className="text-3xl flex items-baseline gap-5 ">
					<span className="w-fit whitespace-nowrap uppercase">
						Best Sellers
					</span>
					<span className=" w-full h-1 bg-white"></span>
				</h1>
			</motion.div>
		</div>
	);
};

export default HomePage;
