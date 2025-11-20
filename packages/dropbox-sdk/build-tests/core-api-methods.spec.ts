/**
 * Core API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the Core API OpenAPI specification
 * are present in the generated DropboxCoreApi class.
 */

import { beforeEach, describe, expect, it } from "vitest";
import { DropboxCoreApi } from "../lib/core/api";
import type { HttpClient } from "../lib/core/api";

describe("DropboxCoreApi - Method Existence", () => {
  let api: DropboxCoreApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
    } as HttpClient;

    api = new DropboxCoreApi(mockClient);
  });

  describe("Files Operations", () => {
    it("should have listFolder method", () => {
      expect(api.listFolder).toBeDefined();
      expect(typeof api.listFolder).toBe("function");
    });

    it("should have listFolderContinue method", () => {
      expect(api.listFolderContinue).toBeDefined();
      expect(typeof api.listFolderContinue).toBe("function");
    });

    it("should have getMetadata method", () => {
      expect(api.getMetadata).toBeDefined();
      expect(typeof api.getMetadata).toBe("function");
    });

    it("should have createFolderV2 method", () => {
      expect(api.createFolderV2).toBeDefined();
      expect(typeof api.createFolderV2).toBe("function");
    });

    it("should have deleteV2 method", () => {
      expect(api.deleteV2).toBeDefined();
      expect(typeof api.deleteV2).toBe("function");
    });

    it("should have copyV2 method", () => {
      expect(api.copyV2).toBeDefined();
      expect(typeof api.copyV2).toBe("function");
    });

    it("should have moveV2 method", () => {
      expect(api.moveV2).toBeDefined();
      expect(typeof api.moveV2).toBe("function");
    });

    it("should have searchV2 method", () => {
      expect(api.searchV2).toBeDefined();
      expect(typeof api.searchV2).toBe("function");
    });
  });

  describe("Users Operations", () => {
    it("should have getCurrentAccount method", () => {
      expect(api.getCurrentAccount).toBeDefined();
      expect(typeof api.getCurrentAccount).toBe("function");
    });

    it("should have getSpaceUsage method", () => {
      expect(api.getSpaceUsage).toBeDefined();
      expect(typeof api.getSpaceUsage).toBe("function");
    });
  });

  describe("Sharing Operations", () => {
    it("should have createSharedLinkWithSettings method", () => {
      expect(api.createSharedLinkWithSettings).toBeDefined();
      expect(typeof api.createSharedLinkWithSettings).toBe("function");
    });

    it("should have listSharedLinks method", () => {
      expect(api.listSharedLinks).toBeDefined();
      expect(typeof api.listSharedLinks).toBe("function");
    });

    it("should have revokeSharedLink method", () => {
      expect(api.revokeSharedLink).toBeDefined();
      expect(typeof api.revokeSharedLink).toBe("function");
    });
  });

  describe("File Requests Operations", () => {
    it("should have listFileRequestsV2 method", () => {
      expect(api.listFileRequestsV2).toBeDefined();
      expect(typeof api.listFileRequestsV2).toBe("function");
    });

    it("should have createFileRequest method", () => {
      expect(api.createFileRequest).toBeDefined();
      expect(typeof api.createFileRequest).toBe("function");
    });

    it("should have getFileRequest method", () => {
      expect(api.getFileRequest).toBeDefined();
      expect(typeof api.getFileRequest).toBe("function");
    });
  });

  describe("Method Count Validation", () => {
    it("should have exactly 16 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api)).filter(
        (name) => name !== "constructor" && typeof api[name as keyof DropboxCoreApi] === "function",
      );

      expect(methods).toHaveLength(16);
    });

    it("should have all expected methods", () => {
      const expectedMethods = [
        "listFolder",
        "listFolderContinue",
        "getMetadata",
        "createFolderV2",
        "deleteV2",
        "copyV2",
        "moveV2",
        "searchV2",
        "getCurrentAccount",
        "getSpaceUsage",
        "createSharedLinkWithSettings",
        "listSharedLinks",
        "revokeSharedLink",
        "listFileRequestsV2",
        "createFileRequest",
        "getFileRequest",
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api)).filter(
        (name) => name !== "constructor",
      );

      for (const method of expectedMethods) {
        expect(actualMethods).toContain(method);
      }
    });
  });
});
