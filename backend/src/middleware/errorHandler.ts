import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/apiResponse';
import { env } from '../config/env';

/**
 * Global error handler — must be registered last in Express middleware chain.
 * Catches all errors thrown by route handlers and other middleware.
 */
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Known operational errors (AppError)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  // PostgreSQL unique constraint violation (code 23505)
  if (err && typeof err === 'object' && 'code' in err) {
    const pgErr = err as { code: string; detail?: string };
    if (pgErr.code === '23505') {
      res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: 'A record with this data already exists.',
        },
      });
      return;
    }
  }

  // Unexpected errors — log and return generic message in production
  console.error('[ERROR]', {
    method: req.method,
    path: req.path,
    error: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? err.stack : undefined,
  });

  const message = env.NODE_ENV === 'production'
    ? 'An unexpected error occurred. Please try again later.'
    : (err instanceof Error ? err.message : String(err));

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message,
    },
  });
}

/**
 * 404 handler — for routes not matched by any registered handler.
 */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} does not exist.`,
    },
  });
}
