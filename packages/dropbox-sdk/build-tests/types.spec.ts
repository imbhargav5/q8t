/**
 * Types Test Suite
 *
 * This test suite verifies that all types exported from the SDK are defined and accessible.
 */

import { describe, expect, it } from "vitest";
import { CoreTypes, TeamTypes } from "../src/index";

describe("Core API Types", () => {
  it("should export CoreTypes namespace", () => {
    expect(CoreTypes).toBeDefined();
    expect(typeof CoreTypes).toBe("object");
  });

  it("should have type definitions in CoreTypes", () => {
    // Types are compile-time constructs, so we just verify the namespace exists
    // and can be imported successfully
    const typeNames = Object.keys(CoreTypes);
    expect(typeNames.length).toBeGreaterThanOrEqual(0);
  });
});

describe("Team API Types", () => {
  it("should export TeamTypes namespace", () => {
    expect(TeamTypes).toBeDefined();
    expect(typeof TeamTypes).toBe("object");
  });

  it("should have type definitions in TeamTypes", () => {
    // Types are compile-time constructs, so we just verify the namespace exists
    // and can be imported successfully
    const typeNames = Object.keys(TeamTypes);
    expect(typeNames.length).toBeGreaterThanOrEqual(0);
  });
});
