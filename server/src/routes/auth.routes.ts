import { Router } from "express";
import { verifyAuth, AuthenticatedRequest } from "../middlewares/auth.middleware";
import { UserModel } from "../models/user.model";
import { logger } from "../utils/logger";

const router = Router();

// GET /api/v1/auth/me - Retrieve current mapped user document
router.get("/me", verifyAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, error: "Unauthorized session." });
    }

    const dbUser = await UserModel.findOne({ uid: user.uid });
    if (!dbUser) {
      return res.status(404).json({ success: false, error: "User profile not found." });
    }

    res.status(200).json({
      success: true,
      data: dbUser,
      error: null
    });
  } catch (error) {
    logger.error("Error retrieving user profile:", error);
    next(error);
  }
});

export const authRouter = router;
