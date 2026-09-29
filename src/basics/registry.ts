import type { StarterRegistryEntry } from "../registry-types";

/**
 * Pack registry: `basics`. One row per template — its identity, in display
 * order. Its title (with the `NN · ` ordinal, which must match the row's
 * position — the generator asserts it), description and tags live in its
 * catalog sidecar, `<slug>.catalog.json` beside the template.
 */
export const basicsRegistry: StarterRegistryEntry[] = [
  {
    slug: "hello-world",
    templateId: "@my-templates/basics/hello-world/v1",
    exportName: "HelloWorldV1",
  },
];
