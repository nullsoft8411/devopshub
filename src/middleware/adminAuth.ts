import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../lib/errors';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin-secret-key';

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('No token provided', 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, ADMIN_SECRET) as {
      userId: string;
      role: string;
    };

    if (decoded.role !== 'admin') {
      throw new AppError('Unauthorized', 403);
    }

    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}