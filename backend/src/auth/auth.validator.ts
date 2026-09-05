import { AppError } from '../errors/AppError.js';
import type { SignUpData, SignInData, ChangePasswordData } from '../types/auth.types.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const validateSignUpInput = (data: SignUpData) => {
  const { name, email, password } = data;

  // check if all required fields is provided;
  if ( !name || !email || !password ) {
    throw new AppError('All fields are required', 400);
  }

  //check if type of input are correct;
  if ( typeof name !== 'string' ) {
    throw new AppError('Please enter your username', 400);
  }

  if ( typeof email !== 'string' ) {
    throw new AppError('Please enter a valid email', 400);
  }

  if ( typeof password !== 'string' ) {
    throw new AppError('Please enter your password', 400);
  }

  // normalize email to lower case
  const normalizedEmail = email.trim().toLowerCase();

  // validate email format;
  if (!emailRegex.test(normalizedEmail)) {
    throw new AppError('please enter a valid email', 400);
  }

  // validate password format and lenght
  if ( password.length < 8 ) {
    throw new AppError('Password must have at least 8 characters', 400);
  }

  if (!passwordRegex.test(password)) {
    throw new AppError(
      'Please enter a strong password', 400
    );
  }

  return {
    ...data,
    email: normalizedEmail
  }
}

export const validateSignInData = ( data: SignInData ) => {
  const { email, password } = data;

  // check if required fields are provide
  if ( !email || !password ) {
    throw new AppError('All fields are required', 400);
  }

  // make sure type of email and password is string in RUNTIME
  if ( typeof email !== 'string' ) {
    throw new AppError('Please enter a valid email address', 400);
  }

  if ( typeof password !== 'string' ) {
    throw new AppError('Please enter your password', 400);
  }

  // normalize email to lower case
  const normalizedEmail = email.trim().toLowerCase();

  // validate email format;
  if (!emailRegex.test(normalizedEmail)) {
    throw new AppError('Please enter a valid email address', 400);
  }

  // validate password format and lenght
  if ( password.length < 8 ) {
    throw new AppError('Password must contain at least 8 characters', 400);
  }

  return {
    ...data,
    email: normalizedEmail
  }
}

export const validateChangePassword = ( data: ChangePasswordData) => {
  const { oldPassword, newPassword } = data;

  if (!oldPassword || !newPassword) {
    throw new AppError('All fields are required', 400);
  }

  if (
    typeof oldPassword !== 'string' || 
    typeof newPassword !== 'string'
  ) {
    throw new AppError('Please enter your current password and new password', 400);
  }

  if (oldPassword === newPassword) {
    throw new AppError('New password must be different from your current password.', 400);
  }

  if ( newPassword.length < 8 ) {
    throw new AppError('Password must have at least 8 characters', 400);
  }

  if (!passwordRegex.test(newPassword)) {
    throw new AppError(
      'Please enter a valid password', 400
    );
  }

  return {
    ...data
  }
}

export const validatePassword = (password: string) => {
  if (!password) {
    throw new AppError('Password is required', 400);
  }

  if (typeof password !== 'string') {
    throw new AppError('Please enter a valid password', 400);
  }

  if (password.length < 8) {
    throw new AppError('Password must have at least 8 characters', 400);
  }

  if (!passwordRegex.test(password)) {
    throw new AppError('Please enter a valid password', 400);
  }

  return password;
}