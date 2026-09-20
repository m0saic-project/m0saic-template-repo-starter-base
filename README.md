# m0saic-template-repo-starter-base

> Ships under the placeholder identity `@my-templates` / "My Templates" —
> not the m0saic name — because it is meant to become *your* repo. Mosaic
> flags any unsigned repo that calls itself m0saic; a scaffold should not.

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
npm install        # the @m0saic/* substrate comes from npm
npm run build      # tsc → dist/, copies assets, writes template-manifest.json
```

- **App**: Templates → Add source → this folder → consent → Refresh.
- **CLI**: `m0saic make @my-templates/basics/hello-world/v1 --template-repo . -o hello.mp4`

Hosts import `dist/index.js` and never read `src/`. Anyone who clones your
fork runs the same two commands before the folder loads.

## Author in it

The five `@m0saic/*` packages in `package.json` install from npm — the 0.x
ranges track the `m0saic` CLI line, the language packages (`@m0saic/dsl`,
`@m0saic/dsl-stdlib`) version on their own. No monorepo checkout, no links.

```
npm run verify     # build + lint + jest + contract-check + check-deps
m0saic doctor .    # the same conventions + fingerprints, from the CLI
```

The loop: edit `src/`, `npm run build`, Refresh the source in the app.
The build runs every template through the platform's template conventions
— at definition time (defaults shown, colour props declared, no local
paths, description + tags, labels) and again after rendering it at its
defaults (it renders, every `editor.binding` resolves, displayed props are
bound, svg glyphs exist). Errors fail the build and name the fix; warnings
print. `hello-world` models the binding rule: the rects that show `greeting`
and `caption` are `bindProp`-bound, so Make's double-click edits them in place.

Scaffold your first real template instead of hand-rolling it:

```
npm run new -- basics/my-card --title "My Card"
```

It writes the template, its test and the registry wiring, and passes every
gate as generated. The build also keeps a layout fingerprint beside each
template (`<slug>.layout.m0`, a native `.m0` file of the flattened layout at
the hinted canvas) and fails when a layout changes until you
`npm run fingerprints:update` and commit the diff. `m0saic doctor .` runs
the same checks from outside the build.
New template: `npm run new -- basics/my-card` scaffolds one (folder = slug,
`vN` versioned) with its test and the registry wiring; mint a preview
(`npm run previews`), re-run `verify`. `hello-world` is the canonical card —
one call to `defineHelloWorldTemplate` — and this repo's **front door**
(`repo.helloWorld` in `src/repo.ts`); keep it, edit the subline via
`displayName`, or point the field at your own template.

## Make it yours (forks)

Rename in **one file**: `src/repo.ts` → `repoId` (and `displayName`; both ship as placeholders). Every gate (manifest
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
