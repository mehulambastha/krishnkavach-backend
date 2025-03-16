import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export class UserService {

  static async getAllUsers() {
    return await prisma.user.findMany();
  }

  static async updateUserProfile(userId: string, onboardingStep: number, onboardingData: { [key: string]: string }) {
    const profileData = {
      onboardingStep: onboardingStep,
      onboardingData: onboardingData
    };

    // if we require the onbarding step for the time being
    logger.info(`[USER] -  ${userId} - ${JSON.stringify(profileData)}`);
    logger.info(`[STEP] - ${onboardingStep}`)

    return await prisma.user.update({
      where: { id: userId },
      data: onboardingData
    });
  }

  static async getUserDetails(userId: string) {
    return await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
  }
}
