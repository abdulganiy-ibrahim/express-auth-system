import { AppError } from '../errors/AppError.js';
import type { PublicUser } from '../types/user.types.js';
import type { 
  SignUpData, SignInData, ChangePasswordData,
  ResetPasswordData
} from '../types/auth.types.js';
import * as emailVerificationService from '../email/email-verification.service.js';
import * as emailService from '../email/email.service.js';
import { generateToken } from '../utils/jwt.js';
// ../utils/password.js
import { hashPassword, comparePassword, generatePasswordResetOTP, hashOTP, generatePasswordResetToken, hashPasswordResetToken } from '../utils/password.js';
// ./auth.repository.js
import * as authRepo from './auth.repository.js';
// ./auth.validator.js
import * as authValidator from './auth.validator.js';
// user.repository.js
import * as userRepo from '../user/user.repository.js';
// ../utils/email.js
import { validateEmail } from '../utils/email.js';



export const signUp = async (data: SignUpData) => {
  // validate input data
  const validatedData = authValidator.validateSignUpInput(data);

  // check if email already exist
  const existingEmail = await authRepo.findUserByEmail(validatedData.email);

  if (existingEmail) {
    throw new AppError('Email already exists. Please use another email.', 409);
  }

  const hashedPassword = await hashPassword(validatedData.password);

  const newSignUpData = {
    ...validatedData,
    password: hashedPassword
  }

  // create user
  const newUser: PublicUser = await authRepo.createUser(newSignUpData);

  const verificationToken = await emailVerificationService.createVerificationToken(newUser.id);

  await emailService.sendVerificationEmail(newUser.id, verificationToken);

  return newUser;
}

export const signIn = async (data: SignInData) => {
  // validate data
  const validatedData = authValidator.validateSignInData(data);

  // check if the email exists
  const existingEmail = await authRepo.findUserByEmail(validatedData.email);

  if (!existingEmail) {
    throw new AppError('Invalid email or password', 400);
  };

  // compare the provided password against the hashed password in the db
  const isPasswordValid = await comparePassword(validatedData.password, existingEmail.password);

  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 400);
  }

  const updatedUser = await authRepo.updateLastLogin(existingEmail.id);

  // pass id into generateToke and return the result
  const token = generateToken(updatedUser.id);

  return {
    token: token,
    userId: updatedUser.id
  };
}

export const ChangePassword = async ({ data, userId}: {data: ChangePasswordData, userId: string}) => {
  const validatedData = authValidator.validateChangePassword(data);

  // get user by user ID
  const userPassword = await authRepo.getUserPasswordById(userId);

  if (!userPassword) {
    throw new AppError("User not found", 404);
  }

  // compare userPassword with the old password from user input
  const validPassword = await comparePassword(validatedData.oldPassword, userPassword);

  if (!validPassword) {
    throw new AppError('Wrong password', 400);
  }

  // hash new dashboard
  const hashedNewPassword = await hashPassword(validatedData.newPassword);

  // construct new password data. 
  const newPasswordData = {
    password: hashedNewPassword,
    userId
  }

  await authRepo.ChangePassword(newPasswordData);
}

export const requestPasswordReset = async ( email: string ) => {
  const validatedEmail = validateEmail(email);

  const user = await authRepo.findUserByEmail(validatedEmail);

  if (!user) {
    return {
      userFound: false
    };
  }

  const otp = generatePasswordResetOTP();

  const hasedOTP = await hashOTP(otp);

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  // construct password reset otp data
  const passwordResetData = {
    user_id: user.id,
    hashed_otp: hasedOTP,
    expires_at: expiresAt
  }

  await authRepo.createPasswordResetOTP(passwordResetData);

  await emailService.sendPasswordResetOTP(user.email, otp);
}

export const verifyPasswordOTP = async (otp: string) => {
  const hashed_otp = hashOTP(otp);

  const passwordResetOTP = await authRepo.getPasswordResetOTPByHashedOTP(hashed_otp);

  if (!passwordResetOTP) {
    throw new AppError('Invalid OTP', 400);
  }

  const currentTime = new Date();

  if (currentTime > passwordResetOTP.expires_at) {
    throw new AppError('OTP has expired', 400);
  }

  if (passwordResetOTP.used) {
    throw new AppError('OTP has already been used', 400);
  }

  // Mark the OTP as used
  await authRepo.markOPTAsUsed(passwordResetOTP.id);

  // generate reset token
  const resetToken = generatePasswordResetToken();

  // hash the reset token
  const hashedResetToken = hashPasswordResetToken(resetToken);

  const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

  const passwordResetTokenData = {
    user_id: passwordResetOTP.user_id,
    hashed_token: hashedResetToken,
    expires_at: resetTokenExpiry
  }

  await authRepo.createPasswordResetToken(passwordResetTokenData);

  return {
    resetToken
  };
}

export const resetPassword = async (data: ResetPasswordData) => {
  const { resetToken, newPassword } = data;

  const validatedPassword = authValidator.validatePassword(newPassword);

  const hashedResetToken = hashPasswordResetToken(resetToken);

  const passwordResetToken = await authRepo.getPasswordResetTokenByToken(hashedResetToken);

  if (!passwordResetToken) {
    throw new AppError('Invalid reset token', 400);
  }

  const currentTime = new Date();

  if (currentTime > passwordResetToken.expires_at) {
    throw new AppError('Reset token has expired', 400);
  }

  if (passwordResetToken.used) {
    throw new AppError('Reset token has already been used', 400);
  }

  // get user by user ID
  const userPassword = await authRepo.getUserPasswordById(passwordResetToken.user_id);

  if (!userPassword) {
    throw new AppError('User not found', 404);
  }

  const validPassword = await comparePassword(validatedPassword, userPassword);

  if (validPassword) {
    throw new AppError('New password cannot be the same as the old password', 400);
  }

  // hash the validated password
  const hashedPassword = await hashPassword(validatedPassword);

  await authRepo.updateUserPassword(passwordResetToken.user_id, hashedPassword);

  // mark reset token as used
  await authRepo.markPasswordResetTokenAsUsed(passwordResetToken.id);
}