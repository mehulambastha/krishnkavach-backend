import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthService {
  static async createProfileWithNumber(phoneNumber: string, name?: string, age?: number) {
    return await prisma.user.create({
      data: {
        phoneNumber: phoneNumber,
        name: name,
        age: age
      }
    });
  }
}

