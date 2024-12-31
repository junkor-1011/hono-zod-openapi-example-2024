import process from 'node:process';

import { serve } from '@hono/node-server';

import { logger } from 'hono/logger';
import { createApp } from './app';

function main() {
  const app = createApp();

  // middleware
  app.use(logger());

  const port = Number(process.env?.PORT ?? 3000);

  console.info(`listen ${port}...`);

  serve({
    fetch: app.fetch,
    port,
  });
}

main();
