import { describe, expect, it } from "vitest";
import { type DribbbleAuthConfig, createDribbbleClient, generateAuthUrl } from "../src/index";

describe("Dribbble SDK", () => {
  describe("OAuth2 Authentication", () => {
    it("should generate valid authorization URL", () => {
      const config: DribbbleAuthConfig = {
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        redirectUri: "https://example.com/callback",
        scopes: ["public", "upload"],
      };

      const { url, state } = generateAuthUrl(config);

      expect(url).toContain("https://dribbble.com/oauth/authorize");
      expect(url).toContain("client_id=test-client-id");
      expect(url).toContain("redirect_uri=https%3A%2F%2Fexample.com%2Fcallback");
      expect(url).toContain("scope=public+upload");
      expect(url).toContain("state=");
      expect(state).toHaveLength(32);
      // Verify state is in the URL (it may be URL-encoded)
      const urlObj = new URL(url);
      expect(urlObj.searchParams.get("state")).toBe(state);
    });

    it("should generate different state values", () => {
      const config: DribbbleAuthConfig = {
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        redirectUri: "https://example.com/callback",
        scopes: ["public"],
      };

      const result1 = generateAuthUrl(config);
      const result2 = generateAuthUrl(config);

      expect(result1.state).not.toBe(result2.state);
    });
  });

  describe("HTTP Client", () => {
    it("should create client with access token", () => {
      const client = createDribbbleClient({
        accessToken: "test-token-123",
      });

      expect(client).toBeDefined();
      expect(client.get).toBeDefined();
      expect(client.post).toBeDefined();
      expect(client.put).toBeDefined();
      expect(client.delete).toBeDefined();
      expect(client.postMultipart).toBeDefined();
    });
  });

  describe("Type Safety", () => {
    it("should have proper TypeScript types", () => {
      const config: DribbbleAuthConfig = {
        clientId: "test",
        clientSecret: "secret",
        redirectUri: "https://example.com",
        scopes: ["public", "upload"],
      };

      // Type checking - this should compile
      expect(config.scopes).toContain("public");
      expect(config.scopes).toContain("upload");
    });
  });
});
