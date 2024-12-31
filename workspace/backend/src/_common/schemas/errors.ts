import { z } from '@hono/zod-openapi';

const clientErrors = {
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  // todo
  413: 'Payload Too Large',
  // todo
  422: 'Unprocessable, Entity',
  // todo
} as const satisfies Record<number, string>;

const serverErrors = {
  500: 'Internal Server Error',
  501: 'Not Implemented',
  // todo
  503: 'Service Unavailable',
  // todo
} as const satisfies Record<number, string>;

export const clientErrorSchema = z
  .object({
    error: z
      .enum([
        clientErrors[400],
        clientErrors[401],
        clientErrors[403],
        clientErrors[404],
        clientErrors[405],
        clientErrors[422],
        'Invalid Request',
      ])
      .describe('error summary'),
    errorDetail: z.string().optional().describe('error detail'),
  })
  .openapi('ClientError', {
    description: 'Client Error Schema',
    examples: [
      { error: 'Invalid Request' },
      {
        error: 'Bad Request',
      },
      {
        error: 'Unauthorized',
      },
      {
        error: 'Forbidden',
      },
    ],
  });

export const serverErrorSchema = z
  .object({
    error: z
      .enum([serverErrors[500], serverErrors[501], serverErrors[503]])
      .describe('error summary'),
  })
  .openapi('ServerError', {
    description: 'Server Error Schema',
    examples: [
      {
        error: 'Internal Server Error',
      },
      {
        error: 'Not Implemented',
      },
      {
        error: 'Service Unavailable',
      },
    ],
  });
