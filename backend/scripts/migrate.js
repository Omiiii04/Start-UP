/**
 * ProjectBridge — Database Migration Runner
 * Runs all SQL migration files in order using the pg package.
 * No psql installation required.
 *
 * Usage:
 *   node migrate.js
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// URL-encode the DATABASE_URL password if it contains special characters
let DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in .env');
  process.exit(1);
}

// Fix: Supabase passwords can contain @ — encode the password part of the URL
try {
  // Parse and re-encode the URL to handle special chars in password
  const url = new URL(DATABASE_URL);
  // Re-encode the password (handles @, #, % etc.)
  DATABASE_URL = DATABASE_URL.replace(
    `${url.username}:${url.password}@`,
    `${encodeURIComponent(decodeURIComponent(url.username))}:${encodeURIComponent(decodeURIComponent(url.password))}@`
  );
} catch (e) {
  console.warn('⚠️  Could not parse DATABASE_URL — using as-is');
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Supabase
});

const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');

const MIGRATION_FILES = [
  '001_create_users.sql',
  '002_create_projects.sql',
  '003_create_milestones.sql',
  '004_create_invoices.sql',
  '005_create_audit_logs.sql',
  '006_create_refresh_tokens.sql',
];

async function runMigrations() {
  console.log('\n🗃️  ProjectBridge Database Migration Runner');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let client;
  try {
    client = await pool.connect();
    console.log('✅ Connected to database\n');

    for (const filename of MIGRATION_FILES) {
      const filepath = path.join(MIGRATIONS_DIR, filename);

      if (!fs.existsSync(filepath)) {
        console.warn(`⚠️  Skipping ${filename} — file not found`);
        continue;
      }

      const sql = fs.readFileSync(filepath, 'utf8');
      console.log(`⏳ Running ${filename}...`);

      try {
        await client.query(sql);
        console.log(`✅ ${filename} — done\n`);
      } catch (err) {
        // If table/type already exists, skip gracefully
        if (err.code === '42P07' || err.code === '42710') {
          console.log(`⚡ ${filename} — already applied (skipped)\n`);
        } else {
          console.error(`❌ Error in ${filename}:`);
          console.error(`   ${err.message}\n`);
          throw err;
        }
      }
    }

    // Verify tables were created
    const { rows } = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Tables in database:');
    rows.forEach(row => console.log(`   ✓ ${row.table_name}`));
    console.log('\n🎉 All migrations complete!\n');

  } catch (err) {
    console.error('\n❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

runMigrations();
