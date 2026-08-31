import Router from "express";
import { signUp, verifyEmail, resendEmailVerification, signIn, signOut, ChangePassword } from "./auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/signup', signUp);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification', resendEmailVerification)  
router.post('/signin', signIn);
router.get('/signout', signOut);
router.patch('/changePassword', authMiddleware, ChangePassword);

export default router;