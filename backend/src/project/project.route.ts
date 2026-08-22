import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createProject, getProjectsByUserId } from "./project.controller.js";

const router = Router();

router.post('/', authMiddleware, createProject);
router.get('/', authMiddleware, getProjectsByUserId);

export default router;