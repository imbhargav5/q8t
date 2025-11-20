// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class NotionApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeOAuthToken(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>("/oauth/token", body);
  }

  /**
   * Introspect OAuth token
   */
  async introspectOAuthToken(): Promise<void> {
    return this.client.post<void>("/oauth/token/introspect");
  }

  /**
   * Revoke OAuth token
   */
  async revokeOAuthToken(body: Record<string, unknown>): Promise<void> {
    return this.client.post<void>("/oauth/token/revoke", body);
  }

  /**
   * Create a page
   */
  async createPage(body: Record<string, unknown>): Promise<Types.Page> {
    return this.client.post<Types.Page>("/pages", body);
  }

  /**
   * Retrieve a page
   */
  async retrievePage(page_id: string): Promise<Types.Page> {
    return this.client.get<Types.Page>(`/pages/${page_id}`);
  }

  /**
   * Update page properties
   */
  async updatePage(page_id: string, body: Record<string, unknown>): Promise<Types.Page> {
    return this.client.patch<Types.Page>(`/pages/${page_id}`, body);
  }

  /**
   * Retrieve a page property item
   */
  async retrievePageProperty(page_id: string, property_id: string, queryParams?: { start_cursor?: string; page_size?: number }): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>(`/pages/${page_id}/properties/${property_id}`, queryParams);
  }

  /**
   * Create a database
   */
  async createDatabase(body: Record<string, unknown>): Promise<Types.Database> {
    return this.client.post<Types.Database>("/databases", body);
  }

  /**
   * Retrieve a database
   */
  async retrieveDatabase(database_id: string): Promise<Types.Database> {
    return this.client.get<Types.Database>(`/databases/${database_id}`);
  }

  /**
   * Update a database
   */
  async updateDatabase(database_id: string, body: Record<string, unknown>): Promise<Types.Database> {
    return this.client.patch<Types.Database>(`/databases/${database_id}`, body);
  }

  /**
   * Query a database
   */
  async queryDatabase(database_id: string, body?: Record<string, unknown>): Promise<Types.PaginatedResponse & Record<string, unknown>> {
    return this.client.post<Types.PaginatedResponse & Record<string, unknown>>(`/databases/${database_id}/query`, body);
  }

  /**
   * Retrieve a block
   */
  async retrieveBlock(block_id: string): Promise<Types.Block> {
    return this.client.get<Types.Block>(`/blocks/${block_id}`);
  }

  /**
   * Delete a block
   */
  async deleteBlock(block_id: string): Promise<Types.Block> {
    return this.client.delete<Types.Block>(`/blocks/${block_id}`);
  }

  /**
   * Update a block
   */
  async updateBlock(block_id: string, body: Record<string, unknown>): Promise<Types.Block> {
    return this.client.patch<Types.Block>(`/blocks/${block_id}`, body);
  }

  /**
   * Retrieve block children
   */
  async retrieveBlockChildren(block_id: string, queryParams?: { start_cursor?: string; page_size?: number }): Promise<Types.PaginatedResponse & Record<string, unknown>> {
    return this.client.get<Types.PaginatedResponse & Record<string, unknown>>(`/blocks/${block_id}/children`, queryParams);
  }

  /**
   * Append block children
   */
  async appendBlockChildren(block_id: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.patch<Record<string, unknown>>(`/blocks/${block_id}/children`, body);
  }

  /**
   * Create a data source
   */
  async createDataSource(body: Record<string, unknown>): Promise<void> {
    return this.client.post<void>("/data_sources", body);
  }

  /**
   * Retrieve a data source
   */
  async retrieveDataSource(data_source_id: string): Promise<void> {
    return this.client.get<void>(`/data_sources/${data_source_id}`);
  }

  /**
   * Update a data source
   */
  async updateDataSource(data_source_id: string, body: Record<string, unknown>): Promise<void> {
    return this.client.patch<void>(`/data_sources/${data_source_id}`, body);
  }

  /**
   * Update data source properties
   */
  async updateDataSourceProperties(data_source_id: string, body: Record<string, unknown>): Promise<void> {
    return this.client.patch<void>(`/data_sources/${data_source_id}/properties`, body);
  }

  /**
   * Query a data source
   */
  async queryDataSource(data_source_id: string, body?: Record<string, unknown>): Promise<void> {
    return this.client.post<void>(`/data_sources/${data_source_id}/query`, body);
  }

  /**
   * List data source templates
   */
  async listDataSourceTemplates(): Promise<void> {
    return this.client.get<void>("/data_sources/templates");
  }

  /**
   * List comments
   */
  async listComments(queryParams?: { block_id: string; start_cursor?: string; page_size?: number }): Promise<Types.PaginatedResponse & Record<string, unknown>> {
    return this.client.get<Types.PaginatedResponse & Record<string, unknown>>("/comments", queryParams);
  }

  /**
   * Create a comment
   */
  async createComment(body: Record<string, unknown>): Promise<Types.Comment> {
    return this.client.post<Types.Comment>("/comments", body);
  }

  /**
   * Retrieve a comment
   */
  async retrieveComment(comment_id: string): Promise<Types.Comment> {
    return this.client.get<Types.Comment>(`/comments/${comment_id}`);
  }

  /**
   * List file uploads
   */
  async listFileUploads(queryParams?: { start_cursor?: string; page_size?: number }): Promise<void> {
    return this.client.get<void>("/files", queryParams);
  }

  /**
   * Create a file upload
   */
  async createFileUpload(body: Record<string, unknown>): Promise<void> {
    return this.client.post<void>("/files", body);
  }

  /**
   * Retrieve a file upload
   */
  async retrieveFileUpload(file_id: string): Promise<void> {
    return this.client.get<void>(`/files/${file_id}`);
  }

  /**
   * Send file data
   */
  async sendFileData(file_id: string): Promise<void> {
    return this.client.post<void>(`/files/${file_id}/send`);
  }

  /**
   * Complete file upload
   */
  async completeFileUpload(file_id: string): Promise<void> {
    return this.client.post<void>(`/files/${file_id}/complete`);
  }

  /**
   * Search by title
   */
  async search(body?: Record<string, unknown>): Promise<Types.PaginatedResponse & Record<string, unknown>> {
    return this.client.post<Types.PaginatedResponse & Record<string, unknown>>("/search", body);
  }

  /**
   * List all users
   */
  async listUsers(queryParams?: { start_cursor?: string; page_size?: number }): Promise<Types.PaginatedResponse & Record<string, unknown>> {
    return this.client.get<Types.PaginatedResponse & Record<string, unknown>>("/users", queryParams);
  }

  /**
   * Retrieve a user
   */
  async retrieveUser(user_id: string): Promise<Types.User> {
    return this.client.get<Types.User>(`/users/${user_id}`);
  }

  /**
   * Retrieve bot user
   */
  async retrieveBotUser(): Promise<Types.User> {
    return this.client.get<Types.User>("/users/me");
  }

}