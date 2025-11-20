import type { SignatureAlgorithm } from "./signature";

/**
 * Configuration for signed API requests (Upload and Admin APIs)
 */
export interface CloudinarySignedConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
  signature_algorithm?: SignatureAlgorithm;
  secure?: boolean;
}

/**
 * Configuration for unsigned uploads
 */
export interface CloudinaryUnsignedConfig {
  cloud_name: string;
  upload_preset: string;
  secure?: boolean;
}

/**
 * Configuration for Provisioning API
 */
export interface CloudinaryProvisioningConfig {
  account_id: string;
  provisioning_key: string;
  provisioning_secret: string;
}

/**
 * Get the base URL for Upload/Admin APIs
 */
export function getApiBaseUrl(cloud_name: string, secure = true): string {
  const protocol = secure ? "https" : "http";
  return `${protocol}://api.cloudinary.com/v1_1/${cloud_name}`;
}

/**
 * Get the base URL for Provisioning API
 */
export function getProvisioningBaseUrl(account_id: string): string {
  return `https://api.cloudinary.com/v1_1/provisioning/accounts/${account_id}`;
}
