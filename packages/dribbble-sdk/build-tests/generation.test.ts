import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("SDK Generation", () => {
  const libDir = join(__dirname, "../lib");

  it("should generate types file", () => {
    const typesPath = join(libDir, "types.ts");
    expect(existsSync(typesPath)).toBe(true);
  });

  it("should generate API file", () => {
    const apiPath = join(libDir, "api.ts");
    expect(existsSync(apiPath)).toBe(true);
  });

  it("should generate index file", () => {
    const indexPath = join(libDir, "index.ts");
    expect(existsSync(indexPath)).toBe(true);
  });

  it("should export DribbbleApi class", async () => {
    const { DribbbleApi } = await import("../lib/api");
    expect(DribbbleApi).toBeDefined();
    expect(typeof DribbbleApi).toBe("function");
  });

  it("should export types", async () => {
    const types = await import("../lib/types");
    expect(types).toBeDefined();
  });
});
