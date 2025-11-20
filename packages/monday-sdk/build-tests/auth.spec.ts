/**
 * Authentication Test Suite
 *
 * This test suite verifies that all authentication methods and utilities
 * are properly exported and functional.
 */

import { describe, it, expect } from "vitest";
import {
  PersonalTokenManager,
  OAuthTokenManager,
  ShortLivedTokenManager,
  generateAuthUrl,
  DEFAULT_SCOPES,
} from "../src/auth";

describe("Monday SDK - Authentication", () => {
  describe("PersonalTokenManager", () => {
    it("should create instance with token", () => {
      const manager = new PersonalTokenManager("test-token");
      expect(manager).toBeDefined();
    });

    it("should return token from getAuthorizationHeader", () => {
      const manager = new PersonalTokenManager("test-token");
      expect(manager.getAuthorizationHeader()).toBe("test-token");
    });

    it("should return token from getToken", () => {
      const manager = new PersonalTokenManager("test-token");
      expect(manager.getToken()).toBe("test-token");
    });
  });

  describe("OAuthTokenManager", () => {
    it("should create instance with access token", () => {
      const manager = new OAuthTokenManager("oauth-token");
      expect(manager).toBeDefined();
    });

    it("should return token from getAuthorizationHeader", () => {
      const manager = new OAuthTokenManager("oauth-token");
      expect(manager.getAuthorizationHeader()).toBe("oauth-token");
    });

    it("should return token from getToken", () => {
      const manager = new OAuthTokenManager("oauth-token");
      expect(manager.getToken()).toBe("oauth-token");
    });

    it("should update token", () => {
      const manager = new OAuthTokenManager("old-token");
      manager.updateToken("new-token");
      expect(manager.getToken()).toBe("new-token");
    });

    it("should call onTokenRefresh callback when token is updated", () => {
      let refreshedToken: string | undefined;
      const manager = new OAuthTokenManager("old-token", (newToken) => {
        refreshedToken = newToken;
      });

      manager.updateToken("new-token");
      expect(refreshedToken).toBe("new-token");
    });
  });

  describe("ShortLivedTokenManager", () => {
    it("should create instance with short-lived token", () => {
      const manager = new ShortLivedTokenManager("short-token");
      expect(manager).toBeDefined();
    });

    it("should return token from getAuthorizationHeader", () => {
      const manager = new ShortLivedTokenManager("short-token");
      expect(manager.getAuthorizationHeader()).toBe("short-token");
    });

    it("should return token from getToken", () => {
      const manager = new ShortLivedTokenManager("short-token");
      expect(manager.getToken()).toBe("short-token");
    });

    it("should not be expired immediately after creation", () => {
      const manager = new ShortLivedTokenManager("short-token", 5);
      expect(manager.isExpired()).toBe(false);
    });

    it("should throw error when getting expired token", () => {
      const manager = new ShortLivedTokenManager("short-token", 0);

      // Wait a tiny bit to ensure expiration
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(() => manager.getAuthorizationHeader()).toThrow();
          resolve(undefined);
        }, 10);
      });
    });

    it("should accept custom validity in minutes", () => {
      const manager = new ShortLivedTokenManager("short-token", 10);
      expect(manager.isExpired()).toBe(false);
    });
  });

  describe("OAuth Utilities", () => {
    it("should generate auth URL with required params", () => {
      const result = generateAuthUrl({
        clientId: "test-client-id",
        redirectUri: "https://example.com/callback",
        scopes: ["boards:read"],
      });

      expect(result.url).toContain("test-client-id");
      expect(result.url).toContain("example.com");
      expect(result.url).toContain("boards");
      expect(result.state).toBeDefined();
      expect(result.state.length).toBeGreaterThan(0);
    });

    it("should generate unique state for each auth URL", () => {
      const result1 = generateAuthUrl({
        clientId: "client-id",
        redirectUri: "https://example.com",
        scopes: [],
      });

      const result2 = generateAuthUrl({
        clientId: "client-id",
        redirectUri: "https://example.com",
        scopes: [],
      });

      expect(result1.state).not.toBe(result2.state);
    });

    it("should include multiple scopes in auth URL", () => {
      const result = generateAuthUrl({
        clientId: "client-id",
        redirectUri: "https://example.com",
        scopes: ["boards:read", "boards:write", "users:read"],
      });

      expect(result.url).toContain("boards");
      expect(result.url).toContain("users");
    });

    it("should use Monday OAuth base URL", () => {
      const result = generateAuthUrl({
        clientId: "client-id",
        redirectUri: "https://example.com",
        scopes: [],
      });

      expect(result.url).toContain("auth.monday.com/oauth2");
    });
  });

  describe("Default Scopes", () => {
    it("should export DEFAULT_SCOPES", () => {
      expect(DEFAULT_SCOPES).toBeDefined();
      expect(Array.isArray(DEFAULT_SCOPES)).toBe(true);
    });

    it("should include common scopes", () => {
      expect(DEFAULT_SCOPES).toContain("boards:read");
      expect(DEFAULT_SCOPES).toContain("boards:write");
    });

    it("should have at least 3 scopes", () => {
      expect(DEFAULT_SCOPES.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("Token Manager Interface Compliance", () => {
    it("PersonalTokenManager should implement TokenManager interface", () => {
      const manager = new PersonalTokenManager("token");

      expect(typeof manager.getAuthorizationHeader).toBe("function");
      expect(typeof manager.getToken).toBe("function");
    });

    it("OAuthTokenManager should implement TokenManager interface", () => {
      const manager = new OAuthTokenManager("token");

      expect(typeof manager.getAuthorizationHeader).toBe("function");
      expect(typeof manager.getToken).toBe("function");
    });

    it("ShortLivedTokenManager should implement TokenManager interface", () => {
      const manager = new ShortLivedTokenManager("token");

      expect(typeof manager.getAuthorizationHeader).toBe("function");
      expect(typeof manager.getToken).toBe("function");
    });
  });
});
