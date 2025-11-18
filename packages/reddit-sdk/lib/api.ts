// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class RedditApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get authenticated user info
   */
  async getMe(): Promise<Types.User> {
    return this.client.get<Types.User>("/api/v1/me");
  }

  /**
   * Get karma breakdown by subreddit
   */
  async getMyKarma(): Promise<Types.KarmaResponse> {
    return this.client.get<Types.KarmaResponse>("/api/v1/me/karma");
  }

  /**
   * Get hot posts from subreddit
   */
  async getSubredditHot(subreddit: string, { limit?: number, after?: string, before?: string }: { limit?: number; after?: string; before?: string } = {}): Promise<Types.ListingResponse> {
    return this.client.get<Types.ListingResponse>(`/r/${subreddit}/hot`, {
      "limit": limit,
      "after": after,
      "before": before,
    });
  }

  /**
   * Get new posts from subreddit
   */
  async getSubredditNew(subreddit: string, { limit?: number, after?: string }: { limit?: number; after?: string } = {}): Promise<Types.ListingResponse> {
    return this.client.get<Types.ListingResponse>(`/r/${subreddit}/new`, {
      "limit": limit,
      "after": after,
    });
  }

  /**
   * Submit a new post
   */
  async submitPost(body: Types.SubmitPostRequest): Promise<Types.SubmitResponse> {
    return this.client.post<Types.SubmitResponse>("/api/submit", body);
  }

  /**
   * Submit a comment
   */
  async submitComment(body: Types.CommentRequest): Promise<Types.CommentResponse> {
    return this.client.post<Types.CommentResponse>("/api/comment", body);
  }

  /**
   * Vote on a post or comment
   */
  async vote(body: Types.VoteRequest): Promise<Types.VoteResponse> {
    return this.client.post<Types.VoteResponse>("/api/vote", body);
  }

  /**
   * Save a post or comment
   */
  async saveItem(body: Types.SaveRequest): Promise<Types.SaveResponse> {
    return this.client.post<Types.SaveResponse>("/api/save", body);
  }

  /**
   * Get user profile
   */
  async getUserAbout(username: string): Promise<Types.UserAboutResponse> {
    return this.client.get<Types.UserAboutResponse>(`/user/${username}/about`);
  }

  /**
   * Get subreddit info
   */
  async getSubredditAbout(subreddit: string): Promise<Types.SubredditAboutResponse> {
    return this.client.get<Types.SubredditAboutResponse>(`/r/${subreddit}/about`);
  }

  /**
   * Search for subreddits
   */
  async searchSubreddits(body: Types.SearchSubredditsRequest): Promise<Types.SearchSubredditsResponse> {
    return this.client.post<Types.SearchSubredditsResponse>("/api/search_subreddits", body);
  }

}