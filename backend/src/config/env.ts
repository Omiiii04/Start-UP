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

  // Google OAuth (required — backend cannot verify Google tokens without this)
  GOOGLE_CLIENT_ID: z.string().min(10, 'GOOGLE_CLIENT_ID is required for Google authentication'),

  // Admin emails (server-authoritative comma-separated list)
  ADMIN_EMAILS: z
    .string()
    .default('om@projectbridge.io,somnath@projectbridge.io,falguni@projectbridge.io,divya@projectbridge.io'),

  // Cloudinary (file uploads)
  CLOUDINARY_CLOUD_NAME: z.string().min(1).optional().or(z.literal('')),
  CLOUDINARY_API_KEY: z.string().min(1).optional().or(z.literal('')),
  CLOUDINARY_API_SECRET: z.string().min(1).optional().or(z.literal('')),

  // Telegram Bot (primary notification/chat channel)
  // Required for Telegram notifications; warnings logged if missing in dev.
  TELEGRAM_BOT_TOKEN: z.string().optional().or(z.literal('')),
  TELEGRAM_BOT_USERNAME: z.string().default('start_up'),
  TELEGRAM_ADMIN_CHAT_ID: z.string().optional().or(z.literal('')),
  // Secret token for validating incoming Telegram webhook requests
  TELEGRAM_WEBHOOK_SECRET: z.string().optional().or(z.literal('')),

  // CORS (allowed frontend origins, comma-separated)
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
  throw new Error('Invalid environment variables');
}

export type Env = z.infer<typeof envSchema>;
export const env: Env = parsed.data;

// Derived helpers
export const ADMIN_EMAILS_SET = new Set(
  env.ADMIN_EMAILS.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
);

export const CORS_ORIGINS = env.CORS_ORIGIN.split(',').map((o) => o.trim());

export const isProd = env.NODE_ENV === 'production';
export const isDev = env.NODE_ENV === 'development';

export const TELEGRAM_CONFIGURED = Boolean(
  env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_BOT_TOKEN.length > 10
);
