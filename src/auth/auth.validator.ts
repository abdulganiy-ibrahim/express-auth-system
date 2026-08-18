import type { SignUpData, SignInData } from '../types/user.types.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // validate email format;
  if (!emailRegex.test(email)) {
    throw new Error('Enter a valid email');
  }

  // validate password format and lenght
  if ( password.length < 8 ) {
    throw new Error('Password must have at least 8 characters');
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

  // validate email format;
  if (!emailRegex.test(email)) {
    throw new Error('Enter a valid email');
  }

  // validate password format and lenght
  if ( password.length < 8 ) {
    throw new Error('Password must have at least 8 characters');
  }
}