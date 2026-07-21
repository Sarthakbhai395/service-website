import { Router } from "express";
import { authRouter } from "./auth.routes";
import { inquiryRouter } from "./inquiry.routes";
import { projectRouter } from "./project.routes";

const router = Router();

// Bind sub-routers
router.use("/auth", authRouter);
router.use("/inquiries", inquiryRouter);
router.use("/projects", projectRouter);

export const apiRouter = router;
