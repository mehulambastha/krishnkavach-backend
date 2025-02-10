import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Log format
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Log transports (outputs)
const transports = [
  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),

  // Daily rotate file transport for errors
  new DailyRotateFile({
    filename: "logs/error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    level: "error",
    maxSize: "20m",
    maxFiles: "14d",
  }),

  // Daily rotate file transport for all logs
  new DailyRotateFile({
    filename: "logs/combined-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "14d",
  }),
];

// Create the logger
const logger = winston.createLogger({
  level: "info",
  levels,
  format,
  transports,
});

export default logger;
