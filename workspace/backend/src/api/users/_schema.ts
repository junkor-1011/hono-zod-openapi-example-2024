import { z } from '@hono/zod-openapi';

export const userBaseSchema = z.object({
  id: z.string().uuid().describe('id of the user'),
  name: z
    .string()
    .max(100)
    .describe('user name')
    .openapi({
      examples: ['Jane Doe'],
    }),
  nickName: z
    .string()
    .max(100)
    .optional()
    .describe('nick name')
    .openapi({
      examples: ['jane'],
    }),
  groups: z
    .array(z.string().min(5))
    .describe('groups')
    .openapi({ examples: [['groupA', 'groupB'], ['groupC']] }),
  birthDate: z.string().date().describe('birth date'),
  createdAt: z.string().datetime().describe('account created datetime'),
  updatedAt: z.string().datetime().describe('account updated datetime'),
});
