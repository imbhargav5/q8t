import { schnorr } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { randomBytes } from "@noble/hashes/utils";
import { hex } from "@scure/base";

/**
 * Generate a new random private key
 * @returns Private key as Uint8Array (32 bytes)
 */
export function generateSecretKey(): Uint8Array {
  return randomBytes(32);
}

/**
 * Get public key from private key
 * @param secretKey - Private key as Uint8Array or hex string
 * @returns Public key as hex string (lowercase, 64 characters)
 */
export function getPublicKey(secretKey: Uint8Array | string): string {
  const sk = typeof secretKey === "string" ? hex.decode(secretKey) : secretKey;
  const pubkey = schnorr.getPublicKey(sk);
  return hex.encode(pubkey);
}

/**
 * Validate a private key
 * @param secretKey - Private key to validate
 * @returns true if valid, false otherwise
 */
export function isValidPrivateKey(secretKey: Uint8Array | string): boolean {
  try {
    const sk = typeof secretKey === "string" ? hex.decode(secretKey) : secretKey;
    if (sk.length !== 32) return false;
    // Try to derive public key - will throw if invalid
    schnorr.getPublicKey(sk);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a public key
 * @param pubkey - Public key to validate (hex string)
 * @returns true if valid, false otherwise
 */
export function isValidPublicKey(pubkey: string): boolean {
  try {
    if (pubkey.length !== 64) return false;
    const bytes = hex.decode(pubkey);
    if (bytes.length !== 32) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Convert bytes to hex string
 */
export function toHex(bytes: Uint8Array): string {
  return hex.encode(bytes);
}

/**
 * Convert hex string to bytes
 */
export function fromHex(hexStr: string): Uint8Array {
  return hex.decode(hexStr);
}

/**
 * Compute SHA256 hash
 */
export function hash(data: Uint8Array): Uint8Array {
  return sha256(data);
}
