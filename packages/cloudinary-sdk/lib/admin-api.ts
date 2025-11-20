// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/admin.yaml

import type { SignedHttpClient } from "../src/auth";
import type * as Types from "./types";

export class AdminApi {
  private client: SignedHttpClient;

  constructor(client: SignedHttpClient) {
    this.client = client;
  }

  /**
   * List assets
   */
  async getResources(
    resource_type: string,
    queryParams?: {
      type?: string;
      prefix?: string;
      max_results?: number;
      next_cursor?: string;
      tags?: boolean;
      context?: boolean;
      metadata?: boolean;
    },
  ): Promise<Types.ResourcesResponse> {
    return this.client.get<Types.ResourcesResponse>(`/resources/${resource_type}`, queryParams);
  }

  /**
   * Get asset details
   */
  async getResource(
    resource_type: string,
    public_id: string,
    queryParams?: { colors?: boolean; derived?: boolean; max_results?: number },
  ): Promise<Types.ResourceResponse> {
    return this.client.get<Types.ResourceResponse>(
      `/resources/${resource_type}/upload/${public_id}`,
      queryParams,
    );
  }

  /**
   * Update asset attributes
   */
  async updateResource(
    resource_type: string,
    public_id: string,
    body: Types.UpdateRequest,
  ): Promise<Types.ResourceResponse> {
    return this.client.post<Types.ResourceResponse>(
      `/resources/${resource_type}/upload/${public_id}`,
      body,
    );
  }

  /**
   * Delete multiple assets
   */
  async deleteResources(
    resource_type: string,
    queryParams?: {
      public_ids?: string[];
      prefix?: string;
      tag?: string;
      keep_original?: boolean;
      invalidate?: boolean;
      next_cursor?: string;
    },
  ): Promise<Types.DeleteResourcesResponse> {
    return this.client.delete<Types.DeleteResourcesResponse>(
      `/resources/${resource_type}/upload`,
      queryParams,
    );
  }

  /**
   * Restore deleted asset
   */
  async restoreResource(resource_type: string, public_id: string): Promise<Types.RestoreResponse> {
    return this.client.post<Types.RestoreResponse>(
      `/resources/${resource_type}/upload/${public_id}/restore`,
    );
  }

  /**
   * List transformations
   */
  async listTransformations(queryParams?: {
    max_results?: number;
    next_cursor?: string;
  }): Promise<Types.TransformationsResponse> {
    return this.client.get<Types.TransformationsResponse>("/transformations", queryParams);
  }

  /**
   * Get transformation details
   */
  async getTransformation(transformation: string): Promise<Types.Transformation> {
    return this.client.get<Types.Transformation>(`/transformations/${transformation}`);
  }

  /**
   * Delete transformation
   */
  async deleteTransformation(transformation: string): Promise<unknown> {
    return this.client.delete<unknown>(`/transformations/${transformation}`);
  }

  /**
   * List upload presets
   */
  async listUploadPresets(queryParams?: {
    max_results?: number;
    next_cursor?: string;
  }): Promise<Types.UploadPresetsResponse> {
    return this.client.get<Types.UploadPresetsResponse>("/upload_presets", queryParams);
  }

  /**
   * Create upload preset
   */
  async createUploadPreset(body: Types.UploadPresetRequest): Promise<Types.UploadPreset> {
    return this.client.post<Types.UploadPreset>("/upload_presets", body);
  }

  /**
   * Get upload preset
   */
  async getUploadPreset(name: string): Promise<Types.UploadPreset> {
    return this.client.get<Types.UploadPreset>(`/upload_presets/${name}`);
  }

  /**
   * Update upload preset
   */
  async updateUploadPreset(
    name: string,
    body: Types.UploadPresetRequest,
  ): Promise<Types.UploadPreset> {
    return this.client.put<Types.UploadPreset>(`/upload_presets/${name}`, body);
  }

  /**
   * Delete upload preset
   */
  async deleteUploadPreset(name: string): Promise<unknown> {
    return this.client.delete<unknown>(`/upload_presets/${name}`);
  }

  /**
   * List tags
   */
  async listTags(
    resource_type: string,
    queryParams?: { max_results?: number; next_cursor?: string; prefix?: string },
  ): Promise<Types.TagsResponse> {
    return this.client.get<Types.TagsResponse>(`/tags/${resource_type}`, queryParams);
  }

  /**
   * List subfolders
   */
  async listSubFolders(asset_folder: string): Promise<Types.FoldersResponse> {
    return this.client.get<Types.FoldersResponse>(`/folders/${asset_folder}`);
  }

  /**
   * Delete folder
   */
  async deleteFolder(asset_folder: string): Promise<unknown> {
    return this.client.delete<unknown>(`/folders/${asset_folder}`);
  }

  /**
   * Search assets
   */
  async search(body: Types.SearchRequest): Promise<Types.SearchResponse> {
    return this.client.post<Types.SearchResponse>("/resources/search", body);
  }

  /**
   * List metadata fields
   */
  async listMetadataFields(): Promise<Types.MetadataFieldsResponse> {
    return this.client.get<Types.MetadataFieldsResponse>("/metadata_fields");
  }

  /**
   * Create metadata field
   */
  async createMetadataField(body: Types.MetadataField): Promise<Types.MetadataField> {
    return this.client.post<Types.MetadataField>("/metadata_fields", body);
  }

  /**
   * Get metadata field
   */
  async getMetadataField(field_external_id: string): Promise<Types.MetadataField> {
    return this.client.get<Types.MetadataField>(`/metadata_fields/${field_external_id}`);
  }

  /**
   * Update metadata field
   */
  async updateMetadataField(
    field_external_id: string,
    body: Types.MetadataField,
  ): Promise<Types.MetadataField> {
    return this.client.put<Types.MetadataField>(`/metadata_fields/${field_external_id}`, body);
  }

  /**
   * Delete metadata field
   */
  async deleteMetadataField(field_external_id: string): Promise<unknown> {
    return this.client.delete<unknown>(`/metadata_fields/${field_external_id}`);
  }
}
