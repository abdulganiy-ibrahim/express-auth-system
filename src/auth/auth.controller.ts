import type { Request, Response } from "express";
import type { User, SignUpData } from '../types/user.types.js';
import * as authService from './auth.service.js';

export const getUsers = async (req: Request<{}, {}, User[]>, res: Response) => {
  const users = await authService.getUsers();

  res.status(200).json(users)
}

export const signUp = async (req: Request<{}, {}, SignUpData>, res: Response) => {
  try {
    const newUser = await authService.signUp(req.body);

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : 'something went wrong'
    });
  }
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const token = await authService.signIn(req.body);

    res.cookie('accessToken', token);

    return res.status(200).json({
      message: 'Signed in successfull'
    })

  } catch (error) {
    res.status(500).json({
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
      })
    }

    const userData = await authService.getUserById(userId);

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Something went wrong'
    });
  }
}

export const signOut = (req: Request, res: Response) => {
  try {
    res.clearCookie('accessToken');

    return res.status(200).json({
      message: 'Signed out successful'
    })
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Something went wrong'
    })
  }
}