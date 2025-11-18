/**
 * API Method Signatures Test Suite
 *
 * This test suite verifies that all API methods have the correct signatures
 * as defined in the OpenAPI specification.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RedditApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';
import type * as Types from '../lib/types';

describe('RedditApi - Method Signatures', () => {
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
    it('getMe should return Promise<User>', async () => {
      const result = api.getMe();
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('getMyKarma should return Promise<KarmaResponse>', async () => {
      const result = api.getMyKarma();
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('Subreddit Listing Operations', () => {
    it('getSubredditHot should accept subreddit and optional params, return Promise<ListingResponse>', async () => {
      const result1 = api.getSubredditHot('programming');
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getSubredditHot('programming', {
        limit: 25,
        after: 'token123',
        before: 'token456'
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('getSubredditNew should accept subreddit and optional params, return Promise<ListingResponse>', async () => {
      const result1 = api.getSubredditNew('javascript');
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getSubredditNew('javascript', {
        limit: 50,
        after: 'next_token'
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });
  });

  describe('Post Operations', () => {
    it('submitPost should accept SubmitPostRequest and return Promise<SubmitResponse>', async () => {
      const request: Types.SubmitPostRequest = {
        sr: 'test',
        title: 'Test Post',
        kind: 'self',
        text: 'This is a test post',
      };

      const result = api.submitPost(request);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('Comment Operations', () => {
    it('submitComment should accept CommentRequest and return Promise<CommentResponse>', async () => {
      const request: Types.CommentRequest = {
        thing_id: 't3_abc123',
        text: 'This is a comment',
      };

      const result = api.submitComment(request);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('Voting Operations', () => {
    it('vote should accept VoteRequest and return Promise<VoteResponse>', async () => {
      const request: Types.VoteRequest = {
        id: 't3_abc123',
        dir: 1,
      };

      const result = api.vote(request);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('Save Operations', () => {
    it('saveItem should accept SaveRequest and return Promise<SaveResponse>', async () => {
      const request: Types.SaveRequest = {
        id: 't3_abc123',
        category: 'favorites',
      };

      const result = api.saveItem(request);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('User Operations', () => {
    it('getUserAbout should accept username and return Promise<UserAboutResponse>', async () => {
      const result = api.getUserAbout('spez');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('Subreddit Info Operations', () => {
    it('getSubredditAbout should accept subreddit and return Promise<SubredditAboutResponse>', async () => {
      const result = api.getSubredditAbout('programming');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('Search Operations', () => {
    it('searchSubreddits should accept SearchSubredditsRequest and return Promise<SearchSubredditsResponse>', async () => {
      const request: Types.SearchSubredditsRequest = {
        query: 'programming',
        include_over_18: false,
      };

      const result = api.searchSubreddits(request);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });
});
