import express from "express";
import { updateProfile, getUser } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

// POST /api/user/profile - Update user profile details
router.post("/profile", authenticate, updateProfile);

// GET /api/user/:id - Fetch user details securely
router.get("/:id", authenticate, getUser);

export default router;
