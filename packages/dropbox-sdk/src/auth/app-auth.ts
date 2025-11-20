import type { DropboxAppAuthConfig } from "./config";

/**
 * Create Basic Auth header for app authentication
 * Dropbox uses HTTP Basic Auth with app key as username and app secret as password
 */
export function createAppAuthHeader(config: DropboxAppAuthConfig): string {
  const credentials = `${config.appKey}:${config.appSecret}`;
  const encoded = Buffer.from(credentials).toString("base64");
  return `Basic ${encoded}`;
}

/**
 * Validate app authentication configuration
 */
export function validateAppAuthConfig(config: DropboxAppAuthConfig): void {
  if (!config.appKey || config.appKey.trim() === "") {
    throw new Error("App key is required for app authentication");
  }
  if (!config.appSecret || config.appSecret.trim() === "") {
    throw new Error("App secret is required for app authentication");
  }
}
