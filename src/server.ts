import express from 'express';
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import sensorRoutes from "./routes/sensor.routes";
import errorMiddleware from "./middleware/error.middleware";
import logger from './utils/logger';
import { WebSocketServer } from './websocket/socket.server';
import { createServer } from 'http';
// Swagger imports
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@postgres:5432/kavachdb'
    }
  }
});

// Function to test database connection
async function connectDB() {
  try {
    await prisma.$connect();
    logger.info('Successfully connected to the database');
  } catch (error) {
    logger.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

const app = express()

app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

const httpServer = createServer(app);
const wsServer = new WebSocketServer(httpServer);

//extra comment 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sensors", sensorRoutes);

// Global Error Handler
app.use(errorMiddleware);


const PORT = parseInt(process.env.PORT as string) || 3001

app.get('/', (req, res) => {
  res.send('This is your KrishnKavach!')
})

// Connect to database before starting the server
connectDB().then(() => {
  httpServer.listen(PORT, "0.0.0.0", () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  logger.error('Server failed to start:', error);
  process.exit(1);
});
