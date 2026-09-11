import Router from "express";
// auth/auth.controller.ts
import { 
  signUp, verifyEmail, resendEmailVerification, signIn, signOut, ChangePassword, requestPasswordReset, verifyPasswordOTP, resetPassword 
} from "./auth.controller.js";
// middleware/auth.middleware.ts
import { authMiddleware } from "../middleware/auth.middleware.js";
// middleware/security/rate.limit.ts
import { 
  signupLimiter, verifyEmailLimiter, signinLimiter, resendEmailLimiter, signoutLimiter, forgotPasswordLimiter, verifyPasswordOTPLimiter, resetPasswordLimiter, changePasswordLimiter
} from "../middleware/security/auth-rate-limit.js";

const router = Router();

router.post('/signup', signupLimiter, signUp);
router.post('/verify-email', verifyEmailLimiter, verifyEmail);
router.post('/resend-email-verification', resendEmailLimiter, resendEmailVerification)  
router.post('/signin', signinLimiter, signIn);
router.get('/signout', signoutLimiter, signOut);
router.post('/forgot-password', forgotPasswordLimiter, requestPasswordReset);
router.post('/verify-password-otp', verifyPasswordOTPLimiter, verifyPasswordOTP);
router.post('/reset-password', resetPasswordLimiter, resetPassword);
router.patch('/changePassword', authMiddleware, changePasswordLimiter, ChangePassword);

export default router;