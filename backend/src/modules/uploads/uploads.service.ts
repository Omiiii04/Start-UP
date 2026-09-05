import { cloudinary, ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from '../../config/cloudinary';
import { query } from '../../config/database';
import { AppError, Errors } from '../../shared/apiResponse';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

interface UploadResult {
  fileId: string;
  projectId: string;
  uploadedBy: string;
  originalName: string;
  cloudinaryPublicId: string;
  secureUrl: string;
  sizeBytes: number;
  mimeType: string;
  uploadedAt: Date;
}

/**
 * Upload a file to Cloudinary and store metadata in DB.
 * Max size: 100MB (FR-1.2)
 */
export async function uploadProjectFile(
  projectId: string,
  userId: string,
  file: Express.Multer.File
): Promise<UploadResult> {
  // MIME type validation
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new AppError(415, 'UNSUPPORTED_FILE_TYPE', `File type '${file.mimetype}' is not allowed.`);
  }

  // Size validation (multer limit already applies but double-check)
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new AppError(413, 'FILE_TOO_LARGE', 'Maximum file size is 100MB.');
  }

  // Upload to Cloudinary
  const uploadResponse = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `projectbridge/${projectId}`,
        resource_type: 'raw',
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      },
      (err, result) => {
        if (err || !result) reject(err || new Error('Upload failed'));
        else resolve({ public_id: result.public_id, secure_url: result.secure_url });
      }
    );
    uploadStream.end(file.buffer);
  });

  type DbFileRow = {
    file_id: string; project_id: string; uploaded_by: string;
    original_name: string; cloudinary_public_id: string; secure_url: string;
    size_bytes: number; mime_type: string; uploaded_at: Date;
  };

  // Persist metadata in DB
  const fileId = uuidv4();
  const { rows } = await query<DbFileRow>(
    `INSERT INTO project_files (
      file_id, project_id, uploaded_by, original_name,
      cloudinary_public_id, secure_url, size_bytes, mime_type
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`,
    [
      fileId, projectId, userId, file.originalname,
      uploadResponse.public_id, uploadResponse.secure_url,
      file.size, file.mimetype,
    ]
  );

  return {
    fileId: rows[0].file_id,
    projectId: rows[0].project_id,
    uploadedBy: rows[0].uploaded_by,
    originalName: rows[0].original_name,
    cloudinaryPublicId: rows[0].cloudinary_public_id,
    secureUrl: rows[0].secure_url,
    sizeBytes: rows[0].size_bytes,
    mimeType: rows[0].mime_type,
    uploadedAt: rows[0].uploaded_at,
  };
}

export async function getProjectFiles(
  projectId: string,
  userId: string,
  isAdmin: boolean
): Promise<UploadResult[]> {
  // Ownership check via project
  const { rows: projectCheck } = await query(
    `SELECT project_id FROM projects WHERE project_id = $1 ${isAdmin ? '' : 'AND client_id = $2'} AND deleted_at IS NULL`,
    isAdmin ? [projectId] : [projectId, userId]
  );

  if (projectCheck.length === 0) throw Errors.forbidden('Access denied to this project.');

  const { rows } = await query<any>(
    `SELECT * FROM project_files WHERE project_id = $1 AND deleted_at IS NULL ORDER BY uploaded_at DESC`,
    [projectId]
  );

  return rows.map((r: any) => ({
    fileId: r.file_id,
    projectId: r.project_id,
    uploadedBy: r.uploaded_by,
    originalName: r.original_name,
    cloudinaryPublicId: r.cloudinary_public_id,
    secureUrl: r.secure_url,
    sizeBytes: r.size_bytes,
    mimeType: r.mime_type,
    uploadedAt: r.uploaded_at,
  }));
}
