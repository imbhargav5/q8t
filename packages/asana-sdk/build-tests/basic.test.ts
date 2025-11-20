import { describe, expect, it } from "vitest";
import { AsanaSDK } from "../src/index";

describe("AsanaSDK", () => {
  describe("Factory Methods", () => {
    it("should create SDK with PAT authentication", () => {
      const sdk = AsanaSDK.createWithPAT({
        personalAccessToken: "test-token",
      });

      expect(sdk).toBeInstanceOf(AsanaSDK);
    });

    it("should create SDK with OAuth2 authentication", () => {
      const sdk = AsanaSDK.createWithOAuth2({
        accessToken: "test-access-token",
      });

      expect(sdk).toBeInstanceOf(AsanaSDK);
    });

    it("should create SDK with OAuth2 and refresh token", () => {
      const sdk = AsanaSDK.createWithOAuth2({
        accessToken: "test-access-token",
        refreshToken: "test-refresh-token",
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
      });

      expect(sdk).toBeInstanceOf(AsanaSDK);
    });
  });

  describe("OAuth Utilities", () => {
    it("should generate auth URL", () => {
      const { url, state } = AsanaSDK.OAuth.generateAuthUrl({
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        redirectUri: "https://example.com/callback",
        scopes: [AsanaSDK.OAuth.SCOPES.DEFAULT],
      });

      expect(url).toContain("https://app.asana.com/-/oauth_authorize");
      expect(url).toContain("client_id=test-client-id");
      expect(url).toContain("redirect_uri=https%3A%2F%2Fexample.com%2Fcallback");
      expect(state).toBeTruthy();
      expect(state.length).toBeGreaterThan(20);
    });

    it("should have all OAuth scopes", () => {
      expect(AsanaSDK.OAuth.SCOPES.DEFAULT).toBe("default");
      expect(AsanaSDK.OAuth.SCOPES.OPENID).toBe("openid");
      expect(AsanaSDK.OAuth.SCOPES.TASKS_READ).toBe("tasks:read");
      expect(AsanaSDK.OAuth.SCOPES.TASKS_WRITE).toBe("tasks:write");
      expect(AsanaSDK.OAuth.SCOPES.PROJECTS_READ).toBe("projects:read");
    });
  });
});
