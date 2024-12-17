import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByEmail, createUser, updateUser } from "../models/userModel.js";
import { formatDate } from "../../front-end/src/utils/helperFunctions.js";
import admin from "../firebase.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { uid, username, email, DOB, role } = req.body;
    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const newUser = {
      uid, //Firebas UID
      username,
      email,
      DOB,
      CreatedAt: formatDate(new Date()),
      role,
      profileImg:
        "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1734461978~exp=1734465578~hmac=200d19bcccd7b0ca87660f7d155becb92fe029b70ba34770ffb7f3df0a5c89e8&w=1380",
    };
    await createUser(newUser);
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, token } = req.body;
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) {
      return res.status(400).send("Invalid token");
    }

    const userEmail = decodedToken.email;
    if (email !== userEmail) {
      return res.status(400).send("Email mismatch");
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const backendToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Set the expiration time for the JWT
    });
    res.status(200).json({
      token: backendToken,
      user,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

// PATCH route for updating user details
router.patch("/updateProfile", async (req, res) => {
  try {
    const { username, email, DOB, profileImg } = req.body;

    // Verify the Firebase ID token
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // if (!decodedToken) {
    //   return res.status(400).send("Invalid token");
    // }

    const userEmail = email;
    // Find the user by email
    const user = await getUserByEmail(userEmail);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Prepare update fields
    const updateFields = {};
    if (username) updateFields.username = username;
    if (DOB) updateFields.DOB = DOB;
    if (profileImg) updateFields.profileImg = profileImg;

    // Update the user in the database
    const updatedUser = await updateUser(user._id, updateFields);

    // Check if any user was updated
    if (updatedUser) {
      return res.status(200).json({ success: true, updatedUser });
    } else {
      return res.status(400).send("Failed to update profile");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating profile");
  }
});

export default router;
