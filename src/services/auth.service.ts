import { PrismaClient } from "@prisma/client";
import { generateJWT } from "../utils/jwt.util";

const prisma = new PrismaClient();

export const generateOTP = async (phoneNumber: string): Promise<string> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // Save OTP to Redis (not shown here)
  return otp;
};

export const verifyOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
  // Verify OTP from Redis (not shown here)
  return true; // Mocked for now
};
