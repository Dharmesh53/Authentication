import { NextFunction, Request, Response } from "express";

type CustomError = Error & { status?: number };

export const notFoundHandler = async (req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error("Route not Found");
  error.status = 404;
  next(error);
};

export const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
};
