/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specification
 * are present in the generated DribbbleApi class.
 */

import { beforeEach, describe, expect, it } from "vitest";
import { DribbbleApi } from "../lib/api";
import type { HttpClient } from "../src/auth/client";

describe("DribbbleApi - Method Existence", () => {
  let api: DribbbleApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
      postMultipart: async () => ({}),
    } as HttpClient;

    api = new DribbbleApi(mockClient);
  });

  describe("User Operations", () => {
    it("should have getAuthenticatedUser method", () => {
      expect(api.getAuthenticatedUser).toBeDefined();
      expect(typeof api.getAuthenticatedUser).toBe("function");
    });
  });

  describe("Shot Operations", () => {
    it("should have listUserShots method", () => {
      expect(api.listUserShots).toBeDefined();
      expect(typeof api.listUserShots).toBe("function");
    });

    it("should have getShot method", () => {
      expect(api.getShot).toBeDefined();
      expect(typeof api.getShot).toBe("function");
    });

    it("should have createShot method", () => {
      expect(api.createShot).toBeDefined();
      expect(typeof api.createShot).toBe("function");
    });

    it("should have updateShot method", () => {
      expect(api.updateShot).toBeDefined();
      expect(typeof api.updateShot).toBe("function");
    });

    it("should have deleteShot method", () => {
      expect(api.deleteShot).toBeDefined();
      expect(typeof api.deleteShot).toBe("function");
    });
  });

  describe("Attachment Operations", () => {
    it("should have createAttachment method", () => {
      expect(api.createAttachment).toBeDefined();
      expect(typeof api.createAttachment).toBe("function");
    });

    it("should have deleteAttachment method", () => {
      expect(api.deleteAttachment).toBeDefined();
      expect(typeof api.deleteAttachment).toBe("function");
    });
  });

  describe("Project Operations", () => {
    it("should have listUserProjects method", () => {
      expect(api.listUserProjects).toBeDefined();
      expect(typeof api.listUserProjects).toBe("function");
    });

    it("should have createProject method", () => {
      expect(api.createProject).toBeDefined();
      expect(typeof api.createProject).toBe("function");
    });

    it("should have updateProject method", () => {
      expect(api.updateProject).toBeDefined();
      expect(typeof api.updateProject).toBe("function");
    });

    it("should have deleteProject method", () => {
      expect(api.deleteProject).toBeDefined();
      expect(typeof api.deleteProject).toBe("function");
    });
  });

  describe("Method Count Validation", () => {
    it("should have exactly 12 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api)).filter(
        (name) => name !== "constructor" && typeof api[name as keyof DribbbleApi] === "function",
      );

      expect(methods).toHaveLength(12);
    });

    it("should have all expected methods", () => {
      const expectedMethods = [
        // User operations
        "getAuthenticatedUser",
        // Shot operations
        "listUserShots",
        "getShot",
        "createShot",
        "updateShot",
        "deleteShot",
        // Attachment operations
        "createAttachment",
        "deleteAttachment",
        // Project operations
        "listUserProjects",
        "createProject",
        "updateProject",
        "deleteProject",
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
