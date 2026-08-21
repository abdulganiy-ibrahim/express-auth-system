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