import type { Request, Response } from 'express';
import * as userService from './user.service.js';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Something went wrong'
    });
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    const user = await userService.getUserById(userId);

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Something went wrong'
    }); 
  }
}