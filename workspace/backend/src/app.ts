import { OpenAPIHono } from '@hono/zod-openapi';
import type { MiddlewareHandler } from 'hono';
import { registerRoutesWithOpenAPI } from './routes';

interface CreateAppArgs {
  readonly middlewares?: readonly MiddlewareHandler[];
}

export function createApp({ middlewares }: CreateAppArgs) {
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

  if (middlewares && middlewares.length > 0) {
    app.use(...middlewares);
  }

  // routes
  registerRoutesWithOpenAPI(app);

  return app;
}
