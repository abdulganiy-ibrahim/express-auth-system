import type { Request, Response } from "express";
import type { User, SignUpData } from '../types/user.types.js';
import * as authService from './auth.service.js';

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
    const result = await authService.signIn(req.body);

    res.cookie('accessToken', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax"
    });

    return res.status(200).json({
      userId: result.userId
    })

  } catch (error) {
    res.status(500).json({
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