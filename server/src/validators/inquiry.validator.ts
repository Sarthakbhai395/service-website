import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export const inquirySubmitSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long.").max(100),
  email: z.string().email("Please provide a valid email address."),
  company: z.string().max(100).optional(),
  services: z.array(z.string()).min(1, "Please specify at least one service."),
  budget: z.string().max(50).optional(),
  description: z.string().min(10, "Please provide a detailed description (at least 10 characters).").max(5000),
});

export const validateInquiry = (req: Request, res: Response, next: NextFunction) => {
  const result = inquirySubmitSchema.safeParse(req.body);
  if (!result.success) {
    const errorMsg = result.error.errors.map((e) => e.message).join(" ");
    return next(new AppError(errorMsg, 400));
  }
  next();
};
