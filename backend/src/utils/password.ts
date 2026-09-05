import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 12);

  return hashedPassword;
}

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
};

export const generatePasswordResetOTP = (): string => {
  return crypto.randomInt(100000, 1000000).toString();

}

const otpSecret = process.env.OTP_SECRET;

if (!otpSecret) {
  throw new Error('OTP_SECRET is not defined');
}

export const hashOTP = (otp: string): string => {
  const hashedOTP = crypto
    .createHmac('sha256', otpSecret)
    .update(otp)
    .digest('hex');

  return hashedOTP;
}

export const generatePasswordResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
}

export const hashPasswordResetToken = (token: string): string => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
}