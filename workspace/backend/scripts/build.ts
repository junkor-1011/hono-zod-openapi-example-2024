import path from 'node:path';

import esbuild from 'esbuild';

await esbuild.build({
  bundle: true,
  minify: true,
  entryPoints: [path.join(import.meta.dirname, '../src/main.ts')],
  outdir: path.join(import.meta.dirname, '../dist'),
  outExtension: {
    '.js': '.mjs',
  },
  platform: 'node',
  format: 'esm',
  banner: {
    js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url); const __filename = import.meta.filename; const __dirname = import.meta.dirname;',
  },
  define: {
    'process.env.NODE_ENV': "'production'",
  },
});
