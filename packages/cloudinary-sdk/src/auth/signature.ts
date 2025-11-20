import { createHash, createHmac } from "node:crypto";

export type SignatureAlgorithm = "sha1" | "sha256";

export interface SignatureParams {
  [key: string]: string | number | boolean | string[] | undefined;
}

/**
 * Generate authentication signature for Cloudinary API requests
 * @param params - Parameters to sign (excluding signature, file, cloud_name, resource_type, api_key)
 * @param apiSecret - Your Cloudinary API secret
 * @param algorithm - Hashing algorithm to use (sha1 or sha256)
 * @returns Hexadecimal signature string
 */
export function generateSignature(
  params: SignatureParams,
  apiSecret: string,
  algorithm: SignatureAlgorithm = "sha1",
): string {
  // Parameters to exclude from signature
  const excludedParams = ["signature", "file", "cloud_name", "resource_type", "api_key"];

  // Filter and sort parameters
  const filteredParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && !excludedParams.includes(key)) {
      // Convert arrays to comma-separated strings
      if (Array.isArray(value)) {
        filteredParams[key] = value.join(",");
      } else {
        filteredParams[key] = String(value);
      }
    }
  }

  // Sort parameters alphabetically by key
  const sortedKeys = Object.keys(filteredParams).sort();

  // Create the string to sign: key1=value1&key2=value2...
  const stringToSign = sortedKeys.map((key) => `${key}=${filteredParams[key]}`).join("&");

  // Append API secret
  const signatureString = stringToSign + apiSecret;

  // Generate hash
  const hash = createHash(algorithm);
  hash.update(signatureString);

  return hash.digest("hex");
}

/**
 * Add timestamp and signature to parameters
 * @param params - Parameters to sign
 * @param apiSecret - Your Cloudinary API secret
 * @param algorithm - Hashing algorithm to use
 * @returns Parameters with timestamp and signature added
 */
export function signParams(
  params: SignatureParams,
  apiSecret: string,
  algorithm: SignatureAlgorithm = "sha1",
): SignatureParams & { timestamp: number; signature: string } {
  const timestamp = Math.floor(Date.now() / 1000);
  const paramsWithTimestamp = { ...params, timestamp };
  const signature = generateSignature(paramsWithTimestamp, apiSecret, algorithm);

  return {
    ...paramsWithTimestamp,
    signature,
  };
}

/**
 * Verify a signature is valid
 * @param params - Parameters that were signed (including timestamp and signature)
 * @param apiSecret - Your Cloudinary API secret
 * @param algorithm - Hashing algorithm to use
 * @returns true if signature is valid
 */
export function verifySignature(
  params: SignatureParams & { signature: string },
  apiSecret: string,
  algorithm: SignatureAlgorithm = "sha1",
): boolean {
  const { signature: providedSignature, ...paramsToVerify } = params;
  const expectedSignature = generateSignature(paramsToVerify, apiSecret, algorithm);

  return providedSignature === expectedSignature;
}

/**
 * Check if a signature has expired (signatures valid for 1 hour)
 * @param timestamp - The timestamp from the signed parameters
 * @returns true if signature has expired
 */
export function isSignatureExpired(timestamp: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 3600;

  return now - timestamp > oneHour;
}
