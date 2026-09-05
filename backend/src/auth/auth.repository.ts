import { pool } from '../config/db.js';
import { AppError } from "../errors/AppError.js";
import type { User} from '../types/user.types.js';
import type { NewPasswordData, CreatePasswordResetOTPData, SignUpData, PasswordResetOTPData, PasswordResetTokenData, CreatePasswordResetTokenData } from '../types/auth.types.js';

export const createUser = async (data: SignUpData) => {
  const { name, email, password } = data;

  const result = await pool.query<User>(
    `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at, last_login
    `,
    [name, email, password]
  );

  return result.rows[0]!;
}

export const verifyUserEmail = async (userId: string) => {

  const result = await pool.query(
    `
      UPDATE users
      SET email_verified = TRUE
      WHERE id = $1
      RETURNING id, email_verified
    `, [userId]
  );

  if (result.rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  return result.rows[0];
}; 

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const result = await pool.query<User>(
    `
      SELECT * FROM users
      WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
}

export const updateLastLogin = async (userId: string): Promise<User> => {
  const result = await pool.query(
    `
      UPDATE users
      SET last_login = NOW()
      WHERE id = $1
      RETURNING *
    `, [userId]
  )

  return result.rows[0];
}

export const getUserPasswordById = async (userId: string): Promise<string> => {
  const result = await pool.query(
    `
      SELECT password FROM users
      WHERE id = $1
    `, [userId]
  );

  return result.rows[0]?.password;
}

export const ChangePassword = async (data: NewPasswordData) => {
  const { password, userId } = data;

  const result = await pool.query(
    `
      UPDATE users
      SET password = $1
      WHERE id = $2
    `, [password, userId]
  );

  return result.rows[0];
}

export const createPasswordResetOTP = async (data: CreatePasswordResetOTPData) => {
  const { user_id, hashed_otp, expires_at } = data;

  const result = await pool.query(
    `
      INSERT INTO password_reset_otps (user_id, hashed_otp, expires_at)
      VALUES ($1, $2, $3)
    `, [user_id, hashed_otp, expires_at]
  );

  return result.rowCount;
}

export const getPasswordResetOTPByHashedOTP = async (hashed_otp: string): Promise<PasswordResetOTPData> => {
  const result = await pool.query(
    `
      SELECT * FROM password_reset_otps
      WHERE hashed_otp = $1
    `, [hashed_otp]
  );

  if ( result.rows.length === 0 ) {
    throw new AppError('Invalid OTP', 404);
  }

  return result.rows[0];
}

export const markOPTAsUsed = async (otpId: string) => {
  const result = await pool.query(
    `
      UPDATE password_reset_otps
      SET used = TRUE
      WHERE id = $1
    `, [otpId]
  );
}

export const createPasswordResetToken = async (data: CreatePasswordResetTokenData) => {
  const { user_id, hashed_token, expires_at } = data;

  const result = await pool.query(
    `
      INSERT INTO password_reset_tokens (user_id, hashed_token, expires_at)
      VALUES ($1, $2, $3)
    `, [user_id, hashed_token, expires_at]
  );

  return result.rowCount;
}

export const getPasswordResetTokenByToken = async (token: string): Promise<PasswordResetTokenData> => {
  const result = await pool.query(
    `
      SELECT * FROM password_reset_tokens
      WHERE hashed_token = $1
    `, [token]
  );

  if (result.rows.length === 0) {
    throw new AppError('Invalid reset token', 404);
  }

  return result.rows[0];
}

export const updateUserPassword = async ( userId: string, password: string) => {
  const result = await pool.query(
    `
      UPDATE users
      SET password = $1
      WHERE id = $2
    `, [password, userId]
  );

  return result.rows[0];
}

export const markPasswordResetTokenAsUsed = async (tokenId: string) => {
  const result = await pool.query(
    `
      UPDATE password_reset_tokens
      SET used = TRUE
      WHERE id = $1
    `, [tokenId]
  );

  return result.rowCount;
}