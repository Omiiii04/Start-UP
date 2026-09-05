import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { optionalAuthenticate } from '../../middleware/authenticate';
import { validateBody } from '../../middleware/validateBody';
import { intakeSubmitSchema } from './intake.schema';
import * as intakeController from './intake.controller';

const router = Router();

/**
 * POST /api/v1/intake/submit
 * Submit a new project requirement. Requires authentication.
 * Runs UGC screening server-side.
 */
router.post(
  '/submit',
  authenticate,
  validateBody(intakeSubmitSchema),
  intakeController.submit
);

/**
 * GET /api/v1/intake/status/:trackingCode
 * Public — track intake by tracking code (no auth required).
 * Returns only safe public fields (step, feasibility status).
 */
router.get('/status/:trackingCode', intakeController.getStatus);

export default router;
