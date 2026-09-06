// ---- Load env before anything else ----
import { env } from './config/env';
import { createApp } from './app';
import pool from './config/database';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`\n🚀 ProjectBridge API running on port ${env.PORT}`);
  console.log(`   Environment : ${env.NODE_ENV}`);
  console.log(`   Health Check: http://localhost:${env.PORT}/api/v1/health`);
  console.log(`   Docs        : http://localhost:${env.PORT}/api/v1\n`);
});

// ── Graceful shutdown — close DB pool before exit ──
const shutdown = async (signal: string) => {
  console.log(`\n[${signal}] Shutting down gracefully...`);
  server.close(async () => {
    await pool.end();
    console.log('Database pool closed. Server stopped.');
    process.exit(0);
  });

  // Force kill if graceful shutdown takes > 10s
  setTimeout(() => {
    console.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 10_000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// ── Catch unhandled rejections ──
process.on('unhandledRejection', (reason: unknown) => {
  console.error('Unhandled Promise Rejection:', reason);
  if (env.NODE_ENV === 'production') {
    shutdown('UNHANDLED_REJECTION');
  }
});

export default server;
