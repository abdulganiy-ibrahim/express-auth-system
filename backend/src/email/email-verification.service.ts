import { AppError } from '../errors/AppError.js';
import { 
  generateVerificationToken, hashVerificationToken, 
  validateEmail
} from '../utils/email.js';
import * as emailVerificationRepo from './email-verification.repository.js';
import * as emailService from './email.service.js';
import * as authRepo from '../auth/auth.repository.js';

export const createVerificationToken = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 15 * 16 * 1000);

  // generate email verification token.
  const token = generateVerificationToken();

  // hashed generated token
  const hashedToken = hashVerificationToken(token);

  // construct email verification token data
  const emailVerificationData = {
    userId,
    token: hashedToken,
    expiresAt
  }

  // create email verification token.
  await emailVerificationRepo.createEmailVerificationToken(emailVerificationData);

  return token
}

export const verifyToken = async (token: string) => {
  // Hash the token received from the user
  const hashedToken = hashVerificationToken(token);

  // Find the verification token in the database
  const validTokenData =
    await emailVerificationRepo.getEmailVerificationDataByToken(
      hashedToken
    );

  // handle if token does not exist
  if (!validTokenData) {
    throw new AppError('Invalid or expired verification token', 400);
  }

  // Check if token has expired
  if (new Date() > validTokenData.expiresAt) {
    // Delete expired token
    await emailVerificationRepo.deleteEmailVerificationToken(
      hashedToken
    );

    throw new AppError('Verification token has expired', 400);
  }

  // Mark user's email as verified
  await authRepo.verifyUserEmail(validTokenData.userId);

  // Delete the token so it cannot be used again
  await emailVerificationRepo.deleteEmailVerificationToken(
    hashedToken
  );

  return {
    message: 'Email verified successfully'
  };
};

export const resendEmailVerification = async (email: string) => {
  // set expire time for token
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  const validatedEmail = validateEmail(email);

  // get user by email
  const user = await authRepo.findUserByEmail(validatedEmail);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.email_verified) {
    throw new AppError('Email is already verified', 409);
  }

  await emailVerificationRepo.deleteTokenByUserId(user.id)

  // generate email verification token
  const token = generateVerificationToken();

  // hash generated token
  const hashedToken = hashVerificationToken(token);

  // construct email verification token data
  const emailVerificationData = {
    userId: user.id,
    token: hashedToken,
    expiresAt
  }

  // create email verification token.
  await emailVerificationRepo.createEmailVerificationToken(emailVerificationData);

  await emailService.sendVerificationEmail(user.id, token);
}