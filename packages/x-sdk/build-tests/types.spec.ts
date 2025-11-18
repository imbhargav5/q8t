/**
 * Types Test Suite
 *
 * This test suite verifies that all types defined in the OpenAPI specification
 * are correctly generated and exported.
 */

import { describe, it, expect } from 'vitest';
import * as Types from '../lib/types';

describe('Generated Types', () => {
  describe('Core Entity Types', () => {
    it('should export Tweet interface', () => {
      const tweet: Types.Tweet = {
        id: '123',
        text: 'Hello, World!',
      };

      expect(tweet.id).toBe('123');
      expect(tweet.text).toBe('Hello, World!');
    });

    it('should export User interface', () => {
      const user: Types.User = {
        id: '123',
        name: 'Test User',
        username: 'testuser',
      };

      expect(user.id).toBe('123');
      expect(user.name).toBe('Test User');
      expect(user.username).toBe('testuser');
    });

    it('should export TweetPublicMetrics interface', () => {
      const metrics: Types.TweetPublicMetrics = {
        retweet_count: 10,
        reply_count: 5,
        like_count: 100,
        quote_count: 2,
      };

      expect(metrics.retweet_count).toBe(10);
      expect(metrics.like_count).toBe(100);
    });

    it('should export UserPublicMetrics interface', () => {
      const metrics: Types.UserPublicMetrics = {
        followers_count: 1000,
        following_count: 500,
        tweet_count: 250,
        listed_count: 10,
      };

      expect(metrics.followers_count).toBe(1000);
      expect(metrics.following_count).toBe(500);
    });
  });

  describe('Entity Component Types', () => {
    it('should export TweetEntities interface', () => {
      const entities: Types.TweetEntities = {
        hashtags: [],
        mentions: [],
        urls: [],
      };

      expect(Array.isArray(entities.hashtags)).toBe(true);
      expect(Array.isArray(entities.mentions)).toBe(true);
      expect(Array.isArray(entities.urls)).toBe(true);
    });

    it('should export Hashtag interface', () => {
      const hashtag: Types.Hashtag = {
        start: 0,
        end: 5,
        tag: 'test',
      };

      expect(hashtag.start).toBe(0);
      expect(hashtag.end).toBe(5);
      expect(hashtag.tag).toBe('test');
    });

    it('should export Mention interface', () => {
      const mention: Types.Mention = {
        start: 0,
        end: 10,
        username: 'testuser',
      };

      expect(mention.username).toBe('testuser');
    });

    it('should export UrlEntity interface', () => {
      const urlEntity: Types.UrlEntity = {
        start: 0,
        end: 23,
        url: 'https://t.co/abc',
        expanded_url: 'https://example.com',
        display_url: 'example.com',
      };

      expect(urlEntity.url).toBe('https://t.co/abc');
      expect(urlEntity.expanded_url).toBe('https://example.com');
    });
  });

  describe('Request Types', () => {
    it('should export CreateTweetRequest interface', () => {
      const request: Types.CreateTweetRequest = {
        text: 'Hello, World!',
      };

      expect(request.text).toBe('Hello, World!');
    });

    it('should export CreateTweetRequest with optional fields', () => {
      const request: Types.CreateTweetRequest = {
        text: 'Hello, World!',
        reply: {
          in_reply_to_tweet_id: '123',
        },
        quote_tweet_id: '456',
        poll: {
          options: ['Option 1', 'Option 2'],
          duration_minutes: 60,
        },
      };

      expect(request.reply?.in_reply_to_tweet_id).toBe('123');
      expect(request.quote_tweet_id).toBe('456');
      expect(request.poll?.options).toHaveLength(2);
    });

    it('should export LikeTweetRequest interface', () => {
      const request: Types.LikeTweetRequest = {
        tweet_id: '123',
      };

      expect(request.tweet_id).toBe('123');
    });

    it('should export RetweetRequest interface', () => {
      const request: Types.RetweetRequest = {
        tweet_id: '123',
      };

      expect(request.tweet_id).toBe('123');
    });
  });

  describe('Response Types', () => {
    it('should export TweetResponse interface', () => {
      const response: Types.TweetResponse = {
        data: {
          id: '123',
          text: 'Hello, World!',
        },
      };

      expect(response.data?.id).toBe('123');
      expect(response.data?.text).toBe('Hello, World!');
    });

    it('should export TweetsResponse interface', () => {
      const response: Types.TweetsResponse = {
        data: [
          { id: '123', text: 'Tweet 1' },
          { id: '456', text: 'Tweet 2' },
        ],
        meta: {
          result_count: 2,
          next_token: 'next',
        },
      };

      expect(response.data).toHaveLength(2);
      expect(response.meta?.result_count).toBe(2);
      expect(response.meta?.next_token).toBe('next');
    });

    it('should export UserResponse interface', () => {
      const response: Types.UserResponse = {
        data: {
          id: '123',
          name: 'Test User',
          username: 'testuser',
        },
      };

      expect(response.data?.id).toBe('123');
      expect(response.data?.name).toBe('Test User');
    });

    it('should export UsersResponse interface', () => {
      const response: Types.UsersResponse = {
        data: [
          { id: '123', name: 'User 1', username: 'user1' },
          { id: '456', name: 'User 2', username: 'user2' },
        ],
        meta: {
          result_count: 2,
        },
      };

      expect(response.data).toHaveLength(2);
      expect(response.meta?.result_count).toBe(2);
    });

    it('should export DeleteTweetResponse interface', () => {
      const response: Types.DeleteTweetResponse = {
        data: {
          deleted: true,
        },
      };

      expect(response.data?.deleted).toBe(true);
    });

    it('should export LikeResponse interface', () => {
      const response: Types.LikeResponse = {
        data: {
          liked: true,
        },
      };

      expect(response.data?.liked).toBe(true);
    });

    it('should export RetweetResponse interface', () => {
      const response: Types.RetweetResponse = {
        data: {
          retweeted: true,
        },
      };

      expect(response.data?.retweeted).toBe(true);
    });
  });

  describe('Utility Types', () => {
    it('should export PaginationMeta interface', () => {
      const meta: Types.PaginationMeta = {
        result_count: 10,
        next_token: 'next_page',
        previous_token: 'prev_page',
      };

      expect(meta.result_count).toBe(10);
      expect(meta.next_token).toBe('next_page');
      expect(meta.previous_token).toBe('prev_page');
    });
  });

  describe('Type Structure Validation', () => {
    it('should have Tweet with all required fields', () => {
      const tweet: Types.Tweet = {
        id: '123',
        text: 'Required fields',
      };

      // TypeScript compilation ensures required fields are present
      expect(tweet).toBeDefined();
    });

    it('should have User with all required fields', () => {
      const user: Types.User = {
        id: '123',
        name: 'Test',
        username: 'test',
      };

      // TypeScript compilation ensures required fields are present
      expect(user).toBeDefined();
    });

    it('should have CreateTweetRequest with required text field', () => {
      const request: Types.CreateTweetRequest = {
        text: 'Required text',
      };

      // TypeScript compilation ensures required fields are present
      expect(request).toBeDefined();
    });
  });
});
