/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specification
 * are present in the generated DiscordApi class and match the official Discord API.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { DiscordApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';

describe('DiscordApi - Method Existence', () => {
  let api: DiscordApi;
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

    api = new DiscordApi(mockClient);
  });

  describe('User Operations', () => {
    it('should have getCurrentUser method', () => {
      expect(api.getCurrentUser).toBeDefined();
      expect(typeof api.getCurrentUser).toBe('function');
    });

    it('should have updateCurrentUser method', () => {
      expect(api.updateCurrentUser).toBeDefined();
      expect(typeof api.updateCurrentUser).toBe('function');
    });

    it('should have getUser method', () => {
      expect(api.getUser).toBeDefined();
      expect(typeof api.getUser).toBe('function');
    });
  });

  describe('Guild Operations', () => {
    it('should have getGuild method', () => {
      expect(api.getGuild).toBeDefined();
      expect(typeof api.getGuild).toBe('function');
    });

    it('should have updateGuild method', () => {
      expect(api.updateGuild).toBeDefined();
      expect(typeof api.updateGuild).toBe('function');
    });

    it('should have getGuildChannels method', () => {
      expect(api.getGuildChannels).toBeDefined();
      expect(typeof api.getGuildChannels).toBe('function');
    });

    it('should have createGuildChannel method', () => {
      expect(api.createGuildChannel).toBeDefined();
      expect(typeof api.createGuildChannel).toBe('function');
    });

    it('should have listGuildMembers method', () => {
      expect(api.listGuildMembers).toBeDefined();
      expect(typeof api.listGuildMembers).toBe('function');
    });

    it('should have getGuildMember method', () => {
      expect(api.getGuildMember).toBeDefined();
      expect(typeof api.getGuildMember).toBe('function');
    });

    it('should have getGuildRoles method', () => {
      expect(api.getGuildRoles).toBeDefined();
      expect(typeof api.getGuildRoles).toBe('function');
    });

    it('should have createGuildRole method', () => {
      expect(api.createGuildRole).toBeDefined();
      expect(typeof api.createGuildRole).toBe('function');
    });
  });

  describe('Channel Operations', () => {
    it('should have getChannel method', () => {
      expect(api.getChannel).toBeDefined();
      expect(typeof api.getChannel).toBe('function');
    });

    it('should have updateChannel method', () => {
      expect(api.updateChannel).toBeDefined();
      expect(typeof api.updateChannel).toBe('function');
    });

    it('should have deleteChannel method', () => {
      expect(api.deleteChannel).toBeDefined();
      expect(typeof api.deleteChannel).toBe('function');
    });
  });

  describe('Message Operations', () => {
    it('should have getChannelMessages method', () => {
      expect(api.getChannelMessages).toBeDefined();
      expect(typeof api.getChannelMessages).toBe('function');
    });

    it('should have createMessage method', () => {
      expect(api.createMessage).toBeDefined();
      expect(typeof api.createMessage).toBe('function');
    });

    it('should have getMessage method', () => {
      expect(api.getMessage).toBeDefined();
      expect(typeof api.getMessage).toBe('function');
    });

    it('should have updateMessage method', () => {
      expect(api.updateMessage).toBeDefined();
      expect(typeof api.updateMessage).toBe('function');
    });

    it('should have deleteMessage method', () => {
      expect(api.deleteMessage).toBeDefined();
      expect(typeof api.deleteMessage).toBe('function');
    });

    it('should have bulkDeleteMessages method', () => {
      expect(api.bulkDeleteMessages).toBeDefined();
      expect(typeof api.bulkDeleteMessages).toBe('function');
    });
  });

  describe('Reaction Operations', () => {
    it('should have addReaction method', () => {
      expect(api.addReaction).toBeDefined();
      expect(typeof api.addReaction).toBe('function');
    });

    it('should have deleteOwnReaction method', () => {
      expect(api.deleteOwnReaction).toBeDefined();
      expect(typeof api.deleteOwnReaction).toBe('function');
    });

    it('should have deleteUserReaction method', () => {
      expect(api.deleteUserReaction).toBeDefined();
      expect(typeof api.deleteUserReaction).toBe('function');
    });

    it('should have getReactions method', () => {
      expect(api.getReactions).toBeDefined();
      expect(typeof api.getReactions).toBe('function');
    });
  });

  describe('Method Count Validation', () => {
    it('should have at least 24 public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof DiscordApi] === 'function');

      expect(methods.length).toBeGreaterThanOrEqual(24);
    });

    it('should have all expected core methods', () => {
      const expectedMethods = [
        'getCurrentUser',
        'updateCurrentUser',
        'getUser',
        'getGuild',
        'updateGuild',
        'getGuildChannels',
        'createGuildChannel',
        'listGuildMembers',
        'getGuildMember',
        'getGuildRoles',
        'createGuildRole',
        'getChannel',
        'updateChannel',
        'deleteChannel',
        'getChannelMessages',
        'createMessage',
        'getMessage',
        'updateMessage',
        'deleteMessage',
        'bulkDeleteMessages',
        'addReaction',
        'deleteOwnReaction',
        'deleteUserReaction',
        'getReactions',
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor');

      for (const method of expectedMethods) {
        expect(actualMethods).toContain(method);
      }
    });
  });
});
