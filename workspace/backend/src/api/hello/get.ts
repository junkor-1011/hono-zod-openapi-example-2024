import { randomUUID } from 'node:crypto';
import {
  type OpenAPIHono,
  type RouteHandler,
  createRoute,
  z,
} from '@hono/zod-openapi';

const getHelloQueryParamSchema = z
  .object({
    name: z.string().optional().describe('name').openapi({
      example: 'Jane Doe',
    }),
  })
  .openapi('getHelloQueryParamSchema', {
    description: 'schema of query params for GET `/hello`',
  });

const getHelloResponseSchema = z.object({
  message: z
    .string()
    .describe('message')
    .openapi({ examples: ['hello, Jane Doe!', 'hello from hono.'] }),
  datetime: z
    .string()
    .datetime()
    .describe('processed datetime')
    .openapi({ example: '2024-12-31T13:46:51Z' }),
  responseId: z.string().uuid().describe('response id'),
});

const getHelloRoute = createRoute({
  path: '/hello',
  method: 'get',
  request: { query: getHelloQueryParamSchema },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: getHelloResponseSchema,
        },
      },
      description: 'normal response of GET `/hello`',
    },
  },
});

const getHelloHandler: RouteHandler<typeof getHelloRoute> = async (c) => {
  const { name } = c.req.valid('query');
  return c.json(
    {
      message: name ? `hello, ${name}!` : 'hello from hono.',
      datetime: new Date().toISOString(),
      responseId: randomUUID(),
    },
    200,
  );
};

/**
 * register GET /hello
 */
export const registerGetHello = (app: OpenAPIHono) => {
  app.openapi(getHelloRoute, getHelloHandler);
};
