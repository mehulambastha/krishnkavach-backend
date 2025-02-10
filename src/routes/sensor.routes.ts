import express from "express";
import { saveData, getData } from "../controllers/sensor.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

// POST /api/sensors/data - Save live sensor data for a user
router.post("/data", authenticate, saveData);

// GET /api/sensors/:userId - Retrieve sensor data for a user
router.get("/:userId", authenticate, getData);

export default router;
