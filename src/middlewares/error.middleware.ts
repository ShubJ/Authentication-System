import { Request, Response, NextFunction } from 'express';
import { ResponseUtil } from '../utils/response.util';

export class ErrorMiddleware {
  static handle(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    console.error('Error:', error);

    if (res.headersSent) {
      return next(error);
    }

    ResponseUtil.error(res, 'Internal server error', error.message);
  }

  static notFound(req: Request, res: Response): void {
    ResponseUtil.notFound(res, `Route ${req.originalUrl} not found`);
  }
}
