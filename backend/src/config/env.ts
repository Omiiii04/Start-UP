import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Load .env in non-production environments
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().default(3001),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(10).optional().or(z.literal('')),

  // Admin emails (server-authoritative)
  ADMIN_EMAILS: z
    .string()
    .default('om@projectbridge.io,somnath@projectbridge.io,falguni@projectbridge.io,divya@projectbridge.io'),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().min(1).optional().or(z.literal('')),
  CLOUDINARY_API_KEY: z.string().min(1).optional().or(z.literal('')),
  CLOUDINARY_API_SECRET: z.string().min(1).optional().or(z.literal('')),

  // SendGrid (optional — warnings logged if not configured)
  SENDGRID_API_KEY: z.string().optional().or(z.literal('')),
  SENDGRID_FROM_EMAIL: z.string().email().default('noreply@projectbridge.io'),
  SENDGRID_FROM_NAME: z.string().default('ProjectBridge'),

  // WhatsApp Business API (optional — warnings logged if not configured)
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional().or(z.literal('')),
  WHATSAPP_ACCESS_TOKEN: z.string().optional().or(z.literal('')),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('\n❌  Invalid environment variables — server cannot start:\n');
  const errors = parsed.error.flatten().fieldErrors;
  for (const [key, messages] of Object.entries(errors)) {
    console.error(`   ${key}: ${messages?.join(', ')}`);
  }
  console.error('\nPlease check your .env file against .env.example\n');
  process.exit(1);
}

export const env = parsed.data;

// Derived helpers
export const ADMIN_EMAILS_SET = new Set(
  env.ADMIN_EMAILS.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
);

export const CORS_ORIGINS = env.CORS_ORIGIN.split(',').map((o) => o.trim());

export const isProd = env.NODE_ENV === 'production';
export const isDev = env.NODE_ENV === 'development';
