import type { MosaicTextSource } from "@m0saic/types";

import { asDocument, defaultCtx } from "../../../__testutils__/render";
import { HelloWorldV1 } from "./hello-world";

type Maskish = { mask?: { kind?: string; localPath?: string } };

describe("@m0saic-starter-base/basics/hello-world/v1", () => {
  it("renders the brand hello: backdrop, square M, greeting", async () => {
    const doc = asDocument(
      await HelloWorldV1.render({ ...HelloWorldV1.defaultProps }, defaultCtx),
    );

    expect(doc.kind).toBe("mosaic_document");
    expect(doc.version).toBe(1);
    expect(doc.sources).toHaveLength(3);

    // placeInsetPieces orders sources by IMPORTANCE ascending (paint order):
    // backdrop, greeting, then the M wearing the baked glyph as a mask.
    const [backdrop, greeting, glyph] = doc.sources as [Maskish, MosaicTextSource, Maskish];
    expect((backdrop as { type?: string }).type).toBe("lavfi");
    expect(greeting.type).toBe("text");
    expect(greeting.layers[0]?.content).toEqual({
      kind: "literal",
      text: "Hello, m0saic",
    });
    expect(glyph.mask?.kind).toBe("inline-mask");
    expect(glyph.mask?.localPath?.length ?? 0).toBeGreaterThan(50);
  });

  it("props change the output; defaults keep it deterministic", async () => {
    const custom = asDocument(
      await HelloWorldV1.render({ text: "Ship it", backgroundColor: "#123456" }, defaultCtx),
    );
    expect(JSON.stringify(custom)).toContain("Ship it");
    expect(JSON.stringify(custom)).toContain("#123456");

    const a = asDocument(await HelloWorldV1.render({}, defaultCtx));
    const b = asDocument(await HelloWorldV1.render({}, defaultCtx));
    expect(a).toEqual(b);
  });

  it("fails fast on malformed input — render() is the gate, not the schema", async () => {
    await expect(
      HelloWorldV1.render({ backgroundColor: "red" }, defaultCtx),
    ).rejects.toThrow(/#rrggbb/);
  });
});
