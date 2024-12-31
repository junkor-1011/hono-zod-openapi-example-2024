import type { OpenAPIHono } from '@hono/zod-openapi';

import { registerGetHello } from './api/hello/get';
import { subApp } from './api/sub/sub-app';

export const registerRoutesWithOpenAPI = (app: OpenAPIHono) => {
  app.route('/', subApp);

  registerGetHello(app);
};
