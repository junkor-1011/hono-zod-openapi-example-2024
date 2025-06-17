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

const getUserPathParamsSchema = userBaseSchema
  .pick({
    id: true,
  })
  .openapi('getUserPathParamsSchema', {
    description: 'path params of GET `/users/{id}`',
    examples: [],
  });

const getUserResponseSchema = userBaseSchema.openapi('getUserResponseSchema', {
  description: 'success response schema of GET `/users/{id}`',
  examples: [],
});

const route = createRoute({
  path: '/users/{id}',
  summary: 'get specific user info',
  method: 'get',
  request: {
    params: getUserPathParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: getUserResponseSchema,
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
    501: {
      content: {
        'application/json': {
          schema: serverErrorSchema.openapi('NotImplementedError', {
            description: 'Not Implemented Error Schema',
            examples: [{ error: 'Not Implemented' }],
          }),
        },
      },
      description: 'server error',
    },
  },
});

const handler: RouteHandler<typeof route> = async (c) => {
  try {
    const { id } = c.req.valid('param');

    console.debug(`id: ${id}`);

    return c.json(
      {
        error: 'Not Implemented',
      },
      501,
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

export const registerGetUser = (app: OpenAPIHono) => {
  app.openapi(route, handler);
};
