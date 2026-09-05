import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import type { ChangePasswordData, SignUpData } from '../types/auth.types.js';
import * as authService from './auth.service.js';
import * as emailVerificationService from '../email/email-verification.service.js';

export const signUp = async (req: Request<{}, {}, SignUpData>, res: Response) => {
  try {
    const newUser = await authService.signUp(req.body);

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : 'something went wrong'
    });
  }
}

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.query.token;

    if (typeof token !== 'string') {
      throw new AppError('Invalid verification token', 400);
    }

    await emailVerificationService.verifyToken(token);

    return res.status(200).json({
      message: 'Your email has been verified'
    });
  } catch (error) {
    next(error);
  }
}

export const resendEmailVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError('Email is required', 400);
    }

    await emailVerificationService.resendEmailVerification(email);

    return res.status(200).json({
      message:
        'If an account with that email exists, a verification email has been sent.'
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.signIn(req.body);

    res.cookie('accessToken', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax"
    });

    return res.status(200).json({
      userId: result.userId
    })

  } catch (error) {
    next(error)
  }
}

export const signOut = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('accessToken');

    return res.status(200).json({
      message: 'Signed out successful'
    })
  } catch (error) {
    next(error)
  }
}

export const ChangePassword = async (req: Request<{}, {}, ChangePasswordData>, res: Response, next: NextFunction) => {
  const userId = req.userId;

  try {
    if (!userId) {
      throw new AppError('Authentication required', 401);
    }

    const passwordData = {
      data: req.body,
      userId
    }

    await authService.ChangePassword(passwordData);

    return res.status(200).json({
      message: "Password changed successfully"
    });
  } catch (error) {
    next(error);
  }
}

export const requestPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;

    if (!email) {
      throw new AppError('Email is required', 400);
    }

    await authService.requestPasswordReset(email);

    return res.status(200).json({
      message: "If an account with that email exists, an OTP code has been sent to the email."
    });
  } catch (error) {
    next(error);
  }
}

export const verifyPasswordOTP = async (req: Request<{}, {}, { otp: string }>, res: Response, next: NextFunction) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      throw new AppError('OTP is required', 400);
    }
    
    const result = await authService.verifyPasswordOTP(otp);

    res.cookie('passwordResetToken', result.resetToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      maxAge: 10 * 60 * 1000,
    });
    
    return res.status(200).json({
      message: "OTP verified successfully"
    });
  } catch (error) {
    next(error);
  }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const resetToken = req.cookies.passwordResetToken;

  try {
    if (!resetToken) {
      throw new AppError('Reset token is required', 400);
    }

    const resetPasswordData = {
      resetToken,
      newPassword: req.body.newPassword
    }

    await authService.resetPassword(resetPasswordData);

    return res.status(200).json({
      message: "Password reset successfully"
    });
  } catch (error) {
    next(error);
  }
}