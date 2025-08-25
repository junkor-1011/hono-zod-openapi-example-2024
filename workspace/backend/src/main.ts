import process from 'node:process';

import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';

import { createApp } from './app';
import { enableOpenAPIDocs } from './openapi';

function main() {
  const app = createApp({
    // middleware
    middlewares: [logger()],
  });

  // openapi & swagger-ui
  if (process.env.NODE_ENV !== 'production') {
    enableOpenAPIDocs(app);
  }

  const port = Number(process.env?.PORT ?? 3000);

  console.info(`listen ${port}...`);

  serve({
    fetch: app.fetch,
    port,
  });
}

main();
