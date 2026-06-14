/**
 * Emit the ALE-5 vertical slice into the static deploy output (dist-site/ask/).
 *
 * Kept separate from ALE-4's build-site.mjs so the two foundation pieces can be
 * developed without stepping on each other. The deploy pipeline runs this in
 * addition to build:site; together they produce the full dist-site/ uploaded to
 * GitHub Pages:
 *   /            hello-world + /health   (build-site.mjs, ALE-4)
 *   /ask/        the stubbed-AI slice    (this script, ALE-5)
 *
 * Pure static copy (no app imports), so it can't break when other code churns.
 */
import { mkdir, copyFile } from 'node:fs/promises';

const SRC = new URL('../src/slice/', import.meta.url);
const OUT = new URL('../dist-site/ask/', import.meta.url);

await mkdir(OUT, { recursive: true });

// ask.html becomes the directory index so the slice lives at `/ask/`.
await copyFile(new URL('./ask.html', SRC), new URL('./index.html', OUT));
// The client-side stub module, imported by the page at runtime.
await copyFile(new URL('./stub.mjs', SRC), new URL('./stub.mjs', OUT));

console.log('Built slice -> dist-site/ask/ (/ask/)');
