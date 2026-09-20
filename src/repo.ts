import type {
  MosaicTemplatePackDescriptor,
  MosaicTemplateRepoDescriptor,
} from "@m0saic/types";
import { asRepoId, asTemplateId } from "@m0saic/types";

/**
 * Who this repo is. The entry module (src/index.ts) re-exports this as
 * `repo` — one of the two exports every Mosaic host requires from an
 * external template repo (the other is `templates`).
 *
 * FORKS RENAME THEMSELVES HERE, AND ONLY HERE. Change `repoId` to your own
 * handle, update every template id's prefix to match, and rebuild — the
 * manifest generator, contract check, and dep gate all derive the expected
 * id namespace from this one field. Id ownership in a running host is
 * first-registrant-wins per id, so never squat someone else's handle.
 */
export const TEMPLATE_REPO: MosaicTemplateRepoDescriptor = {
  // A PLACEHOLDER identity on purpose: this scaffold is designed to become
  // your repo, so it does not carry the m0saic name — hosts flag any
  // unsigned repo that does as "presents itself as m0saic". Rename both
  // lines to your own handle and label before you publish.
  repoId: asRepoId("@my-templates"),
  displayName: "My Templates",
  schemaVersion: 1,
  description:
    "The compact twin of the m0saic template starter: the minimum set of files that load in Mosaic, plus one hello-world template. Fork it, rename it, build on it.",
  curator: "you",
  homepage: "https://github.com/m0saic-project/m0saic-template-repo-starter-base",
  assets: { templatesDir: "assets/templates" },
  // The front door — the template a newcomer renders first (the hello-world
  // convention): the canonical card with this repo's subline. Point it at
  // your own template if you want your own look.
  helloWorld: asTemplateId("@my-templates/basics/hello-world/v1"),
};

/**
 * Packs, in display order. One is enough to start; add more by mirroring
 * the basics/ folder (pack id = folder name = the <pack> segment of ids).
 */
export const TEMPLATE_PACKS: MosaicTemplatePackDescriptor[] = [
  {
    id: "basics",
    title: "Basics",
    description: "Your templates. hello-world shows the anatomy; replace it.",
  },
];
