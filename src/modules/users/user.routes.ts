import { Router, Request, Response } from "express";
import UserController from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleAccessMiddleware } from "../../middlewares/role-access.middleware";
import { UserRole } from "./domain/user.type";

export default function userRoutes(controller: UserController) {
  const router = Router();

  router.post("/register", (req: Request, res: Response) =>
    controller.register(req, res)
  );
  router.post("/login", (req: Request, res: Response) =>
    controller.login(req, res)
  );
  router.get("/profile", authMiddleware, (req: Request, res: Response) =>
    controller.getProfile(req, res)
  );
  router.get(
    "/admin/users",
    authMiddleware,
    roleAccessMiddleware([UserRole.ADMIN]),
    (req: Request, res: Response) => controller.getAllUsers(req, res)
  );

  return router;
}
