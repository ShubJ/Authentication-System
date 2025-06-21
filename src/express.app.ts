import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/app.config";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import UserModule from "./modules/users";
import { RedisCacheClient } from "./utils/cache/redis-cache-client";
import { apiLimiter, authLimiter } from "./middlewares/rate-limit.middleware";

export class ExpressApp {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeModules();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: config.corsOrigin,
      })
    );
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true }));

    // Apply rate limiting middleware only in non-test environment
    if (process.env.NODE_ENV !== "test") {
      // Apply rate limiting to all routes except health check
      this.app.use("/api/auth/*", authLimiter);
      this.app.use("/api/*", apiLimiter);
    }
  }

  private initializeModules(): void {
    this.app.use("/health", (req, res) => {
      res.send({ message: "Server is healthy" });
    });

    const cache = new RedisCacheClient(config.redisUrl);
    const userModule = new UserModule(cache);
    this.app.use("/api/", userModule.getRouter());
  }

  private initializeErrorHandling(): void {
    this.app.use("*", ErrorMiddleware.notFound);
    this.app.use(ErrorMiddleware.handle);
  }

  public listen(): void {
    this.app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  }
}
