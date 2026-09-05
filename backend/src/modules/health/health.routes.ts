import { Router, Request, Response } from 'express';
import { checkDatabaseConnection } from '../../config/database';

const router = Router();

/**
 * GET /api/v1/health
 * Public health check — used by Render load balancer and uptime monitors.
 */
router.get('/', async (_req: Request, res: Response) => {
  const dbOk = await checkDatabaseConnection();

  const status = {
    status: dbOk ? 'ok' : 'degraded',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    services: {
      database: dbOk ? 'ok' : 'error',
      api: 'ok',
    },
  };

  res.status(dbOk ? 200 : 503).json({ success: true, data: status });
});

export default router;
