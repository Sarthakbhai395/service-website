import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { errorMiddleware } from "./middlewares/error.middleware";
import { generalLimiter } from "./middlewares/rate-limiter";
import { logger } from "./utils/logger";

const app: Application = express();

// 1. Security Headers (Helmet)
app.use(helmet());

// 2. CORS setup
const corsOrigins = process.env.CORS_WHITELIST
  ? process.env.CORS_WHITELIST.split(",")
  : ["http://localhost:3000", "https://nexus-edge.com"];

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 3. Compression
app.use(compression());

// 4. Request parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// 5. Morgan Logger
const morganStream = {
  write: (message: string) => logger.info(message.trim()),
};
app.use(morgan("combined", { stream: morganStream }));

// 6. Global Rate Limiting
app.use("/api/", generalLimiter);

// 7. Base Health-Check Route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 8. API Router Integration Placeholder
// We will create the routes aggregator next.
import { apiRouter } from "./routes";
app.use("/api/v1", apiRouter);

// 9. Static Assets (temporary file structures)
app.use("/uploads", express.static(path.join(__dirname, "../../storage/uploads")));

// 10. 404 Route Catch-all
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    data: null,
    error: `API Route not found: ${req.originalUrl}`,
  });
});

// 11. Error Handling Middleware
app.use(errorMiddleware);

export default app;
