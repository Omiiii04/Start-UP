import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendError } from '../shared/apiResponse';

/**
 * validateBody — Zod schema validation middleware factory.
 * Validates req.body against the provided schema.
 * Returns 422 VALIDATION_ERROR if validation fails.
 *
 * Usage:
 *   router.post('/submit', authenticate, validateBody(intakeSchema), intakeController.submit)
 */
export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = (result.error as ZodError).flatten().fieldErrors;
      const firstError = Object.entries(errors)[0];
      const message = firstError
        ? `${firstError[0]}: ${firstError[1]?.join(', ')}`
        : 'Invalid request data.';

      sendError(res, 422, 'VALIDATION_ERROR', message);
      return;
    }

    // Replace req.body with the Zod-parsed (and type-coerced) value
    req.body = result.data;
    next();
  };
}

/**
 * validateParams — Zod schema validation for route params.
 */
export function validateParams<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      sendError(res, 400, 'INVALID_PARAMS', 'Invalid route parameters.');
      return;
    }

    req.params = result.data as typeof req.params;
    next();
  };
}
