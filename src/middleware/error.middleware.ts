import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error using Winston
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
  });

  // Send a generic error response
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
  });
};

export default errorMiddleware;
