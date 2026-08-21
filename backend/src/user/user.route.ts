import { Router } from "express";
import { getUsers } from "./user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserById } from "./user.repository.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', authMiddleware, getUserById);

export default router;