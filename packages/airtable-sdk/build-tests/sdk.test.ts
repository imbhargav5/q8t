import { describe, it, expect } from "vitest";
import {
  AirtableSDK,
  AirtablePATSDK,
  AirtableOAuthSDK,
  createPATClient,
  createOAuthClient,
  AirtableWebApi,
  AirtableWebhooksApi,
  AirtableCommentsApi,
  AirtableEnterpriseApi,
} from "../src/index";

describe("Airtable SDK", () => {
  describe("SDK Factory", () => {
    it("should create PAT SDK with simple syntax", () => {
      const sdk = AirtableSDK.create("test_token");
      expect(sdk).toBeInstanceOf(AirtablePATSDK);
      expect(sdk.web).toBeInstanceOf(AirtableWebApi);
      expect(sdk.webhooks).toBeInstanceOf(AirtableWebhooksApi);
      expect(sdk.comments).toBeInstanceOf(AirtableCommentsApi);
      expect(sdk.enterprise).toBeInstanceOf(AirtableEnterpriseApi);
    });

    it("should create PAT SDK with full config", () => {
      const sdk = AirtableSDK.withPAT({
        accessToken: "test_token",
        baseUrl: "https://custom.airtable.com/v0",
      });
      expect(sdk).toBeInstanceOf(AirtablePATSDK);
    });

    it("should create OAuth SDK", () => {
      const sdk = AirtableSDK.withOAuth({
        accessToken: "test_oauth_token",
        refreshToken: "test_refresh_token",
        clientId: "test_client_id",
        clientSecret: "test_client_secret",
      });
      expect(sdk).toBeInstanceOf(AirtableOAuthSDK);
      expect(sdk.getAccessToken()).toBe("test_oauth_token");
    });
  });

  describe("Individual Clients", () => {
    it("should create PAT client", () => {
      const client = createPATClient({ accessToken: "test_token" });
      expect(client).toBeDefined();
      expect(typeof client.get).toBe("function");
      expect(typeof client.post).toBe("function");
      expect(typeof client.patch).toBe("function");
      expect(typeof client.delete).toBe("function");
    });

    it("should create OAuth client", () => {
      const client = createOAuthClient({
        accessToken: "test_token",
      });
      expect(client).toBeDefined();
      expect(typeof client.getAccessToken).toBe("function");
    });
  });

  describe("API Modules", () => {
    it("should have all API modules on PAT SDK", () => {
      const sdk = AirtableSDK.create("test_token");
      expect(sdk.web).toBeDefined();
      expect(sdk.webhooks).toBeDefined();
      expect(sdk.comments).toBeDefined();
      expect(sdk.enterprise).toBeDefined();
    });

    it("should have all API modules on OAuth SDK", () => {
      const sdk = AirtableSDK.withOAuth({ accessToken: "test_token" });
      expect(sdk.web).toBeDefined();
      expect(sdk.webhooks).toBeDefined();
      expect(sdk.comments).toBeDefined();
      expect(sdk.enterprise).toBeDefined();
    });
  });

  describe("Generated Types", () => {
    it("should export types from generated code", () => {
      // Just verify imports work - actual types are checked by TypeScript
      expect(AirtableWebApi).toBeDefined();
      expect(AirtableWebhooksApi).toBeDefined();
      expect(AirtableCommentsApi).toBeDefined();
      expect(AirtableEnterpriseApi).toBeDefined();
    });
  });
});
