/**
 * OpenAPI Specification Test Suite
 *
 * This test suite validates that the OpenAPI specification is correctly structured
 * and that all endpoints defined in the spec are properly generated in the SDK.
 */

import { describe, it, expect } from 'vitest';
import { parseOpenAPISpec } from '../src/generator/parser';
import { SlackApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('OpenAPI Specification Validation', () => {
  const specPath = join(__dirname, '../api/openapi.yaml');
  const spec = parseOpenAPISpec(specPath);

  describe('Spec Structure', () => {
    it('should have valid OpenAPI version', () => {
      expect(spec.openapi).toBeDefined();
      expect(spec.openapi).toMatch(/^3\.\d+\.\d+$/);
    });

    it('should have API info', () => {
      expect(spec.info).toBeDefined();
      expect(spec.info.title).toBe('Slack Web API');
      expect(spec.info.version).toBeDefined();
    });

    it('should have at least one server defined', () => {
      expect(spec.servers).toBeDefined();
      expect(spec.servers.length).toBeGreaterThan(0);
      expect(spec.servers[0].url).toBe('https://slack.com/api');
    });

    it('should have paths defined', () => {
      expect(spec.paths).toBeDefined();
      expect(Object.keys(spec.paths).length).toBeGreaterThan(0);
    });
  });

  describe('Endpoint Coverage', () => {
    it('should have all paths mapped to SDK methods', () => {
      const mockClient: HttpClient = {
        get: async () => ({}),
        post: async () => ({}),
        put: async () => ({}),
        delete: async () => ({}),
        patch: async () => ({}),
      };

      const api = new SlackApi(mockClient);
      const apiMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor');

      // Extract all operationIds from the spec
      const operationIds: string[] = [];
      for (const [path, pathItem] of Object.entries(spec.paths)) {
        for (const method of ['get', 'post', 'put', 'delete', 'patch'] as const) {
          const operation = pathItem[method];
          if (operation?.operationId) {
            operationIds.push(operation.operationId.replace(/\./g, '_'));
          }
        }
      }

      expect(operationIds.length).toBe(174);
      expect(apiMethods.length).toBe(174);

      // Verify all operation IDs have corresponding methods
      for (const operationId of operationIds) {
        expect(apiMethods, `Missing method for operation: ${operationId}`).toContain(operationId);
      }
    });

    it('should have correct HTTP methods for each endpoint', () => {
      const getEndpoints: string[] = [];
      const postEndpoints: string[] = [];

      for (const [path, pathItem] of Object.entries(spec.paths)) {
        if (pathItem.get) {
          getEndpoints.push(path);
        }
        if (pathItem.post) {
          postEndpoints.push(path);
        }
      }

      // Slack API primarily uses POST for most operations
      expect(postEndpoints.length).toBeGreaterThan(getEndpoints.length);
    });
  });

  describe('Admin Endpoints', () => {
    it('should have admin.apps endpoints', () => {
      const adminAppsEndpoints = Object.keys(spec.paths).filter(path =>
        path.startsWith('/admin.apps')
      );
      expect(adminAppsEndpoints.length).toBeGreaterThanOrEqual(5);
    });

    it('should have admin.conversations endpoints', () => {
      const adminConversationsEndpoints = Object.keys(spec.paths).filter(path =>
        path.startsWith('/admin.conversations')
      );
      expect(adminConversationsEndpoints.length).toBeGreaterThanOrEqual(15);
    });

    it('should have admin.emoji endpoints', () => {
      const adminEmojiEndpoints = Object.keys(spec.paths).filter(path =>
        path.startsWith('/admin.emoji')
      );
      expect(adminEmojiEndpoints.length).toBeGreaterThanOrEqual(5);
    });

    it('should have admin.inviteRequests endpoints', () => {
      const adminInviteRequestsEndpoints = Object.keys(spec.paths).filter(path =>
        path.startsWith('/admin.inviteRequests')
      );
      expect(adminInviteRequestsEndpoints.length).toBeGreaterThanOrEqual(5);
    });

    it('should have admin.teams endpoints', () => {
      const adminTeamsEndpoints = Object.keys(spec.paths).filter(path =>
        path.startsWith('/admin.teams')
      );
      expect(adminTeamsEndpoints.length).toBeGreaterThanOrEqual(10);
    });

    it('should have admin.usergroups endpoints', () => {
      const adminUsergroupsEndpoints = Object.keys(spec.paths).filter(path =>
        path.startsWith('/admin.usergroups')
      );
      expect(adminUsergroupsEndpoints.length).toBeGreaterThanOrEqual(4);
    });

    it('should have admin.users endpoints', () => {
      const adminUsersEndpoints = Object.keys(spec.paths).filter(path =>
        path.startsWith('/admin.users')
      );
      expect(adminUsersEndpoints.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('Core API Endpoints', () => {
    it('should have chat endpoints', () => {
      const chatEndpoints = Object.keys(spec.paths).filter(path =>
        path.startsWith('/chat.')
      );
      expect(chatEndpoints.length).toBeGreaterThanOrEqual(10);
    });

    it('should have conversations endpoints', () => {
      const conversationsEndpoints = Object.keys(spec.paths).filter(path =>
        path.startsWith('/conversations.')
      );
      expect(conversationsEndpoints.length).toBeGreaterThanOrEqual(15);
    });

    it('should have users endpoints', () => {
      const usersEndpoints = Object.keys(spec.paths).filter(path =>
        path.startsWith('/users.')
      );
      expect(usersEndpoints.length).toBeGreaterThanOrEqual(10);
    });

    it('should have auth endpoints', () => {
      const authEndpoints = Object.keys(spec.paths).filter(path =>
        path.startsWith('/auth.')
      );
      expect(authEndpoints.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Endpoint Parameters', () => {
    it('should have proper parameter definitions', () => {
      let hasParameters = false;

      for (const [path, pathItem] of Object.entries(spec.paths)) {
        for (const method of ['get', 'post', 'put', 'delete', 'patch'] as const) {
          const operation = pathItem[method];
          if (operation?.parameters && operation.parameters.length > 0) {
            hasParameters = true;
            for (const param of operation.parameters) {
              expect(param.name).toBeDefined();
              expect(param.in).toBeDefined();
              expect(['path', 'query', 'header']).toContain(param.in);
            }
          }
        }
      }

      expect(hasParameters).toBe(true);
    });

    it('should have proper request body definitions for POST endpoints', () => {
      let hasRequestBodies = false;

      for (const [path, pathItem] of Object.entries(spec.paths)) {
        if (pathItem.post?.requestBody) {
          hasRequestBodies = true;
          const requestBody = pathItem.post.requestBody;
          expect(requestBody.content).toBeDefined();
        }
      }

      expect(hasRequestBodies).toBe(true);
    });
  });

  describe('Response Schemas', () => {
    it('should have response definitions for all endpoints', () => {
      for (const [path, pathItem] of Object.entries(spec.paths)) {
        for (const method of ['get', 'post', 'put', 'delete', 'patch'] as const) {
          const operation = pathItem[method];
          if (operation) {
            expect(operation.responses).toBeDefined();
            expect(Object.keys(operation.responses).length).toBeGreaterThan(0);
          }
        }
      }
    });

    it('should have 200 or 201 success responses', () => {
      for (const [path, pathItem] of Object.entries(spec.paths)) {
        for (const method of ['get', 'post', 'put', 'delete', 'patch'] as const) {
          const operation = pathItem[method];
          if (operation) {
            const has200 = '200' in operation.responses;
            const has201 = '201' in operation.responses;
            expect(has200 || has201).toBe(true);
          }
        }
      }
    });
  });
});
