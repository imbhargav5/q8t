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
  async getSubredditHot(subreddit: string, { limit, after, before }: { limit?: number; after?: string; before?: string } = {}): Promise<Types.ListingResponse> {
    return this.client.get<Types.ListingResponse>(`/r/${subreddit}/hot`, {
      "limit": limit,
      "after": after,
      "before": before,
    });
  }

  /**
   * Get new posts from subreddit
   */
  async getSubredditNew(subreddit: string, { limit, after }: { limit?: number; after?: string } = {}): Promise<Types.ListingResponse> {
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

  /**
   * Unsave a post or comment
   */
  async unsaveItem(body: Types.UnsaveRequest): Promise<Types.GenericResponse> {
    return this.client.post<Types.GenericResponse>("/api/unsave", body);
  }

  /**
   * Hide a post
   */
  async hidePost(body: Types.HideRequest): Promise<Types.GenericResponse> {
    return this.client.post<Types.GenericResponse>("/api/hide", body);
  }

  /**
   * Unhide a post
   */
  async unhidePost(body: Types.UnhideRequest): Promise<Types.GenericResponse> {
    return this.client.post<Types.GenericResponse>("/api/unhide", body);
  }

  /**
   * Get info about things by fullname
   */
  async getInfo({ id, url }: { id?: string; url?: string } = {}): Promise<Types.ListingResponse> {
    return this.client.get<Types.ListingResponse>("/api/info", {
      "id": id,
      "url": url,
    });
  }

  /**
   * Get top posts from subreddit
   */
  async getSubredditTop(subreddit: string, { limit, after, before, t }: { limit?: number; after?: string; before?: string; t?: string } = {}): Promise<Types.ListingResponse> {
    return this.client.get<Types.ListingResponse>(`/r/${subreddit}/top`, {
      "limit": limit,
      "after": after,
      "before": before,
      "t": t,
    });
  }

  /**
   * Get rising posts from subreddit
   */
  async getSubredditRising(subreddit: string, { limit, after }: { limit?: number; after?: string } = {}): Promise<Types.ListingResponse> {
    return this.client.get<Types.ListingResponse>(`/r/${subreddit}/rising`, {
      "limit": limit,
      "after": after,
    });
  }

  /**
   * Get controversial posts from subreddit
   */
  async getSubredditControversial(subreddit: string, { limit, after, t }: { limit?: number; after?: string; t?: string } = {}): Promise<Types.ListingResponse> {
    return this.client.get<Types.ListingResponse>(`/r/${subreddit}/controversial`, {
      "limit": limit,
      "after": after,
      "t": t,
    });
  }

  /**
   * Edit a comment or self post
   */
  async editUserText(body: Types.EditUserTextRequest): Promise<Types.GenericResponse> {
    return this.client.post<Types.GenericResponse>("/api/editusertext", body);
  }

  /**
   * Delete a post or comment
   */
  async deleteItem(body: Types.DeleteRequest): Promise<Types.GenericResponse> {
    return this.client.post<Types.GenericResponse>("/api/del", body);
  }

  /**
   * Get inbox messages
   */
  async getInbox({ limit, after, before }: { limit?: number; after?: string; before?: string } = {}): Promise<Types.ListingResponse> {
    return this.client.get<Types.ListingResponse>("/message/inbox", {
      "limit": limit,
      "after": after,
      "before": before,
    });
  }

  /**
   * Send a private message
   */
  async composeMessage(body: Types.ComposeMessageRequest): Promise<Types.GenericResponse> {
    return this.client.post<Types.GenericResponse>("/api/compose", body);
  }

  /**
   * Get user's submitted posts
   */
  async getUserSubmitted(username: string, { limit, after }: { limit?: number; after?: string } = {}): Promise<Types.ListingResponse> {
    return this.client.get<Types.ListingResponse>(`/user/${username}/submitted`, {
      "limit": limit,
      "after": after,
    });
  }

  /**
   * Get user's comments
   */
  async getUserComments(username: string, { limit, after }: { limit?: number; after?: string } = {}): Promise<Types.ListingResponse> {
    return this.client.get<Types.ListingResponse>(`/user/${username}/comments`, {
      "limit": limit,
      "after": after,
    });
  }

  /**
   * Get comments for a post
   */
  async getComments(article: string, { limit, depth, context }: { limit?: number; depth?: number; context?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>(`/comments/${article}`, {
      "limit": limit,
      "depth": depth,
      "context": context,
    });
  }

  /**
   * Get more children comments
   */
  async getMoreChildren({ link_id, children }: { link_id?: string; children?: string } = {}): Promise<Types.MoreChildrenResponse> {
    return this.client.get<Types.MoreChildrenResponse>("/api/morechildren", {
      "link_id": link_id,
      "children": children,
    });
  }

}