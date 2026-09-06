# m0saic-template-repo-starter-base

The compact twin of [m0saic-template-repo-starter]: the **minimum set of
files that load in Mosaic**, plus one hello-world template. Pick this repo
when you already know the structure and want a clean start; pick the full
starter when you want the 79-lesson curriculum.

## Use it

`dist/` and `template-manifest.json` are build output and are **not
committed** — the full starter ships them for a zero-build clone; this
scaffold is for developing in, so generated files stay out of your diffs.
Build once, then point a host at the folder:

```
npm install        # needs ../m0saic as a sibling — see "Author in it"
npm run build      # tsc → dist/, copies assets, writes template-manifest.json
```

- **App**: Templates → Add source → this folder → consent → Refresh.
- **CLI**: `m0saic make @m0saic-starter-base/basics/hello-world/v1 --template-repo . -o hello.mp4`

Hosts import `dist/index.js` and never read `src/`. Anyone who clones your
fork runs the same two commands before the folder loads.

## Author in it

Author mode needs the m0saic monorepo checked out as a **sibling**
directory (`../m0saic`) so the `file:` links in package.json resolve.

```
npm run verify     # build + lint + jest + contract-check + check-deps
```

The loop: edit `src/`, `npm run build`, Refresh the source in the app.
The build runs every template through the platform's template conventions
— at definition time (defaults shown, colour props declared, no local
paths, description + tags, labels) and again after rendering it at its
defaults (it renders, every `editor.binding` resolves, displayed props are
bound, svg glyphs exist). Errors fail the build and name the fix; warnings
print. `hello-world` models the binding rule: the rect that shows `text` is
`bindProp`-bound, so Make's double-click edits it in place.
New template: mirror `src/basics/hello-world/` (folder = slug, `vN`
versioned), add a row to the pack's `registry.ts` and its export to the
pack's `index.ts`, mint a preview (`npm run previews`), re-run `verify`.

## Make it yours (forks)

Rename in **one file**: `src/repo.ts` → `repoId`. Every gate (manifest
generator, contract check, dep policy) derives the expected id namespace
from it. Then update the template ids' prefix to match, rebuild, done.
Id ownership in a running host is first-registrant-wins — never ship under
someone else's handle.

## What's deliberately NOT here

The curriculum, its previews, docs set, ordinal stamper, and example
upstream all live in the full starter. This repo is the empty stage:
five substrate deps, one pack, one template, and the same load contract
hosts already trust. Committed build output is also not here: `dist/` and
the manifest are yours to generate.
