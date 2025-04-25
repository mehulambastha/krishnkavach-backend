import { Request, Response } from "express";
import { validatePhoneNumber } from "../utils/validation.util";
import { AuthService } from "../services/auth.service";
import logger from "../utils/logger";

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const { phoneNumber } = req.body;
      // Validate input
      if (!validatePhoneNumber(phoneNumber)) {
        res.status(400).json({ message: "Invalid phone number" });
        return
      }
      console.log("validated phone number. Trying to save now.")
      const newUser = await AuthService.createProfileWithNumber(phoneNumber);

      res.status(200).json({ user: newUser });
    } catch (error) {
      logger.error("Error creating profile:", error);
      res.status(500).json({ error: "Error creating profile" });
    }
  }
}

