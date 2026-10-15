import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/api.types';

interface MongoError extends Error {
  code?: number;
  keyValue?: Record<string, string>;
  errors?: Record<string, { message: string }>;
}

export function errorHandler(
  err: MongoError,
  _req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction
): void {
  console.error('[Error Middleware]', err);

  let statusCode = 500;
  let message = 'An unexpected server error occurred';
  const errors: Record<string, string> = {};

  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000 && err.keyValue) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0] ?? 'field';
    const value = err.keyValue[field] ?? '';
    message = `An account with this ${field} (${value}) already exists`;
    errors[field] = message;
  }
  // Handle Mongoose validation errors
  else if (err.name === 'ValidationError' && err.errors) {
    statusCode = 400;
    message = 'Validation failed';
    for (const key of Object.keys(err.errors)) {
      const errorItem = err.errors[key];
      if (errorItem) {
        errors[key] = errorItem.message;
      }
    }
  }
  // Handle CastError (invalid ObjectId)
  else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Resource not found or invalid identifier format';
  } else if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(Object.keys(errors).length > 0 ? { errors } : {}),
  });
}
