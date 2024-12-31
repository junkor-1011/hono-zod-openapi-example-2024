import esbuild from 'esbuild';

await esbuild.build({
  bundle: true,
  entryPoints: ['./src/main.ts'],
  outdir: './dist',
  outExtension: {
    '.js': '.mjs',
  },
  platform: 'node',
  format: 'esm',
  banner: {
    js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url); const __filename = import.meta.filename; const __dirname = import.meta.dirname;',
  },
  define: {
    NODE_ENV: 'production',
  },
});
