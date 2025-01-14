import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// TODO SignUp
router.post("/sign-up", signup);
// TODO Login
router.post("/login", login);
// TODO LOGOUT
router.post("/logout", logout);
export default router;
