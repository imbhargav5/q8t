/**
 * API Method Signatures Test Suite
 *
 * This test suite verifies that all API methods have the correct signatures
 * as defined in the OpenAPI specification.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { XApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';
import type * as Types from '../lib/types';

describe('XApi - Method Signatures', () => {
  let api: XApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
    } as unknown as HttpClient;

    api = new XApi(mockClient);
  });

  describe('Tweet Operations', () => {
    it('createTweet should accept CreateTweetRequest and return Promise<TweetResponse>', async () => {
      const request: Types.CreateTweetRequest = {
        text: 'Hello, World!',
      };

      const result = api.createTweet(request);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('getTweet should accept id and optional fields, return Promise<TweetResponse>', async () => {
      const result1 = api.getTweet('123');
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getTweet('123', { tweet_fields: 'author_id', expansions: 'author_id' });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('deleteTweet should accept id and return Promise<DeleteTweetResponse>', async () => {
      const result = api.deleteTweet('123');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('User Operations', () => {
    it('getMe should accept optional user fields and return Promise<UserResponse>', async () => {
      const result1 = api.getMe();
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getMe({ user_fields: 'created_at,description' });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('getUser should accept id and optional fields, return Promise<UserResponse>', async () => {
      const result1 = api.getUser('123');
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getUser('123', { user_fields: 'verified' });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('getUserByUsername should accept username and optional fields, return Promise<UserResponse>', async () => {
      const result1 = api.getUserByUsername('elonmusk');
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getUserByUsername('elonmusk', { user_fields: 'public_metrics' });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('getUserTweets should accept id and optional parameters, return Promise<TweetsResponse>', async () => {
      const result1 = api.getUserTweets('123');
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getUserTweets('123', {
        max_results: 10,
        pagination_token: 'token',
        tweet_fields: 'created_at',
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });
  });

  describe('Social Graph Operations', () => {
    it('getFollowers should accept id and optional pagination, return Promise<UsersResponse>', async () => {
      const result1 = api.getFollowers('123');
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getFollowers('123', {
        max_results: 100,
        pagination_token: 'token',
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('getFollowing should accept id and optional pagination, return Promise<UsersResponse>', async () => {
      const result1 = api.getFollowing('123');
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getFollowing('123', {
        max_results: 50,
        pagination_token: 'next_token',
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });
  });

  describe('Engagement Operations', () => {
    it('getLikedTweets should accept id and optional pagination, return Promise<TweetsResponse>', async () => {
      const result1 = api.getLikedTweets('123');
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getLikedTweets('123', {
        max_results: 25,
        pagination_token: 'token',
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('likeTweet should accept id and LikeTweetRequest, return Promise<LikeResponse>', async () => {
      const request: Types.LikeTweetRequest = {
        tweet_id: '456',
      };

      const result = api.likeTweet('123', request);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('retweet should accept id and RetweetRequest, return Promise<RetweetResponse>', async () => {
      const request: Types.RetweetRequest = {
        tweet_id: '456',
      };

      const result = api.retweet('123', request);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });
});
