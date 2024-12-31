import { OpenAPIHono } from '@hono/zod-openapi';

import { registerRoutesWithOpenAPI } from './routes';

export function createApp() {
  const app = new OpenAPIHono();

  // routes
  registerRoutesWithOpenAPI(app);

  return app;
}
