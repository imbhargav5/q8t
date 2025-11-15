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
  async getTweet(id: string, { tweet_fields?: string, expansions?: string }: { tweet_fields?: string; expansions?: string } = {}): Promise<Types.TweetResponse> {
    return this.client.get<Types.TweetResponse>(`/tweets/${id}`, {
      "tweet.fields": tweet_fields,
      "expansions": expansions,
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
  async getMe({ user_fields?: string }: { user_fields?: string } = {}): Promise<Types.UserResponse> {
    return this.client.get<Types.UserResponse>("/users/me", {
      "user.fields": user_fields,
    });
  }

  /**
   * Get user by ID
   */
  async getUser(id: string, { user_fields?: string }: { user_fields?: string } = {}): Promise<Types.UserResponse> {
    return this.client.get<Types.UserResponse>(`/users/${id}`, {
      "user.fields": user_fields,
    });
  }

  /**
   * Get user by username
   */
  async getUserByUsername(username: string, { user_fields?: string }: { user_fields?: string } = {}): Promise<Types.UserResponse> {
    return this.client.get<Types.UserResponse>(`/users/by/username/${username}`, {
      "user.fields": user_fields,
    });
  }

  /**
   * Get tweets by user ID
   */
  async getUserTweets(id: string, { max_results?: number, pagination_token?: string, tweet_fields?: string }: { max_results?: number; pagination_token?: string; tweet_fields?: string } = {}): Promise<Types.TweetsResponse> {
    return this.client.get<Types.TweetsResponse>(`/users/${id}/tweets`, {
      "max_results": max_results,
      "pagination_token": pagination_token,
      "tweet.fields": tweet_fields,
    });
  }

  /**
   * Get followers of a user
   */
  async getFollowers(id: string, { max_results?: number, pagination_token?: string }: { max_results?: number; pagination_token?: string } = {}): Promise<Types.UsersResponse> {
    return this.client.get<Types.UsersResponse>(`/users/${id}/followers`, {
      "max_results": max_results,
      "pagination_token": pagination_token,
    });
  }

  /**
   * Get users that a user is following
   */
  async getFollowing(id: string, { max_results?: number, pagination_token?: string }: { max_results?: number; pagination_token?: string } = {}): Promise<Types.UsersResponse> {
    return this.client.get<Types.UsersResponse>(`/users/${id}/following`, {
      "max_results": max_results,
      "pagination_token": pagination_token,
    });
  }

  /**
   * Get tweets liked by a user
   */
  async getLikedTweets(id: string, { max_results?: number, pagination_token?: string }: { max_results?: number; pagination_token?: string } = {}): Promise<Types.TweetsResponse> {
    return this.client.get<Types.TweetsResponse>(`/users/${id}/liked_tweets`, {
      "max_results": max_results,
      "pagination_token": pagination_token,
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

}