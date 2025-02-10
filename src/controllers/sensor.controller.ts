import { Request, Response } from "express";
import { saveSensorData, getSensorData } from "../services/sensor.service";

export const saveData = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const sensorData = req.body;

  await saveSensorData(userId, sensorData);
  res.status(200).json({ message: "Sensor data saved successfully" });
};

export const getData = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const data = await getSensorData(userId);
  res.status(200).json({ data });
};
