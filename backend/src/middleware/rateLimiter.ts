import rateLimit from 'express-rate-limit';
import { sendError } from '../shared/apiResponse';

const rateLimitHandler = (req: any, res: any) => {
  sendError(res, 429, 'RATE_LIMIT_EXCEEDED', 'Too many requests. Please slow down and try again shortly.');
};

/**
 * globalLimiter — applied to all API routes.
 * 100 requests per 15-minute window per IP.
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  skip: (req) => req.path === '/api/v1/health', // Don't rate-limit health checks
});

/**
 * authLimiter — stricter limit for authentication endpoints.
 * 10 requests per 15-minute window per IP.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  message: 'Too many authentication attempts.',
});

/**
 * uploadLimiter — for file upload endpoints.
 * 20 uploads per hour per IP.
 */
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});
