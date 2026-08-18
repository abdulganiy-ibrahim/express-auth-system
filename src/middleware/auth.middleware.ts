import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get token from cookie
    const token = req.cookies.accessToken;

    console.log("TOKEN:", token);

    // handle if no token
    if (!token) {
      return res.status(401).json({
        message: 'Authentication require'
      })
    }

    // verify token
    const payload = verifyToken(token);

    // get user ID from jwt
    const userId = payload.sub;

    // make sure user exist
    if (!userId) {
      return res.status(401).json({
        message: 'Invalid authentication token'
      })
    }

    // attach user ID to request
    req.userId = userId;

    // continue to the next handler
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    })
  }
    
}