import { Response } from "express";
import { ApiResponse } from "../types/express.types";

export class ResponseUtil {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
  ): void {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message: string,
    error?: string,
    statusCode: number = 500
  ): void {
    const response: ApiResponse = {
      success: false,
      message,
      error,
    };
    res.status(statusCode).json(response);
  }

  static notFound(res: Response, message: string = "Resource not found"): void {
    this.error(res, message, undefined, 404);
  }

  static badRequest(
    res: Response,
    message: string = "Bad request",
    error?: string
  ): void {
    this.error(res, message, error, 400);
  }

  static unauthorized(res: Response, message: string = "Unauthorized"): void {
    this.error(res, message, undefined, 401);
  }

  static forbidden(res: Response, message: string = "Forbidden"): void {
    this.error(res, message, undefined, 403);
  }
}
