import type { OpenAPIHono } from '@hono/zod-openapi';

import { registerGetHello } from './api/hello/get';

export const registerRoutesWithOpenAPI = (app: OpenAPIHono) => {
  registerGetHello(app);
};
