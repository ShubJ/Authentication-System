import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserModel } from "../src/models/user.model";
import { hashPassword } from "../src/utils/password.util";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: process.env.DATABASE_NAME,
    });

    await UserModel.deleteMany({});

    const users = [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: await hashPassword("Admin@123"),
        role: "admin",
      },
      {
        name: "Normal User",
        email: "user@example.com",
        password: await hashPassword("User@123"),
        role: "user",
      },
    ];

    await UserModel.insertMany(users);
    console.log("Users seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
