// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class XApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Create a tweet
   */
  async createTweet(body: Types.CreateTweetRequest): Promise<Types.TweetResponse> {
    return this.client.post<Types.TweetResponse>("/tweets", body);
  }

  /**
   * Get a tweet by ID
   */
  async getTweet(id: string, params?: { tweet_fields?: string; expansions?: string }): Promise<Types.TweetResponse> {
    return this.client.get<Types.TweetResponse>(`/tweets/${id}`, {
      "tweet.fields": params?.tweet_fields,
      "expansions": params?.expansions,
    });
  }

  /**
   * Delete a tweet
   */
  async deleteTweet(id: string): Promise<Types.DeleteTweetResponse> {
    return this.client.delete<Types.DeleteTweetResponse>(`/tweets/${id}`);
  }

  /**
   * Get authenticated user
   */
  async getMe(params?: { user_fields?: string }): Promise<Types.UserResponse> {
    return this.client.get<Types.UserResponse>("/users/me", {
      "user.fields": params?.user_fields,
    });
  }

  /**
   * Get user by ID
   */
  async getUser(id: string, params?: { user_fields?: string }): Promise<Types.UserResponse> {
    return this.client.get<Types.UserResponse>(`/users/${id}`, {
      "user.fields": params?.user_fields,
    });
  }

  /**
   * Get user by username
   */
  async getUserByUsername(username: string, params?: { user_fields?: string }): Promise<Types.UserResponse> {
    return this.client.get<Types.UserResponse>(`/users/by/username/${username}`, {
      "user.fields": params?.user_fields,
    });
  }

  /**
   * Get tweets by user ID
   */
  async getUserTweets(id: string, params?: { max_results?: number; pagination_token?: string; tweet_fields?: string }): Promise<Types.TweetsResponse> {
    return this.client.get<Types.TweetsResponse>(`/users/${id}/tweets`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
      "tweet.fields": params?.tweet_fields,
    });
  }

  /**
   * Get followers of a user
   */
  async getFollowers(id: string, params?: { max_results?: number; pagination_token?: string }): Promise<Types.UsersResponse> {
    return this.client.get<Types.UsersResponse>(`/users/${id}/followers`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Get users that a user is following
   */
  async getFollowing(id: string, params?: { max_results?: number; pagination_token?: string }): Promise<Types.UsersResponse> {
    return this.client.get<Types.UsersResponse>(`/users/${id}/following`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Follow a user
   */
  async followUser(id: string, body: Types.FollowRequest): Promise<Types.FollowResponse> {
    return this.client.post<Types.FollowResponse>(`/users/${id}/following`, body);
  }

  /**
   * Get tweets liked by a user
   */
  async getLikedTweets(id: string, params?: { max_results?: number; pagination_token?: string }): Promise<Types.TweetsResponse> {
    return this.client.get<Types.TweetsResponse>(`/users/${id}/liked_tweets`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Like a tweet
   */
  async likeTweet(id: string, body: Types.LikeTweetRequest): Promise<Types.LikeResponse> {
    return this.client.post<Types.LikeResponse>(`/users/${id}/likes`, body);
  }

  /**
   * Retweet a tweet
   */
  async retweet(id: string, body: Types.RetweetRequest): Promise<Types.RetweetResponse> {
    return this.client.post<Types.RetweetResponse>(`/users/${id}/retweets`, body);
  }

  /**
   * Unlike a tweet
   */
  async unlikeTweet(source_user_id: string, tweet_id: string): Promise<Types.UnlikeResponse> {
    return this.client.delete<Types.UnlikeResponse>(`/users/${source_user_id}/likes/${tweet_id}`);
  }

  /**
   * Remove a retweet
   */
  async unretweet(source_user_id: string, tweet_id: string): Promise<Types.UnretweetResponse> {
    return this.client.delete<Types.UnretweetResponse>(`/users/${source_user_id}/retweets/${tweet_id}`);
  }

  /**
   * Unfollow a user
   */
  async unfollowUser(source_user_id: string, target_user_id: string): Promise<Types.UnfollowResponse> {
    return this.client.delete<Types.UnfollowResponse>(`/users/${source_user_id}/following/${target_user_id}`);
  }

  /**
   * Get bookmarked tweets
   */
  async getBookmarks(id: string, params?: { max_results?: number; pagination_token?: string }): Promise<Types.TweetsResponse> {
    return this.client.get<Types.TweetsResponse>(`/users/${id}/bookmarks`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Bookmark a tweet
   */
  async bookmarkTweet(id: string, body: Types.BookmarkRequest): Promise<Types.BookmarkResponse> {
    return this.client.post<Types.BookmarkResponse>(`/users/${id}/bookmarks`, body);
  }

  /**
   * Remove a bookmark
   */
  async removeBookmark(id: string, tweet_id: string): Promise<Types.RemoveBookmarkResponse> {
    return this.client.delete<Types.RemoveBookmarkResponse>(`/users/${id}/bookmarks/${tweet_id}`);
  }

  /**
   * Get blocked users
   */
  async getBlockedUsers(id: string, params?: { max_results?: number; pagination_token?: string }): Promise<Types.UsersResponse> {
    return this.client.get<Types.UsersResponse>(`/users/${id}/blocking`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Block a user
   */
  async blockUser(id: string, body: Types.BlockRequest): Promise<Types.BlockResponse> {
    return this.client.post<Types.BlockResponse>(`/users/${id}/blocking`, body);
  }

  /**
   * Unblock a user
   */
  async unblockUser(source_user_id: string, target_user_id: string): Promise<Types.UnblockResponse> {
    return this.client.delete<Types.UnblockResponse>(`/users/${source_user_id}/blocking/${target_user_id}`);
  }

  /**
   * Get muted users
   */
  async getMutedUsers(id: string, params?: { max_results?: number; pagination_token?: string }): Promise<Types.UsersResponse> {
    return this.client.get<Types.UsersResponse>(`/users/${id}/muting`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Mute a user
   */
  async muteUser(id: string, body: Types.MuteRequest): Promise<Types.MuteResponse> {
    return this.client.post<Types.MuteResponse>(`/users/${id}/muting`, body);
  }

  /**
   * Unmute a user
   */
  async unmuteUser(source_user_id: string, target_user_id: string): Promise<Types.UnmuteResponse> {
    return this.client.delete<Types.UnmuteResponse>(`/users/${source_user_id}/muting/${target_user_id}`);
  }

  /**
   * Get tweets mentioning a user
   */
  async getUserMentions(id: string, params?: { max_results?: number; pagination_token?: string; tweet_fields?: string }): Promise<Types.TweetsResponse> {
    return this.client.get<Types.TweetsResponse>(`/users/${id}/mentions`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
      "tweet.fields": params?.tweet_fields,
    });
  }

  /**
   * Get reverse chronological home timeline
   */
  async getHomeTimeline(id: string, params?: { max_results?: number; pagination_token?: string; tweet_fields?: string }): Promise<Types.TweetsResponse> {
    return this.client.get<Types.TweetsResponse>(`/users/${id}/timelines/reverse_chronological`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
      "tweet.fields": params?.tweet_fields,
    });
  }

  /**
   * Search for recent tweets
   */
  async searchRecentTweets(params?: { query?: string; max_results?: number; start_time?: string; end_time?: string; tweet_fields?: string }): Promise<Types.TweetsResponse> {
    return this.client.get<Types.TweetsResponse>("/tweets/search/recent", {
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
  async createList(body: Types.CreateListRequest): Promise<Types.ListResponse> {
    return this.client.post<Types.ListResponse>("/lists", body);
  }

  /**
   * Get a list by ID
   */
  async getList(id: string, params?: { list_fields?: string }): Promise<Types.ListResponse> {
    return this.client.get<Types.ListResponse>(`/lists/${id}`, {
      "list.fields": params?.list_fields,
    });
  }

  /**
   * Update a list
   */
  async updateList(id: string, body: Types.UpdateListRequest): Promise<Types.ListResponse> {
    return this.client.put<Types.ListResponse>(`/lists/${id}`, body);
  }

  /**
   * Delete a list
   */
  async deleteList(id: string): Promise<Types.DeleteListResponse> {
    return this.client.delete<Types.DeleteListResponse>(`/lists/${id}`);
  }

  /**
   * Get tweets from a list
   */
  async getListTweets(id: string, params?: { max_results?: number; pagination_token?: string }): Promise<Types.TweetsResponse> {
    return this.client.get<Types.TweetsResponse>(`/lists/${id}/tweets`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Get members of a list
   */
  async getListMembers(id: string, params?: { max_results?: number; pagination_token?: string }): Promise<Types.UsersResponse> {
    return this.client.get<Types.UsersResponse>(`/lists/${id}/members`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Add a member to a list
   */
  async addListMember(id: string, body: Types.AddListMemberRequest): Promise<Types.AddListMemberResponse> {
    return this.client.post<Types.AddListMemberResponse>(`/lists/${id}/members`, body);
  }

  /**
   * Remove a member from a list
   */
  async removeListMember(id: string, user_id: string): Promise<Types.RemoveListMemberResponse> {
    return this.client.delete<Types.RemoveListMemberResponse>(`/lists/${id}/members/${user_id}`);
  }

  /**
   * Get lists followed by a user
   */
  async getFollowedLists(id: string, params?: { max_results?: number; pagination_token?: string }): Promise<Types.ListsResponse> {
    return this.client.get<Types.ListsResponse>(`/users/${id}/followed_lists`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Follow a list
   */
  async followList(id: string, body: Types.FollowListRequest): Promise<Types.FollowListResponse> {
    return this.client.post<Types.FollowListResponse>(`/users/${id}/followed_lists`, body);
  }

  /**
   * Unfollow a list
   */
  async unfollowList(id: string, list_id: string): Promise<Types.UnfollowListResponse> {
    return this.client.delete<Types.UnfollowListResponse>(`/users/${id}/followed_lists/${list_id}`);
  }

  /**
   * Get lists owned by a user
   */
  async getOwnedLists(id: string, params?: { max_results?: number; pagination_token?: string }): Promise<Types.ListsResponse> {
    return this.client.get<Types.ListsResponse>(`/users/${id}/owned_lists`, {
      "max_results": params?.max_results,
      "pagination_token": params?.pagination_token,
    });
  }

  /**
   * Get pinned lists
   */
  async getPinnedLists(id: string): Promise<Types.ListsResponse> {
    return this.client.get<Types.ListsResponse>(`/users/${id}/pinned_lists`);
  }

  /**
   * Pin a list
   */
  async pinList(id: string, body: Types.PinListRequest): Promise<Types.PinListResponse> {
    return this.client.post<Types.PinListResponse>(`/users/${id}/pinned_lists`, body);
  }

  /**
   * Unpin a list
   */
  async unpinList(id: string, list_id: string): Promise<Types.UnpinListResponse> {
    return this.client.delete<Types.UnpinListResponse>(`/users/${id}/pinned_lists/${list_id}`);
  }

  /**
   * Get multiple spaces by IDs
   */
  async getSpaces(params?: { ids?: string; space_fields?: string }): Promise<Types.SpacesResponse> {
    return this.client.get<Types.SpacesResponse>("/spaces", {
      "ids": params?.ids,
      "space.fields": params?.space_fields,
    });
  }

  /**
   * Get a space by ID
   */
  async getSpace(id: string, params?: { space_fields?: string }): Promise<Types.SpaceResponse> {
    return this.client.get<Types.SpaceResponse>(`/spaces/${id}`, {
      "space.fields": params?.space_fields,
    });
  }

  /**
   * Get buyers of a space
   */
  async getSpaceBuyers(id: string): Promise<Types.UsersResponse> {
    return this.client.get<Types.UsersResponse>(`/spaces/${id}/buyers`);
  }

  /**
   * Search for spaces
   */
  async searchSpaces(params?: { query?: string; state?: string; max_results?: number }): Promise<Types.SpacesResponse> {
    return this.client.get<Types.SpacesResponse>("/spaces/search", {
      "query": params?.query,
      "state": params?.state,
      "max_results": params?.max_results,
    });
  }

}