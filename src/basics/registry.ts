import type { StarterRegistryEntry } from "../registry-types";

/**
 * Pack registry: `basics`. One row per template — the browse metadata the
 * manifest is generated from. The title's `NN · ` prefix is the display
 * ordinal and must match the row's position (the generator asserts it).
 */
export const basicsRegistry: StarterRegistryEntry[] = [
  {
    slug: "hello-world",
    templateId: "@m0saic-starter-base/basics/hello-world/v1",
    exportName: "HelloWorldV1",
    title: "01 · Hello World",
    description:
      "The smallest correct template: a typed props surface with deterministic defaults, an id minted with asTemplateId, outputHints as the suggested canvas, and a render() returning a validated m0 string plus one source per tile in walk order. Replace it with your first real template.",
    tags: ["basics", "starter"],
  },
];
