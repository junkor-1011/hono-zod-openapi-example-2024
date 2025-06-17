import { randomUUID } from 'node:crypto';

import {
  createRoute,
  type OpenAPIHono,
  type RouteHandler,
} from '@hono/zod-openapi';
import {
  clientErrorSchema,
  serverErrorSchema,
} from '../../_common/schemas/errors';
import { userBaseSchema } from './_schema';

const postUserRequestBodySchema = userBaseSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .openapi('postUserRequestBodySchema', {
    description: 'schema of POST `/users`',
    examples: [],
  });

const postUserResponseSchema = userBaseSchema.openapi(
  'postUserResponseSchema',
  {
    description: 'success response schema of POST `/users`',
    examples: [],
  },
);

const route = createRoute({
  path: '/users',
  summary: 'create user account',
  method: 'post',
  request: {
    body: {
      content: {
        'application/json': {
          schema: postUserRequestBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: postUserResponseSchema,
        },
      },
      description: 'ok',
    },
    422: {
      content: {
        'application/json': {
          schema: clientErrorSchema,
        },
      },
      description: 'client error',
    },
    500: {
      content: {
        'application/json': {
          schema: serverErrorSchema,
        },
      },
      description: 'server error',
    },
  },
});

const handler: RouteHandler<typeof route> = async (c) => {
  try {
    const { name, nickName, birthDate, groups } = c.req.valid('json');

    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    return c.json(
      {
        id,
        name,
        nickName,
        groups,
        birthDate,
        createdAt,
        updatedAt,
      },
      201,
    );
  } catch (err) {
    // error handling
    console.error(err); // ToDo: using Logger

    return c.json(
      {
        error: 'Internal Server Error',
      },
      500,
    );
  }
};

export const registerPostUser = (app: OpenAPIHono) => {
  app.openapi(route, handler);
};
