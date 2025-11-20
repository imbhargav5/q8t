import { secp256k1 } from "@noble/curves/secp256k1";
import { randomBytes } from "@noble/hashes/utils";
import { base64, hex } from "@scure/base";

/**
 * NIP-04: Encrypted Direct Messages (deprecated in favor of NIP-44)
 * Uses AES-256-CBC with shared secret from ECDH
 */

/**
 * Get shared secret between two keys using ECDH
 */
function getSharedSecret(privateKey: Uint8Array, publicKey: string): Uint8Array {
  const sharedPoint = secp256k1.getSharedSecret(privateKey, `02${publicKey}`);
  return sharedPoint.slice(1, 33); // Take x-coordinate
}

/**
 * Convert Uint8Array to proper ArrayBuffer-backed Uint8Array
 */
function ensureArrayBuffer(arr: Uint8Array): Uint8Array {
  if (arr.buffer.byteLength === arr.byteLength) {
    return arr;
  }
  return new Uint8Array(arr);
}

/**
 * Encrypt plaintext using NIP-04
 */
export async function encrypt(
  privateKey: Uint8Array | string,
  publicKey: string,
  plaintext: string,
): Promise<string> {
  const key = typeof privateKey === "string" ? hex.decode(privateKey) : privateKey;
  const sharedSecret = ensureArrayBuffer(getSharedSecret(key, publicKey));

  const iv = ensureArrayBuffer(randomBytes(16));
  const cipher = await importKey(sharedSecret);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: iv as unknown as BufferSource },
    cipher,
    new TextEncoder().encode(plaintext),
  );

  const ciphertext = base64.encode(new Uint8Array(encrypted));
  const ivBase64 = base64.encode(iv);

  return `${ciphertext}?iv=${ivBase64}`;
}

/**
 * Decrypt ciphertext using NIP-04
 */
export async function decrypt(
  privateKey: Uint8Array | string,
  publicKey: string,
  ciphertext: string,
): Promise<string> {
  const key = typeof privateKey === "string" ? hex.decode(privateKey) : privateKey;
  const sharedSecret = ensureArrayBuffer(getSharedSecret(key, publicKey));

  const [ctBase64, ivBase64] = ciphertext.split("?iv=");
  if (!ivBase64) throw new Error("Invalid ciphertext format");

  const ct = ensureArrayBuffer(base64.decode(ctBase64));
  const iv = ensureArrayBuffer(base64.decode(ivBase64));

  const cipher = await importKey(sharedSecret);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: iv as unknown as BufferSource },
    cipher,
    ct as unknown as BufferSource,
  );

  return new TextDecoder().decode(decrypted);
}

/**
 * Import shared secret as AES key
 */
async function importKey(sharedSecret: Uint8Array): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    "raw",
    sharedSecret as unknown as BufferSource,
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"],
  );
}
