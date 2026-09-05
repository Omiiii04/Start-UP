import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { uploadLimiter } from '../../middleware/rateLimiter';
import { MAX_FILE_SIZE_BYTES } from '../../config/cloudinary';
import { sendSuccess, Errors } from '../../shared/apiResponse';
import * as uploadsService from './uploads.service';
import { ALL_ADMIN_ROLES } from '../../shared/types';

// Use memory storage — pass buffer directly to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    // Basic name safety — strip path traversal characters
    file.originalname = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, true);
  },
});

const router = Router({ mergeParams: true });
router.use(authenticate);

/**
 * POST /api/v1/projects/:projectId/files
 * Upload a file for a project (client owns the project, or admin).
 */
router.post(
  '/',
  uploadLimiter,
  authorize(['client', 'admin_ceo', 'admin_backend', 'admin_qa', 'admin_ops']),
  upload.single('file'),
  async (req, res, next) => {
    try {
      if (!req.user) throw Errors.unauthorized();
      if (!req.file) throw Errors.badRequest('No file provided. Use multipart/form-data with field name "file".');

      const result = await uploadsService.uploadProjectFile(
        req.params.projectId,
        req.user.userId,
        req.file
      );

      sendSuccess(res, result, 'File uploaded successfully.', 201);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/v1/projects/:projectId/files
 * List all files for a project.
 */
router.get(
  '/',
  authorize(['client', 'admin_ceo', 'admin_backend', 'admin_qa', 'admin_ops']),
  async (req, res, next) => {
    try {
      if (!req.user) throw Errors.unauthorized();
      const isAdmin = ALL_ADMIN_ROLES.includes(req.user.role);
      const files = await uploadsService.getProjectFiles(req.params.projectId, req.user.userId, isAdmin);
      sendSuccess(res, files);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
