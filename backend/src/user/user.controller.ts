import type { Request, Response } from 'express';
import * as userService from './user.service.js';

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();

  return res.status(200).json(users);
}