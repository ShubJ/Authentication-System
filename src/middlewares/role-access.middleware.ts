import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/express.types";
import { ResponseUtil } from "../utils/response.util";

export const roleAccessMiddleware = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.userId || !req.role || !roles.includes(req.role)) {
      return ResponseUtil.forbidden(res, "Forbidden: Insufficient role");
    }
    return next();
  };
};
