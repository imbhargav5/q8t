/**
 * SDK Factory Test Suite
 *
 * This test suite verifies that the DropboxSDK factory methods work correctly
 * and create properly configured client instances.
 */

import { describe, expect, it } from "vitest";
import { DropboxCoreApi } from "../lib/core/api";
import { DropboxTeamApi } from "../lib/team/api";
import { DropboxSDK } from "../src/index";

describe("DropboxSDK - Factory Methods", () => {
  describe("createCoreClient", () => {
    it("should create a DropboxCoreApi instance", () => {
      const client = DropboxSDK.createCoreClient({
        accessToken: "test-token",
      });

      expect(client).toBeInstanceOf(DropboxCoreApi);
    });

    it("should accept full configuration", () => {
      const client = DropboxSDK.createCoreClient({
        accessToken: "test-token",
        refreshToken: "test-refresh-token",
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        onTokenRefresh: (tokens) => {
          // Token refresh callback
        },
      });

      expect(client).toBeInstanceOf(DropboxCoreApi);
    });

    it("should have all expected methods", () => {
      const client = DropboxSDK.createCoreClient({
        accessToken: "test-token",
      });

      expect(client.listFolder).toBeDefined();
      expect(client.getCurrentAccount).toBeDefined();
      expect(client.createSharedLinkWithSettings).toBeDefined();
    });
  });

  describe("createTeamClient", () => {
    it("should create a DropboxTeamApi instance", () => {
      const client = DropboxSDK.createTeamClient({
        accessToken: "test-team-token",
      });

      expect(client).toBeInstanceOf(DropboxTeamApi);
    });

    it("should accept full configuration", () => {
      const client = DropboxSDK.createTeamClient({
        accessToken: "test-team-token",
        refreshToken: "test-refresh-token",
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        onTokenRefresh: (tokens) => {
          // Token refresh callback
        },
      });

      expect(client).toBeInstanceOf(DropboxTeamApi);
    });

    it("should have all expected methods", () => {
      const client = DropboxSDK.createTeamClient({
        accessToken: "test-team-token",
      });

      expect(client.listMembersV2).toBeDefined();
      expect(client.listGroups).toBeDefined();
      expect(client.listTeamFolders).toBeDefined();
    });
  });

  describe("generateAuthUrl", () => {
    it("should generate auth URL and state", () => {
      const result = DropboxSDK.generateAuthUrl({
        clientId: "test-client-id",
        redirectUri: "https://example.com/callback",
        scopes: ["files.content.read", "files.content.write"],
      });

      expect(result.url).toBeDefined();
      expect(result.state).toBeDefined();
      expect(typeof result.url).toBe("string");
      expect(typeof result.state).toBe("string");
      expect(result.url).toContain("oauth2/authorize");
      expect(result.url).toContain("test-client-id");
      // URL encode the redirect URI in the check
      expect(result.url).toContain("example.com");
      expect(result.url).toContain("callback");
    });

    it("should include scopes in URL", () => {
      const result = DropboxSDK.generateAuthUrl({
        clientId: "test-client-id",
        redirectUri: "https://example.com/callback",
        scopes: ["files.content.read", "files.content.write"],
      });

      expect(result.url).toContain("files.content.read");
      expect(result.url).toContain("files.content.write");
    });
  });

  describe("exchangeCodeForToken", () => {
    it("should be an async function", () => {
      expect(typeof DropboxSDK.exchangeCodeForToken).toBe("function");
      expect(DropboxSDK.exchangeCodeForToken.constructor.name).toBe("AsyncFunction");
    });
  });
});
