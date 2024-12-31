import type { OpenAPIHono } from '@hono/zod-openapi';

import { registerGetHello } from './api/hello/get';
import { subApp } from './api/sub/sub-app';
import { registerPostUser } from './api/users/post';

export const registerRoutesWithOpenAPI = (app: OpenAPIHono) => {
  app.route('/', subApp);

  // /hello
  registerGetHello(app);

  // /users
  registerPostUser(app);
};
