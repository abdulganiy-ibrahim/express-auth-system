import Router from "express";
import { signUp, getUsers, signIn, getUserById, signOut } from "./auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/signup', signUp);
router.post('/login', signIn);
router.get('/users', getUsers);
router.get('/:id', authMiddleware, getUserById);
router.post('/signout', signOut);

export default router;