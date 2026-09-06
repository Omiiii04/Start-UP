import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { CORS_ORIGINS, isProd } from './config/env';
import { globalLimiter } from './middleware/rateLimiter';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Route modules
import healthRoutes from './modules/health/health.routes';
import authRoutes from './modules/auth/auth.routes';
import usersRoutes from './modules/users/users.routes';
import intakeRoutes from './modules/intake/intake.routes';
import projectsRoutes from './modules/projects/projects.routes';
import milestonesRoutes from './modules/milestones/milestones.routes';
import invoicesRoutes from './modules/invoices/invoices.routes';
import crmRoutes from './modules/crm/crm.routes';
import uploadsRoutes from './modules/uploads/uploads.routes';

export function createApp() {
  const app = express();

  // ── Trust proxy (required for rate-limiting & HTTPS detection behind Render/Vercel)
  app.set('trust proxy', 1);

  // ── Security headers (Helmet)
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
        },
      },
      crossOriginEmbedderPolicy: false, // Allow Cloudinary images
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    })
  );

  // ── CORS — strict whitelist from env
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || CORS_ORIGINS.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS: Origin '${origin}' is not allowed.`));
        }
      },
      credentials: true, // Allow HttpOnly cookies
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // ── Cookie parser (for HttpOnly refresh token cookie)
  app.use(cookieParser());

  // ── Body parsers
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // ── Request logging
  app.use(requestLogger);

  // ── Global rate limiting
  app.use('/api', globalLimiter);

  // ── Routes
  app.use('/api/v1/health', healthRoutes);
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/users', usersRoutes);
  app.use('/api/v1/intake', intakeRoutes);
  app.use('/api/v1/projects', projectsRoutes);
  app.use('/api/v1/projects/:projectId/milestones', milestonesRoutes);
  app.use('/api/v1/projects/:projectId/files', uploadsRoutes);
  app.use('/api/v1/milestones', milestonesRoutes);
  app.use('/api/v1/invoices', invoicesRoutes);
  app.use('/api/v1/crm', crmRoutes);

  // ── API Index — lists all available endpoints
  app.get('/api/v1', (_req, res) => {
    res.json({
      success: true,
      data: {
        name: 'ProjectBridge API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
          health:    'GET  /api/v1/health',
          auth:      'POST /api/v1/auth/google  |  POST /api/v1/auth/refresh  |  POST /api/v1/auth/logout',
          users:     'GET  /api/v1/users/me  |  PATCH /api/v1/users/me',
          intake:    'POST /api/v1/intake/submit  |  GET /api/v1/intake/status/:trackingCode',
          projects:  'GET  /api/v1/projects  |  GET /api/v1/projects/:id',
          milestones:'GET  /api/v1/projects/:projectId/milestones',
          invoices:  'POST /api/v1/invoices/generate  |  GET /api/v1/invoices/:id',
          uploads:   'POST /api/v1/projects/:projectId/files',
          crm:       'GET  /api/v1/crm/stats  |  GET /api/v1/crm/inquiries',
        },
      },
    });
  });

  // ── 404 handler (must be before error handler)
  app.use(notFoundHandler);

  // ── Global error handler (must be last)
  app.use(errorHandler);

  return app;
}
