import { pool } from '../config/db.js';
import { AppError } from "../errors/AppError.js";
import type { User} from '../types/user.types.js';
import type { NewPasswordData, SignUpData } from '../types/auth.types.js';

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