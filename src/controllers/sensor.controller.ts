import { Request, Response } from "express";
import { SensorService } from "../services/sensor.service";
import { getUserFromRequest } from "../utils/auth.util";

export const saveData = async (req: Request, res: Response) => {
  const userId = getUserFromRequest(req)?.id as string;
  const sensorData = req.body;

  await SensorService.saveSensorData(userId, sensorData);
  res.status(200).json({ message: "Sensor data saved successfully" });
};

export const getData = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const data = await SensorService.getSensorData(userId);
  res.status(200).json({ data });
};
