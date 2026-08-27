import Router from "express";
import { signUp, signIn, signOut, ChangePassword } from "./auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);
router.patch('/changePassword', authMiddleware, ChangePassword);

export default router;