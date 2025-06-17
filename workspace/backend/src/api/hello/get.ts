import { randomUUID } from 'node:crypto';

import {
  createRoute,
  type OpenAPIHono,
  type RouteHandler,
  z,
} from '@hono/zod-openapi';
import {
  clientErrorSchema,
  serverErrorSchema,
} from '../../_common/schemas/errors';

const getHelloQueryParamSchema = z
  .object({
    name: z.string().optional().describe('name').openapi({
      example: 'Jane Doe',
    }),
    values: z
      .union([
        z.array(z.string().max(100)).openapi({
          examples: [
            ['foo', 'bar', 'baz'],
            ['yes', 'no'],
          ],
        }),
        z
          .string()
          .max(100)
          .openapi({ examples: ['some string value'] }),
      ])
      .optional()
      .describe(
        `array query param

if value = ['Internal', 'Server', 'Error'], cause \`Internal Server Error\` just for example.
`.trim(),
      )
      .openapi({
        examples: [['foo', 'bar', 'baz'], ['yes'], ['positive', 'negative']],
      }),
  })
  .openapi('getHelloQueryParamSchema', {
    description: 'schema of query params for GET `/hello`',
  });

const getHelloResponseSchema = z
  .object({
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
    values: z
      .array(z.string().max(100))
      .describe('values')
      .openapi({ examples: [['foo', 'bar']] }),
  })
  .openapi('getHelloResponseSchema', {
    description: 'description of getHelloResponseSchema',
  });

const getHelloRoute = createRoute({
  path: '/hello',
  summary: 'simple example',
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
    422: {
      content: {
        'application/json': {
          schema: clientErrorSchema,
        },
      },
      description: 'Invalid Request',
    },
    500: {
      content: {
        'application/json': {
          schema: serverErrorSchema,
        },
      },
      description: 'Unexpected Error',
    },
  },
});

const getHelloHandler: RouteHandler<typeof getHelloRoute> = async (c) => {
  const { name, values } = c.req.valid('query');

  const valueList: string[] = (() => {
    if (values === undefined) {
      return [];
    }
    if (typeof values === 'string') {
      return [values];
    }
    return values;
  })();

  // 500 example
  if (
    valueList.length === 3 &&
    valueList[0] === 'Internal' &&
    valueList[1] === 'Server' &&
    valueList[2] === 'Error'
  ) {
    return c.json(
      {
        error: 'Internal Server Error',
      },
      500,
    );
  }

  return c.json(
    {
      message: name ? `hello, ${name}!` : 'hello from hono.',
      datetime: new Date().toISOString(),
      responseId: randomUUID(),
      values: valueList,
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
