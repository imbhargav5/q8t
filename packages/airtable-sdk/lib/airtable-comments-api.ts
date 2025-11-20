// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Airtable Comments API

import type { PATHttpClient } from "../src/auth/pat-client";
import type * as Types from "./types";

export class AirtableCommentsApi {
  private client: PATHttpClient;

  constructor(client: PATHttpClient) {
    this.client = client;
  }

  /**
   * List comments
   */
  async listComments(baseId: string, tableIdOrName: string, recordId: string, queryParams?: { offset?: string; pageSize?: number }): Promise<Types.CommentList> {
    const params: Record<string, string | number | boolean | string[] | undefined> = {};
    if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
    if (queryParams?.pageSize !== undefined) params["pageSize"] = queryParams.pageSize;
    return this.client.get<Types.CommentList>(`/${baseId}/${tableIdOrName}/${recordId}/comments`, params);
  }

  /**
   * Create comment
   */
  async createComment(baseId: string, tableIdOrName: string, recordId: string, body: Types.CreateCommentRequest): Promise<Types.Comment> {
    return this.client.post<Types.Comment>(`/${baseId}/${tableIdOrName}/${recordId}/comments`, body);
  }

  /**
   * Get comment
   */
  async getComment(baseId: string, tableIdOrName: string, recordId: string, commentId: string): Promise<Types.Comment> {
    return this.client.get<Types.Comment>(`/${baseId}/${tableIdOrName}/${recordId}/comments/${commentId}`);
  }

  /**
   * Delete comment
   */
  async deleteComment(baseId: string, tableIdOrName: string, recordId: string, commentId: string): Promise<void> {
    return this.client.delete<void>(`/${baseId}/${tableIdOrName}/${recordId}/comments/${commentId}`);
  }

  /**
   * Update comment
   */
  async updateComment(baseId: string, tableIdOrName: string, recordId: string, commentId: string, body: Types.UpdateCommentRequest): Promise<Types.Comment> {
    return this.client.patch<Types.Comment>(`/${baseId}/${tableIdOrName}/${recordId}/comments/${commentId}`, body);
  }

}