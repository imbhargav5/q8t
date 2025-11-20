import { describe, it, expect } from "vitest";
import { FarcasterSDK } from "../src/index";

describe("FarcasterSDK", () => {
  describe("initialization", () => {
    it("should create SDK instance with hub config", () => {
      const sdk = new FarcasterSDK({
        hub: {
          hubUrl: "https://hub.pinata.cloud",
        },
      });

      expect(sdk.hub).toBeDefined();
      expect(sdk.warpcast).toBeDefined();
      expect(sdk.signer).toBeDefined();
    });

    it("should create SDK instance with all configs", () => {
      const sdk = new FarcasterSDK({
        hub: {
          hubUrl: "https://hub.pinata.cloud",
          signerPrivateKey: "0x1234",
          fid: 123,
        },
        warpcast: {
          accessToken: "test-token",
        },
        signer: {
          appFid: 456,
          appPrivateKey: "0x5678",
        },
      });

      expect(sdk.hub).toBeDefined();
      expect(sdk.warpcast).toBeDefined();
      expect(sdk.signer).toBeDefined();
    });

    it("should throw error when using warpcast API without token", async () => {
      const sdk = new FarcasterSDK({
        hub: {
          hubUrl: "https://hub.pinata.cloud",
        },
      });

      await expect(sdk.warpcast.getAllChannels()).rejects.toThrow(
        "Warpcast API requires an access token",
      );
    });

    it("should throw error when using signer API without config", async () => {
      const sdk = new FarcasterSDK({
        hub: {
          hubUrl: "https://hub.pinata.cloud",
        },
      });

      await expect(
        sdk.signer.getSignerRequest({ token: "test" }),
      ).rejects.toThrow("Signer API requires appFid and appPrivateKey");
    });
  });

  describe("Hub API", () => {
    it("should have getCastsByFid method", () => {
      const sdk = new FarcasterSDK({
        hub: { hubUrl: "https://hub.pinata.cloud" },
      });

      expect(sdk.hub.getCastsByFid).toBeDefined();
      expect(typeof sdk.hub.getCastsByFid).toBe("function");
    });

    it("should have getReactionsByFid method", () => {
      const sdk = new FarcasterSDK({
        hub: { hubUrl: "https://hub.pinata.cloud" },
      });

      expect(sdk.hub.getReactionsByFid).toBeDefined();
      expect(typeof sdk.hub.getReactionsByFid).toBe("function");
    });

    it("should have submitMessage method", () => {
      const sdk = new FarcasterSDK({
        hub: { hubUrl: "https://hub.pinata.cloud" },
      });

      expect(sdk.hub.submitMessage).toBeDefined();
      expect(typeof sdk.hub.submitMessage).toBe("function");
    });
  });

  describe("Warpcast API", () => {
    it("should have getAllChannels method", () => {
      const sdk = new FarcasterSDK({
        warpcast: { accessToken: "test" },
      });

      expect(sdk.warpcast.getAllChannels).toBeDefined();
      expect(typeof sdk.warpcast.getAllChannels).toBe("function");
    });

    it("should have followChannel method", () => {
      const sdk = new FarcasterSDK({
        warpcast: { accessToken: "test" },
      });

      expect(sdk.warpcast.followChannel).toBeDefined();
      expect(typeof sdk.warpcast.followChannel).toBe("function");
    });

    it("should have sendDirectCast method", () => {
      const sdk = new FarcasterSDK({
        warpcast: { accessToken: "test" },
      });

      expect(sdk.warpcast.sendDirectCast).toBeDefined();
      expect(typeof sdk.warpcast.sendDirectCast).toBe("function");
    });
  });

  describe("Signer API", () => {
    it("should have createSignerRequest method", () => {
      const sdk = new FarcasterSDK({
        signer: {
          appFid: 123,
          appPrivateKey: "0x1234",
        },
      });

      expect(sdk.signer.createSignerRequest).toBeDefined();
      expect(typeof sdk.signer.createSignerRequest).toBe("function");
    });

    it("should have getSignerRequest method", () => {
      const sdk = new FarcasterSDK({
        signer: {
          appFid: 123,
          appPrivateKey: "0x1234",
        },
      });

      expect(sdk.signer.getSignerRequest).toBeDefined();
      expect(typeof sdk.signer.getSignerRequest).toBe("function");
    });
  });
});
