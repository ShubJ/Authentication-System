// src/utils/jwt.util.ts
import * as jwt from "jsonwebtoken";
import { config } from "../config/app.config";
import { SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  role: string;
  [key: string]: any;
}

export const signToken = (payload: JwtPayload): string => {
  const options = {
    expiresIn: config.jwt.expiresIn,
  } as SignOptions;
  return jwt.sign(payload, config.jwt.secret, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt.secret) as JwtPayload;
};
