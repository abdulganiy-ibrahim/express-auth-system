import bcrypt from 'bcrypt';
import crypto from 'crypto';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const hashVerificationToken = (token: string): string => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};

export const validateEmail = (email: string): string => {
  if (typeof email !== 'string') {
    throw new Error('Email must be a string');
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!emailRegex.test(normalizedEmail)) {
    throw new Error('Enter a valid email');
  }

  return normalizedEmail;
}