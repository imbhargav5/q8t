/**
 * API Signatures Test Suite
 *
 * Validates that API methods have correct parameter and return type signatures.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ThreadsApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';

describe('ThreadsApi - Method Signatures', () => {
  let api: ThreadsApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    mockClient = {
      get: async () => ({ id: 'test' }),
      post: async () => ({ id: 'test' }),
      put: async () => ({ id: 'test' }),
      delete: async () => ({ id: 'test' }),
    } as HttpClient;

    api = new ThreadsApi(mockClient);
  });

  describe('Authentication Methods', () => {
    it('exchangeCodeForToken should return a Promise', () => {
      const result = api.exchangeCodeForToken({} as any);
      expect(result).toBeInstanceOf(Promise);
    });

    it('exchangeToken should accept required params', () => {
      const result = api.exchangeToken({ grant_type: 'th_exchange_token', client_secret: 'secret', access_token: 'token' });
      expect(result).toBeInstanceOf(Promise);
    });

    it('refreshToken should accept required params', () => {
      const result = api.refreshToken({ grant_type: 'th_refresh_token', access_token: 'token' });
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('User Profile Methods', () => {
    it('getMyProfile should accept optional params', () => {
      const result = api.getMyProfile({ access_token: 'token' });
      expect(result).toBeInstanceOf(Promise);
    });

    it('getUserProfile should accept user_id and params', () => {
      const result = api.getUserProfile('user123', { access_token: 'token' });
      expect(result).toBeInstanceOf(Promise);
    });

    it('getPublishingLimit should accept user_id', () => {
      const result = api.getPublishingLimit('user123', { access_token: 'token' });
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('Media Publishing Methods', () => {
    it('createMediaContainer should accept user_id and body', () => {
      const result = api.createMediaContainer('user123', { media_type: 'TEXT' } as any, { access_token: 'token' });
      expect(result).toBeInstanceOf(Promise);
    });

    it('listUserThreads should accept user_id and optional params', () => {
      const result = api.listUserThreads('user123', { access_token: 'token', limit: 25 });
      expect(result).toBeInstanceOf(Promise);
    });

    it('publishMediaContainer should accept user_id and creation_id', () => {
      const result = api.publishMediaContainer('user123', { creation_id: 'container123' }, { access_token: 'token' });
      expect(result).toBeInstanceOf(Promise);
    });

    it('getMedia should accept media_id', () => {
      const result = api.getMedia('media123', { access_token: 'token' });
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('Reply Methods', () => {
    it('getReplies should accept media_id and optional params', () => {
      const result = api.getReplies('media123', { access_token: 'token', limit: 25, reverse: true });
      expect(result).toBeInstanceOf(Promise);
    });

    it('getConversation should accept media_id', () => {
      const result = api.getConversation('media123', { access_token: 'token' });
      expect(result).toBeInstanceOf(Promise);
    });

    it('manageReply should accept reply_id and hide parameter', () => {
      const result = api.manageReply('reply123', { hide: true }, { access_token: 'token' });
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('Insights Methods', () => {
    it('getMediaInsights should accept media_id and metric', () => {
      const result = api.getMediaInsights('media123', { access_token: 'token', metric: 'views,likes' });
      expect(result).toBeInstanceOf(Promise);
    });

    it('getUserInsights should accept user_id and metric', () => {
      const result = api.getUserInsights('user123', { access_token: 'token', metric: 'views' });
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('Search Methods', () => {
    it('searchContent should accept query params', () => {
      const result = api.searchContent({ access_token: 'token', q: 'test' });
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
