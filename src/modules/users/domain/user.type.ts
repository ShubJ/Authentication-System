import { z } from "zod";

export const enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export const UserPropsZod = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
  role: z.enum([UserRole.USER, UserRole.ADMIN]).default(UserRole.USER),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type UserProps = z.infer<typeof UserPropsZod>;

export const UserLoginPropsZod = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type UserLoginProps = z.infer<typeof UserLoginPropsZod>;

export interface UserPropsWithId extends UserProps {
  id: string;
}
