import { pool } from "../config/db.js";
import type { PublicUser } from "../types/user.types.js";

export const getUsers = async (): Promise<PublicUser[]> => {
  const result = await pool.query<PublicUser>(
    `
      SELECT id, name, email, created_at, last_login FROM users
    `
  );

  return result.rows;
}

export const getUserById = async (userId: string): Promise<PublicUser | undefined> => {
  const result = await pool.query<PublicUser>(
    `
      SELECT id, name, email, created_at, last_login FROM users
      WHERE id = $1
    `, [userId]
  );

  return result.rows[0];
}

export const deleteUserById = async (userId: string): Promise<PublicUser | undefined> => {
  const result = await pool.query<PublicUser>(
    `
      DELETE FROM users 
      where id = $1
      RETURNING id, name, email, created_at, last_login
    `, [userId]
  );

  return result.rows[0];
}