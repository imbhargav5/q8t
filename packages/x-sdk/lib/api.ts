// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class XApi {
  constructor() {}

  /**
   * Create a tweet
   */
  createTweet(body: Types.CreateTweetRequest): Effect.Effect<Types.TweetResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.TweetResponse>("/tweets", body);
  }

  /**
   * Get a tweet by ID
   */
  getTweet(id: string, params?: { tweet_fields?: string; expansions?: string }): Effect.Effect<Types.TweetResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.TweetResponse>(`/tweets/${id}`, {
      "tweet.fields": params?.tweet_fields,
      "expansions": params?.expansions,
    });
  }

  /**
   * Delete a tweet
   */
  deleteTweet(id: string): Effect.Effect<Types.DeleteTweetResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.DeleteTweetResponse>(`/tweets/${id}`);
  }

  /**
   * Get authenticated user
   */
  getMe(params?: { user_fields?: string }): Effect.Effect<Types.UserResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.UserResponse>("/users/me", {
      "user.fields": params?.user_fields,
    });
  }

  /**
   * Get user by ID
   */
  getUser(id: string, params?: { user_fields?: string }): Effect.Effect<Types.UserResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.UserResponse>(`/users/${id}`, {
      "user.fields": params?.user_fields,
    });
  }

  /**
   * Get user by username
   */
  getUserByUsername(username: string, params?: { user_fields?: string }): Effect.Effect<Types.UserResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.UserResponse>(`/users/by/username/${username}`, {
      "user.fields": params?.user_fields,
    });
  }

  /**
   * Get tweets by user ID
   */
  getUserTweets(id: string, params?: { max_results?: number; pagination_token?: string; tweet_fields?: string }): Effect.Effect<Types.TweetsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.TweetsResponse>(`/users/${id}/tweets`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
      "tweet.fields": params?.tweet_fields,
    });
  }

  /**
   * Get followers of a user
   */
  getFollowers(id: string, params?: { max_results?: number; pagination_token?: string }): Effect.Effect<Types.UsersResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.UsersResponse>(`/users/${id}/followers`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Get users that a user is following
   */
  getFollowing(id: string, params?: { max_results?: number; pagination_token?: string }): Effect.Effect<Types.UsersResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.UsersResponse>(`/users/${id}/following`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Follow a user
   */
  followUser(id: string, body: Types.FollowRequest): Effect.Effect<Types.FollowResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.FollowResponse>(`/users/${id}/following`, body);
  }

  /**
   * Get tweets liked by a user
   */
  getLikedTweets(id: string, params?: { max_results?: number; pagination_token?: string }): Effect.Effect<Types.TweetsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.TweetsResponse>(`/users/${id}/liked_tweets`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Like a tweet
   */
  likeTweet(id: string, body: Types.LikeTweetRequest): Effect.Effect<Types.LikeResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.LikeResponse>(`/users/${id}/likes`, body);
  }

  /**
   * Retweet a tweet
   */
  retweet(id: string, body: Types.RetweetRequest): Effect.Effect<Types.RetweetResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.RetweetResponse>(`/users/${id}/retweets`, body);
  }

  /**
   * Unlike a tweet
   */
  unlikeTweet(source_user_id: string, tweet_id: string): Effect.Effect<Types.UnlikeResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.UnlikeResponse>(`/users/${source_user_id}/likes/${tweet_id}`);
  }

  /**
   * Remove a retweet
   */
  unretweet(source_user_id: string, tweet_id: string): Effect.Effect<Types.UnretweetResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.UnretweetResponse>(`/users/${source_user_id}/retweets/${tweet_id}`);
  }

  /**
   * Unfollow a user
   */
  unfollowUser(source_user_id: string, target_user_id: string): Effect.Effect<Types.UnfollowResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.UnfollowResponse>(`/users/${source_user_id}/following/${target_user_id}`);
  }

  /**
   * Get bookmarked tweets
   */
  getBookmarks(id: string, params?: { max_results?: number; pagination_token?: string }): Effect.Effect<Types.TweetsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.TweetsResponse>(`/users/${id}/bookmarks`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Bookmark a tweet
   */
  bookmarkTweet(id: string, body: Types.BookmarkRequest): Effect.Effect<Types.BookmarkResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.BookmarkResponse>(`/users/${id}/bookmarks`, body);
  }

  /**
   * Remove a bookmark
   */
  removeBookmark(id: string, tweet_id: string): Effect.Effect<Types.RemoveBookmarkResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.RemoveBookmarkResponse>(`/users/${id}/bookmarks/${tweet_id}`);
  }

  /**
   * Get blocked users
   */
  getBlockedUsers(id: string, params?: { max_results?: number; pagination_token?: string }): Effect.Effect<Types.UsersResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.UsersResponse>(`/users/${id}/blocking`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Block a user
   */
  blockUser(id: string, body: Types.BlockRequest): Effect.Effect<Types.BlockResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.BlockResponse>(`/users/${id}/blocking`, body);
  }

  /**
   * Unblock a user
   */
  unblockUser(source_user_id: string, target_user_id: string): Effect.Effect<Types.UnblockResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.UnblockResponse>(`/users/${source_user_id}/blocking/${target_user_id}`);
  }

  /**
   * Get muted users
   */
  getMutedUsers(id: string, params?: { max_results?: number; pagination_token?: string }): Effect.Effect<Types.UsersResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.UsersResponse>(`/users/${id}/muting`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Mute a user
   */
  muteUser(id: string, body: Types.MuteRequest): Effect.Effect<Types.MuteResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.MuteResponse>(`/users/${id}/muting`, body);
  }

  /**
   * Unmute a user
   */
  unmuteUser(source_user_id: string, target_user_id: string): Effect.Effect<Types.UnmuteResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.UnmuteResponse>(`/users/${source_user_id}/muting/${target_user_id}`);
  }

  /**
   * Get tweets mentioning a user
   */
  getUserMentions(id: string, params?: { max_results?: number; pagination_token?: string; tweet_fields?: string }): Effect.Effect<Types.TweetsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.TweetsResponse>(`/users/${id}/mentions`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
      "tweet.fields": params?.tweet_fields,
    });
  }

  /**
   * Get reverse chronological home timeline
   */
  getHomeTimeline(id: string, params?: { max_results?: number; pagination_token?: string; tweet_fields?: string }): Effect.Effect<Types.TweetsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.TweetsResponse>(`/users/${id}/timelines/reverse_chronological`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
      "tweet.fields": params?.tweet_fields,
    });
  }

  /**
   * Search for recent tweets
   */
  searchRecentTweets(params?: { query?: string; max_results?: number; start_time?: string; end_time?: string; tweet_fields?: string }): Effect.Effect<Types.TweetsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.TweetsResponse>("/tweets/search/recent", {
      "query": params?.query,
      "max_results": params?.max_results,
      "start_time": params?.start_time,
      "end_time": params?.end_time,
      "tweet.fields": params?.tweet_fields,
    });
  }

  /**
   * Create a new list
   */
  createList(body: Types.CreateListRequest): Effect.Effect<Types.ListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.ListResponse>("/lists", body);
  }

  /**
   * Get a list by ID
   */
  getList(id: string, params?: { list_fields?: string }): Effect.Effect<Types.ListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.ListResponse>(`/lists/${id}`, {
      "list.fields": params?.list_fields,
    });
  }

  /**
   * Update a list
   */
  updateList(id: string, body: Types.UpdateListRequest): Effect.Effect<Types.ListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.put<Types.ListResponse>(`/lists/${id}`, body);
  }

  /**
   * Delete a list
   */
  deleteList(id: string): Effect.Effect<Types.DeleteListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.DeleteListResponse>(`/lists/${id}`);
  }

  /**
   * Get tweets from a list
   */
  getListTweets(id: string, params?: { max_results?: number; pagination_token?: string }): Effect.Effect<Types.TweetsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.TweetsResponse>(`/lists/${id}/tweets`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Get members of a list
   */
  getListMembers(id: string, params?: { max_results?: number; pagination_token?: string }): Effect.Effect<Types.UsersResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.UsersResponse>(`/lists/${id}/members`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Add a member to a list
   */
  addListMember(id: string, body: Types.AddListMemberRequest): Effect.Effect<Types.AddListMemberResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.AddListMemberResponse>(`/lists/${id}/members`, body);
  }

  /**
   * Remove a member from a list
   */
  removeListMember(id: string, user_id: string): Effect.Effect<Types.RemoveListMemberResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.RemoveListMemberResponse>(`/lists/${id}/members/${user_id}`);
  }

  /**
   * Get lists followed by a user
   */
  getFollowedLists(id: string, params?: { max_results?: number; pagination_token?: string }): Effect.Effect<Types.ListsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.ListsResponse>(`/users/${id}/followed_lists`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Follow a list
   */
  followList(id: string, body: Types.FollowListRequest): Effect.Effect<Types.FollowListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.FollowListResponse>(`/users/${id}/followed_lists`, body);
  }

  /**
   * Unfollow a list
   */
  unfollowList(id: string, list_id: string): Effect.Effect<Types.UnfollowListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.UnfollowListResponse>(`/users/${id}/followed_lists/${list_id}`);
  }

  /**
   * Get lists owned by a user
   */
  getOwnedLists(id: string, params?: { max_results?: number; pagination_token?: string }): Effect.Effect<Types.ListsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.ListsResponse>(`/users/${id}/owned_lists`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Get pinned lists
   */
  getPinnedLists(id: string): Effect.Effect<Types.ListsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.ListsResponse>(`/users/${id}/pinned_lists`);
  }

  /**
   * Pin a list
   */
  pinList(id: string, body: Types.PinListRequest): Effect.Effect<Types.PinListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.PinListResponse>(`/users/${id}/pinned_lists`, body);
  }

  /**
   * Unpin a list
   */
  unpinList(id: string, list_id: string): Effect.Effect<Types.UnpinListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.UnpinListResponse>(`/users/${id}/pinned_lists/${list_id}`);
  }

  /**
   * Get multiple spaces by IDs
   */
  getSpaces(params?: { ids?: string; space_fields?: string }): Effect.Effect<Types.SpacesResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.SpacesResponse>("/spaces", {
      "ids": params?.ids,
      "space.fields": params?.space_fields,
    });
  }

  /**
   * Get a space by ID
   */
  getSpace(id: string, params?: { space_fields?: string }): Effect.Effect<Types.SpaceResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.SpaceResponse>(`/spaces/${id}`, {
      "space.fields": params?.space_fields,
    });
  }

  /**
   * Get buyers of a space
   */
  getSpaceBuyers(id: string): Effect.Effect<Types.UsersResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.UsersResponse>(`/spaces/${id}/buyers`);
  }

  /**
   * Search for spaces
   */
  searchSpaces(params?: { query?: string; state?: string; max_results?: number }): Effect.Effect<Types.SpacesResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.SpacesResponse>("/spaces/search", {
      "query": params?.query,
      "state": params?.state,
      "max_results": params?.max_results,
    });
  }

}