import type { User, PublicUser } from '../types/user.types.js';
import type { SignUpData, SignInData, ChangePasswordData } from '../types/auth.types.js';
import * as authRepo from './auth.repository.js';
import * as authValidator from './auth.validator.js';
import * as userRepo from '../user/user.repository.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';


export const signUp = async (data: SignUpData) => {
  // validate input data
  const validatedData = authValidator.validateSignUpInput(data);

  // check if email already exist
  const existingEmail = await authRepo.findUserByEmail(validatedData.email);

  if (existingEmail) {
    throw new Error('Email already exists. Please use another email.');
  }

  const hashedPassword = await hashPassword(validatedData.password);

  const newSignUpData = {
    ...validatedData,
    password: hashedPassword
  }

  // create user
  const newUser: User = await authRepo.createUser(newSignUpData);

  return newUser;
}

export const signIn = async (data: SignInData) => {
  // validate data
  const validatedData = authValidator.validateSignInData(data);

  // check if the email exists
  const existingEmail = await authRepo.findUserByEmail(validatedData.email);

  if (!existingEmail) {
    throw new Error("Invalid email or password")
  };

  // compare the provided password against the hashed password in the db
  const isPasswordValid = await comparePassword(validatedData.password, existingEmail.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
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
    throw new Error("User doesn't exist");
  }

  // compare userPassword with the old password from user input
  const validPassword = await comparePassword(validatedData.oldPassword, userPassword);

  if (!validPassword) {
    throw new Error('Wrong password');
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