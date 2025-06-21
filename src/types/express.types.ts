import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  userId?: string;
  role?: string;
  requestId?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface Controller {
  path: string;
  router: unknown;
}

export type AsyncHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;
