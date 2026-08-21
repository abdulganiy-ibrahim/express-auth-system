import type { Request, Response } from 'express';
import * as userService from './user.service.js';

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();

  return res.status(200).json(users);
}

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      message: 'Authentication required'
    });
  }

  const user = await userService.getUserById(userId);

  res.status(200).json(user);
}