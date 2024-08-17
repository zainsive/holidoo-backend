import { NextFunction, Request, Response } from "express";
import { AppError } from "../../config/app-error";

// error handler middleware
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    res.status(err.code).json({ status: err.code, message: err.message });
    return;
  }
  res.status(500).json({ status: 500, message: "Something went wrong." });
}

// missing route handler
export function missingRoutesHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(404).json({ status: 404, message: "Unhandled route." });
}

export const errorHanlders = [errorHandler, missingRoutesHandler];
