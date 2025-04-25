import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthService {
  static async createProfileWithNumber(phoneNumber: string, name?: string, age?: number) {
    console.log("Recieved phone num in auth service", phoneNumber)
    console.log("Creating in prisma now")
    return await prisma.user.create({
      data: {
        phoneNumber: phoneNumber,
        name: name,
        age: age
      }
    });
  }
}

