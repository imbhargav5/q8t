/**
 * OpenAPI Specification Test Suite
 *
 * This test suite verifies that the OpenAPI specification is valid and contains
 * all necessary components for SDK generation based on the official Discord API spec.
 */

import { describe, it, expect } from 'vitest';
import { parseOpenAPISpec } from '../src/generator/parser';
import { resolve } from 'path';

const specPath = resolve(__dirname, '../api/openapi.yaml');

describe('Discord OpenAPI Specification Validation', () => {
  let spec: ReturnType<typeof parseOpenAPISpec>;

  it('should successfully parse the OpenAPI spec', () => {
    expect(() => {
      spec = parseOpenAPISpec(specPath);
    }).not.toThrow();

    spec = parseOpenAPISpec(specPath);
    expect(spec).toBeDefined();
  });

  describe('Specification Metadata', () => {
    it('should have OpenAPI version 3.0.x', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.openapi).toMatch(/^3\.0\.\d+$/);
    });

    it('should have API info', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.info).toBeDefined();
      expect(spec.info.title).toBe('Discord API');
      expect(spec.info.version).toBe('10');
    });

    it('should have server configuration', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.servers).toBeDefined();
      expect(spec.servers).toHaveLength(1);
      expect(spec.servers[0].url).toBe('https://discord.com/api/v10');
    });
  });

  describe('Core User Operations', () => {
    it('should have /users/@me path with GET operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/users/@me']).toBeDefined();
      expect(spec.paths['/users/@me'].get).toBeDefined();
      expect(spec.paths['/users/@me'].get?.operationId).toBe('getCurrentUser');
    });

    it('should have /users/@me path with PATCH operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/users/@me']).toBeDefined();
      expect(spec.paths['/users/@me'].patch).toBeDefined();
      expect(spec.paths['/users/@me'].patch?.operationId).toBe('updateCurrentUser');
    });

    it('should have /users/{user_id} path with GET operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/users/{user_id}']).toBeDefined();
      expect(spec.paths['/users/{user_id}'].get).toBeDefined();
      expect(spec.paths['/users/{user_id}'].get?.operationId).toBe('getUser');
    });
  });

  describe('Guild Operations', () => {
    it('should have /guilds/{guild_id} path with GET operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/guilds/{guild_id}']).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}'].get).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}'].get?.operationId).toBe('getGuild');
    });

    it('should have /guilds/{guild_id} path with PATCH operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/guilds/{guild_id}']).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}'].patch).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}'].patch?.operationId).toBe('updateGuild');
    });

    it('should have /guilds/{guild_id}/channels path with GET operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/guilds/{guild_id}/channels']).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}/channels'].get).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}/channels'].get?.operationId).toBe('getGuildChannels');
    });

    it('should have /guilds/{guild_id}/channels path with POST operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/guilds/{guild_id}/channels']).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}/channels'].post).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}/channels'].post?.operationId).toBe('createGuildChannel');
    });

    it('should have /guilds/{guild_id}/members path with GET operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/guilds/{guild_id}/members']).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}/members'].get).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}/members'].get?.operationId).toBe('listGuildMembers');
    });

    it('should have /guilds/{guild_id}/members/{user_id} path with GET operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/guilds/{guild_id}/members/{user_id}']).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}/members/{user_id}'].get).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}/members/{user_id}'].get?.operationId).toBe('getGuildMember');
    });

    it('should have /guilds/{guild_id}/roles path with GET operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/guilds/{guild_id}/roles']).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}/roles'].get).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}/roles'].get?.operationId).toBe('getGuildRoles');
    });

    it('should have /guilds/{guild_id}/roles path with POST operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/guilds/{guild_id}/roles']).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}/roles'].post).toBeDefined();
      expect(spec.paths['/guilds/{guild_id}/roles'].post?.operationId).toBe('createGuildRole');
    });
  });

  describe('Channel Operations', () => {
    it('should have /channels/{channel_id} path with GET operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}'].get).toBeDefined();
      expect(spec.paths['/channels/{channel_id}'].get?.operationId).toBe('getChannel');
    });

    it('should have /channels/{channel_id} path with PATCH operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}'].patch).toBeDefined();
      expect(spec.paths['/channels/{channel_id}'].patch?.operationId).toBe('updateChannel');
    });

    it('should have /channels/{channel_id} path with DELETE operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}'].delete).toBeDefined();
      expect(spec.paths['/channels/{channel_id}'].delete?.operationId).toBe('deleteChannel');
    });
  });

  describe('Message Operations', () => {
    it('should have /channels/{channel_id}/messages path with GET operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}/messages']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages'].get).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages'].get?.operationId).toBe('getChannelMessages');
    });

    it('should have /channels/{channel_id}/messages path with POST operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}/messages']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages'].post).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages'].post?.operationId).toBe('createMessage');
    });

    it('should have /channels/{channel_id}/messages/{message_id} path with GET operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}'].get).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}'].get?.operationId).toBe('getMessage');
    });

    it('should have /channels/{channel_id}/messages/{message_id} path with PATCH operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}'].patch).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}'].patch?.operationId).toBe('updateMessage');
    });

    it('should have /channels/{channel_id}/messages/{message_id} path with DELETE operation', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}'].delete).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}'].delete?.operationId).toBe('deleteMessage');
    });

    it('should have bulk delete messages endpoint', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}/messages/bulk-delete']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/bulk-delete'].post).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/bulk-delete'].post?.operationId).toBe('bulkDeleteMessages');
    });
  });

  describe('Reaction Operations', () => {
    it('should have add reaction endpoint', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me'].put).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me'].put?.operationId).toBe('addReaction');
    });

    it('should have delete own reaction endpoint', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me'].delete).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me'].delete?.operationId).toBe('deleteOwnReaction');
    });

    it('should have delete user reaction endpoint', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/{user_id}']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/{user_id}'].delete).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/{user_id}'].delete?.operationId).toBe('deleteUserReaction');
    });

    it('should have get reactions endpoint', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}/reactions/{emoji}']).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}/reactions/{emoji}'].get).toBeDefined();
      expect(spec.paths['/channels/{channel_id}/messages/{message_id}/reactions/{emoji}'].get?.operationId).toBe('getReactions');
    });
  });

  describe('Operation IDs', () => {
    it('should have unique operation IDs', () => {
      spec = parseOpenAPISpec(specPath);
      const operationIds: string[] = [];

      for (const pathItem of Object.values(spec.paths)) {
        const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
        for (const method of methods) {
          const operation = pathItem[method];
          if (operation?.operationId) {
            operationIds.push(operation.operationId);
          }
        }
      }

      const uniqueIds = new Set(operationIds);
      expect(operationIds.length).toBe(uniqueIds.size);
    });

    it('should have all expected core operation IDs', () => {
      spec = parseOpenAPISpec(specPath);
      const expectedOperationIds = [
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

      const actualOperationIds: string[] = [];
      for (const pathItem of Object.values(spec.paths)) {
        const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
        for (const method of methods) {
          const operation = pathItem[method];
          if (operation?.operationId) {
            actualOperationIds.push(operation.operationId);
          }
        }
      }

      for (const expectedId of expectedOperationIds) {
        expect(actualOperationIds).toContain(expectedId);
      }
    });
  });

  describe('Component Schemas', () => {
    it('should have components.schemas defined', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.components).toBeDefined();
      expect(spec.components.schemas).toBeDefined();
    });

    it('should have User schema', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.components.schemas.User).toBeDefined();
      expect(spec.components.schemas.User.type).toBe('object');
      expect(spec.components.schemas.User.required).toContain('id');
      expect(spec.components.schemas.User.required).toContain('username');
    });

    it('should have Guild schema', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.components.schemas.Guild).toBeDefined();
      expect(spec.components.schemas.Guild.type).toBe('object');
      expect(spec.components.schemas.Guild.required).toContain('id');
      expect(spec.components.schemas.Guild.required).toContain('name');
    });

    it('should have Message schema', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.components.schemas.Message).toBeDefined();
      expect(spec.components.schemas.Message.type).toBe('object');
      expect(spec.components.schemas.Message.required).toContain('id');
      expect(spec.components.schemas.Message.required).toContain('channel_id');
    });

    it('should have Channel schema', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.components.schemas.Channel).toBeDefined();
      expect(spec.components.schemas.Channel.type).toBe('object');
    });
  });
});
