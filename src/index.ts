import { ExpressApp } from "./express.app";
import { initDb } from "./db";

async function start() {
  // Initialize Database
  const db = await initDb();

  // After all the dependencies are initialized, we will start the server

  // Create App Instance
  const app = new ExpressApp();

  // Start Server
  app.listen();

  // Graceful shutdown
  process.on("SIGINT", async () => {
    console.log("Shutting down gracefully!");
    await db.disconnect();
    console.log("MongoDB Disconnected!");
    process.exit(0);
  });
}

start();
