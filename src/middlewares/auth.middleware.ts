import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
import { CustomRequest } from "../types/express.types";
import { ResponseUtil } from "../utils/response.util";

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return ResponseUtil.unauthorized(res, "You are not authenticated!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    req.role = decoded.role;
    return next();
  } catch (err) {
    return ResponseUtil.unauthorized(res, "Invalid or expired token");
  }
};
