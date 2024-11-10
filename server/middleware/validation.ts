import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../lib/errors.js';

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export function validateRegistration(req: Request, res: Response, next: NextFunction) {
  try {
    registrationSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(error.errors[0].message, 400);
    }
    next(error);
  }
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(error.errors[0].message, 400);
    }
    next(error);
  }
}