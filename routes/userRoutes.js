import express from "express";
import path from "path";
import {
  registerUser,
  loginUser,
  getProfile,
  deleteUserProfile,
  editUserProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "public", "index.html"));
});

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

// Protected Get Profile
router.get("/profile", authMiddleware, getProfile);

// Protected Delete User Profile
router.post("/profile/delete", authMiddleware, deleteUserProfile);

// Protected Edit User Profile
router.post("/profile/edit", authMiddleware, editUserProfile);

export default router;
