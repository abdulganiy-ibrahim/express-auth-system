import type { CreateProjectData, Project } from '../types/project.types.js';
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

export const deleteProject = async (projectId: number) => {
  const deletedProject = await projectRepo.deleteProjectById(projectId);

  if (deletedProject === 0) {
    throw new Error('Project not found');
  }

  return deletedProject;
}