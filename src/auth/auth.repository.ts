import { pool } from '../config/db.js';
import type { User, SignUpData } from '../types/user.types.js';

export const getUsers = async (): Promise<User[]> => {
  
  const result = await pool.query<User>('SELECT * FROM users');

  return result.rows;
}

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