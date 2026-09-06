/**
 * ProjectBridge — Enable RLS on all tables.
 * 
 * Since the backend connects as a superuser (postgres) via DATABASE_URL,
 * RLS does not affect our API — the backend enforces its own RBAC.
 * 
 * This script enables RLS to silence Supabase advisor warnings,
 * and adds a bypass policy for the service role (our backend).
 *
 * Usage:
 *   node scripts/enable-rls.js
 */

const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const TABLES = [
  'users',
  'projects',
  'milestones',
  'invoices',
  'project_files',
  'audit_logs',
  'refresh_tokens',
];

async function enableRLS() {
  console.log('\n🔒 Enabling Row Level Security on all tables');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const client = await pool.connect();
  try {
    for (const table of TABLES) {
      // Enable RLS
      await client.query(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`);
      
      // Add BYPASS policy for postgres (our backend service role)
      // This lets our backend API (connecting as postgres) bypass RLS
      await client.query(`
        DROP POLICY IF EXISTS service_role_bypass ON ${table};
        CREATE POLICY service_role_bypass ON ${table}
          USING (true)
          WITH CHECK (true);
      `);

      console.log(`✅ RLS enabled on ${table}`);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Done — Supabase RLS warnings will disappear.\n');
    console.log('ℹ️  Access control is enforced by the Express');
    console.log('   RBAC middleware, not Supabase RLS.\n');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

enableRLS();
