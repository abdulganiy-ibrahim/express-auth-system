import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createProject, deleteProject, getProjectsByUserId } from "./project.controller.js";

const router = Router();

router.post('/', authMiddleware, createProject);
router.get('/', authMiddleware, getProjectsByUserId);
router.delete('/:id', authMiddleware, deleteProject);

export default router;