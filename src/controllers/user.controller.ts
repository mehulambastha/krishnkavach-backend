import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { getUserFromRequest } from "../utils/auth.util";
import logger from "../utils/logger";

interface ProfileData {
  id: number;
  name?: string;
  onboardingStep: number;
  onboardingData: {
    [key: string]: string;
  }
  age?: number;
}

export class UserController {
  static async updateProfile(req: Request, res: Response) {
    try {
      const userId = getUserFromRequest(req)?.id as number;
      const profileData: ProfileData = req.body;
      const onboardingStep = profileData.onboardingStep
      const onboardingData = profileData.onboardingData;
      const updatedUser = await UserService.updateUserProfile(userId, onboardingStep, onboardingData);

      res.status(200).json({ user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: "Error updating profile" });
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const user = await UserService.getUserDetails(userId);

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Error fetching user details" });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();

      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  }
}
