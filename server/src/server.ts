import dotenv from "dotenv";
// Load environment configurations first
dotenv.config();

import app from "./app";
import { connectDB, disconnectDB } from "./config/db";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Establish database connection
    await connectDB();

    // 2. Start listening on network port
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Express Server running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`);
    });

    // 3. Setup graceful shutdown triggers
    const shutdownGracefully = async (signal: string) => {
      logger.warn(`Received ${signal}. Starting graceful shutdown procedure...`);
      
      server.close(async () => {
        logger.info("Express HTTP server closed.");
        
        try {
          await disconnectDB();
          logger.info("MongoDB connection closed cleanly.");
          process.exit(0);
        } catch (dbCloseError) {
          logger.error("Error during MongoDB disconnection:", dbCloseError);
          process.exit(1);
        }
      });

      // Force terminate after 10 seconds if connections hang
      setTimeout(() => {
        logger.error("Forced termination. Graceful shutdown timeout exceeded.");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => shutdownGracefully("SIGTERM"));
    process.on("SIGINT", () => shutdownGracefully("SIGINT"));

  } catch (err) {
    logger.error("Server failed to bootstrap:", err);
    process.exit(1);
  }
};

startServer();
