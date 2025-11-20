import { describe, expect, it } from "vitest";
import { BearerTokenManager, NotionSDK, OAuthManager } from "../src/index";

describe("Notion SDK Factory Methods", () => {
  it("should create a Bearer Token client", () => {
    const client = NotionSDK.createBearerTokenClient({
      token: "secret_test_token",
    });

    expect(client).toBeDefined();
    expect(client.pages).toBeDefined();
    expect(client.databases).toBeDefined();
    expect(client.blocks).toBeDefined();
  });

  it("should create an OAuth client", () => {
    const client = NotionSDK.createOAuthClient({
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      redirectUri: "https://example.com/callback",
    });

    expect(client).toBeDefined();
    expect(client.oauth).toBeDefined();
    expect(client.pages).toBeDefined();
  });

  it("should throw error when accessing OAuth methods on Bearer Token client", () => {
    const client = NotionSDK.createBearerTokenClient({
      token: "secret_test_token",
    });

    expect(() => client.oauth).toThrow("OAuth methods are only available for OAuth clients");
  });
});

describe("Bearer Token Manager", () => {
  it("should create authorization header", () => {
    const manager = new BearerTokenManager({
      token: "secret_test_token",
    });

    expect(manager.getAuthorizationHeader()).toBe("Bearer secret_test_token");
  });

  it("should return correct API version", () => {
    const manager = new BearerTokenManager({
      token: "secret_test_token",
    });

    expect(manager.getVersionHeader()).toBe("2022-06-28");
  });

  it("should use custom API version if provided", () => {
    const manager = new BearerTokenManager({
      token: "secret_test_token",
      apiVersion: "2025-09-03",
    });

    expect(manager.getVersionHeader()).toBe("2025-09-03");
  });

  it("should return all required headers", () => {
    const manager = new BearerTokenManager({
      token: "secret_test_token",
    });

    const headers = manager.getHeaders();
    expect(headers.Authorization).toBe("Bearer secret_test_token");
    expect(headers["Notion-Version"]).toBe("2022-06-28");
    expect(headers["Content-Type"]).toBe("application/json");
  });
});

describe("OAuth Manager", () => {
  it("should generate authorization URL", () => {
    const manager = new OAuthManager({
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      redirectUri: "https://example.com/callback",
    });

    const url = manager.generateAuthorizationUrl();
    expect(url).toContain("https://api.notion.com/v1/oauth/authorize");
    expect(url).toContain("client_id=test-client-id");
    expect(url).toContain("redirect_uri=https%3A%2F%2Fexample.com%2Fcallback");
    expect(url).toContain("response_type=code");
    expect(url).toContain("owner=user");
  });

  it("should generate authorization URL with state", () => {
    const manager = new OAuthManager({
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      redirectUri: "https://example.com/callback",
    });

    const url = manager.generateAuthorizationUrl("test-state-123");
    expect(url).toContain("state=test-state-123");
  });

  it("should throw error when getting headers without access token", () => {
    const manager = new OAuthManager({
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      redirectUri: "https://example.com/callback",
    });

    expect(() => manager.getAuthorizationHeader()).toThrow("Access token not set");
  });

  it("should return headers after setting access token", () => {
    const manager = new OAuthManager({
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      redirectUri: "https://example.com/callback",
    });

    manager.setAccessToken("test-access-token");

    const headers = manager.getHeaders();
    expect(headers.Authorization).toBe("Bearer test-access-token");
    expect(headers["Notion-Version"]).toBe("2022-06-28");
    expect(headers["Content-Type"]).toBe("application/json");
  });
});
