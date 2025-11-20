/**
 * Team API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the Team API OpenAPI specification
 * are present in the generated DropboxTeamApi class.
 */

import { beforeEach, describe, expect, it } from "vitest";
import { DropboxTeamApi } from "../lib/team/api";
import type { HttpClient } from "../lib/team/api";

describe("DropboxTeamApi - Method Existence", () => {
  let api: DropboxTeamApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
    } as HttpClient;

    api = new DropboxTeamApi(mockClient);
  });

  describe("Team Members Operations", () => {
    it("should have listMembersV2 method", () => {
      expect(api.listMembersV2).toBeDefined();
      expect(typeof api.listMembersV2).toBe("function");
    });

    it("should have listMembersContinueV2 method", () => {
      expect(api.listMembersContinueV2).toBeDefined();
      expect(typeof api.listMembersContinueV2).toBe("function");
    });

    it("should have getMembersInfo method", () => {
      expect(api.getMembersInfo).toBeDefined();
      expect(typeof api.getMembersInfo).toBe("function");
    });

    it("should have addMember method", () => {
      expect(api.addMember).toBeDefined();
      expect(typeof api.addMember).toBe("function");
    });

    it("should have removeMember method", () => {
      expect(api.removeMember).toBeDefined();
      expect(typeof api.removeMember).toBe("function");
    });

    it("should have suspendMember method", () => {
      expect(api.suspendMember).toBeDefined();
      expect(typeof api.suspendMember).toBe("function");
    });

    it("should have unsuspendMember method", () => {
      expect(api.unsuspendMember).toBeDefined();
      expect(typeof api.unsuspendMember).toBe("function");
    });
  });

  describe("Groups Operations", () => {
    it("should have listGroups method", () => {
      expect(api.listGroups).toBeDefined();
      expect(typeof api.listGroups).toBe("function");
    });

    it("should have createGroup method", () => {
      expect(api.createGroup).toBeDefined();
      expect(typeof api.createGroup).toBe("function");
    });

    it("should have deleteGroup method", () => {
      expect(api.deleteGroup).toBeDefined();
      expect(typeof api.deleteGroup).toBe("function");
    });

    it("should have addMembersToGroup method", () => {
      expect(api.addMembersToGroup).toBeDefined();
      expect(typeof api.addMembersToGroup).toBe("function");
    });

    it("should have removeMembersFromGroup method", () => {
      expect(api.removeMembersFromGroup).toBeDefined();
      expect(typeof api.removeMembersFromGroup).toBe("function");
    });
  });

  describe("Team Folders Operations", () => {
    it("should have listTeamFolders method", () => {
      expect(api.listTeamFolders).toBeDefined();
      expect(typeof api.listTeamFolders).toBe("function");
    });

    it("should have createTeamFolder method", () => {
      expect(api.createTeamFolder).toBeDefined();
      expect(typeof api.createTeamFolder).toBe("function");
    });

    it("should have archiveTeamFolder method", () => {
      expect(api.archiveTeamFolder).toBeDefined();
      expect(typeof api.archiveTeamFolder).toBe("function");
    });
  });

  describe("Devices Operations", () => {
    it("should have listMemberDevices method", () => {
      expect(api.listMemberDevices).toBeDefined();
      expect(typeof api.listMemberDevices).toBe("function");
    });

    it("should have listMembersDevices method", () => {
      expect(api.listMembersDevices).toBeDefined();
      expect(typeof api.listMembersDevices).toBe("function");
    });
  });

  describe("Namespaces Operations", () => {
    it("should have listNamespaces method", () => {
      expect(api.listNamespaces).toBeDefined();
      expect(typeof api.listNamespaces).toBe("function");
    });

    it("should have listNamespacesContinue method", () => {
      expect(api.listNamespacesContinue).toBeDefined();
      expect(typeof api.listNamespacesContinue).toBe("function");
    });
  });

  describe("Method Count Validation", () => {
    it("should have exactly 19 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api)).filter(
        (name) => name !== "constructor" && typeof api[name as keyof DropboxTeamApi] === "function",
      );

      expect(methods).toHaveLength(19);
    });

    it("should have all expected methods", () => {
      const expectedMethods = [
        "listMembersV2",
        "listMembersContinueV2",
        "getMembersInfo",
        "addMember",
        "removeMember",
        "suspendMember",
        "unsuspendMember",
        "listGroups",
        "createGroup",
        "deleteGroup",
        "addMembersToGroup",
        "removeMembersFromGroup",
        "listTeamFolders",
        "createTeamFolder",
        "archiveTeamFolder",
        "listMemberDevices",
        "listMembersDevices",
        "listNamespaces",
        "listNamespacesContinue",
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
