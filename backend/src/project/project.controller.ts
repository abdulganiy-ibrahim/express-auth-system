import type { NextFunction, Request, Response } from 'express';
import type { CreateProjectData, Project } from '../types/project.types.js';
import * as userService from '../user/user.service.js';
import * as projectService from './project.service.js';
import { AppError } from '../errors/AppError.js';

export const createProject = async (req: Request<{}, {}, CreateProjectData>, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    // handle if user ID is undefined
    if (!userId) {
      throw new AppError('Authentication required', 401)
    }

    // get user by userId;
    const userData = await userService.getUserById(userId);

    if (!userData) {
      throw new AppError('User not found', 404)
    }

    // add userId to projectData coming from the request
    const projectData = {
      ...req.body,
      userId: userData.id
    }

    const project = await projectService.createProject(projectData);

    return res.status(201).json(project);
  } catch (error) {
    next(error);
  }
}

export const getProjectsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new AppError('Authentication required', 401)
    }

    const projects = await projectService.getProjectsByUserId(userId);

    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
}

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  const projectId = Number(req.params.id);
  const userId = req.userId;

  try {
    if (!userId) {
      throw new AppError('Authentication required', 401)
    }

    await projectService.deleteProject(projectId);

    return res.status(204).json({
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }

}