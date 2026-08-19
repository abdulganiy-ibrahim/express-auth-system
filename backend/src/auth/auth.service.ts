import type { User, SignUpData, SignInData } from '../types/user.types.js';
import * as authRepo from './auth.repository.js';
import * as authValidator from './auth.validator.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export const getUsers = async () => {
  const users: User[] = await authRepo.getUsers();

  return users;
}

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
  return generateToken(updatedUser.id);
}

export const getUserById = async (userId: string) => {
  const user = await authRepo.getUserById(userId);

  return user;
}