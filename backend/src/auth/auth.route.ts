import Router from "express";
// auth.controller.js
import { signUp, verifyEmail, resendEmailVerification, signIn, signOut, ChangePassword, requestPasswordReset, verifyPasswordOTP, resetPassword } from "./auth.controller.js";
// auth.middleware.js
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/signup', signUp);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification', resendEmailVerification)  
router.post('/signin', signIn);
router.get('/signout', signOut);
router.patch('/changePassword', authMiddleware, ChangePassword);
router.post('/forgot-password', requestPasswordReset);
router.post('/verify-password-otp', verifyPasswordOTP);
router.post('/reset-password', resetPassword);

export default router;