import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { IUserDocument } from '../types/user.types';
import { JwtCustomPayload } from '../types/auth.types';
import { ApiResponse } from '../types/api.types';

export interface AuthenticatedRequest extends Request {
  user?: IUserDocument;
}

/**
 * Protect routes - verifies Bearer JWT token and attaches user document to req.user
 */
export async function protect(
  req: AuthenticatedRequest,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Access denied. No authorization token provided.',
    });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({
      success: false,
      message: 'JWT_SECRET is missing from server configuration.',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtCustomPayload;

    if (!decoded || !decoded.id) {
      res.status(401).json({
        success: false,
        message: 'Invalid authorization token payload.',
      });
      return;
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User belonging to this token no longer exists.',
      });
      return;
    }

    req.user = user;
    next();
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: 'Authorization token has expired. Please sign in again.',
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: 'Invalid authorization token signature.',
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: 'Authentication failed.',
    });
  }
}
