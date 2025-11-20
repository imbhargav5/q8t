// Main entry point for @q8t/farcaster-sdk

import type { FarcasterSDKConfig } from "./auth/config";
import { createHubClient } from "./auth/hub-client";
import { createWarpcastClient } from "./auth/warpcast-client";
import { createSignerClient } from "./auth/signer-client";
import { HubApi } from "../lib/hub-api";
import { WarpcastApi } from "../lib/warpcast-api";
import { SignerApi } from "../lib/signer-api";

/**
 * Farcaster SDK - Comprehensive SDK for Farcaster/Warpcast APIs
 *
 * Provides access to three distinct API layers:
 * 1. Hub API - Protocol-level access to the Farcaster network
 * 2. Warpcast API - Application-level features (channels, moderation, etc.)
 * 3. Signer API - Authentication and signer management
 *
 * @example
 * ```typescript
 * // Create SDK with Hub and Warpcast access
 * const sdk = new FarcasterSDK({
 *   hub: { hubUrl: 'https://hub.pinata.cloud' },
 *   warpcast: { accessToken: 'your-token' },
 * });
 *
 * // Use Hub API
 * const casts = await sdk.hub.getCastsByFid(123);
 *
 * // Use Warpcast API
 * const channels = await sdk.warpcast.getAllChannels();
 *
 * // Use Signer API
 * const signerRequest = await sdk.signer.createSignerRequest({...});
 * ```
 */
export class FarcasterSDK {
  /**
   * Hub API client - Access to Farcaster protocol
   * Read casts, reactions, links, user data, verifications, etc.
   */
  public readonly hub: HubApi;

  /**
   * Warpcast API client - Access to application features
   * Manage channels, moderation, direct casts, user features, etc.
   */
  public readonly warpcast: WarpcastApi;

  /**
   * Signer API client - Manage signer requests and approvals
   * Create and poll signer requests for OAuth-like flows
   */
  public readonly signer: SignerApi;

  /**
   * Create a new Farcaster SDK instance
   *
   * @param config - Configuration for the SDK
   * @param config.hub - Hub API configuration (optional)
   * @param config.warpcast - Warpcast API configuration (optional)
   * @param config.signer - Signer API configuration (optional)
   *
   * @example
   * ```typescript
   * // Hub-only access (read-only protocol access)
   * const sdk = new FarcasterSDK({
   *   hub: { hubUrl: 'https://hub.pinata.cloud' }
   * });
   *
   * // Full access with all three APIs
   * const sdk = new FarcasterSDK({
   *   hub: {
   *     hubUrl: 'https://hub.pinata.cloud',
   *     signerPrivateKey: '0x...',
   *     fid: 123
   *   },
   *   warpcast: {
   *     accessToken: 'your-warpcast-token'
   *   },
   *   signer: {
   *     appFid: 456,
   *     appPrivateKey: '0x...'
   *   }
   * });
   * ```
   */
  constructor(config: FarcasterSDKConfig = {}) {
    // Initialize Hub API client
    const hubClient = createHubClient(config.hub || {});
    this.hub = new HubApi(hubClient);

    // Initialize Warpcast API client (requires access token)
    if (config.warpcast?.accessToken) {
      const warpcastClient = createWarpcastClient(config.warpcast);
      this.warpcast = new WarpcastApi(warpcastClient);
    } else {
      // Create a stub that throws helpful error messages
      const stubClient = {
        get: async () => {
          throw new Error(
            "Warpcast API requires an access token. Please provide warpcast.accessToken in config.",
          );
        },
        post: async () => {
          throw new Error(
            "Warpcast API requires an access token. Please provide warpcast.accessToken in config.",
          );
        },
        put: async () => {
          throw new Error(
            "Warpcast API requires an access token. Please provide warpcast.accessToken in config.",
          );
        },
        delete: async () => {
          throw new Error(
            "Warpcast API requires an access token. Please provide warpcast.accessToken in config.",
          );
        },
        patch: async () => {
          throw new Error(
            "Warpcast API requires an access token. Please provide warpcast.accessToken in config.",
          );
        },
      };
      this.warpcast = new WarpcastApi(stubClient as any);
    }

    // Initialize Signer API client (requires app FID and private key)
    if (config.signer?.appFid && config.signer?.appPrivateKey) {
      const signerClient = createSignerClient(config.signer);
      this.signer = new SignerApi(signerClient);
    } else {
      // Create a stub that throws helpful error messages
      const stubClient = {
        get: async () => {
          throw new Error(
            "Signer API requires appFid and appPrivateKey. Please provide signer config.",
          );
        },
        post: async () => {
          throw new Error(
            "Signer API requires appFid and appPrivateKey. Please provide signer config.",
          );
        },
        put: async () => {
          throw new Error(
            "Signer API requires appFid and appPrivateKey. Please provide signer config.",
          );
        },
        delete: async () => {
          throw new Error(
            "Signer API requires appFid and appPrivateKey. Please provide signer config.",
          );
        },
        patch: async () => {
          throw new Error(
            "Signer API requires appFid and appPrivateKey. Please provide signer config.",
          );
        },
      };
      this.signer = new SignerApi(stubClient as any);
    }
  }
}

// Re-export authentication utilities and types
export * from "./auth";

// Re-export all generated API types and classes
export * from "../lib";
