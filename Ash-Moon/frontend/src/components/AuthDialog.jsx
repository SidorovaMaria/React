import { Button } from "@mui/material";
import React, { useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogInDialog from "./LogInDialog";
import SignUpDialog from "./signUpDialog";

const AuthDialog = () => {
	const [open, setOpen] = useState(false);
	const [authOption, setAuthoption] = useState("login");
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button
				variant="standard"
				size="large"
				sx={{
					color: "white",
				}}
				onClick={handleClickOpen}
			>
				<PersonOutlineIcon fontSize="large" />
			</Button>
			{authOption === "login" ? (
				<LogInDialog
					handleClose={handleClose}
					open={open}
					setAuth={setAuthoption}
					handleClickOpen={handleClickOpen}
				/>
			) : (
				<SignUpDialog
					handleClose={handleClose}
					open={open}
					setAuth={setAuthoption}
					handleClickOpen={handleClickOpen}
				/>
			)}
		</>
	);
};

export default AuthDialog;
