import { Router } from "express";
import { ProjectModel } from "../models/project.model";
import { verifyAuth, authorize, AuthenticatedRequest } from "../middlewares/auth.middleware";
import { AppError } from "../utils/app-error";
import { logger } from "../utils/logger";

const router = Router();

// GET /api/v1/projects - Retrieve paginated projects list (optional filters)
router.get("/", async (req, res, next) => {
  try {
    const { category, featured, limit = "20", page = "1" } = req.query;

    const query: any = {};
    if (category) {
      query.category = String(category);
    }
    if (featured === "true") {
      query.featured = true;
    }

    const pageSize = parseInt(String(limit), 10);
    const pageNum = parseInt(String(page), 10);
    const skip = (pageNum - 1) * pageSize;

    const projects = await ProjectModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    const total = await ProjectModel.countDocuments(query);

    res.status(200).json({
      success: true,
      data: projects,
      error: null,
      meta: {
        total,
        page: pageNum,
        limit: pageSize,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/projects/:slug - Retrieve single case study details
router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await ProjectModel.findOne({ slug });

    if (!project) {
      return next(new AppError("Portfolio project not found.", 404));
    }

    res.status(200).json({
      success: true,
      data: project,
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/projects - Create a new portfolio project (Admin only)
router.post("/", verifyAuth, authorize(["Admin", "SuperAdmin"]), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { title, slug, description, content, category, tags, clientName, thumbnailUrl, mediaUrls, projectUrl, featured } = req.body;

    // Check slug uniqueness
    const existingProject = await ProjectModel.findOne({ slug });
    if (existingProject) {
      return next(new AppError("Project slug must be unique. A project with this slug already exists.", 400));
    }

    const newProject = await ProjectModel.create({
      title,
      slug,
      description,
      content,
      category,
      tags,
      clientName,
      thumbnailUrl,
      mediaUrls,
      projectUrl,
      featured,
    });

    logger.info(`Portfolio project created: ${newProject.title} by Admin UUID ${req.user?.uid}`);

    res.status(201).json({
      success: true,
      data: newProject,
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/v1/projects/:id - Update an existing project (Admin only)
router.patch("/:id", verifyAuth, authorize(["Admin", "SuperAdmin"]), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return next(new AppError("Project record not found.", 404));
    }

    logger.info(`Portfolio project updated: ${updatedProject.title} by Admin UUID ${req.user?.uid}`);

    res.status(200).json({
      success: true,
      data: updatedProject,
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/projects/:id - Remove a portfolio project (Admin only)
router.delete("/:id", verifyAuth, authorize(["Admin", "SuperAdmin"]), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const deletedProject = await ProjectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      return next(new AppError("Project record not found.", 404));
    }

    logger.info(`Portfolio project deleted: ${deletedProject.title} by Admin UUID ${req.user?.uid}`);

    res.status(200).json({
      success: true,
      data: {
        id: deletedProject._id,
        message: `Project '${deletedProject.title}' was successfully removed.`
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

export const projectRouter = router;
