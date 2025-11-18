/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specification
 * are present in the generated XApi class.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { XApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';

describe('XApi - Method Existence', () => {
  let api: XApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
      patch: async () => ({}),
    } as HttpClient;

    api = new XApi(mockClient);
  });

  describe('Tweet Operations', () => {
    it('should have createTweet method', () => {
      expect(api.createTweet).toBeDefined();
      expect(typeof api.createTweet).toBe('function');
    });

    it('should have getTweet method', () => {
      expect(api.getTweet).toBeDefined();
      expect(typeof api.getTweet).toBe('function');
    });

    it('should have deleteTweet method', () => {
      expect(api.deleteTweet).toBeDefined();
      expect(typeof api.deleteTweet).toBe('function');
    });
  });

  describe('User Operations', () => {
    it('should have getMe method', () => {
      expect(api.getMe).toBeDefined();
      expect(typeof api.getMe).toBe('function');
    });

    it('should have getUser method', () => {
      expect(api.getUser).toBeDefined();
      expect(typeof api.getUser).toBe('function');
    });

    it('should have getUserByUsername method', () => {
      expect(api.getUserByUsername).toBeDefined();
      expect(typeof api.getUserByUsername).toBe('function');
    });

    it('should have getUserTweets method', () => {
      expect(api.getUserTweets).toBeDefined();
      expect(typeof api.getUserTweets).toBe('function');
    });
  });

  describe('Social Graph Operations', () => {
    it('should have getFollowers method', () => {
      expect(api.getFollowers).toBeDefined();
      expect(typeof api.getFollowers).toBe('function');
    });

    it('should have getFollowing method', () => {
      expect(api.getFollowing).toBeDefined();
      expect(typeof api.getFollowing).toBe('function');
    });
  });

  describe('Engagement Operations', () => {
    it('should have getLikedTweets method', () => {
      expect(api.getLikedTweets).toBeDefined();
      expect(typeof api.getLikedTweets).toBe('function');
    });

    it('should have likeTweet method', () => {
      expect(api.likeTweet).toBeDefined();
      expect(typeof api.likeTweet).toBe('function');
    });

    it('should have retweet method', () => {
      expect(api.retweet).toBeDefined();
      expect(typeof api.retweet).toBe('function');
    });
  });

  describe('Method Count Validation', () => {
    it('should have exactly 47 public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof XApi] === 'function');

      expect(methods).toHaveLength(47);
    });

    it('should have all expected methods', () => {
      const expectedMethods = [
        'createTweet',
        'getTweet',
        'deleteTweet',
        'getMe',
        'getUser',
        'getUserByUsername',
        'getUserTweets',
        'getFollowers',
        'getFollowing',
        'getLikedTweets',
        'likeTweet',
        'retweet',
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor');

      for (const method of expectedMethods) {
        expect(actualMethods).toContain(method);
      }
    });
  });
});
