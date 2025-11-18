/**
 * OpenAPI Specification Test Suite
 *
 * This test suite verifies that the OpenAPI specification is valid and contains
 * all necessary components for SDK generation.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { parseOpenAPISpec } from '../src/generator/parser';
import { resolve } from 'path';

const specPath = resolve(__dirname, '../api/openapi.yaml');

describe('OpenAPI Specification Validation', () => {
  let spec: ReturnType<typeof parseOpenAPISpec>;

  it('should successfully parse the OpenAPI spec', () => {
    expect(() => {
      spec = parseOpenAPISpec(specPath);
    }).not.toThrow();

    spec = parseOpenAPISpec(specPath);
    expect(spec).toBeDefined();
  });

  describe('Specification Metadata', () => {
    it('should have OpenAPI version 3.x', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.openapi).toMatch(/^3\./);
    });

    it('should have API info', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.info).toBeDefined();
      expect(spec.info.title).toBe('AT Protocol XRPC API');
      expect(spec.info.version).toBeDefined();
    });

    it('should have server configuration', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.servers).toBeDefined();
      expect(spec.servers.length).toBeGreaterThan(0);
      expect(spec.servers[0].url).toBeDefined();
    });
  });

  describe('Paths and Operations', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have paths defined', () => {
      expect(spec.paths).toBeDefined();
      expect(Object.keys(spec.paths).length).toBeGreaterThan(0);
    });

    it('should have /com.atproto.server.createSession path with POST operation', () => {
      expect(spec.paths['/com.atproto.server.createSession']).toBeDefined();
      expect(spec.paths['/com.atproto.server.createSession'].post).toBeDefined();
      expect(spec.paths['/com.atproto.server.createSession'].post?.operationId).toBe('com.atproto.server.createSession');
    });

    it('should have /app.bsky.actor.getProfile path with GET operation', () => {
      expect(spec.paths['/app.bsky.actor.getProfile']).toBeDefined();
      expect(spec.paths['/app.bsky.actor.getProfile'].get).toBeDefined();
      expect(spec.paths['/app.bsky.actor.getProfile'].get?.operationId).toBe('app.bsky.actor.getProfile');
    });

    it('should have /app.bsky.feed.getTimeline path with GET operation', () => {
      expect(spec.paths['/app.bsky.feed.getTimeline']).toBeDefined();
      expect(spec.paths['/app.bsky.feed.getTimeline'].get).toBeDefined();
      expect(spec.paths['/app.bsky.feed.getTimeline'].get?.operationId).toBe('app.bsky.feed.getTimeline');
    });

    it('should have /app.bsky.feed.getPostThread path with GET operation', () => {
      expect(spec.paths['/app.bsky.feed.getPostThread']).toBeDefined();
      expect(spec.paths['/app.bsky.feed.getPostThread'].get).toBeDefined();
      expect(spec.paths['/app.bsky.feed.getPostThread'].get?.operationId).toBe('app.bsky.feed.getPostThread');
    });

    it('should have /com.atproto.repo.createRecord path with POST operation', () => {
      expect(spec.paths['/com.atproto.repo.createRecord']).toBeDefined();
      expect(spec.paths['/com.atproto.repo.createRecord'].post).toBeDefined();
      expect(spec.paths['/com.atproto.repo.createRecord'].post?.operationId).toBe('com.atproto.repo.createRecord');
    });
  });

  describe('Operation IDs', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have unique operation IDs', () => {
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
      const expectedOperationIds = [
        'com.atproto.server.createSession',
        'com.atproto.server.refreshSession',
        'app.bsky.actor.getProfile',
        'app.bsky.actor.getProfiles',
        'app.bsky.feed.getTimeline',
        'app.bsky.feed.getAuthorFeed',
        'app.bsky.feed.getPostThread',
        'com.atproto.repo.createRecord',
        'com.atproto.repo.deleteRecord',
        'app.bsky.graph.getFollowers',
        'app.bsky.graph.getFollows',
        'app.bsky.notification.listNotifications',
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
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have components.schemas defined', () => {
      expect(spec.components).toBeDefined();
      expect(spec.components.schemas).toBeDefined();
    });

    it('should have schemas defined', () => {
      expect(Object.keys(spec.components.schemas).length).toBeGreaterThan(0);
    });

    it('should have actor-related schemas', () => {
      const schemaKeys = Object.keys(spec.components.schemas);
      const hasActorSchemas = schemaKeys.some(key => key.includes('actor'));
      expect(hasActorSchemas).toBe(true);
    });

    it('should have feed-related schemas', () => {
      const schemaKeys = Object.keys(spec.components.schemas);
      const hasFeedSchemas = schemaKeys.some(key => key.includes('feed'));
      expect(hasFeedSchemas).toBe(true);
    });
  });

  describe('Parameters', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have query parameters defined correctly', () => {
      const getProfileOp = spec.paths['/app.bsky.actor.getProfile'].get;
      expect(getProfileOp?.parameters).toBeDefined();

      const actorParam = getProfileOp?.parameters?.find(p => p.name === 'actor');
      expect(actorParam).toBeDefined();
      expect(actorParam?.in).toBe('query');
      expect(actorParam?.required).toBe(true);
    });

    it('should have pagination parameters in list operations', () => {
      const getTimelineOp = spec.paths['/app.bsky.feed.getTimeline'].get;

      const limitParam = getTimelineOp?.parameters?.find(p => p.name === 'limit');
      const cursorParam = getTimelineOp?.parameters?.find(p => p.name === 'cursor');

      expect(limitParam).toBeDefined();
      expect(cursorParam).toBeDefined();
    });
  });

  describe('Request Bodies', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have request body for POST operations', () => {
      const createSessionOp = spec.paths['/com.atproto.server.createSession'].post;
      expect(createSessionOp?.requestBody).toBeDefined();
      expect(createSessionOp?.requestBody?.required).toBe(true);
      expect(createSessionOp?.requestBody?.content['application/json']).toBeDefined();
    });

    it('should have schema defined in request bodies', () => {
      const createSessionOp = spec.paths['/com.atproto.server.createSession'].post;
      const schema = createSessionOp?.requestBody?.content['application/json'].schema;

      expect(schema).toBeDefined();
      // Schema can be either a $ref or an inline schema
      const hasRef = '$ref' in schema!;
      const hasType = 'type' in schema!;
      expect(hasRef || hasType).toBe(true);
    });
  });

  describe('Responses', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have success responses defined', () => {
      const getProfileOp = spec.paths['/app.bsky.actor.getProfile'].get;
      expect(getProfileOp?.responses['200']).toBeDefined();
    });

    it('should have correct response schemas', () => {
      const getProfileOp = spec.paths['/app.bsky.actor.getProfile'].get;
      const responseSchema = getProfileOp?.responses['200'].content?.['application/json'].schema;

      expect(responseSchema).toBeDefined();
      expect('$ref' in responseSchema!).toBe(true);
      if ('$ref' in responseSchema!) {
        expect(responseSchema.$ref).toContain('components/schemas');
      }
    });

    it('should have 200 response for GET operations', () => {
      const getProfileOp = spec.paths['/app.bsky.actor.getProfile'].get;
      expect(getProfileOp?.responses['200']).toBeDefined();
    });
  });
});
