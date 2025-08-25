import { OpenAPIHono } from '@hono/zod-openapi';

import { registerRoutesWithOpenAPI } from './routes';

export function createApp() {
  const app = new OpenAPIHono({
    defaultHook: (result, c) => {
      if (!result.success) {
        // request validation error handling
        return c.json(
          {
            error: 'Invalid Request',
          },
          422,
        );
      }
    },
  });

  // routes
  registerRoutesWithOpenAPI(app);

  return app;
}
