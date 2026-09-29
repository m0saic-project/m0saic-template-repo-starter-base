# AGENTS.md

Entry point for coding agents working in this repo. Humans want
[`README.md`](README.md).

## What this repo is

The smallest template repo that loads in Mosaic: one hello-world template,
the registry, the build, the gates. It ships under a **placeholder
identity** (`@my-templates` / "My Templates" in `src/repo.ts`) because it is
meant to become yours — rename both before you publish; hosts flag an
unsigned repo that calls itself m0saic.

## Before you write a template: the knowledge base and the examples

The reasoning behind every rule here lives in **`@m0saic/knowledge`** — the
m0 handbook, the engine mental models, the template-authoring contract, as
plain Markdown. After `npm install` it is at
`node_modules/@m0saic/knowledge/README.md` (start there, then
`docs/m0saic-thesis.md`, then the router in `docs/README.md`); on GitHub at
[m0saic-packages/packages/knowledge](https://github.com/m0saic-project/m0saic-packages/tree/main/packages/knowledge).

Then read code. Three public repos cover most of the product surface:

- [m0saic-template-repo-starter](https://github.com/m0saic-project/m0saic-template-repo-starter)
  — ~80 one-concept lessons, the curriculum; this repo is its compact twin.
- [m0saic-community-templates](https://github.com/m0saic-project/m0saic-community-templates)
  — the public library, one folder per publisher, signed releases.
- [m0saic-packages/packages/templates](https://github.com/m0saic-project/m0saic-packages/tree/main/packages/templates)
  — the official library that ships in the product; the house standard.

## The loop

```
npm run build        # tsc → copy assets → regenerate template-manifest.json → conventions gate
npm run verify       # build + lint + jest + loader contract + dependency policy
m0saic make @my-templates/basics/hello-world/v1 --template-repo . -o hello.mp4
```

`dist/` and `template-manifest.json` are generated (and not committed here —
the full starter commits them; you decide for your fork). Never hand-edit
them; change `src/` and rebuild.

## Adding a template

1. `src/<pack>/<slug>/v1/<slug>.ts` — a plain template object via
   `defineMosaicTemplate`; deterministic, duration from `ctx.target`, every
   optional prop with a default, randomness seeded through a prop. It
   declares what the template IS — no label, description, tags or prop copy.
2. `src/<pack>/<slug>/v1/<slug>.catalog.json` beside it — `{ "schemaVersion": 1,
   "templateId", "label" (with its `NN · ` ordinal), "description", "tags",
   "props": { "<key>": { "label", "description", "placeholder", "order" } } }`.
   The build gathers these into `template-catalog.json`.
3. A row in `src/<pack>/registry.ts` (id `@<your-handle>/<pack>/<slug>/v1`,
   the export name) — identity and order only.
4. A unit test beside it asserting something deterministic (geometry, the
   resolved tree, or a validation error).
5. `npm run verify` green; `m0saic doctor .` reports no blocking finding.

`npm run new -- <pack>/<slug>` writes 1–4 for you.

A template that has shipped never changes again: a fix is a new `v2` folder.
What DESCRIBES a template (label, description, tags, visibility, deprecation,
and each prop's label / hint / placeholder) lives in its catalog sidecar,
`<name>.catalog.json` beside the module, never in the code — the code freezes
when it ships, the sidecar stays editable. Deprecate the old version there:
`"deprecated": { "reason", "replacement", "since" }` (m0saic 0.3.1+).

## Rules that fail silently

- An m0 string you did not validate (`validateM0String` from `@m0saic/dsl`).
- A split count above 12 that is not 5-smooth (`weightedSplit(…, { precision: 120 })`).
- A handle matching `/m0saic/i` — reserved; the guard is exact-match on
  release signatures, so a lookalike name earns a warning, never trust.
