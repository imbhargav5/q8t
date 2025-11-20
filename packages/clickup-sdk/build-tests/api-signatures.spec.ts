import { describe, it, expect } from "vitest";
import { createWithToken, createWithOAuth } from "../src/index";

describe("SDK Factory Methods", () => {
  it("should create SDK with personal token", () => {
    const sdk = createWithToken("pk_test_token");
    expect(sdk).toBeDefined();
    expect(typeof sdk.getAuthorizedWorkspaces).toBe("function");
  });

  it("should create SDK with OAuth token", () => {
    const sdk = createWithOAuth("oauth_test_token");
    expect(sdk).toBeDefined();
    expect(typeof sdk.getAuthorizedWorkspaces).toBe("function");
  });

  it("should export authentication utilities", async () => {
    const { generateAuthUrl, exchangeCodeForToken } = await import("../src/index");

    expect(typeof generateAuthUrl).toBe("function");
    expect(typeof exchangeCodeForToken).toBe("function");
  });

  it("should generate valid auth URL", async () => {
    const { generateAuthUrl } = await import("../src/index");

    const result = generateAuthUrl({
      clientId: "test-client-id",
      redirectUri: "https://example.com/callback",
    });

    expect(result.url).toContain("https://app.clickup.com/api");
    expect(result.url).toContain("client_id=test-client-id");
    expect(result.url).toContain("redirect_uri=https%3A%2F%2Fexample.com%2Fcallback");
    expect(result.state).toBeDefined();
    expect(result.state.length).toBe(32);
  });
});

describe("Authentication Classes", () => {
  it("should export PersonalTokenManager", async () => {
    const { PersonalTokenManager } = await import("../src/auth/token");
    const manager = new PersonalTokenManager("pk_test_token");

    expect(manager.getAuthorizationHeader()).toBe("pk_test_token");
  });

  it("should export OAuth2TokenManager", async () => {
    const { OAuth2TokenManager } = await import("../src/auth/token");
    const manager = new OAuth2TokenManager("oauth_test_token");

    expect(manager.getAuthorizationHeader()).toBe("Bearer oauth_test_token");
  });

  it("should allow updating OAuth token", async () => {
    const { OAuth2TokenManager } = await import("../src/auth/token");
    const manager = new OAuth2TokenManager("old_token");

    manager.updateAccessToken("new_token");
    expect(manager.getAuthorizationHeader()).toBe("Bearer new_token");
  });
});
