import { schnorr } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { hex } from "@scure/base";

/**
 * Serialize event for hashing/signing (NIP-01)
 * Returns JSON array: [0, pubkey, created_at, kind, tags, content]
 */
export function serializeEvent(event: {
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
}): string {
  return JSON.stringify([0, event.pubkey, event.created_at, event.kind, event.tags, event.content]);
}

/**
 * Compute event ID (sha256 hash of serialized event)
 */
export function getEventHash(event: {
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
}): string {
  const serialized = serializeEvent(event);
  const hash = sha256(new TextEncoder().encode(serialized));
  return hex.encode(hash);
}

/**
 * Sign an event using Schnorr signature (NIP-01)
 */
export function signEvent(
  event: {
    pubkey: string;
    created_at: number;
    kind: number;
    tags: string[][];
    content: string;
  },
  secretKey: Uint8Array | string,
): Promise<string> {
  const sk = typeof secretKey === "string" ? hex.decode(secretKey) : secretKey;
  const hash = getEventHash(event);
  const sig = schnorr.sign(hash, sk);
  return Promise.resolve(hex.encode(sig));
}

/**
 * Verify event signature
 */
export function verifySignature(event: {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
  sig: string;
}): Promise<boolean> {
  try {
    // Verify ID matches hash
    const hash = getEventHash(event);
    if (hash !== event.id) return Promise.resolve(false);

    // Verify signature
    const valid = schnorr.verify(event.sig, event.id, event.pubkey);
    return Promise.resolve(valid);
  } catch {
    return Promise.resolve(false);
  }
}
