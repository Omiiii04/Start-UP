import { Pool, PoolClient } from 'pg';
import { env } from './env';

// Connection pool — reused across all requests
// Production (Render): DATABASE_URL must point to Supabase's connection pooler
// (port 6543, Transaction mode) — Render free tier only has IPv4, and the
// direct Supabase host (port 5432) resolves to IPv6 which is unreachable.
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: env.NODE_ENV === 'production' ? 5 : 20, // Supabase free tier pooler limit
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err);
});

/**
 * Execute a single parameterized query.
 * @example const { rows } = await query('SELECT * FROM users WHERE user_id = $1', [id])
 */
export async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<{ rows: T[]; rowCount: number | null }> {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;

  if (env.NODE_ENV === 'development') {
    console.debug('[DB]', { text: text.slice(0, 80), duration: `${duration}ms`, rows: result.rowCount });
  }

  return { rows: result.rows as T[], rowCount: result.rowCount };
}

/**
 * Get a raw client for multi-statement transactions.
 * Always release the client in a finally block.
 */
export async function getClient(): Promise<PoolClient> {
  return pool.connect();
}

/**
 * Ping the DB — used in health checks.
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}

export default pool;
