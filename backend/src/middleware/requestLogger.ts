import morgan from 'morgan';
import { env } from '../config/env';

/**
 * HTTP request logger using Morgan.
 * Dev: concise colored output. Production: JSON structured logs.
 */
export const requestLogger = env.NODE_ENV === 'production'
  ? morgan((tokens, req, res) => {
      return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        responseTime: `${tokens['response-time'](req, res)}ms`,
        contentLength: tokens.res(req, res, 'content-length'),
        ip: tokens['remote-addr'](req, res),
        timestamp: new Date().toISOString(),
      });
    })
  : morgan('dev');
