import { Router } from "express";
import { InquiryModel } from "../models/inquiry.model";
import { submitLimiter } from "../middlewares/rate-limiter";
import { validateInquiry } from "../validators/inquiry.validator";
import { verifyAuth, authorize, AuthenticatedRequest } from "../middlewares/auth.middleware";
import { AppError } from "../utils/app-error";
import { logger } from "../utils/logger";

const router = Router();

// POST /api/v1/inquiries - Submit an inquiry
router.post("/", submitLimiter, validateInquiry, async (req, res, next) => {
  try {
    const { name, email, company, services, budget, description } = req.body;

    const newInquiry = await InquiryModel.create({
      name,
      email,
      company,
      services,
      budget,
      description,
    });

    logger.info(`New Inquiry registered successfully: ${newInquiry._id} by ${email}`);

    res.status(201).json({
      success: true,
      data: {
        id: newInquiry._id,
        message: "Your inquiry has been successfully registered. We will contact you soon."
      },
      error: null,
    });
  } catch (error) {
    logger.error("Error creating inquiry:", error);
    next(error);
  }
});

// GET /api/v1/inquiries - Admin review list
router.get("/", verifyAuth, authorize(["Admin", "SuperAdmin"]), async (req: AuthenticatedRequest, res, next) => {
  try {
    const inquiries = await InquiryModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: inquiries,
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/v1/inquiries/:id/status - Update lead status
router.patch("/:id/status", verifyAuth, authorize(["Admin", "SuperAdmin"]), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["New", "Contacted", "Proposal_Sent", "Converted", "Rejected"];
    if (!allowedStatuses.includes(status)) {
      return next(new AppError("Invalid status value.", 400));
    }

    const updatedInquiry = await InquiryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedInquiry) {
      return next(new AppError("Inquiry record not found.", 404));
    }

    res.status(200).json({
      success: true,
      data: updatedInquiry,
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

export const inquiryRouter = router;
