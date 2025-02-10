import express from 'express';
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import sensorRoutes from "./routes/sensor.routes";
import errorMiddleware from "./middleware/error.middleware";
import logger from './utils/logger';

const app = express()
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  logger.info({
    message: "Incoming request",
    path: req.path,
    method: req.method,
    body: req.body,
  });
  next();
});



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sensors", sensorRoutes);

// Global Error Handler
app.use(errorMiddleware);


const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
