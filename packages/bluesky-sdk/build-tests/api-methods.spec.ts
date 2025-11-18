/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specification
 * are present in the generated BlueskyApi class.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { BlueskyApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';

describe('BlueskyApi - Method Existence', () => {
  let api: BlueskyApi;
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

    api = new BlueskyApi(mockClient);
  });

  describe('Authentication Operations', () => {
    it('should have createSession method', () => {
      expect(api.createSession).toBeDefined();
      expect(typeof api.createSession).toBe('function');
    });

    it('should have refreshSession method', () => {
      expect(api.refreshSession).toBeDefined();
      expect(typeof api.refreshSession).toBe('function');
    });
  });

  describe('Actor Operations', () => {
    it('should have getProfile method', () => {
      expect(api.getProfile).toBeDefined();
      expect(typeof api.getProfile).toBe('function');
    });

    it('should have getProfiles method', () => {
      expect(api.getProfiles).toBeDefined();
      expect(typeof api.getProfiles).toBe('function');
    });

    it('should have getPreferences method', () => {
      expect(api.getPreferences).toBeDefined();
      expect(typeof api.getPreferences).toBe('function');
    });

    it('should have putPreferences method', () => {
      expect(api.putPreferences).toBeDefined();
      expect(typeof api.putPreferences).toBe('function');
    });

    it('should have getSuggestions method', () => {
      expect(api.getSuggestions).toBeDefined();
      expect(typeof api.getSuggestions).toBe('function');
    });

    it('should have searchActors method', () => {
      expect(api.searchActors).toBeDefined();
      expect(typeof api.searchActors).toBe('function');
    });

    it('should have searchActorsTypeahead method', () => {
      expect(api.searchActorsTypeahead).toBeDefined();
      expect(typeof api.searchActorsTypeahead).toBe('function');
    });
  });

  describe('Feed Operations', () => {
    it('should have getTimeline method', () => {
      expect(api.getTimeline).toBeDefined();
      expect(typeof api.getTimeline).toBe('function');
    });

    it('should have getAuthorFeed method', () => {
      expect(api.getAuthorFeed).toBeDefined();
      expect(typeof api.getAuthorFeed).toBe('function');
    });

    it('should have getPostThread method', () => {
      expect(api.getPostThread).toBeDefined();
      expect(typeof api.getPostThread).toBe('function');
    });

    it('should have getPosts method', () => {
      expect(api.getPosts).toBeDefined();
      expect(typeof api.getPosts).toBe('function');
    });

    it('should have getActorFeeds method', () => {
      expect(api.getActorFeeds).toBeDefined();
      expect(typeof api.getActorFeeds).toBe('function');
    });

    it('should have getActorLikes method', () => {
      expect(api.getActorLikes).toBeDefined();
      expect(typeof api.getActorLikes).toBe('function');
    });

    it('should have getFeed method', () => {
      expect(api.getFeed).toBeDefined();
      expect(typeof api.getFeed).toBe('function');
    });

    it('should have getFeedGenerator method', () => {
      expect(api.getFeedGenerator).toBeDefined();
      expect(typeof api.getFeedGenerator).toBe('function');
    });

    it('should have getFeedGenerators method', () => {
      expect(api.getFeedGenerators).toBeDefined();
      expect(typeof api.getFeedGenerators).toBe('function');
    });

    it('should have getLikes method', () => {
      expect(api.getLikes).toBeDefined();
      expect(typeof api.getLikes).toBe('function');
    });

    it('should have getListFeed method', () => {
      expect(api.getListFeed).toBeDefined();
      expect(typeof api.getListFeed).toBe('function');
    });

    it('should have getRepostedBy method', () => {
      expect(api.getRepostedBy).toBeDefined();
      expect(typeof api.getRepostedBy).toBe('function');
    });

    it('should have getSuggestedFeeds method', () => {
      expect(api.getSuggestedFeeds).toBeDefined();
      expect(typeof api.getSuggestedFeeds).toBe('function');
    });

    it('should have searchPosts method', () => {
      expect(api.searchPosts).toBeDefined();
      expect(typeof api.searchPosts).toBe('function');
    });

    it('should have getQuotes method', () => {
      expect(api.getQuotes).toBeDefined();
      expect(typeof api.getQuotes).toBe('function');
    });
  });

  describe('Graph Operations', () => {
    it('should have getFollowers method', () => {
      expect(api.getFollowers).toBeDefined();
      expect(typeof api.getFollowers).toBe('function');
    });

    it('should have getFollows method', () => {
      expect(api.getFollows).toBeDefined();
      expect(typeof api.getFollows).toBe('function');
    });

    it('should have getBlocks method', () => {
      expect(api.getBlocks).toBeDefined();
      expect(typeof api.getBlocks).toBe('function');
    });

    it('should have getMutes method', () => {
      expect(api.getMutes).toBeDefined();
      expect(typeof api.getMutes).toBe('function');
    });

    it('should have muteActor method', () => {
      expect(api.muteActor).toBeDefined();
      expect(typeof api.muteActor).toBe('function');
    });

    it('should have unmuteActor method', () => {
      expect(api.unmuteActor).toBeDefined();
      expect(typeof api.unmuteActor).toBe('function');
    });

    it('should have getList method', () => {
      expect(api.getList).toBeDefined();
      expect(typeof api.getList).toBe('function');
    });

    it('should have getLists method', () => {
      expect(api.getLists).toBeDefined();
      expect(typeof api.getLists).toBe('function');
    });

    it('should have getListBlocks method', () => {
      expect(api.getListBlocks).toBeDefined();
      expect(typeof api.getListBlocks).toBe('function');
    });

    it('should have getListMutes method', () => {
      expect(api.getListMutes).toBeDefined();
      expect(typeof api.getListMutes).toBe('function');
    });
  });

  describe('Notification Operations', () => {
    it('should have listNotifications method', () => {
      expect(api.listNotifications).toBeDefined();
      expect(typeof api.listNotifications).toBe('function');
    });

    it('should have getUnreadCount method', () => {
      expect(api.getUnreadCount).toBeDefined();
      expect(typeof api.getUnreadCount).toBe('function');
    });

    it('should have updateSeen method', () => {
      expect(api.updateSeen).toBeDefined();
      expect(typeof api.updateSeen).toBe('function');
    });
  });

  describe('Record Operations', () => {
    it('should have createRecord method', () => {
      expect(api.createRecord).toBeDefined();
      expect(typeof api.createRecord).toBe('function');
    });

    it('should have deleteRecord method', () => {
      expect(api.deleteRecord).toBeDefined();
      expect(typeof api.deleteRecord).toBe('function');
    });

    it('should have getRecord method', () => {
      expect(api.getRecord).toBeDefined();
      expect(typeof api.getRecord).toBe('function');
    });

    it('should have putRecord method', () => {
      expect(api.putRecord).toBeDefined();
      expect(typeof api.putRecord).toBe('function');
    });

    it('should have listRecords method', () => {
      expect(api.listRecords).toBeDefined();
      expect(typeof api.listRecords).toBe('function');
    });
  });

  describe('Method Count Validation', () => {
    it('should have all core public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof BlueskyApi] === 'function');

      // We expect at least the core methods to be present
      expect(methods.length).toBeGreaterThanOrEqual(30);
    });

    it('should have all expected core methods', () => {
      const expectedMethods = [
        // Auth
        'createSession',
        'refreshSession',
        // Actor
        'getProfile',
        'getProfiles',
        'getPreferences',
        'putPreferences',
        'getSuggestions',
        'searchActors',
        'searchActorsTypeahead',
        // Feed
        'getTimeline',
        'getAuthorFeed',
        'getPostThread',
        'getPosts',
        'getActorFeeds',
        'getActorLikes',
        'getFeed',
        'getLikes',
        'getRepostedBy',
        'getSuggestedFeeds',
        'searchPosts',
        // Graph
        'getFollowers',
        'getFollows',
        'getBlocks',
        'getMutes',
        'muteActor',
        'unmuteActor',
        // Notifications
        'listNotifications',
        'getUnreadCount',
        'updateSeen',
        // Records
        'createRecord',
        'deleteRecord',
        'getRecord',
        'putRecord',
        'listRecords',
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor');

      for (const method of expectedMethods) {
        expect(actualMethods, `Expected method "${method}" to exist`).toContain(method);
      }
    });
  });
});
