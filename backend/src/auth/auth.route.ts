import Router from "express";
import { signUp, signIn, getUserById, signOut } from "./auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/user/:id', authMiddleware, getUserById);
router.post('/signout', signOut);

export default router;