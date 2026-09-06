import { Response } from 'express';

/**
 * Standard success response (Architecture.md §3.1)
 * { "success": true, "message": "...", "data": {} }
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  message = 'Operation completed successfully.',
  statusCode = 200
): Response {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

/**
 * Standard error response (Architecture.md §3.1)
 * { "success": false, "error": { "code": "...", "message": "..." } }
 */
export function sendError(
  res: Response,
  statusCode: number,
  code: string,
  message: string
): Response {
  return res.status(statusCode).json({
    success: false,
    error: { code, message },
  });
}

/**
 * Custom application error — thrown in services, caught by errorHandler middleware.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true; // Distinguishes known errors from unexpected crashes
    if (typeof (Error as any).captureStackTrace === 'function') {
      (Error as any).captureStackTrace(this, this.constructor);
    }
  }
}

// ---- Common error factories ----

export const Errors = {
  notFound: (resource: string) =>
    new AppError(404, 'NOT_FOUND', `${resource} not found.`),

  unauthorized: (msg = 'Authentication required.') =>
    new AppError(401, 'UNAUTHORIZED', msg),

  forbidden: (msg = 'You do not have permission to perform this action.') =>
    new AppError(403, 'FORBIDDEN', msg),

  badRequest: (msg: string) =>
    new AppError(400, 'BAD_REQUEST', msg),

  conflict: (msg: string) =>
    new AppError(409, 'CONFLICT', msg),

  validationError: (msg: string) =>
    new AppError(422, 'VALIDATION_ERROR', msg),

  internal: (msg = 'An unexpected error occurred.') =>
    new AppError(500, 'INTERNAL_ERROR', msg),
};
