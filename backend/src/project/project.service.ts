import type { CreateProjectData, Project } from '../types/user.types.js';
import * as projectRepo from './project.repository.js';
import { validateProjectData } from './project.validator.js';

export const createProject = async (projectData: CreateProjectData): Promise<Project> => {
  const validatedData = validateProjectData(projectData);

  const project = await projectRepo.creeatProject(validatedData);

  return project;
}

export const getProjectsByUserId = async (userId: string) => {
  const projects = await projectRepo.getProjectsByUserId(userId);

  return projects;
}