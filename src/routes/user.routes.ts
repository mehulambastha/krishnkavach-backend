import express from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

// GET /api/user/:id - Fetch user details securely
router.get("/:id", authenticate, UserController.getUser);

router.get("/onboarding", authenticate, UserController.updateProfile)

router.get("/", UserController.getAllUsers);

export default router;
