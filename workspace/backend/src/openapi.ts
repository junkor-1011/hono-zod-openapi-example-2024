import { swaggerUI } from '@hono/swagger-ui';
import type { OpenAPIHono } from '@hono/zod-openapi';

export const SWAGGER_UI_PATHNAME = '/docs';
export const OPENAPI_DOC_PATHNAME = '/docs/openapi.json';

export function enableOpenAPIDocs(app: OpenAPIHono) {
  // openapi
  app.doc31(OPENAPI_DOC_PATHNAME, {
    openapi: '3.1.0',
    info: {
      version: '0.1.0', // TMP
      title: 'Example OpenAPI Doc',
      description: `
**Example Description**

1. item1
2. item2

- [example link](https://example.com)

created by \`@hono/zod-openapi\` & \`@hono/swagger-ui\`
`,
    },
  });

  // Swagger UI
  app.get(SWAGGER_UI_PATHNAME, swaggerUI({ url: OPENAPI_DOC_PATHNAME }));
}
