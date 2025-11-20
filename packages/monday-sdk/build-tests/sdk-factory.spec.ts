/**
 * SDK Factory Methods Test Suite
 *
 * This test suite verifies that the MondaySDK class has all the expected
 * factory methods and client properties.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { MondaySDK } from "../src/sdk";

describe("MondaySDK - Factory Methods", () => {
  describe("Static Factory Methods", () => {
    it("should have createWithToken static method", () => {
      expect(MondaySDK.createWithToken).toBeDefined();
      expect(typeof MondaySDK.createWithToken).toBe("function");
    });

    it("should have createWithOAuth static method", () => {
      expect(MondaySDK.createWithOAuth).toBeDefined();
      expect(typeof MondaySDK.createWithOAuth).toBe("function");
    });

    it("should have createWithShortLivedToken static method", () => {
      expect(MondaySDK.createWithShortLivedToken).toBeDefined();
      expect(typeof MondaySDK.createWithShortLivedToken).toBe("function");
    });

    it("should create SDK instance with token", () => {
      const sdk = MondaySDK.createWithToken({ token: "test-token" });
      expect(sdk).toBeInstanceOf(MondaySDK);
    });

    it("should create SDK instance with OAuth", () => {
      const sdk = MondaySDK.createWithOAuth({ accessToken: "test-oauth-token" });
      expect(sdk).toBeInstanceOf(MondaySDK);
    });

    it("should create SDK instance with short-lived token", () => {
      const sdk = MondaySDK.createWithShortLivedToken({
        shortLivedToken: "test-short-token",
      });
      expect(sdk).toBeInstanceOf(MondaySDK);
    });
  });

  describe("Client Properties", () => {
    let sdk: MondaySDK;

    beforeEach(() => {
      sdk = MondaySDK.createWithToken({ token: "test-token" });
    });

    it("should have boards client property", () => {
      expect(sdk.boards).toBeDefined();
      expect(sdk.boards.query).toBeDefined();
      expect(sdk.boards.create).toBeDefined();
    });

    it("should have items client property", () => {
      expect(sdk.items).toBeDefined();
      expect(sdk.items.query).toBeDefined();
      expect(sdk.items.create).toBeDefined();
    });

    it("should have columns client property", () => {
      expect(sdk.columns).toBeDefined();
      expect(sdk.columns.create).toBeDefined();
      expect(sdk.columns.changeValue).toBeDefined();
    });

    it("should have updates client property", () => {
      expect(sdk.updates).toBeDefined();
      expect(sdk.updates.query).toBeDefined();
      expect(sdk.updates.create).toBeDefined();
    });

    it("should have users client property", () => {
      expect(sdk.users).toBeDefined();
      expect(sdk.users.query).toBeDefined();
      expect(sdk.users.addToBoard).toBeDefined();
    });

    it("should have workspaces client property", () => {
      expect(sdk.workspaces).toBeDefined();
      expect(sdk.workspaces.query).toBeDefined();
      expect(sdk.workspaces.create).toBeDefined();
    });

    it("should have webhooks client property", () => {
      expect(sdk.webhooks).toBeDefined();
      expect(sdk.webhooks.query).toBeDefined();
      expect(sdk.webhooks.create).toBeDefined();
    });

    it("should have exactly 7 client properties", () => {
      const clientProperties = ["boards", "items", "columns", "updates", "users", "workspaces", "webhooks"];

      for (const prop of clientProperties) {
        expect(sdk).toHaveProperty(prop);
      }

      expect(clientProperties).toHaveLength(7);
    });
  });

  describe("Raw GraphQL Methods", () => {
    let sdk: MondaySDK;

    beforeEach(() => {
      sdk = MondaySDK.createWithToken({ token: "test-token" });
    });

    it("should have query method", () => {
      expect(sdk.query).toBeDefined();
      expect(typeof sdk.query).toBe("function");
    });

    it("should have mutate method", () => {
      expect(sdk.mutate).toBeDefined();
      expect(typeof sdk.mutate).toBe("function");
    });

    it("query should return a Promise", () => {
      const result = sdk.query("query { me { name } }");
      expect(result).toBeInstanceOf(Promise);
    });

    it("mutate should return a Promise", () => {
      const result = sdk.mutate("mutation { create_board(board_name: \"Test\") { id } }");
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("Configuration Options", () => {
    it("should accept optional timeout configuration", () => {
      const sdk = MondaySDK.createWithToken({
        token: "test-token",
        timeout: 60000,
      });
      expect(sdk).toBeInstanceOf(MondaySDK);
    });

    it("should accept optional apiVersion configuration", () => {
      const sdk = MondaySDK.createWithToken({
        token: "test-token",
        apiVersion: "2024-10",
      });
      expect(sdk).toBeInstanceOf(MondaySDK);
    });

    it("should accept onTokenRefresh callback for OAuth", () => {
      const refreshCallback = (newToken: string) => {
        // Token refresh handler
      };

      const sdk = MondaySDK.createWithOAuth({
        accessToken: "test-token",
        onTokenRefresh: refreshCallback,
      });
      expect(sdk).toBeInstanceOf(MondaySDK);
    });

    it("should accept validityInMinutes for short-lived tokens", () => {
      const sdk = MondaySDK.createWithShortLivedToken({
        shortLivedToken: "test-token",
        validityInMinutes: 5,
      });
      expect(sdk).toBeInstanceOf(MondaySDK);
    });
  });
});
