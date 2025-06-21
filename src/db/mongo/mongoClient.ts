import mongoose from "mongoose";
import { DBClient } from "../db.types";

export const MONGODB_URI = process.env.MONGODB_URI || "";
export const DATABASE_NAME = process.env.DATABASE_NAME || "";

export class MongoClient implements DBClient {
  async connect() {
    if (!MONGODB_URI || !DATABASE_NAME) {
      console.error(
        "MONGODB_URI or DATABASE_NAME not defined in environment variables"
      );
      process.exit(1);
    }

    try {
      await mongoose.connect(MONGODB_URI, {
        dbName: DATABASE_NAME,
      });

      console.log("MongoDB connected successfully!");
    } catch (err) {
      console.error("Failed to connect to MongoDB:", (err as Error).message);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
    console.log("MongoDB disconnected successfully!");
    return;
  }
}
