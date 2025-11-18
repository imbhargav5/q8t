/**
 * API Method Signatures Test Suite
 *
 * This test suite verifies that all API methods have the correct signatures
 * as defined in the OpenAPI specification.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BlueskyApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';
import type * as Types from '../lib/types';

describe('BlueskyApi - Method Signatures', () => {
  let api: BlueskyApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
    } as unknown as HttpClient;

    api = new BlueskyApi(mockClient);
  });

  describe('Authentication Operations', () => {
    it('createSession should accept CreateSessionRequest and return Promise<SessionResponse>', async () => {
      const request: Types.CreateSessionRequest = {
        identifier: 'user.bsky.social',
        password: 'password',
      };

      const result = api.createSession(request);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('refreshSession should return Promise<SessionResponse>', async () => {
      const result = api.refreshSession();
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('Actor Operations', () => {
    it('getProfile should accept actor parameter and return Promise', async () => {
      const result = api.getProfile({ actor: 'user.bsky.social' });
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('getProfiles should accept actors parameter and return Promise', async () => {
      const result = api.getProfiles({ actors: 'user1.bsky.social,user2.bsky.social' });
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('getPreferences should return Promise', async () => {
      const result = api.getPreferences();
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('putPreferences should accept preferences and return Promise', async () => {
      const result = api.putPreferences({ preferences: [] });
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('getSuggestions should accept optional parameters and return Promise', async () => {
      const result1 = api.getSuggestions();
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getSuggestions({ limit: 10, cursor: 'abc' });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('searchActors should accept query and optional parameters, return Promise', async () => {
      const result1 = api.searchActors({ q: 'test' });
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.searchActors({ q: 'test', limit: 25, cursor: 'xyz' });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('searchActorsTypeahead should accept query and optional parameters, return Promise', async () => {
      const result1 = api.searchActorsTypeahead({ q: 'test' });
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.searchActorsTypeahead({ q: 'test', limit: 10 });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });
  });

  describe('Feed Operations', () => {
    it('getTimeline should accept optional pagination parameters, return Promise', async () => {
      const result1 = api.getTimeline({});
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getTimeline({ limit: 50, cursor: 'abc' });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('getAuthorFeed should accept actor and optional parameters, return Promise', async () => {
      const result1 = api.getAuthorFeed({ actor: 'user.bsky.social' });
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getAuthorFeed({
        actor: 'user.bsky.social',
        limit: 30,
        cursor: 'xyz'
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('getPostThread should accept uri and optional depth, return Promise', async () => {
      const result1 = api.getPostThread({ uri: 'at://did/app.bsky.feed.post/abc' });
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getPostThread({
        uri: 'at://did/app.bsky.feed.post/abc',
        depth: 10
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('getPosts should accept uris array and return Promise', async () => {
      const result = api.getPosts({
        uris: ['at://did/app.bsky.feed.post/1', 'at://did/app.bsky.feed.post/2']
      });
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('searchPosts should accept query and optional parameters, return Promise', async () => {
      const result1 = api.searchPosts({ q: 'bluesky' });
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.searchPosts({
        q: 'bluesky',
        limit: 25,
        cursor: 'abc'
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });
  });

  describe('Graph Operations', () => {
    it('getFollowers should accept actor and optional pagination, return Promise', async () => {
      const result1 = api.getFollowers({ actor: 'user.bsky.social' });
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getFollowers({
        actor: 'user.bsky.social',
        limit: 100,
        cursor: 'token'
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('getFollows should accept actor and optional pagination, return Promise', async () => {
      const result1 = api.getFollows({ actor: 'user.bsky.social' });
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getFollows({
        actor: 'user.bsky.social',
        limit: 50,
        cursor: 'next_token'
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('muteActor should accept actor parameter, return Promise', async () => {
      const result = api.muteActor({ actor: 'user.bsky.social' });
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('unmuteActor should accept actor parameter, return Promise', async () => {
      const result = api.unmuteActor({ actor: 'user.bsky.social' });
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('Notification Operations', () => {
    it('listNotifications should accept optional pagination, return Promise', async () => {
      const result1 = api.listNotifications({});
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.listNotifications({
        limit: 25,
        cursor: 'token'
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('getUnreadCount should accept optional seenAt parameter, return Promise', async () => {
      const result1 = api.getUnreadCount();
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.getUnreadCount({ seenAt: '2024-01-01T00:00:00Z' });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('updateSeen should accept seenAt timestamp, return Promise', async () => {
      const result = api.updateSeen({ seenAt: '2024-01-01T00:00:00Z' });
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('Record Operations', () => {
    it('createRecord should accept CreateRecordRequest and return Promise', async () => {
      const request: Types.CreateRecordRequest = {
        repo: 'did:plc:user',
        collection: 'app.bsky.feed.post',
        record: {
          text: 'Hello Bluesky!',
          createdAt: new Date().toISOString(),
        },
      };

      const result = api.createRecord(request);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('deleteRecord should accept DeleteRecordRequest and return Promise', async () => {
      const request: Types.DeleteRecordRequest = {
        repo: 'did:plc:user',
        collection: 'app.bsky.feed.post',
        rkey: 'abc123',
      };

      const result = api.deleteRecord(request);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('getRecord should accept repo, collection, and rkey, return Promise', async () => {
      const result = api.getRecord({
        repo: 'did:plc:user',
        collection: 'app.bsky.feed.post',
        rkey: 'abc123',
      });
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('putRecord should accept PutRecordRequest and return Promise', async () => {
      const result = api.putRecord({
        repo: 'did:plc:user',
        collection: 'app.bsky.feed.post',
        rkey: 'abc123',
        record: {
          text: 'Updated post',
          createdAt: new Date().toISOString(),
        },
      });
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('listRecords should accept repo, collection, and optional parameters, return Promise', async () => {
      const result1 = api.listRecords({
        repo: 'did:plc:user',
        collection: 'app.bsky.feed.post',
      });
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.listRecords({
        repo: 'did:plc:user',
        collection: 'app.bsky.feed.post',
        limit: 50,
        cursor: 'token',
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });
  });
});
