import { describe, it, expect } from "vitest";

describe("Mastodon SDK Build Verification", () => {
  it("should import auth utilities", async () => {
    const auth = await import("../src/auth");

    expect(auth.createMastodonClient).toBeDefined();
    expect(auth.registerApplication).toBeDefined();
    expect(auth.generateAuthUrl).toBeDefined();
    expect(auth.exchangeCodeForToken).toBeDefined();
    expect(auth.getClientCredentialsToken).toBeDefined();
    expect(auth.revokeToken).toBeDefined();
    expect(auth.verifyToken).toBeDefined();
    expect(auth.getMastodonAuthEndpoints).toBeDefined();
    expect(auth.getMastodonApiBaseUrl).toBeDefined();
  });

  it("should import streaming client", async () => {
    const streaming = await import("../src/streaming");

    expect(streaming.MastodonStreamingClient).toBeDefined();
  });

  it("should import main SDK", async () => {
    const sdk = await import("../src/index");

    expect(sdk.MastodonSDK).toBeDefined();
    expect(sdk.default).toBeDefined();
  });

  it("should have static methods on MastodonSDK", async () => {
    const { MastodonSDK } = await import("../src/index");

    expect(typeof MastodonSDK.registerApp).toBe("function");
    expect(typeof MastodonSDK.generateAuthUrl).toBe("function");
    expect(typeof MastodonSDK.exchangeCode).toBe("function");
    expect(typeof MastodonSDK.getAppToken).toBe("function");
    expect(typeof MastodonSDK.revokeToken).toBe("function");
    expect(typeof MastodonSDK.verifyToken).toBe("function");
    expect(typeof MastodonSDK.createUserClient).toBe("function");
    expect(typeof MastodonSDK.createAppClient).toBe("function");
    expect(typeof MastodonSDK.createStreamingClient).toBe("function");
    expect(typeof MastodonSDK.createHttpClient).toBe("function");
  });

  it("should create HTTP client", async () => {
    const { MastodonSDK } = await import("../src/index");

    const client = MastodonSDK.createHttpClient({
      instanceUrl: "mastodon.social",
      accessToken: "test_token",
    });

    expect(client).toBeDefined();
    expect(typeof client.get).toBe("function");
    expect(typeof client.post).toBe("function");
    expect(typeof client.put).toBe("function");
    expect(typeof client.delete).toBe("function");
    expect(typeof client.patch).toBe("function");
  });

  it("should create streaming client", async () => {
    const { MastodonSDK } = await import("../src/index");

    const streamingClient = MastodonSDK.createStreamingClient({
      instanceUrl: "mastodon.social",
      accessToken: "test_token",
    });

    expect(streamingClient).toBeDefined();
    expect(typeof streamingClient.subscribeToStream).toBe("function");
    expect(typeof streamingClient.subscribeToUserStream).toBe("function");
    expect(typeof streamingClient.subscribeToPublicStream).toBe("function");
    expect(typeof streamingClient.subscribeToHashtagStream).toBe("function");
    expect(typeof streamingClient.subscribeToListStream).toBe("function");
    expect(typeof streamingClient.subscribeToDirectStream).toBe("function");
  });

  it("should have correct OAuth scope types", async () => {
    const auth = await import("../src/auth/config");

    // Just verify the types are exported
    expect(auth.getMastodonAuthEndpoints).toBeDefined();
    expect(auth.getMastodonApiBaseUrl).toBeDefined();
  });

  it("should build auth endpoints correctly", async () => {
    const { getMastodonAuthEndpoints, getMastodonApiBaseUrl } = await import("../src/auth/config");

    const endpoints = getMastodonAuthEndpoints("mastodon.social");
    expect(endpoints.authorize).toBe("https://mastodon.social/oauth/authorize");
    expect(endpoints.token).toBe("https://mastodon.social/oauth/token");
    expect(endpoints.revoke).toBe("https://mastodon.social/oauth/revoke");

    const baseUrl = getMastodonApiBaseUrl("mastodon.social");
    expect(baseUrl).toBe("https://mastodon.social/api");
  });

  it("should handle instance URLs with https:// prefix", async () => {
    const { getMastodonAuthEndpoints, getMastodonApiBaseUrl } = await import("../src/auth/config");

    const endpoints = getMastodonAuthEndpoints("https://mastodon.social");
    expect(endpoints.authorize).toBe("https://mastodon.social/oauth/authorize");

    const baseUrl = getMastodonApiBaseUrl("https://mastodon.social");
    expect(baseUrl).toBe("https://mastodon.social/api");
  });
});
