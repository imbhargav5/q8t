// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class RedditApi {
  constructor() {}

  /**
   * Get authenticated user info
   */
  getMe(): Effect.Effect<Types.User, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.User>("/api/v1/me");
  }

  /**
   * Get karma breakdown by subreddit
   */
  getMyKarma(): Effect.Effect<Types.KarmaResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.KarmaResponse>("/api/v1/me/karma");
  }

  /**
   * Get hot posts from subreddit
   */
  getSubredditHot(subreddit: string, { limit, after, before }: { limit?: number; after?: string; before?: string } = {}): Effect.Effect<Types.ListingResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.ListingResponse>(`/r/${subreddit}/hot`, {
      "limit": limit,
      "after": after,
      "before": before,
    });
  }

  /**
   * Get new posts from subreddit
   */
  getSubredditNew(subreddit: string, { limit, after }: { limit?: number; after?: string } = {}): Effect.Effect<Types.ListingResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.ListingResponse>(`/r/${subreddit}/new`, {
      "limit": limit,
      "after": after,
    });
  }

  /**
   * Submit a new post
   */
  submitPost(body: Types.SubmitPostRequest): Effect.Effect<Types.SubmitResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SubmitResponse>("/api/submit", body);
  }

  /**
   * Submit a comment
   */
  submitComment(body: Types.CommentRequest): Effect.Effect<Types.CommentResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.CommentResponse>("/api/comment", body);
  }

  /**
   * Vote on a post or comment
   */
  vote(body: Types.VoteRequest): Effect.Effect<Types.VoteResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.VoteResponse>("/api/vote", body);
  }

  /**
   * Save a post or comment
   */
  saveItem(body: Types.SaveRequest): Effect.Effect<Types.SaveResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SaveResponse>("/api/save", body);
  }

  /**
   * Get user profile
   */
  getUserAbout(username: string): Effect.Effect<Types.UserAboutResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.UserAboutResponse>(`/user/${username}/about`);
  }

  /**
   * Get subreddit info
   */
  getSubredditAbout(subreddit: string): Effect.Effect<Types.SubredditAboutResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SubredditAboutResponse>(`/r/${subreddit}/about`);
  }

  /**
   * Search for subreddits
   */
  searchSubreddits(body: Types.SearchSubredditsRequest): Effect.Effect<Types.SearchSubredditsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SearchSubredditsResponse>("/api/search_subreddits", body);
  }

  /**
   * Unsave a post or comment
   */
  unsaveItem(body: Types.UnsaveRequest): Effect.Effect<Types.GenericResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.GenericResponse>("/api/unsave", body);
  }

  /**
   * Hide a post
   */
  hidePost(body: Types.HideRequest): Effect.Effect<Types.GenericResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.GenericResponse>("/api/hide", body);
  }

  /**
   * Unhide a post
   */
  unhidePost(body: Types.UnhideRequest): Effect.Effect<Types.GenericResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.GenericResponse>("/api/unhide", body);
  }

  /**
   * Get info about things by fullname
   */
  getInfo({ id, url }: { id?: string; url?: string } = {}): Effect.Effect<Types.ListingResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.ListingResponse>("/api/info", {
      "id": id,
      "url": url,
    });
  }

  /**
   * Get top posts from subreddit
   */
  getSubredditTop(subreddit: string, { limit, after, before, t }: { limit?: number; after?: string; before?: string; t?: string } = {}): Effect.Effect<Types.ListingResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.ListingResponse>(`/r/${subreddit}/top`, {
      "limit": limit,
      "after": after,
      "before": before,
      "t": t,
    });
  }

  /**
   * Get rising posts from subreddit
   */
  getSubredditRising(subreddit: string, { limit, after }: { limit?: number; after?: string } = {}): Effect.Effect<Types.ListingResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.ListingResponse>(`/r/${subreddit}/rising`, {
      "limit": limit,
      "after": after,
    });
  }

  /**
   * Get controversial posts from subreddit
   */
  getSubredditControversial(subreddit: string, { limit, after, t }: { limit?: number; after?: string; t?: string } = {}): Effect.Effect<Types.ListingResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.ListingResponse>(`/r/${subreddit}/controversial`, {
      "limit": limit,
      "after": after,
      "t": t,
    });
  }

  /**
   * Edit a comment or self post
   */
  editUserText(body: Types.EditUserTextRequest): Effect.Effect<Types.GenericResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.GenericResponse>("/api/editusertext", body);
  }

  /**
   * Delete a post or comment
   */
  deleteItem(body: Types.DeleteRequest): Effect.Effect<Types.GenericResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.GenericResponse>("/api/del", body);
  }

  /**
   * Get inbox messages
   */
  getInbox({ limit, after, before }: { limit?: number; after?: string; before?: string } = {}): Effect.Effect<Types.ListingResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.ListingResponse>("/message/inbox", {
      "limit": limit,
      "after": after,
      "before": before,
    });
  }

  /**
   * Send a private message
   */
  composeMessage(body: Types.ComposeMessageRequest): Effect.Effect<Types.GenericResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.GenericResponse>("/api/compose", body);
  }

  /**
   * Get user's submitted posts
   */
  getUserSubmitted(username: string, { limit, after }: { limit?: number; after?: string } = {}): Effect.Effect<Types.ListingResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.ListingResponse>(`/user/${username}/submitted`, {
      "limit": limit,
      "after": after,
    });
  }

  /**
   * Get user's comments
   */
  getUserComments(username: string, { limit, after }: { limit?: number; after?: string } = {}): Effect.Effect<Types.ListingResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.ListingResponse>(`/user/${username}/comments`, {
      "limit": limit,
      "after": after,
    });
  }

  /**
   * Get comments for a post
   */
  getComments(article: string, { limit, depth, context }: { limit?: number; depth?: number; context?: number } = {}): Effect.Effect<unknown, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<unknown>(`/comments/${article}`, {
      "limit": limit,
      "depth": depth,
      "context": context,
    });
  }

  /**
   * Get more children comments
   */
  getMoreChildren({ link_id, children }: { link_id?: string; children?: string } = {}): Effect.Effect<Types.MoreChildrenResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.MoreChildrenResponse>("/api/morechildren", {
      "link_id": link_id,
      "children": children,
    });
  }

}