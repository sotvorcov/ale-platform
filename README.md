# ALE Platform

Foundation repository for the ALE platform. This is the bootstrap scaffolding —
a thin, runnable skeleton that later CI, deploy, and vertical-slice work builds on.

## Stack & why

Chosen to optimize for **learning speed and reversibility**, not to lock in
architecture before we know the product's shape.

| Choice          | What                                             | Why                                                                                  |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Language        | **TypeScript**                                   | Type safety catches whole classes of bugs early; ubiquitous, easy to hire/agent for. |
| Runtime         | **Node.js 20+**                                  | Boring, stable LTS, runs everywhere we'd deploy.                                     |
| Package manager | **npm**                                          | Ships with Node — zero extra install, fewer moving parts. Swappable later.           |
| Lint            | **ESLint 9** (flat config) + `typescript-eslint` | Standard, catches errors and enforces consistency.                                   |
| Format          | **Prettier**                                     | Removes style debates; `eslint-config-prettier` keeps the two from fighting.         |
| Build           | **`tsc`** → `dist/`                              | Simplest correct build. No bundler until we actually need one.                       |
| Dev/test runner | **tsx** + Node's built-in `node:test`            | Run TS directly, no extra test framework dependency.                                 |

**No web framework yet.** The product's shape is undecided, so adding a framework
(e.g. Next.js if a web UI becomes the natural form) is a cheap, deliberate later
decision rather than premature scaffolding. Everything here is a reversible call.

## Prerequisites

- Node.js >= 20
- npm

## Getting started

```bash
npm install        # install dependencies
npm run dev        # run the entrypoint in watch mode (TS, no build step)
```

## Scripts

| Command                                   | Does                                                                        |
| ----------------------------------------- | --------------------------------------------------------------------------- |
| `npm run build`                           | Compile `src/` → `dist/` with `tsc`.                                        |
| `npm start`                               | Run the compiled entrypoint (`node dist/index.js`). Requires a build first. |
| `npm run dev`                             | Run `src/index.ts` directly in watch mode via tsx.                          |
| `npm run typecheck`                       | Type-check without emitting.                                                |
| `npm run lint` / `npm run lint:fix`       | Lint (and auto-fix) with ESLint.                                            |
| `npm run format` / `npm run format:check` | Format (or check formatting) with Prettier.                                 |
| `npm test`                                | Run unit tests with `node:test`.                                            |

## Project layout

```
src/
  index.ts        # trivial runnable entrypoint — replace as the product takes shape
  index.test.ts   # smoke test proving the toolchain runs
.github/
  workflows/ci.yml      # CI: lint + format + typecheck + test on every push/PR
  workflows/deploy.yml  # Deploy: build static site → GitHub Pages on push to main
scripts/
  build-site.mjs        # Generates the static site (hello-world + /health)
```

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs lint, format check, typecheck,
and tests on every push to `main` and every pull request, on a single Node 20
runner (no matrix yet — kept fast). Any failing check turns the run red. Run the
same checks locally with the `npm run` scripts above before pushing.

## Deploy

`.github/workflows/deploy.yml` builds a tiny static site (`npm run build:site`)
and publishes it to **GitHub Pages** on every push to `main`. The live URL serves
a hello-world index and a `/health` endpoint that returns `200`.

**Why GitHub Pages (for now):** it's a zero-cost free tier with no card and a
fully reproducible, agent-driven pipeline — the right "boring and reversible"
call for a foundation. It's static-only, so the deployed `/health` is a generated
file decoupled from the app code (`scripts/build-site.mjs`), which means a
churning app never breaks the live health URL.

**When we outgrow it:** once the product needs server-side compute (the real
`/health` route in the app server), swap the deploy target to a server host's
free tier (Fly.io / Render). The app server is already written; only the deploy
job changes. Going private-repo instead of public also costs money (GitHub Pro),
so both are flagged as a CEO cost decision when the time comes.

```bash
npm run build:site   # build dist-site/ locally; then `python3 -m http.server` it to test
```

## License

MIT — see [LICENSE](./LICENSE).
