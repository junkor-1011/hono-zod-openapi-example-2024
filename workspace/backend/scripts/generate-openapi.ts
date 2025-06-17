import fs from 'node:fs';
import path from 'node:path';

import { createApp } from '../src/app';
import { enableOpenAPIDocs, OPENAPI_DOC_PATHNAME } from '../src/openapi';

async function main() {
  const app = createApp();
  enableOpenAPIDocs(app);

  const res = await app.request(OPENAPI_DOC_PATHNAME, {
    method: 'get',
  });

  const openapiJson = JSON.parse(await res.text());

  fs.writeFileSync(
    path.join(import.meta.dirname, '../docs/openapi.json'),
    JSON.stringify(openapiJson, null, 2),
  );
}

await main();
