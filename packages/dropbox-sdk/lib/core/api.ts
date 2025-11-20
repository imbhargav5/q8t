// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Dropbox Core API

import type * as Types from "./types";

export interface HttpClient {
  get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T>;
  post<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
  put<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
  delete<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
}

export class DropboxCoreApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List folder contents
   */
  async listFolder(body: {
    path: string;
    recursive?: boolean;
    include_deleted?: boolean;
    include_has_explicit_shared_members?: boolean;
    include_mounted_folders?: boolean;
    include_non_downloadable_files?: boolean;
  }): Promise<Types.ListFolderResult> {
    return this.client.post<Types.ListFolderResult>("/files/list_folder", body);
  }

  /**
   * Continue listing folder
   */
  async listFolderContinue(body: { cursor: string }): Promise<Types.ListFolderResult> {
    return this.client.post<Types.ListFolderResult>("/files/list_folder/continue", body);
  }

  /**
   * Get file or folder metadata
   */
  async getMetadata(body: {
    path: string;
    include_deleted?: boolean;
    include_has_explicit_shared_members?: boolean;
  }): Promise<unknown> {
    return this.client.post<unknown>("/files/get_metadata", body);
  }

  /**
   * Create a folder
   */
  async createFolderV2(body: { path: string; autorename?: boolean }): Promise<{
    metadata?: Types.FolderMetadata;
  }> {
    return this.client.post<{ metadata?: Types.FolderMetadata }>("/files/create_folder_v2", body);
  }

  /**
   * Delete a file or folder
   */
  async deleteV2(body: { path: string }): Promise<{ metadata?: unknown }> {
    return this.client.post<{ metadata?: unknown }>("/files/delete_v2", body);
  }

  /**
   * Copy a file or folder
   */
  async copyV2(body: {
    from_path: string;
    to_path: string;
    allow_shared_folder?: boolean;
    autorename?: boolean;
    allow_ownership_transfer?: boolean;
  }): Promise<{ metadata?: unknown }> {
    return this.client.post<{ metadata?: unknown }>("/files/copy_v2", body);
  }

  /**
   * Move a file or folder
   */
  async moveV2(body: {
    from_path: string;
    to_path: string;
    allow_shared_folder?: boolean;
    autorename?: boolean;
    allow_ownership_transfer?: boolean;
  }): Promise<{ metadata?: unknown }> {
    return this.client.post<{ metadata?: unknown }>("/files/move_v2", body);
  }

  /**
   * Search for files and folders
   */
  async searchV2(body: { query: string; options?: unknown }): Promise<Types.SearchResult> {
    return this.client.post<Types.SearchResult>("/files/search_v2", body);
  }

  /**
   * Get current account info
   */
  async getCurrentAccount(): Promise<Types.FullAccount> {
    return this.client.post<Types.FullAccount>("/users/get_current_account");
  }

  /**
   * Get space usage
   */
  async getSpaceUsage(): Promise<Types.SpaceUsage> {
    return this.client.post<Types.SpaceUsage>("/users/get_space_usage");
  }

  /**
   * Create a shared link
   */
  async createSharedLinkWithSettings(body: {
    path: string;
    settings?: Types.CreateSharedLinkSettings;
  }): Promise<Types.SharedLinkMetadata> {
    return this.client.post<Types.SharedLinkMetadata>(
      "/sharing/create_shared_link_with_settings",
      body,
    );
  }

  /**
   * List shared links
   */
  async listSharedLinks(body: { path?: string; cursor?: string; direct_only?: boolean }): Promise<{
    links?: Types.SharedLinkMetadata[];
    has_more?: boolean;
    cursor?: string;
  }> {
    return this.client.post<{
      links?: Types.SharedLinkMetadata[];
      has_more?: boolean;
      cursor?: string;
    }>("/sharing/list_shared_links", body);
  }

  /**
   * Revoke a shared link
   */
  async revokeSharedLink(body: { url: string }): Promise<void> {
    return this.client.post<void>("/sharing/revoke_shared_link", body);
  }

  /**
   * List file requests
   */
  async listFileRequestsV2(body: { limit?: number }): Promise<{
    file_requests?: Types.FileRequest[];
  }> {
    return this.client.post<{ file_requests?: Types.FileRequest[] }>(
      "/file_requests/list_v2",
      body,
    );
  }

  /**
   * Create a file request
   */
  async createFileRequest(body: {
    title: string;
    destination: string;
    deadline?: unknown;
    open?: boolean;
  }): Promise<Types.FileRequest> {
    return this.client.post<Types.FileRequest>("/file_requests/create", body);
  }

  /**
   * Get a file request
   */
  async getFileRequest(body: { id: string }): Promise<Types.FileRequest> {
    return this.client.post<Types.FileRequest>("/file_requests/get", body);
  }
}
