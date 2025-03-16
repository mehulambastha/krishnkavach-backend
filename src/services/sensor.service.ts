import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SensorService {
  static async saveSensorData(userId: string, sensorData: any) {
    return sensorData;
  }

  static async getSensorData(userId: string) {
    return await prisma.sensorReading.findMany()
  }
}
