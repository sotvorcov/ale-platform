/**
 * Build the static site published to GitHub Pages (the live public URL).
 *
 * GitHub Pages is static-only, so this renders a hello-world index plus an
 * extensionless `health` file that responds 200. `.nojekyll` makes Pages serve
 * files verbatim (including extensionless ones).
 *
 * Deliberately self-contained (no app imports): the ALE-4 deploy pipeline must
 * not break when the ALE-5 server code churns. When the product needs server
 * compute, swap this static target for a server host (Fly/Render) and serve the
 * app's real /health route instead.
 */
import { mkdir, writeFile } from 'node:fs/promises';

const OUT = new URL('../dist-site/', import.meta.url);

await mkdir(OUT, { recursive: true });

const health = JSON.stringify({ status: 'ok', service: 'ale-platform' });

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ALE Platform</title>
    <style>
      body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1rem; }
      code { background: #f3f4f6; padding: 0.1rem 0.3rem; border-radius: 4px; }
    </style>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>ALE Platform — foundation deploy is live.</p>
    <p>Health check: <a href="/health"><code>/health</code></a></p>
  </body>
</html>
`;

// Disable Jekyll so extensionless files (like `health`) are served verbatim.
await writeFile(new URL('./.nojekyll', OUT), '');
await writeFile(new URL('./index.html', OUT), indexHtml);
// Serve at exactly `/health` (extensionless file at site root → HTTP 200).
await writeFile(new URL('./health', OUT), health);

console.log('Built static site -> dist-site/ (/, /health)');
