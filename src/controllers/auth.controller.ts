import { Request, Response } from "express";
import { generateOTP, verifyOTP } from "../services/auth.service";
import { validatePhoneNumber } from "../utils/validation.util";

export const signup = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  // Validate input
  if (!validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  // Generate OTP
  const otp = await generateOTP(phoneNumber);
  res.status(200).json({ message: "OTP sent", otp });
};

export const verifyOTPController = async (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;

  // Verify OTP
  const isVerified = await verifyOTP(phoneNumber, otp);
  if (!isVerified) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  res.status(200).json({ message: "OTP verified successfully" });
};
