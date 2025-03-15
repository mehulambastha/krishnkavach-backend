import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { createClient } from "redis";
import { createAdapter } from '@socket.io/redis-adapter'
import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export class WebSocketServer {
  private io: Server;
  private pubClient: any;
  private subClient: any;
  

  constructor(httpServer: HttpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    
  }


  private async setupRedisAdapter() {
    this.pubClient = createClient({url: 'redis://redis:6379'});
    this.subClient = this.pubClient.duplicate();

    await Promise.all([
      this.pubClient.connect(),
      this.subClient.connect(),
    ])

    this.io.adapter(createAdapter(this.pubClient, this.subClient));
  }

  private setupMiddleware() {
    this.io.use(async (socket, next) => {
      try {
        const uid = socket.handshake.query.token;
        const user = await prisma.user.findUnique({where: {id: parseInt(uid as string)}})

        socket.data.user = user;
        next();
      } catch (error) {
        next(new Error("Authentication error"));
      }
    })
  }

  private setupEventHandlers() {
    this.io.on("connection", (socket) => {
      const uid = socket.data.user.id;
      logger.info(`User connected: ${uid}`);

      socket.join(`user:${uid}`);


      socket.on('sensor_data', (data) => this.handleSensorData(socket, data));

      socket.on('disconnect', () => {
        logger.info(`User disconnected: ${uid}`);
        socket.leave(`user:${uid}`);
      })
    })
  }

  private handleSensorData(socket: Socket, data: any) {
    const uid = socket.data.user.id;
    logger.info(`Sensor data received from user: ${uid}`, data);
  }
    
}