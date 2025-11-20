import { chacha20 } from "@noble/ciphers/chacha";
import { secp256k1 } from "@noble/curves/secp256k1";
import { hmac } from "@noble/hashes/hmac";
import { sha256 } from "@noble/hashes/sha256";
import { concatBytes, randomBytes } from "@noble/hashes/utils";
import { base64, hex } from "@scure/base";

/**
 * NIP-44: Versioned Encrypted Payloads
 * Modern authenticated encryption using ChaCha20 + HMAC-SHA256
 * This is the recommended encryption method (replaces NIP-04)
 */

const VERSION = 2;
const MIN_PLAINTEXT_SIZE = 0x0001; // 1 byte
const MAX_PLAINTEXT_SIZE = 0xffff; // 65535 bytes

/**
 * Get conversation key from private and public keys
 */
export function getConversationKey(privateKey: Uint8Array | string, publicKey: string): Uint8Array {
  const key = typeof privateKey === "string" ? hex.decode(privateKey) : privateKey;
  const sharedPoint = secp256k1.getSharedSecret(key, `02${publicKey}`);
  const sharedX = sharedPoint.slice(1, 33);

  // HKDF extract and expand
  const salt = new Uint8Array(32); // all zeros
  const prk = hmac(sha256, salt, sharedX);
  const info = new TextEncoder().encode("nip44-v2");
  const okm = hmac(sha256, prk, concatBytes(info, new Uint8Array([1])));

  return okm.slice(0, 32);
}

/**
 * Pad plaintext to nearest power of 2 length
 */
function pad(plaintext: string): Uint8Array {
  const unpadded = new TextEncoder().encode(plaintext);
  const unpaddedLen = unpadded.length;

  if (unpaddedLen < MIN_PLAINTEXT_SIZE || unpaddedLen > MAX_PLAINTEXT_SIZE) {
    throw new Error("Invalid plaintext length");
  }

  // Calculate padded length (next power of 2, minimum 32)
  let paddedLen = 32;
  while (paddedLen < unpaddedLen) {
    paddedLen *= 2;
  }

  const padded = new Uint8Array(paddedLen);
  padded.set(unpadded);

  // Add length prefix (2 bytes, big-endian)
  const result = new Uint8Array(2 + paddedLen);
  result[0] = (unpaddedLen >> 8) & 0xff;
  result[1] = unpaddedLen & 0xff;
  result.set(padded, 2);

  return result;
}

/**
 * Unpad plaintext
 */
function unpad(padded: Uint8Array): string {
  const unpaddedLen = (padded[0] << 8) | padded[1];
  const unpadded = padded.slice(2, 2 + unpaddedLen);
  return new TextDecoder().decode(unpadded);
}

/**
 * Encrypt plaintext using NIP-44
 */
export function encrypt(conversationKey: Uint8Array, plaintext: string): string {
  const nonce = randomBytes(32);
  const padded = pad(plaintext);

  // ChaCha20 encryption
  const ciphertext = chacha20(conversationKey, nonce.slice(0, 12), padded);

  // HMAC authentication
  const mac = hmac(sha256, conversationKey, concatBytes(nonce, ciphertext)).slice(0, 32);

  // Combine: version (1) + nonce (32) + ciphertext + mac (32)
  const payload = new Uint8Array(1 + nonce.length + ciphertext.length + mac.length);
  payload[0] = VERSION;
  payload.set(nonce, 1);
  payload.set(ciphertext, 1 + nonce.length);
  payload.set(mac, 1 + nonce.length + ciphertext.length);

  return base64.encode(payload);
}

/**
 * Decrypt ciphertext using NIP-44
 */
export function decrypt(conversationKey: Uint8Array, ciphertext: string): string {
  const payload = base64.decode(ciphertext);

  // Extract components
  const version = payload[0];
  if (version !== VERSION) {
    throw new Error(`Unsupported version: ${version}`);
  }

  const nonce = payload.slice(1, 33);
  const mac = payload.slice(-32);
  const ct = payload.slice(33, -32);

  // Verify MAC
  const expectedMac = hmac(sha256, conversationKey, concatBytes(nonce, ct));
  if (!constantTimeEqual(mac, expectedMac.slice(0, 32))) {
    throw new Error("MAC verification failed");
  }

  // Decrypt
  const padded = chacha20(conversationKey, nonce.slice(0, 12), ct);

  return unpad(padded);
}

/**
 * Constant-time equality check
 */
function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i];
  }
  return result === 0;
}

/**
 * Encrypt with automatic conversation key derivation
 */
export function encryptMessage(
  privateKey: Uint8Array | string,
  publicKey: string,
  plaintext: string,
): string {
  const ck = getConversationKey(privateKey, publicKey);
  return encrypt(ck, plaintext);
}

/**
 * Decrypt with automatic conversation key derivation
 */
export function decryptMessage(
  privateKey: Uint8Array | string,
  publicKey: string,
  ciphertext: string,
): string {
  const ck = getConversationKey(privateKey, publicKey);
  return decrypt(ck, ciphertext);
}
