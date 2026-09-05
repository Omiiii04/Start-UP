import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validateBody } from '../../middleware/validateBody';
import { z } from 'zod';
import * as projectsController from './projects.controller';

const router = Router();

const workflowSchema = z.object({
  step: z.number().int().min(1).max(15),
});

const feasibilitySchema = z.object({
  techFeasibility: z.enum(['approved', 'under_review', 'rejected']),
  notes: z.string().max(2000).optional(),
});

const linksSchema = z.object({
  stagingUrl: z.string().url().optional(),
  repositoryUrl: z.string().url().optional(),
  gitBranch: z.string().max(100).optional(),
  gitCommitHash: z.string().max(40).optional(),
  testsPassingCount: z.number().int().min(0).optional(),
  testsTotalCount: z.number().int().min(0).optional(),
});

// All routes require authentication
router.use(authenticate);

/**
 * GET /api/v1/projects
 * Clients: own projects only. Admins: all projects.
 */
router.get(
  '/',
  authorize(['client', 'admin_ceo', 'admin_backend', 'admin_qa', 'admin_ops']),
  projectsController.listProjects
);

/**
 * GET /api/v1/projects/:id
 * Clients: only their own. Admins: any.
 */
router.get(
  '/:id',
  authorize(['client', 'admin_ceo', 'admin_backend', 'admin_qa', 'admin_ops']),
  projectsController.getProject
);

/**
 * PATCH /api/v1/projects/:id/workflow
 * Advance workflow step — admin only.
 */
router.patch(
  '/:id/workflow',
  authorize(['admin_ceo', 'admin_backend', 'admin_ops']),
  validateBody(workflowSchema),
  projectsController.advanceWorkflow
);

/**
 * PATCH /api/v1/projects/:id/feasibility
 * Update tech feasibility — CEO and Backend Lead only.
 */
router.patch(
  '/:id/feasibility',
  authorize(['admin_ceo', 'admin_backend']),
  validateBody(feasibilitySchema),
  projectsController.setFeasibility
);

/**
 * PATCH /api/v1/projects/:id/links
 * Update staging/repo URLs — admin only.
 */
router.patch(
  '/:id/links',
  authorize(['admin_ceo', 'admin_backend', 'admin_qa']),
  validateBody(linksSchema),
  projectsController.updateLinks
);

/**
 * DELETE /api/v1/projects/:id
 * Soft delete — admin_ceo only.
 */
router.delete(
  '/:id',
  authorize(['admin_ceo']),
  projectsController.deleteProject
);

export default router;
