import request from "supertest";
import { ExpressApp } from "../../../src/express.app";
import { UserModel } from "../../../src/models/user.model";
import { hashPassword } from "../../../src/utils/password.util";
import {
  UserProps,
  UserRole,
} from "../../../src/modules/users/domain/user.type";

describe("Auth API Tests", () => {
  const testUser: UserProps = {
    email: "test@example.com",
    password: "password123!S",
    name: "Test User",
    role: UserRole.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const app = new ExpressApp().app;

  beforeEach(async () => {
    // Clear users collection before each test
    await UserModel.deleteMany({});
  });

  describe("POST /api/auth/register", () => {
    test("should register a new user successfully", async () => {
      const response = await request(app).post("/api/register").send({
        email: testUser.email,
        password: testUser.password,
        name: testUser.name,
        role: testUser.role,
      });

      const res = response.body;
      expect(response.status).toBe(200);
      expect(res.success).toBe(true);
      expect(res.data.user).toHaveProperty("email", testUser.email);
      expect(res.data.user).toHaveProperty("name", testUser.name);
      expect(res.data.user).not.toHaveProperty("password");
    });

    test("should return 400 for missing required fields", async () => {
      const response = await request(app).post("/api/register").send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test("should return 400 for invalid email format", async () => {
      const response = await request(app).post("/api/register").send({
        email: "invalid-email",
        password: testUser.password,
        name: testUser.name,
        role: testUser.role,
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      // Create user before each login test
      await UserModel.create({
        email: testUser.email,
        password: await hashPassword(testUser.password),
        name: testUser.name,
        role: testUser.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    test("should login successfully", async () => {
      const response = await request(app).post("/api/login").send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toHaveProperty("email", testUser.email);
    });

    test("should return 401 for invalid credentials", async () => {
      const response = await request(app).post("/api/login").send({
        email: testUser.email,
        password: "wrong-password",
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    test("should return 400 for missing credentials", async () => {
      const response = await request(app).post("/api/login").send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
