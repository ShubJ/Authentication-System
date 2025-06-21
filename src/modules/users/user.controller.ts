import { CustomRequest } from "../../types/express.types";
import { Response } from "express";
import { ResponseUtil } from "../../utils/response.util";
import { UserService } from "./services/user.service";
import { UserMapper } from "./user.mapper";
import { UserPropsZod, UserLoginPropsZod } from "./domain/user.type";
import { isPasswordValid } from "../../utils/password.util";
import { CacheClient } from "../../utils/cache/cache-client.interface";

export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
    private readonly cache: CacheClient
  ) {}

  async register(req: CustomRequest, res: Response) {
    try {
      // Validate input using Zod schema
      const validatedInput = UserPropsZod.safeParse(req.body);
      if (validatedInput.error) {
        return ResponseUtil.badRequest(
          res,
          validatedInput.error.errors[0].message
        );
      }
      const userData = validatedInput.data;

      // Check password strength
      if (!isPasswordValid(userData.password)) {
        return ResponseUtil.badRequest(
          res,
          "Password must be at least 8 characters long and include upper, lower, digit, and special char"
        );
      }

      // Check if email exists
      const existing = await this.userService.findByEmail(userData.email);
      if (existing) {
        return ResponseUtil.badRequest(res, "Email already registered");
      }

      // Create user
      const user = await this.userService.register(userData);

      return ResponseUtil.success(res, "User registered successfully", {
        user: this.userMapper.toResponse(user),
      });
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : "Invalid input data"
      );
    }
  }

  async login(req: CustomRequest, res: Response) {
    try {
      // Validate login input using Zod schema
      const validatedInput = UserLoginPropsZod.safeParse(req.body);
      if (validatedInput.error) {
        return ResponseUtil.badRequest(
          res,
          validatedInput.error.errors[0].message
        );
      }
      const userData = validatedInput.data;

      const userResponse = await this.userService.login(userData);
      if ("error" in userResponse) {
        return ResponseUtil.unauthorized(res, userResponse.error);
      }

      return ResponseUtil.success(res, "User logged in successfully", {
        token: userResponse.token,
        user: this.userMapper.toResponse(userResponse.user),
      });
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : "Invalid login credentials"
      );
    }
  }

  async getProfile(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) {
        return ResponseUtil.unauthorized(res, "User not authenticated");
      }

      const user = await this.userService.findById(userId);
      if (!user) {
        return ResponseUtil.notFound(res, "User not found");
      }
      return ResponseUtil.success(res, "User profile", {
        user: this.userMapper.toResponse(user),
      });
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : "Invalid user email"
      );
    }
  }

  async getAllUsers(req: CustomRequest, res: Response) {
    try {
      const users = await this.userService.findAll();
      return ResponseUtil.success(res, "Users", {
        users: users.map((user) => this.userMapper.toResponse(user)),
      });
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : "Invalid user email"
      );
    }
  }
}
