/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specification
 * are present in the generated RedditApi class.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { RedditApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';

describe('RedditApi - Method Existence', () => {
  let api: RedditApi;
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

    api = new RedditApi(mockClient);
  });

  describe('Account Operations', () => {
    it('should have getMe method', () => {
      expect(api.getMe).toBeDefined();
      expect(typeof api.getMe).toBe('function');
    });

    it('should have getMyKarma method', () => {
      expect(api.getMyKarma).toBeDefined();
      expect(typeof api.getMyKarma).toBe('function');
    });
  });

  describe('Subreddit Listing Operations', () => {
    it('should have getSubredditHot method', () => {
      expect(api.getSubredditHot).toBeDefined();
      expect(typeof api.getSubredditHot).toBe('function');
    });

    it('should have getSubredditNew method', () => {
      expect(api.getSubredditNew).toBeDefined();
      expect(typeof api.getSubredditNew).toBe('function');
    });
  });

  describe('Post Operations', () => {
    it('should have submitPost method', () => {
      expect(api.submitPost).toBeDefined();
      expect(typeof api.submitPost).toBe('function');
    });
  });

  describe('Comment Operations', () => {
    it('should have submitComment method', () => {
      expect(api.submitComment).toBeDefined();
      expect(typeof api.submitComment).toBe('function');
    });
  });

  describe('Voting Operations', () => {
    it('should have vote method', () => {
      expect(api.vote).toBeDefined();
      expect(typeof api.vote).toBe('function');
    });
  });

  describe('Save Operations', () => {
    it('should have saveItem method', () => {
      expect(api.saveItem).toBeDefined();
      expect(typeof api.saveItem).toBe('function');
    });
  });

  describe('User Operations', () => {
    it('should have getUserAbout method', () => {
      expect(api.getUserAbout).toBeDefined();
      expect(typeof api.getUserAbout).toBe('function');
    });
  });

  describe('Subreddit Info Operations', () => {
    it('should have getSubredditAbout method', () => {
      expect(api.getSubredditAbout).toBeDefined();
      expect(typeof api.getSubredditAbout).toBe('function');
    });
  });

  describe('Search Operations', () => {
    it('should have searchSubreddits method', () => {
      expect(api.searchSubreddits).toBeDefined();
      expect(typeof api.searchSubreddits).toBe('function');
    });
  });

  describe('New Methods - Save/Hide Operations', () => {
    it('should have unsaveItem method', () => {
      expect(api.unsaveItem).toBeDefined();
      expect(typeof api.unsaveItem).toBe('function');
    });

    it('should have hidePost method', () => {
      expect(api.hidePost).toBeDefined();
      expect(typeof api.hidePost).toBe('function');
    });

    it('should have unhidePost method', () => {
      expect(api.unhidePost).toBeDefined();
      expect(typeof api.unhidePost).toBe('function');
    });
  });

  describe('New Methods - Info and Listing Operations', () => {
    it('should have getInfo method', () => {
      expect(api.getInfo).toBeDefined();
      expect(typeof api.getInfo).toBe('function');
    });

    it('should have getSubredditTop method', () => {
      expect(api.getSubredditTop).toBeDefined();
      expect(typeof api.getSubredditTop).toBe('function');
    });

    it('should have getSubredditRising method', () => {
      expect(api.getSubredditRising).toBeDefined();
      expect(typeof api.getSubredditRising).toBe('function');
    });

    it('should have getSubredditControversial method', () => {
      expect(api.getSubredditControversial).toBeDefined();
      expect(typeof api.getSubredditControversial).toBe('function');
    });
  });

  describe('New Methods - Edit and Delete Operations', () => {
    it('should have editUserText method', () => {
      expect(api.editUserText).toBeDefined();
      expect(typeof api.editUserText).toBe('function');
    });

    it('should have deleteItem method', () => {
      expect(api.deleteItem).toBeDefined();
      expect(typeof api.deleteItem).toBe('function');
    });
  });

  describe('New Methods - Messaging Operations', () => {
    it('should have getInbox method', () => {
      expect(api.getInbox).toBeDefined();
      expect(typeof api.getInbox).toBe('function');
    });

    it('should have composeMessage method', () => {
      expect(api.composeMessage).toBeDefined();
      expect(typeof api.composeMessage).toBe('function');
    });
  });

  describe('New Methods - User Content Operations', () => {
    it('should have getUserSubmitted method', () => {
      expect(api.getUserSubmitted).toBeDefined();
      expect(typeof api.getUserSubmitted).toBe('function');
    });

    it('should have getUserComments method', () => {
      expect(api.getUserComments).toBeDefined();
      expect(typeof api.getUserComments).toBe('function');
    });
  });

  describe('New Methods - Comment Operations', () => {
    it('should have getComments method', () => {
      expect(api.getComments).toBeDefined();
      expect(typeof api.getComments).toBe('function');
    });

    it('should have getMoreChildren method', () => {
      expect(api.getMoreChildren).toBeDefined();
      expect(typeof api.getMoreChildren).toBe('function');
    });
  });

  describe('Method Count Validation', () => {
    it('should have exactly 26 public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof RedditApi] === 'function');

      expect(methods).toHaveLength(26);
    });

    it('should have all expected methods', () => {
      const expectedMethods = [
        'getMe',
        'getMyKarma',
        'getSubredditHot',
        'getSubredditNew',
        'submitPost',
        'submitComment',
        'vote',
        'saveItem',
        'getUserAbout',
        'getSubredditAbout',
        'searchSubreddits',
        'unsaveItem',
        'hidePost',
        'unhidePost',
        'getInfo',
        'getSubredditTop',
        'getSubredditRising',
        'getSubredditControversial',
        'editUserText',
        'deleteItem',
        'getInbox',
        'composeMessage',
        'getUserSubmitted',
        'getUserComments',
        'getComments',
        'getMoreChildren',
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor');

      for (const method of expectedMethods) {
        expect(actualMethods).toContain(method);
      }
    });
  });
});
