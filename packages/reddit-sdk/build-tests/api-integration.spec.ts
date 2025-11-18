/**
 * API Integration Test Suite
 *
 * This test suite verifies that the generated API methods correctly call
 * the HTTP client with the expected paths, methods, and parameters.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RedditApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';
import type * as Types from '../lib/types';

describe('RedditApi - HTTP Client Integration', () => {
  let api: RedditApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
    } as unknown as HttpClient;

    api = new RedditApi(mockClient);
  });

  describe('Account Operations', () => {
    it('getMe should GET from /api/v1/me', async () => {
      await api.getMe();

      expect(mockClient.get).toHaveBeenCalledWith('/api/v1/me');
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('getMyKarma should GET from /api/v1/me/karma', async () => {
      await api.getMyKarma();

      expect(mockClient.get).toHaveBeenCalledWith('/api/v1/me/karma');
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('Subreddit Listing Operations', () => {
    it('getSubredditHot should GET from /r/:subreddit/hot with query params', async () => {
      await api.getSubredditHot('programming', {
        limit: 25,
        after: 'token123',
        before: 'token456',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/r/programming/hot', {
        limit: 25,
        after: 'token123',
        before: 'token456',
      });
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('getSubredditHot should GET from /r/:subreddit/hot without query params', async () => {
      await api.getSubredditHot('programming');

      expect(mockClient.get).toHaveBeenCalledWith('/r/programming/hot', {
        limit: undefined,
        after: undefined,
        before: undefined,
      });
    });

    it('getSubredditNew should GET from /r/:subreddit/new with query params', async () => {
      await api.getSubredditNew('javascript', {
        limit: 50,
        after: 'next_token',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/r/javascript/new', {
        limit: 50,
        after: 'next_token',
      });
    });

    it('getSubredditNew should GET from /r/:subreddit/new without query params', async () => {
      await api.getSubredditNew('javascript');

      expect(mockClient.get).toHaveBeenCalledWith('/r/javascript/new', {
        limit: undefined,
        after: undefined,
      });
    });
  });

  describe('Post Operations', () => {
    it('submitPost should POST to /api/submit with request body', async () => {
      const request: Types.SubmitPostRequest = {
        sr: 'test',
        title: 'Test Post',
        kind: 'self',
        text: 'This is a test',
      };

      await api.submitPost(request);

      expect(mockClient.post).toHaveBeenCalledWith('/api/submit', request);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('Comment Operations', () => {
    it('submitComment should POST to /api/comment with request body', async () => {
      const request: Types.CommentRequest = {
        thing_id: 't3_abc123',
        text: 'This is a comment',
      };

      await api.submitComment(request);

      expect(mockClient.post).toHaveBeenCalledWith('/api/comment', request);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('Voting Operations', () => {
    it('vote should POST to /api/vote with request body', async () => {
      const request: Types.VoteRequest = {
        id: 't3_abc123',
        dir: 1,
      };

      await api.vote(request);

      expect(mockClient.post).toHaveBeenCalledWith('/api/vote', request);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('Save Operations', () => {
    it('saveItem should POST to /api/save with request body', async () => {
      const request: Types.SaveRequest = {
        id: 't3_abc123',
        category: 'favorites',
      };

      await api.saveItem(request);

      expect(mockClient.post).toHaveBeenCalledWith('/api/save', request);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('User Operations', () => {
    it('getUserAbout should GET from /user/:username/about', async () => {
      await api.getUserAbout('spez');

      expect(mockClient.get).toHaveBeenCalledWith('/user/spez/about');
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('Subreddit Info Operations', () => {
    it('getSubredditAbout should GET from /r/:subreddit/about', async () => {
      await api.getSubredditAbout('programming');

      expect(mockClient.get).toHaveBeenCalledWith('/r/programming/about');
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('Search Operations', () => {
    it('searchSubreddits should POST to /api/search_subreddits with request body', async () => {
      const request: Types.SearchSubredditsRequest = {
        query: 'programming',
        include_over_18: false,
      };

      await api.searchSubreddits(request);

      expect(mockClient.post).toHaveBeenCalledWith('/api/search_subreddits', request);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('Path Parameter Substitution', () => {
    it('should correctly substitute subreddit parameter', async () => {
      await api.getSubredditHot('programming');
      expect(mockClient.get).toHaveBeenCalledWith('/r/programming/hot', expect.any(Object));

      await api.getSubredditNew('javascript');
      expect(mockClient.get).toHaveBeenCalledWith('/r/javascript/new', expect.any(Object));

      await api.getSubredditAbout('python');
      expect(mockClient.get).toHaveBeenCalledWith('/r/python/about');
    });

    it('should correctly substitute username parameter', async () => {
      await api.getUserAbout('spez');
      expect(mockClient.get).toHaveBeenCalledWith('/user/spez/about');
    });
  });

  describe('Query Parameter Handling', () => {
    it('should handle optional query parameters correctly', async () => {
      await api.getSubredditHot('programming', {});

      expect(mockClient.get).toHaveBeenCalledWith('/r/programming/hot', {
        limit: undefined,
        after: undefined,
        before: undefined,
      });
    });

    it('should handle partial query parameters correctly', async () => {
      await api.getSubredditHot('programming', { limit: 10 });

      expect(mockClient.get).toHaveBeenCalledWith('/r/programming/hot', {
        limit: 10,
        after: undefined,
        before: undefined,
      });
    });

    it('should handle all query parameters correctly', async () => {
      await api.getSubredditHot('programming', {
        limit: 25,
        after: 'after_token',
        before: 'before_token',
      });

      const calls = vi.mocked(mockClient.get).mock.calls;
      expect(calls[0][1]).toMatchObject({
        limit: 25,
        after: 'after_token',
        before: 'before_token',
      });
    });
  });
});
