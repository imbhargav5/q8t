// Utility functions for authentication and crypto operations

/**
 * Generate a cryptographically secure random string
 * @param length Length of the random string
 * @returns Random string
 */
export function generateRandomString(length: number): string {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const randomValues = new Uint8Array(length);

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(randomValues);
  } else {
    // Node.js fallback
    const nodeCrypto = require("crypto");
    nodeCrypto.randomFillSync(randomValues);
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }

  return result;
}

/**
 * Generate PKCE code challenge from code verifier
 * @param codeVerifier Code verifier string
 * @returns Base64URL-encoded SHA256 hash
 */
export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  // Node.js environment
  const nodeCrypto = await import("node:crypto");
  const encoder = new TextEncoder();
  const subtle = nodeCrypto.webcrypto.subtle;

  const data = encoder.encode(codeVerifier);
  const hash = await subtle.digest("SHA-256", data);

  return base64UrlEncode(new Uint8Array(hash));
}

/**
 * Base64URL encode a byte array
 * @param bytes Uint8Array to encode
 * @returns Base64URL-encoded string
 */
export function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  const base64 =
    typeof btoa !== "undefined" ? btoa(binary) : Buffer.from(binary, "binary").toString("base64");

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Base64URL decode a string
 * @param str Base64URL-encoded string
 * @returns Decoded Uint8Array
 */
export function base64UrlDecode(str: string): Uint8Array {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");

  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const paddedBase64 = base64 + padding;

  const binary =
    typeof atob !== "undefined"
      ? atob(paddedBase64)
      : Buffer.from(paddedBase64, "base64").toString("binary");

  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

/**
 * Convert hex string to Uint8Array
 * @param hex Hex string (with or without 0x prefix)
 * @returns Uint8Array
 */
export function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
  const bytes = new Uint8Array(cleanHex.length / 2);

  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
  }

  return bytes;
}

/**
 * Convert Uint8Array to hex string
 * @param bytes Uint8Array
 * @param prefix Whether to add 0x prefix
 * @returns Hex string
 */
export function bytesToHex(bytes: Uint8Array, prefix = true): string {
  const hex = Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return prefix ? `0x${hex}` : hex;
}

/**
 * Create a delay promise
 * @param ms Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 * @param fn Function to retry
 * @param maxRetries Maximum number of retries
 * @param initialDelayMs Initial delay in milliseconds
 * @returns Result of the function
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelayMs = 1000,
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries) {
        const delayMs = initialDelayMs * Math.pow(2, attempt);
        await delay(delayMs);
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}
