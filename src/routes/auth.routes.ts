import express from "express";
import { validatePhoneNumber } from "../utils/validation.util";
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();

// POST /api/auth/signup - Register a new user with a phone number
router.post("/signup", AuthController.signup);

// To be implemented
// router.post("/login",)

export default router;
