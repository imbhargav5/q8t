// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class ThreadsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(body: unknown): Promise<Types.ShortLivedTokenResponse> {
    return this.client.post<Types.ShortLivedTokenResponse>("/oauth/access_token", body);
  }

  /**
   * Exchange short-lived for long-lived token
   */
  async exchangeToken(params?: { grant_type?: string; client_secret?: string; access_token?: string }): Promise<Types.LongLivedTokenResponse> {
    return this.client.get<Types.LongLivedTokenResponse>("/access_token", {
      "grant_type": params?.grant_type,
      "client_secret": params?.client_secret,
      "access_token": params?.access_token,
    });
  }

  /**
   * Refresh long-lived token
   */
  async refreshToken(params?: { grant_type?: string; access_token?: string }): Promise<Types.LongLivedTokenResponse> {
    return this.client.get<Types.LongLivedTokenResponse>("/refresh_access_token", {
      "grant_type": params?.grant_type,
      "access_token": params?.access_token,
    });
  }

  /**
   * Get authenticated user profile
   */
  async getMyProfile(params?: { access_token?: string; fields?: string }): Promise<Types.User> {
    return this.client.get<Types.User>("/me", {
      "access_token": params?.access_token,
      "fields": params?.fields,
    });
  }

  /**
   * Get user profile
   */
  async getUserProfile(user_id: string, params?: { access_token?: string; fields?: string }): Promise<Types.User> {
    return this.client.get<Types.User>(`/v1.0/${user_id}`, {
      "access_token": params?.access_token,
      "fields": params?.fields,
    });
  }

  /**
   * Get publishing limits
   */
  async getPublishingLimit(user_id: string, params?: { access_token?: string }): Promise<Types.PublishingLimit> {
    return this.client.get<Types.PublishingLimit>(`/v1.0/${user_id}/threads_publishing_limit`, {
      "access_token": params?.access_token,
    });
  }

  /**
   * List user threads
   */
  async listUserThreads(user_id: string, params?: { access_token?: string; fields?: string; limit?: number; before?: string; after?: string }): Promise<Types.MediaList> {
    return this.client.get<Types.MediaList>(`/v1.0/${user_id}/threads`, {
      "access_token": params?.access_token,
      "fields": params?.fields,
      "limit": params?.limit,
      "before": params?.before,
      "after": params?.after,
    });
  }

  /**
   * Create media container
   */
  async createMediaContainer(user_id: string, body: Types.CreateMediaRequest, params?: { access_token?: string }): Promise<Types.MediaContainer> {
    return this.client.post<Types.MediaContainer>(`/v1.0/${user_id}/threads`, body, {
      "access_token": params?.access_token,
    });
  }

  /**
   * Publish media container
   */
  async publishMediaContainer(user_id: string, body: Types.PublishMediaRequest, params?: { access_token?: string }): Promise<Types.PublishedMedia> {
    return this.client.post<Types.PublishedMedia>(`/v1.0/${user_id}/threads_publish`, body, {
      "access_token": params?.access_token,
    });
  }

  /**
   * Get media details
   */
  async getMedia(media_id: string, params?: { access_token?: string; fields?: string }): Promise<Types.Media> {
    return this.client.get<Types.Media>(`/v1.0/${media_id}`, {
      "access_token": params?.access_token,
      "fields": params?.fields,
    });
  }

  /**
   * Get replies to a post
   */
  async getReplies(media_id: string, params?: { access_token?: string; reverse?: boolean; limit?: number; fields?: string }): Promise<Types.MediaList> {
    return this.client.get<Types.MediaList>(`/v1.0/${media_id}/replies`, {
      "access_token": params?.access_token,
      "reverse": params?.reverse,
      "limit": params?.limit,
      "fields": params?.fields,
    });
  }

  /**
   * Get conversation thread
   */
  async getConversation(media_id: string, params?: { access_token?: string; fields?: string }): Promise<Types.MediaList> {
    return this.client.get<Types.MediaList>(`/v1.0/${media_id}/conversation`, {
      "access_token": params?.access_token,
      "fields": params?.fields,
    });
  }

  /**
   * Hide or unhide reply
   */
  async manageReply(reply_id: string, body: Types.ManageReplyRequest, params?: { access_token?: string }): Promise<Types.ManageReplyResponse> {
    return this.client.post<Types.ManageReplyResponse>(`/v1.0/${reply_id}`, body, {
      "access_token": params?.access_token,
    });
  }

  /**
   * Get media insights
   */
  async getMediaInsights(media_id: string, params?: { access_token?: string; metric?: string }): Promise<Types.MediaInsightsList> {
    return this.client.get<Types.MediaInsightsList>(`/v1.0/${media_id}/insights`, {
      "access_token": params?.access_token,
      "metric": params?.metric,
    });
  }

  /**
   * Get user-level insights
   */
  async getUserInsights(user_id: string, params?: { access_token?: string; metric?: string; period?: string }): Promise<Types.UserInsight> {
    return this.client.get<Types.UserInsight>(`/v1.0/${user_id}/threads_insights`, {
      "access_token": params?.access_token,
      "metric": params?.metric,
      "period": params?.period,
    });
  }

  /**
   * Search by keyword or topic tag
   */
  async searchContent(params?: { access_token?: string; q?: string; topic_tag?: string; type?: string; limit?: number }): Promise<Types.SearchResult> {
    return this.client.get<Types.SearchResult>("/keyword_search", {
      "access_token": params?.access_token,
      "q": params?.q,
      "topic_tag": params?.topic_tag,
      "type": params?.type,
      "limit": params?.limit,
    });
  }

}