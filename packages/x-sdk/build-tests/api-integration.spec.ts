/**
 * API Integration Test Suite
 *
 * This test suite verifies that the generated API methods correctly call
 * the HTTP client with the expected paths, methods, and parameters.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { XApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';
import type * as Types from '../lib/types';

describe('XApi - HTTP Client Integration', () => {
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
    it('createTweet should POST to /tweets with request body', async () => {
      const request: Types.CreateTweetRequest = {
        text: 'Hello, World!',
      };

      await api.createTweet(request);

      expect(mockClient.post).toHaveBeenCalledWith('/tweets', request);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('getTweet should GET from /tweets/:id with query params', async () => {
      await api.getTweet('123', { tweet_fields: 'author_id', expansions: 'author_id' });

      expect(mockClient.get).toHaveBeenCalledWith('/tweets/123', {
        'tweet.fields': 'author_id',
        'expansions': 'author_id',
      });
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('getTweet should GET from /tweets/:id without query params', async () => {
      await api.getTweet('123');

      expect(mockClient.get).toHaveBeenCalledWith('/tweets/123', {
        'tweet.fields': undefined,
        'expansions': undefined,
      });
    });

    it('deleteTweet should DELETE from /tweets/:id', async () => {
      await api.deleteTweet('123');

      expect(mockClient.delete).toHaveBeenCalledWith('/tweets/123');
      expect(mockClient.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('User Operations', () => {
    it('getMe should GET from /users/me with query params', async () => {
      await api.getMe({ user_fields: 'created_at,verified' });

      expect(mockClient.get).toHaveBeenCalledWith('/users/me', {
        'user.fields': 'created_at,verified',
      });
    });

    it('getMe should GET from /users/me without query params', async () => {
      await api.getMe();

      expect(mockClient.get).toHaveBeenCalledWith('/users/me', {
        'user.fields': undefined,
      });
    });

    it('getUser should GET from /users/:id with query params', async () => {
      await api.getUser('123', { user_fields: 'public_metrics' });

      expect(mockClient.get).toHaveBeenCalledWith('/users/123', {
        'user.fields': 'public_metrics',
      });
    });

    it('getUserByUsername should GET from /users/by/username/:username', async () => {
      await api.getUserByUsername('elonmusk', { user_fields: 'verified' });

      expect(mockClient.get).toHaveBeenCalledWith('/users/by/username/elonmusk', {
        'user.fields': 'verified',
      });
    });

    it('getUserTweets should GET from /users/:id/tweets with pagination', async () => {
      await api.getUserTweets('123', {
        max_results: 50,
        pagination_token: 'token123',
        tweet_fields: 'created_at',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/users/123/tweets', {
        'max_results': 50,
        'pagination_token': 'token123',
        'tweet.fields': 'created_at',
      });
    });
  });

  describe('Social Graph Operations', () => {
    it('getFollowers should GET from /users/:id/followers with pagination', async () => {
      await api.getFollowers('123', {
        max_results: 100,
        pagination_token: 'next_token',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/users/123/followers', {
        'max_results': 100,
        'pagination_token': 'next_token',
      });
    });

    it('getFollowing should GET from /users/:id/following with pagination', async () => {
      await api.getFollowing('123', {
        max_results: 50,
      });

      expect(mockClient.get).toHaveBeenCalledWith('/users/123/following', {
        'max_results': 50,
        'pagination_token': undefined,
      });
    });
  });

  describe('Engagement Operations', () => {
    it('getLikedTweets should GET from /users/:id/liked_tweets', async () => {
      await api.getLikedTweets('123', { max_results: 25 });

      expect(mockClient.get).toHaveBeenCalledWith('/users/123/liked_tweets', {
        'max_results': 25,
        'pagination_token': undefined,
      });
    });

    it('likeTweet should POST to /users/:id/likes', async () => {
      const request: Types.LikeTweetRequest = {
        tweet_id: '456',
      };

      await api.likeTweet('123', request);

      expect(mockClient.post).toHaveBeenCalledWith('/users/123/likes', request);
    });

    it('retweet should POST to /users/:id/retweets', async () => {
      const request: Types.RetweetRequest = {
        tweet_id: '789',
      };

      await api.retweet('123', request);

      expect(mockClient.post).toHaveBeenCalledWith('/users/123/retweets', request);
    });
  });

  describe('Path Parameter Substitution', () => {
    it('should correctly substitute single path parameter', async () => {
      await api.getTweet('tweet123');
      expect(mockClient.get).toHaveBeenCalledWith('/tweets/tweet123', expect.any(Object));
    });

    it('should correctly substitute multiple path segments', async () => {
      await api.getUserByUsername('john_doe');
      expect(mockClient.get).toHaveBeenCalledWith('/users/by/username/john_doe', expect.any(Object));
    });

    it('should correctly substitute path parameter in complex paths', async () => {
      await api.getUserTweets('user456');
      expect(mockClient.get).toHaveBeenCalledWith('/users/user456/tweets', expect.any(Object));
    });
  });

  describe('Query Parameter Handling', () => {
    it('should handle optional query parameters correctly', async () => {
      await api.getUserTweets('123', {});

      expect(mockClient.get).toHaveBeenCalledWith('/users/123/tweets', {
        'max_results': undefined,
        'pagination_token': undefined,
        'tweet.fields': undefined,
      });
    });

    it('should handle partial query parameters correctly', async () => {
      await api.getUserTweets('123', { max_results: 10 });

      expect(mockClient.get).toHaveBeenCalledWith('/users/123/tweets', {
        'max_results': 10,
        'pagination_token': undefined,
        'tweet.fields': undefined,
      });
    });

    it('should transform query parameter names with dots correctly', async () => {
      await api.getTweet('123', { tweet_fields: 'author_id' });

      const calls = vi.mocked(mockClient.get).mock.calls;
      expect(calls[0][1]).toHaveProperty('tweet.fields', 'author_id');
    });
  });
});
