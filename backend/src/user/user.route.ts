import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUsers, getUserById, deleteUserById } from "./user.controller.js";


const router = Router();

router.get('/', getUsers);
router.get('/:id', authMiddleware, getUserById);
router.delete('/:id', authMiddleware, deleteUserById)

export default router;