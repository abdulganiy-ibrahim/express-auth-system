import { pool } from '../config/db.js';
import type { CreateProjectData, Project } from '../types/project.types.js';

export const creeatProject = async (projectData: CreateProjectData): Promise<Project> => {
  const { userId, title, description, technologies} = projectData;

  const result = await pool.query<Project>(
    `
      INSERT INTO projects (user_id, title, description, technologies)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [userId, title, description, technologies]
  );

  return result.rows[0]!;
}

export const getProjectsByUserId = async (userId: string) => {
  const result = await pool.query<Project>(
    `
    SELECT * FROM projects
    WHERE user_id = $1
    `, [userId]
  );

  return result.rows;
}

export const deleteProjectById = async (projectId: number) => {
  const result = await pool.query(
    `
      DELETE FROM projects
      WHERE id = $1
    `, [projectId]
  )

  return result.rowCount;
}