import { Router } from "express";
import { UserRepository } from "./db/user.repository";
import { IUserRepository } from "./db/user.repository.interface";
import { UserService } from "./services/user.service";
import userRoutes from "./user.routes";
import UserController from "./user.controller";
import { UserMapper } from "./user.mapper";
import { CacheClient } from "../../utils/cache/cache-client.interface";

export default class UserModule {
  private readonly userRepository: IUserRepository;

  private readonly userService: UserService;

  private readonly userController: UserController;

  constructor(private readonly cache: CacheClient) {
    const userMapper = new UserMapper();

    this.userRepository = new UserRepository(userMapper);
    this.userService = new UserService(this.userRepository);

    this.userController = new UserController(
      this.userService,
      userMapper,
      this.cache
    );
  }

  getRouter(): Router {
    return userRoutes(this.userController);
  }
}
