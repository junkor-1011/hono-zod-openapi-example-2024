import { randomInt } from 'node:crypto';

import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

const responseSchema = z
  .object({
    message: z
      .string()
      .describe('message')
      .openapi({ example: 'hello, SubApp' }),
    datetime: z.string().datetime(),
    ok: z.boolean(),
  })
  .openapi('DummyResponseSchema', {
    description: `
Response Schema of GET /sub
`.trim(),
  });

export const subApp = new OpenAPIHono();

const route = createRoute({
  path: '/sub',
  summary: 'GET /sub',
  method: 'get',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: responseSchema,
        },
      },
      description: 'ok',
    },
  },
});

subApp.openapi(route, async (c) => {
  const ok = randomInt(100) % 2 === 1;

  return c.json({
    message: 'hello, subApp',
    ok,
    datetime: new Date().toISOString(),
  });
});
