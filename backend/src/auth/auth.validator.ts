import type { SignUpData, SignInData, ChangePasswordData } from '../types/auth.types.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const validateSignUpInput = (data: SignUpData) => {
  const { name, email, password } = data;

  // check if all required fields is provided;
  if ( !name || !email || !password ) {
    throw new Error('All fields are required');
  }

  //check if type of input are correct;
  if ( typeof name !== 'string' ) {
    throw new Error('Name must be a string');
  }

  if ( typeof email !== 'string' ) {
    throw new Error('Email must be a string');
  }

  if ( typeof password !== 'string' ) {
    throw new Error('Password must be a string');
  }

  // normalize email to lower case
  const normalizedEmail = email.trim().toLowerCase();

  // validate email format;
  if (!emailRegex.test(normalizedEmail)) {
    throw new Error('Enter a valid email');
  }

  // validate password format and lenght
  if ( password.length < 8 ) {
    throw new Error('Password must have at least 8 characters');
  }

  if (!passwordRegex.test(password)) {
    throw new Error(
      'Password must be at least 8 characters and contain a number and special character'
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
    throw new Error('All fields are required');
  }

  // make sure type of email and password is string in RUNTIME
  if ( typeof email !== 'string' ) {
    throw new Error('Email must be a string');
  }

  if ( typeof password !== 'string' ) {
    throw new Error('Password must be a string');
  }

  // normalize email to lower case
  const normalizedEmail = email.trim().toLowerCase();

  // validate email format;
  if (!emailRegex.test(normalizedEmail)) {
    throw new Error('Enter a valid email');
  }

  // validate password format and lenght
  if ( password.length < 8 ) {
    throw new Error('Password must have at least 8 characters');
  }

  return {
    ...data,
    email: normalizedEmail
  }
}

export const validateChangePassword = ( data: ChangePasswordData) => {
  const { oldPassword, newPassword } = data;

  if (!oldPassword || !newPassword) {
    throw new Error('All fields are required');
  }

  if (
    typeof oldPassword !== 'string' || 
    typeof newPassword !== 'string'
  ) {
    throw new Error('Invalid password data');
  }

  if (oldPassword === newPassword) {
    throw new Error('Try enter a new password');
  }

  if ( newPassword.length < 8 ) {
    throw new Error('Password must have at least 8 characters');
  }

  if (!passwordRegex.test(newPassword)) {
    throw new Error(
      'Password must be at least 8 characters and contain a number and special character'
    );
  }

  return {
    ...data
  }
}