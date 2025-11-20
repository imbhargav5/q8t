// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/upload.yaml

import type { SignedHttpClient } from "../src/auth";
import type * as Types from "./types";

export class UploadApi {
  private client: SignedHttpClient;

  constructor(client: SignedHttpClient) {
    this.client = client;
  }

  /**
   * Upload a new asset
   */
  async upload(resource_type: string, body: Types.UploadRequest): Promise<Types.UploadResponse> {
    return this.client.post<Types.UploadResponse>(`/${resource_type}/upload`, body);
  }

  /**
   * Delete an asset
   */
  async destroy(resource_type: string, body: Types.DestroyRequest): Promise<Types.DestroyResponse> {
    return this.client.post<Types.DestroyResponse>(`/${resource_type}/destroy`, body);
  }

  /**
   * Apply actions to uploaded asset
   */
  async explicit(
    resource_type: string,
    body: Types.ExplicitRequest,
  ): Promise<Types.UploadResponse> {
    return this.client.post<Types.UploadResponse>(`/${resource_type}/explicit`, body);
  }

  /**
   * Rename an asset
   */
  async rename(resource_type: string, body: Types.RenameRequest): Promise<Types.UploadResponse> {
    return this.client.post<Types.UploadResponse>(`/${resource_type}/rename`, body);
  }

  /**
   * Generate pages from multi-page file
   */
  async explode(resource_type: string, body: Types.ExplodeRequest): Promise<Types.ExplodeResponse> {
    return this.client.post<Types.ExplodeResponse>(`/${resource_type}/explode`, body);
  }

  /**
   * Create archive file
   */
  async generateArchive(
    resource_type: string,
    body: Types.GenerateArchiveRequest,
  ): Promise<Types.GenerateArchiveResponse> {
    return this.client.post<Types.GenerateArchiveResponse>(
      `/${resource_type}/generate_archive`,
      body,
    );
  }

  /**
   * Manage asset tags
   */
  async manageTags(resource_type: string, body: Types.TagsRequest): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/${resource_type}/tags`, body);
  }

  /**
   * Manage asset context metadata
   */
  async manageContext(
    resource_type: string,
    body: Types.ContextRequest,
  ): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/${resource_type}/context`, body);
  }

  /**
   * Update structured metadata
   */
  async updateMetadata(
    resource_type: string,
    body: Types.MetadataRequest,
  ): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/${resource_type}/metadata`, body);
  }
}
