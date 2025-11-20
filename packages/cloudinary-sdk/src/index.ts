// Main entry point for @q8t/cloudinary-sdk

// Re-export authentication utilities and configurations
export * from "./auth";

// Re-export generated APIs and types
export * from "../lib";

import {
  type CloudinaryProvisioningConfig,
  type CloudinarySignedConfig,
  type CloudinaryUnsignedConfig,
  ProvisioningHttpClient,
  SignedHttpClient,
  UnsignedHttpClient,
} from "./auth";

import { AdminApi } from "../lib/admin-api";
import { ProvisioningApi } from "../lib/provisioning-api";
import { UnsignedUploadApi } from "../lib/unsigned-upload-api";
import { UploadApi } from "../lib/upload-api";

/**
 * Client for signed Cloudinary API requests (Upload and Admin APIs)
 */
export interface SignedCloudinaryClient {
  upload: UploadApi;
  admin: AdminApi;
}

/**
 * Client for unsigned Cloudinary uploads
 */
export interface UnsignedCloudinaryClient {
  upload: UnsignedUploadApi;
}

/**
 * Client for Cloudinary Provisioning API (Enterprise only)
 */
export interface ProvisioningCloudinaryClient {
  users: ProvisioningApi;
  userGroups: ProvisioningApi;
  subAccounts: ProvisioningApi;
  accessKeys: ProvisioningApi;
}

/**
 * Main Cloudinary SDK namespace with factory methods
 */
export namespace CloudinarySDK {
  /**
   * Create a signed client for Upload and Admin APIs
   *
   * @param config - Configuration with cloud_name, api_key, and api_secret
   * @returns Client with upload and admin API access
   *
   * @example
   * ```typescript
   * const client = CloudinarySDK.createSignedClient({
   *   cloud_name: 'your-cloud-name',
   *   api_key: 'your-api-key',
   *   api_secret: 'your-api-secret',
   *   signature_algorithm: 'sha256' // optional, defaults to sha1
   * });
   *
   * // Upload an asset
   * const result = await client.upload.upload('image', {
   *   file: 'https://example.com/image.jpg',
   *   public_id: 'my-image'
   * });
   *
   * // List resources
   * const resources = await client.admin.getResources('image');
   * ```
   */
  export function createSignedClient(config: CloudinarySignedConfig): SignedCloudinaryClient {
    const httpClient = new SignedHttpClient(config);

    return {
      upload: new UploadApi(httpClient),
      admin: new AdminApi(httpClient),
    };
  }

  /**
   * Create an unsigned client for client-side uploads
   *
   * @param config - Configuration with cloud_name and upload_preset
   * @returns Client with unsigned upload capability
   *
   * @example
   * ```typescript
   * const client = CloudinarySDK.createUnsignedClient({
   *   cloud_name: 'your-cloud-name',
   *   upload_preset: 'your-unsigned-preset'
   * });
   *
   * // Upload without signature
   * const result = await client.upload.unsignedUpload({
   *   file: 'base64-or-url',
   *   upload_preset: 'your-preset'
   * });
   * ```
   */
  export function createUnsignedClient(config: CloudinaryUnsignedConfig): UnsignedCloudinaryClient {
    const httpClient = new UnsignedHttpClient(config);

    return {
      upload: new UnsignedUploadApi(httpClient),
    };
  }

  /**
   * Create a provisioning client for Enterprise account management
   *
   * @param config - Configuration with account_id, provisioning_key, and provisioning_secret
   * @returns Client with provisioning API access
   *
   * @example
   * ```typescript
   * const client = CloudinarySDK.createProvisioningClient({
   *   account_id: 'your-account-id',
   *   provisioning_key: 'your-provisioning-key',
   *   provisioning_secret: 'your-provisioning-secret'
   * });
   *
   * // List users
   * const users = await client.users.listUsers();
   *
   * // Create sub-account
   * const subAccount = await client.subAccounts.createSubAccount({
   *   name: 'New Sub Account',
   *   cloud_name: 'new-cloud-name'
   * });
   * ```
   */
  export function createProvisioningClient(
    config: CloudinaryProvisioningConfig,
  ): ProvisioningCloudinaryClient {
    const httpClient = new ProvisioningHttpClient(config);
    const api = new ProvisioningApi(httpClient);

    return {
      users: api,
      userGroups: api,
      subAccounts: api,
      accessKeys: api,
    };
  }
}

/**
 * Default export for convenience
 */
export default CloudinarySDK;
