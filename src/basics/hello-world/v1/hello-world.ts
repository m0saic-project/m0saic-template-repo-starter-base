import type {
  MosaicColor,
  MosaicDocument,
  MosaicEngineContext,
} from "@m0saic/types";
import { asTemplateId } from "@m0saic/types";
import { toM0String } from "@m0saic/dsl-stdlib";
import {
  BRAND_ORANGE,
  HEADER_M_GLYPH,
  brandGlyphTile,
  defineMosaicTemplate,
  definePropsSchema,
  makeColorTile,
  placeInsetPieces,
  svgLabel,
} from "@m0saic/template-utils";

/**
 * `@m0saic-starter-base/basics/hello-world/v1` — the smallest correct
 * template, and the anatomy every template shares:
 *
 *   1. A typed props surface (`definePropsSchema`) where every optional prop
 *      has a deterministic default — same inputs, same output, always.
 *   2. An id, minted with `asTemplateId`, that encodes repo/pack/slug/version.
 *   3. `outputHints` — the SUGGESTED canvas. The host may render any size;
 *      hints are what the app preselects, not a promise you can rely on.
 *   4. A `render(props, ctx)` that returns a `MosaicDocument`: an `m0` layout
 *      string plus `sources[]` that fill its tiles in order.
 *   5. The m0 string branded through `toM0String(...)` — it canonicalizes
 *      and VALIDATES, throwing on a malformed string instead of failing
 *      later, mysteriously, at render time.
 *
 * Replace this file with your first real template; the full starter repo
 * (m0saic-template-repo-starter) walks the whole authoring surface one
 * lesson at a time if you want the guided version.
 */

export type HelloWorldProps = {
  /** The greeting under the M. */
  text?: string;
  /** Canvas fill (#rrggbb). */
  backgroundColor?: string;
};

const ID = "@m0saic-starter-base/basics/hello-world/v1";
const HEX = /^#[0-9a-fA-F]{6}$/;
const INK = "#ecf0f1" as MosaicColor;

const propsSchema = definePropsSchema<HelloWorldProps>({
  text: {
    type: "string",
    required: false,
    description: "The greeting rendered under the M.",
    meta: { control: { placeholder: "Hello, m0saic" } },
  },
  backgroundColor: {
    type: "string",
    required: false,
    description: "Canvas fill as #rrggbb.",
    meta: {
      constraints: { isColor: true },
      control: { colorPicker: true, defaultColor: "#0d1117" },
      ui: { label: "Background" },
    },
  },
});

export const HelloWorldV1 = defineMosaicTemplate<HelloWorldProps>({
  id: asTemplateId(ID),
  label: "01 · Hello World",
  version: 1,
  description:
    "The smallest correct template: the pixel-M in a square cell over a greeting, placed with one placeInsetPieces call. A typed props surface, deterministic defaults, and a validated m0 string. Replace it with your first real template.",
  capabilities: { tier: "core" },
  tags: ["basics", "starter"],

  outputHints: {
    width: 1280,
    height: 720,
    fps: 30,
    durationMs: 2000,
    note: "Static content — any canvas and any duration render cleanly.",
  },

  propsSchema,
  defaultProps: {
    text: "Hello, m0saic",
    backgroundColor: "#0d1117",
  },

  async render(
    props: HelloWorldProps,
    ctx: MosaicEngineContext,
  ): Promise<MosaicDocument> {
    // Fail fast on bad input rather than rendering something misleading.
    // The props schema above is DOCUMENTATION — hosts can (and the CLI does)
    // call render() directly with a raw props bag, so render() is the gate.
    if (
      props.backgroundColor !== undefined &&
      !HEX.test(props.backgroundColor)
    ) {
      throw new Error(
        `${ID}: backgroundColor ` +
          `${JSON.stringify(props.backgroundColor)} must be a #rrggbb hex color.`,
      );
    }

    const text = props.text ?? "Hello, m0saic";
    const fill = (props.backgroundColor ?? "#0d1117") as MosaicColor;
    const { width, height } = ctx.target;

    // The brand square: a pixel size the CANVAS decides (ratios can't
    // promise squareness — that's ctx.target's job).
    const side = Math.round(Math.min(width, height) * 0.32);
    const gx = Math.round((width - side) / 2);
    const gy = Math.round(height * 0.42 - side / 2);

    const label = {
      x: Math.round(width * 0.08),
      y: gy + side + Math.round(height * 0.05),
      w: Math.round(width * 0.84),
      h: Math.round(height * 0.12),
    };

    const placed = placeInsetPieces({
      rootW: width,
      rootH: height,
      pieces: [
        {
          // Backdrop — the whole canvas, painted first.
          rect: { x: 0, y: 0, w: width, h: height, importance: 0 },
          source: makeColorTile(fill),
        },
        {
          rect: { x: gx, y: gy, w: side, h: side, importance: 2 },
          source: brandGlyphTile(HEADER_M_GLYPH, BRAND_ORANGE),
        },
        {
          rect: { x: label.x, y: label.y, w: label.w, h: label.h, importance: 1 },
          source: svgLabel(text, label.w, label.h, {
            maxPx: Math.round(height * 0.055),
            maxLines: 1,
            color: INK,
          }),
        },
      ],
    });

    return {
      kind: "mosaic_document",
      version: 1,
      m0: toM0String(placed.m0, ID),
      assets: {},
      backgroundColor: fill,
      sources: placed.sources,
    };
  },
});

export default HelloWorldV1;
