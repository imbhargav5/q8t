/**
 * Exports Test Suite
 *
 * This test suite verifies that all expected exports are available
 * from the main package entry point.
 */

import { describe, it, expect } from "vitest";
import * as MondaySDKExports from "../src/index";

describe("Monday SDK - Exports", () => {
  describe("Main SDK Export", () => {
    it("should export MondaySDK class", () => {
      expect(MondaySDKExports.MondaySDK).toBeDefined();
      expect(typeof MondaySDKExports.MondaySDK).toBe("function");
    });
  });

  describe("OAuth Utilities", () => {
    it("should export generateAuthUrl function", () => {
      expect(MondaySDKExports.generateAuthUrl).toBeDefined();
      expect(typeof MondaySDKExports.generateAuthUrl).toBe("function");
    });

    it("should export exchangeCodeForToken function", () => {
      expect(MondaySDKExports.exchangeCodeForToken).toBeDefined();
      expect(typeof MondaySDKExports.exchangeCodeForToken).toBe("function");
    });
  });

  describe("Config Exports", () => {
    it("should export DEFAULT_SCOPES", () => {
      expect(MondaySDKExports.DEFAULT_SCOPES).toBeDefined();
      expect(Array.isArray(MondaySDKExports.DEFAULT_SCOPES)).toBe(true);
    });
  });

  describe("Client Classes", () => {
    it("should export BoardsClient", () => {
      expect(MondaySDKExports.BoardsClient).toBeDefined();
      expect(typeof MondaySDKExports.BoardsClient).toBe("function");
    });

    it("should export ItemsClient", () => {
      expect(MondaySDKExports.ItemsClient).toBeDefined();
      expect(typeof MondaySDKExports.ItemsClient).toBe("function");
    });

    it("should export ColumnsClient", () => {
      expect(MondaySDKExports.ColumnsClient).toBeDefined();
      expect(typeof MondaySDKExports.ColumnsClient).toBe("function");
    });

    it("should export UpdatesClient", () => {
      expect(MondaySDKExports.UpdatesClient).toBeDefined();
      expect(typeof MondaySDKExports.UpdatesClient).toBe("function");
    });

    it("should export UsersClient", () => {
      expect(MondaySDKExports.UsersClient).toBeDefined();
      expect(typeof MondaySDKExports.UsersClient).toBe("function");
    });

    it("should export WorkspacesClient", () => {
      expect(MondaySDKExports.WorkspacesClient).toBeDefined();
      expect(typeof MondaySDKExports.WorkspacesClient).toBe("function");
    });

    it("should export WebhooksClient", () => {
      expect(MondaySDKExports.WebhooksClient).toBeDefined();
      expect(typeof MondaySDKExports.WebhooksClient).toBe("function");
    });
  });

  describe("Total Exports Count", () => {
    it("should have at least 10 named exports", () => {
      const exportNames = Object.keys(MondaySDKExports);

      // Main SDK, clients, OAuth utilities, etc.
      expect(exportNames.length).toBeGreaterThanOrEqual(10);
    });

    it("should include key exports", () => {
      const expectedExports = [
        "MondaySDK",
        "generateAuthUrl",
        "exchangeCodeForToken",
        "DEFAULT_SCOPES",
        "BoardsClient",
        "ItemsClient",
        "ColumnsClient",
        "UpdatesClient",
        "UsersClient",
        "WorkspacesClient",
        "WebhooksClient",
      ];

      const exportNames = Object.keys(MondaySDKExports);

      for (const expectedExport of expectedExports) {
        expect(exportNames).toContain(expectedExport);
      }
    });
  });

  describe("No Unexpected Exports", () => {
    it("should not export internal implementation details", () => {
      const exportNames = Object.keys(MondaySDKExports);

      // These should NOT be exported
      const internalNames = ["__filename", "__dirname", "default"];

      for (const internalName of internalNames) {
        expect(exportNames).not.toContain(internalName);
      }
    });
  });
});
