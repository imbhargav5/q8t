/**
 * @q8t/nostr-sdk - Comprehensive Nostr Protocol SDK
 *
 * A complete TypeScript SDK for the Nostr protocol with support for:
 * - Multiple authentication methods (private key, NIP-07 browser extensions)
 * - Full NIP implementations (NIP-01, NIP-04, NIP-05, NIP-13, NIP-19, NIP-44)
 * - Relay pool management with auto-reconnection
 * - High-level client API for common operations
 * - Low-level crypto utilities for advanced use cases
 */

// Core crypto and types
export * from "./crypto";

// Authentication and signing
export * from "./auth";

// NIPs (Nostr Implementation Possibilities)
export * from "./nips";

// Relay management
export * from "./relay";

// High-level client
export * from "./client";

// Convenience re-exports with namespaces
export { EventKind } from "./crypto/types";
export type {
  Event,
  UnsignedEvent,
  Filter,
  Subscription,
  UserMetadata,
  Contact,
  RelayInfo,
} from "./crypto/types";

export type { Signer } from "./auth/signer";
export { PrivateKeySigner } from "./auth/private-key-signer";
export { Nip07Signer } from "./auth/nip07-signer";

export { Relay, RelayStatus } from "./relay/relay";
export { RelayPool } from "./relay/relay-pool";

export { NostrClient } from "./client/nostr-client";

import { Nip07Signer } from "./auth/nip07-signer";
import { PrivateKeySigner } from "./auth/private-key-signer";
// Factory functions for convenience
import { NostrClient, type NostrClientOptions } from "./client/nostr-client";

/**
 * Create a Nostr client with private key authentication
 */
export function createPrivateKeyClient(
  secretKey: Uint8Array | string,
  relays: string[],
  options?: Partial<NostrClientOptions>,
): NostrClient {
  return new NostrClient({
    ...options,
    relays,
    signer: new PrivateKeySigner(secretKey),
  });
}

/**
 * Create a Nostr client with NIP-07 browser extension
 */
export function createNip07Client(
  relays: string[],
  options?: Partial<NostrClientOptions>,
): NostrClient {
  return new NostrClient({
    ...options,
    relays,
    signer: new Nip07Signer(),
  });
}

/**
 * Default export: NostrClient constructor
 */
export default NostrClient;
