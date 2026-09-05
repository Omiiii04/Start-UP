import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { authorizeAdmin } from '../../middleware/authorize';
import * as crmController from './crm.controller';

const router = Router();

router.use(authenticate, authorizeAdmin);

/**
 * GET /api/v1/crm/stats
 * Dashboard statistics — all admins.
 */
router.get('/stats', crmController.getStats);

/**
 * GET /api/v1/crm/inquiries
 * All project inquiries with client details — all admins.
 * Query: ?techFeasibility=approved|under_review|rejected
 */
router.get('/inquiries', crmController.getInquiries);

export default router;
