/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specification
 * are present in the generated ThreadsApi class.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ThreadsApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';

describe('ThreadsApi - Method Existence', () => {
  let api: ThreadsApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
    } as HttpClient;

    api = new ThreadsApi(mockClient);
  });

  describe('Authentication Operations', () => {
    it('should have exchangeCodeForToken method', () => {
      expect(api.exchangeCodeForToken).toBeDefined();
      expect(typeof api.exchangeCodeForToken).toBe('function');
    });

    it('should have exchangeToken method', () => {
      expect(api.exchangeToken).toBeDefined();
      expect(typeof api.exchangeToken).toBe('function');
    });

    it('should have refreshToken method', () => {
      expect(api.refreshToken).toBeDefined();
      expect(typeof api.refreshToken).toBe('function');
    });
  });

  describe('User Profile Operations', () => {
    it('should have getMyProfile method', () => {
      expect(api.getMyProfile).toBeDefined();
      expect(typeof api.getMyProfile).toBe('function');
    });

    it('should have getUserProfile method', () => {
      expect(api.getUserProfile).toBeDefined();
      expect(typeof api.getUserProfile).toBe('function');
    });

    it('should have getPublishingLimit method', () => {
      expect(api.getPublishingLimit).toBeDefined();
      expect(typeof api.getPublishingLimit).toBe('function');
    });
  });

  describe('Media Publishing Operations', () => {
    it('should have createMediaContainer method', () => {
      expect(api.createMediaContainer).toBeDefined();
      expect(typeof api.createMediaContainer).toBe('function');
    });

    it('should have listUserThreads method', () => {
      expect(api.listUserThreads).toBeDefined();
      expect(typeof api.listUserThreads).toBe('function');
    });

    it('should have publishMediaContainer method', () => {
      expect(api.publishMediaContainer).toBeDefined();
      expect(typeof api.publishMediaContainer).toBe('function');
    });

    it('should have getMedia method', () => {
      expect(api.getMedia).toBeDefined();
      expect(typeof api.getMedia).toBe('function');
    });
  });

  describe('Reply Operations', () => {
    it('should have getReplies method', () => {
      expect(api.getReplies).toBeDefined();
      expect(typeof api.getReplies).toBe('function');
    });

    it('should have getConversation method', () => {
      expect(api.getConversation).toBeDefined();
      expect(typeof api.getConversation).toBe('function');
    });

    it('should have manageReply method', () => {
      expect(api.manageReply).toBeDefined();
      expect(typeof api.manageReply).toBe('function');
    });
  });

  describe('Insights Operations', () => {
    it('should have getMediaInsights method', () => {
      expect(api.getMediaInsights).toBeDefined();
      expect(typeof api.getMediaInsights).toBe('function');
    });

    it('should have getUserInsights method', () => {
      expect(api.getUserInsights).toBeDefined();
      expect(typeof api.getUserInsights).toBe('function');
    });
  });

  describe('Search Operations', () => {
    it('should have searchContent method', () => {
      expect(api.searchContent).toBeDefined();
      expect(typeof api.searchContent).toBe('function');
    });
  });

  describe('Method Count Validation', () => {
    it('should have exactly 16 public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof ThreadsApi] === 'function');

      expect(methods).toHaveLength(16);
    });

    it('should have all expected methods', () => {
      const expectedMethods = [
        'exchangeCodeForToken',
        'exchangeToken',
        'refreshToken',
        'getMyProfile',
        'getUserProfile',
        'getPublishingLimit',
        'createMediaContainer',
        'listUserThreads',
        'publishMediaContainer',
        'getMedia',
        'getReplies',
        'getConversation',
        'manageReply',
        'getMediaInsights',
        'getUserInsights',
        'searchContent',
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor');

      for (const method of expectedMethods) {
        expect(actualMethods).toContain(method);
      }
    });
  });
});
