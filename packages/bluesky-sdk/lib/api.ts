// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class BlueskyApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Create authentication session
   */
  async createSession(body: Types.CreateSessionRequest): Promise<Types.SessionResponse> {
    return this.client.post<Types.SessionResponse>("/com.atproto.server.createSession", body);
  }

  /**
   * Refresh authentication session
   */
  async refreshSession(): Promise<Types.SessionResponse> {
    return this.client.post<Types.SessionResponse>("/com.atproto.server.refreshSession");
  }

  /**
   * Get actor profile
   */
  async getProfile({ actor: string }: { actor: string }): Promise<Types.ProfileViewDetailed> {
    return this.client.get<Types.ProfileViewDetailed>("/app.bsky.actor.getProfile", {
      "actor": actor,
    });
  }

  /**
   * Get multiple actor profiles
   */
  async getProfiles({ actors: string }: { actors: string }): Promise<Types.ProfilesResponse> {
    return this.client.get<Types.ProfilesResponse>("/app.bsky.actor.getProfiles", {
      "actors": actors,
    });
  }

  /**
   * Get authenticated user's timeline
   */
  async getTimeline({ limit?: number, cursor?: string }: { limit?: number; cursor?: string }): Promise<Types.FeedResponse> {
    return this.client.get<Types.FeedResponse>("/app.bsky.feed.getTimeline", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get feed from a specific author
   */
  async getAuthorFeed({ actor: string, limit?: number, cursor?: string }: { actor: string; limit?: number; cursor?: string }): Promise<Types.FeedResponse> {
    return this.client.get<Types.FeedResponse>("/app.bsky.feed.getAuthorFeed", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get a post thread
   */
  async getPostThread({ uri: string, depth?: number }: { uri: string; depth?: number }): Promise<Types.ThreadResponse> {
    return this.client.get<Types.ThreadResponse>("/app.bsky.feed.getPostThread", {
      "uri": uri,
      "depth": depth,
    });
  }

  /**
   * Create a record (post, like, follow, etc.)
   */
  async createRecord(body: Types.CreateRecordRequest): Promise<Types.CreateRecordResponse> {
    return this.client.post<Types.CreateRecordResponse>("/com.atproto.repo.createRecord", body);
  }

  /**
   * Delete a record
   */
  async deleteRecord(body: Types.DeleteRecordRequest): Promise<Types.DeleteRecordResponse> {
    return this.client.post<Types.DeleteRecordResponse>("/com.atproto.repo.deleteRecord", body);
  }

  /**
   * Get followers of an actor
   */
  async getFollowers({ actor: string, limit?: number, cursor?: string }: { actor: string; limit?: number; cursor?: string }): Promise<Types.FollowersResponse> {
    return this.client.get<Types.FollowersResponse>("/app.bsky.graph.getFollowers", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get accounts an actor follows
   */
  async getFollows({ actor: string, limit?: number, cursor?: string }: { actor: string; limit?: number; cursor?: string }): Promise<Types.FollowsResponse> {
    return this.client.get<Types.FollowsResponse>("/app.bsky.graph.getFollows", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get notifications for the authenticated user
   */
  async listNotifications({ limit?: number, cursor?: string }: { limit?: number; cursor?: string }): Promise<Types.NotificationsResponse> {
    return this.client.get<Types.NotificationsResponse>("/app.bsky.notification.listNotifications", {
      "limit": limit,
      "cursor": cursor,
    });
  }

}