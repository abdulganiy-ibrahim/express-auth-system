import type { Request, Response } from 'express';
import type { CreateProjectData, Project } from '../types/project.types.js';
import * as userService from '../user/user.service.js';
import * as projectService from './project.service.js';

export const createProject = async (req: Request<{}, {}, CreateProjectData>, res: Response) => {
  try {
    const userId = req.userId;

    // handle if user ID is undefined
    if (!userId) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    // get user by userId;
    const userData = await userService.getUserById(userId);

    if (!userData) {
      return res.status(401).json({
        message: 'User not found'
      });
    }

    // add userId to projectData coming from the request
    const projectData = {
      ...req.body,
      userId: userData.id
    }

    const project = await projectService.createProject(projectData);

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Unexpected error'
    });
  }
}

export const getProjectsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    const projects = await projectService.getProjectsByUserId(userId);

    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Something went wrong"
    });
  }
}