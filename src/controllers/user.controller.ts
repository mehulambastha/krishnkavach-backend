import { Request, Response } from "express";
import { updateUserProfile, getUserDetails } from "../services/user.service";

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const profileData = req.body;

  const updatedUser = await updateUserProfile(userId, profileData);
  res.status(200).json({ user: updatedUser });
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await getUserDetails(userId);
  res.status(200).json({ user });
};
