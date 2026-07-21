import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { logger } from "../utils/logger";

export const errorMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: any = null;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === "ValidationError") {
    // Handle Mongoose validation errors
    statusCode = 400;
    message = err.message;
  }

  // Log server errors (500s) with stack traces
  if (statusCode === 500) {
    logger.error("Unhandled Exception:", err);
  } else {
    logger.warn(`API Warning (${statusCode}): ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    data: null,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
