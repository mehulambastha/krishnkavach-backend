import express from "express";
import { signup, verifyOTPController } from "../controllers/auth.controller";
import { validatePhoneNumber } from "../utils/validation.util";

const router = express.Router();

// POST /api/auth/signup - Register a new user with a phone number
router.post("/signup", signup);

// POST /api/auth/verify-otp - Verify OTP and mark user as verified
router.post("/verify-otp", verifyOTPController);

export default router;
