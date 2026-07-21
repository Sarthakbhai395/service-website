import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { supabaseAdmin } from "../config/supabase";
import { UserModel } from "../models/user.model";
import { AppError } from "../utils/app-error";
import { logger } from "../utils/logger";

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

// Extend Express Request type to attach verified user metadata
export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email: string;
    role: "Client" | "Editor" | "Admin" | "SuperAdmin";
  };
}

export const verifyAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Missing or invalid authorization header.", 401));
    }

    const token = authHeader.split(" ")[1];
    let uid = "";
    let email = "";

    // 1. Try local cryptographic verification if secret is provided
    if (SUPABASE_JWT_SECRET) {
      try {
        const decoded = jwt.verify(token, SUPABASE_JWT_SECRET) as any;
        uid = decoded.sub; // sub is the user UUID in Supabase JWTs
        email = decoded.email || "";
      } catch (jwtError) {
        logger.debug("Local JWT signature verification failed. Trying Supabase API...");
      }
    }

    // 2. Fall back to remote Supabase verification if local verification didn't resolve UID
    if (!uid) {
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      if (error || !user) {
        return next(new AppError("Invalid or expired session token.", 401));
      }
      uid = user.id;
      email = user.email || "";
    }

    // 3. Match UID to MongoDB user roles
    let dbUser = await UserModel.findOne({ uid });
    if (!dbUser) {
      // Auto-provision user in MongoDB on first authorized access
      dbUser = await UserModel.create({
        uid,
        email,
        role: "Client" // Default client role
      });
      logger.info(`Auto-provisioned MongoDB user profile for uid: ${uid}`);
    }

    // 4. Attach session state to Request lifecycle
    req.user = {
      uid: dbUser.uid,
      email: dbUser.email,
      role: dbUser.role
    };

    next();
  } catch (error) {
    next(new AppError("Authentication verification system error.", 500));
  }
};

export const authorize = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("User identity session not found.", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError("Forbidden: You do not have permission for this resource.", 403)
      );
    }

    next();
  };
};
