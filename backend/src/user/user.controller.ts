import type { NextFunction, Request, Response } from 'express';
import * as userService from './user.service.js';
import { AppError } from '../errors/AppError.js';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;

  if (!userId) {
    throw new AppError('Authentication required', 401);
  }

  try {
    const user = await userService.getUserById(userId);

    res.status(200).json(user);
  } catch (error) {
    next(error); 
  }
}

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new AppError('Authentication required', 401);
    }

    const deletedUser = await userService.deleteUserById(userId);

    return res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
}