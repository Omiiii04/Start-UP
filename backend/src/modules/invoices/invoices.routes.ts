import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validateBody } from '../../middleware/validateBody';
import { z } from 'zod';
import * as invoicesController from './invoices.controller';

const router = Router();

const generateSchema = z.object({
  projectId: z.string().uuid(),
  milestoneId: z.string().uuid(),
  clientState: z.string().length(2, 'Use 2-letter state code e.g. MH, KA'),
  sacCode: z.enum(['998314', '998315']),
  clientEmail: z.string().email(),
  clientName: z.string().min(2).max(100),
});

router.use(authenticate);

/**
 * POST /api/v1/invoices/generate
 * Generate GST invoice — Ops and CEO only. No payment gateway.
 */
router.post(
  '/generate',
  authorize(['admin_ceo', 'admin_ops']),
  validateBody(generateSchema),
  invoicesController.generateInvoice
);

/**
 * GET /api/v1/invoices/:id
 * Get single invoice — ownership-scoped for clients.
 */
router.get(
  '/:id',
  authorize(['client', 'admin_ceo', 'admin_ops']),
  invoicesController.getInvoice
);

/**
 * GET /api/v1/projects/:projectId/invoices
 * Get all invoices for a project — mounted in projects router too.
 */
router.get(
  '/project/:projectId',
  authorize(['client', 'admin_ceo', 'admin_ops']),
  invoicesController.getProjectInvoices
);

export default router;
