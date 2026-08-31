import { pool } from "../config/db.js";
import { AppError } from "../errors/AppError.js";
import type { CreateEmailVerificationData, EmailVerificationData } from "../types/email-verification.types.js";

export const createEmailVerificationToken = async (data: CreateEmailVerificationData) => {
  const { userId, token, expiresAt } = data
  const result = await pool.query(
    `
      INSERT INTO email_verification_tokens (
        user_id,
        token,
        expires_at
      )
      VALUES ($1, $2, $3)
    `, [userId, token, expiresAt]
  );

  return result.rowCount;
}

export const getEmailVerificationDataByToken = async (token: string): Promise<EmailVerificationData | undefined> => {

  const result = await pool.query<EmailVerificationData>(
    `
      SELECT 
        id,
        user_id AS "userId",
        token,
        created_at AS "createdAt",
        expires_at As "expiresAt" 
      FROM email_verification_tokens
      WHERE token = $1
    `, [token]
  )

  return result.rows[0];
}

export const deleteEmailVerificationToken = async (token: string) => {
  const result = await pool.query(
    `
      DELETE FROM email_verification_tokens
      WHERE token = $1
    `, [token]
  );

  return result.rowCount;
}

export const deleteTokenByUserId = async (userId: string) => {
  const result = await pool.query(
    `
      DELETE FROM email_verification_tokens
      WHERE token = $1
    `, [userId]
  );

  return result.rowCount;
}