import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { parse } from "yaml";
import { join } from "path";

describe("OpenAPI Specification", () => {
  it("should have a valid OpenAPI spec", () => {
    const specPath = join(__dirname, "../api/openapi.yaml");
    const content = readFileSync(specPath, "utf-8");
    const spec = parse(content);

    expect(spec.openapi).toBe("3.0.0");
    expect(spec.info.title).toBe("ClickUp API");
    expect(spec.info.version).toBe("2.0");
  });

  it("should define security schemes", () => {
    const specPath = join(__dirname, "../api/openapi.yaml");
    const content = readFileSync(specPath, "utf-8");
    const spec = parse(content);

    expect(spec.components.securitySchemes).toBeDefined();
    expect(spec.components.securitySchemes.PersonalToken).toBeDefined();
    expect(spec.components.securitySchemes.OAuth2).toBeDefined();
  });

  it("should have paths defined", () => {
    const specPath = join(__dirname, "../api/openapi.yaml");
    const content = readFileSync(specPath, "utf-8");
    const spec = parse(content);

    expect(spec.paths).toBeDefined();
    expect(Object.keys(spec.paths).length).toBeGreaterThan(0);
  });

  it("should have schemas defined", () => {
    const specPath = join(__dirname, "../api/openapi.yaml");
    const content = readFileSync(specPath, "utf-8");
    const spec = parse(content);

    expect(spec.components.schemas).toBeDefined();
    expect(Object.keys(spec.components.schemas).length).toBeGreaterThan(0);
  });

  it("should have major endpoint categories", () => {
    const specPath = join(__dirname, "../api/openapi.yaml");
    const content = readFileSync(specPath, "utf-8");
    const spec = parse(content);

    const paths = Object.keys(spec.paths);

    // Check for major resource types
    expect(paths.some((p) => p.includes("/team"))).toBe(true);
    expect(paths.some((p) => p.includes("/space"))).toBe(true);
    expect(paths.some((p) => p.includes("/folder"))).toBe(true);
    expect(paths.some((p) => p.includes("/list"))).toBe(true);
    expect(paths.some((p) => p.includes("/task"))).toBe(true);
    expect(paths.some((p) => p.includes("/comment"))).toBe(true);
    expect(paths.some((p) => p.includes("/goal"))).toBe(true);
    expect(paths.some((p) => p.includes("/webhook"))).toBe(true);
  });
});
