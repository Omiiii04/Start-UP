import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validateBody } from '../../middleware/validateBody';
import { z } from 'zod';
import * as milestonesController from './milestones.controller';

const router = Router({ mergeParams: true });

const statusSchema = z.object({
  status: z.enum(['pending', 'invoiced', 'paid', 'released']),
  paymentGatewayRef: z.string().max(255).optional(),
});

router.use(authenticate);

/**
 * GET /api/v1/projects/:projectId/milestones
 * Clients: own project milestones. Admins: any.
 */
router.get(
  '/',
  authorize(['client', 'admin_ceo', 'admin_backend', 'admin_qa', 'admin_ops']),
  milestonesController.getMilestones
);

/**
 * PATCH /api/v1/milestones/:milestoneId/status
 * Update milestone status — Ops and CEO only.
 */
router.patch(
  '/:milestoneId/status',
  authorize(['admin_ceo', 'admin_ops']),
  validateBody(statusSchema),
  milestonesController.updateStatus
);

export default router;
