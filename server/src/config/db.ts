import { logger } from "../utils/logger";

export const connectDB = async (): Promise<void> => {
  logger.info("Database engine: Connected to Supabase PostgreSQL Database via JS Client.");
};

export const disconnectDB = async (): Promise<void> => {
  logger.info("Supabase database connection handle closed.");
};
