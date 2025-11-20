/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specifications
 * are present in the generated API classes.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  AirtableWebApi,
  AirtableOAuthApi,
  AirtableCommentsApi,
  AirtableWebhooksApi,
  AirtableEnterpriseApi,
} from '../lib';
import type { PATHttpClient } from '../src/auth/pat-client';
import type { OAuthHttpClient } from '../src/auth/oauth-client';

describe('Airtable API - Method Existence', () => {
  let mockPATClient: PATHttpClient;
  let mockOAuthClient: OAuthHttpClient;

  beforeEach(() => {
    // Create mock HTTP clients
    mockPATClient = {
      get: async () => ({}),
      post: async () => ({}),
      patch: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
    } as PATHttpClient;

    mockOAuthClient = {
      get: async () => ({}),
      post: async () => ({}),
      patch: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
      getAccessToken: () => 'token',
      updateTokens: () => {},
    } as OAuthHttpClient;
  });

  describe('AirtableWebApi - Records Operations', () => {
    let api: AirtableWebApi;

    beforeEach(() => {
      api = new AirtableWebApi(mockPATClient);
    });

    it('should have listRecords method', () => {
      expect(api.listRecords).toBeDefined();
      expect(typeof api.listRecords).toBe('function');
    });

    it('should have createRecords method', () => {
      expect(api.createRecords).toBeDefined();
      expect(typeof api.createRecords).toBe('function');
    });

    it('should have updateRecords method', () => {
      expect(api.updateRecords).toBeDefined();
      expect(typeof api.updateRecords).toBe('function');
    });

    it('should have deleteRecords method', () => {
      expect(api.deleteRecords).toBeDefined();
      expect(typeof api.deleteRecords).toBe('function');
    });

    it('should have getRecord method', () => {
      expect(api.getRecord).toBeDefined();
      expect(typeof api.getRecord).toBe('function');
    });

    it('should have updateRecord method', () => {
      expect(api.updateRecord).toBeDefined();
      expect(typeof api.updateRecord).toBe('function');
    });

    it('should have deleteRecord method', () => {
      expect(api.deleteRecord).toBeDefined();
      expect(typeof api.deleteRecord).toBe('function');
    });
  });

  describe('AirtableWebApi - Metadata Operations', () => {
    let api: AirtableWebApi;

    beforeEach(() => {
      api = new AirtableWebApi(mockPATClient);
    });

    it('should have listBases method', () => {
      expect(api.listBases).toBeDefined();
      expect(typeof api.listBases).toBe('function');
    });

    it('should have listTables method', () => {
      expect(api.listTables).toBeDefined();
      expect(typeof api.listTables).toBe('function');
    });

    it('should have getTableSchema method', () => {
      expect(api.getTableSchema).toBeDefined();
      expect(typeof api.getTableSchema).toBe('function');
    });

    it('should have createTable method', () => {
      expect(api.createTable).toBeDefined();
      expect(typeof api.createTable).toBe('function');
    });

    it('should have updateTable method', () => {
      expect(api.updateTable).toBeDefined();
      expect(typeof api.updateTable).toBe('function');
    });

    it('should have createField method', () => {
      expect(api.createField).toBeDefined();
      expect(typeof api.createField).toBe('function');
    });

    it('should have updateField method', () => {
      expect(api.updateField).toBeDefined();
      expect(typeof api.updateField).toBe('function');
    });
  });

  describe('AirtableWebApi - Method Count Validation', () => {
    it('should have exactly 14 public methods (excluding constructor)', () => {
      const api = new AirtableWebApi(mockPATClient);
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof AirtableWebApi] === 'function');

      expect(methods).toHaveLength(14);
    });

    it('should have all expected methods', () => {
      const api = new AirtableWebApi(mockPATClient);
      const expectedMethods = [
        'listRecords',
        'createRecords',
        'updateRecords',
        'deleteRecords',
        'getRecord',
        'updateRecord',
        'deleteRecord',
        'listBases',
        'listTables',
        'getTableSchema',
        'createTable',
        'updateTable',
        'createField',
        'updateField',
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor');

      for (const method of expectedMethods) {
        expect(actualMethods).toContain(method);
      }
    });
  });

  describe('AirtableOAuthApi - OAuth-specific Operations', () => {
    let api: AirtableOAuthApi;

    beforeEach(() => {
      api = new AirtableOAuthApi(mockOAuthClient);
    });

    it('should have whoami method', () => {
      expect(api.whoami).toBeDefined();
      expect(typeof api.whoami).toBe('function');
    });

    it('should have listRecords method', () => {
      expect(api.listRecords).toBeDefined();
      expect(typeof api.listRecords).toBe('function');
    });

    it('should have createRecords method', () => {
      expect(api.createRecords).toBeDefined();
      expect(typeof api.createRecords).toBe('function');
    });

    it('should have listBases method', () => {
      expect(api.listBases).toBeDefined();
      expect(typeof api.listBases).toBe('function');
    });

    it('should have listTables method', () => {
      expect(api.listTables).toBeDefined();
      expect(typeof api.listTables).toBe('function');
    });
  });

  describe('AirtableCommentsApi - Comment Operations', () => {
    let api: AirtableCommentsApi;

    beforeEach(() => {
      api = new AirtableCommentsApi(mockPATClient);
    });

    it('should have listComments method', () => {
      expect(api.listComments).toBeDefined();
      expect(typeof api.listComments).toBe('function');
    });

    it('should have createComment method', () => {
      expect(api.createComment).toBeDefined();
      expect(typeof api.createComment).toBe('function');
    });

    it('should have getComment method', () => {
      expect(api.getComment).toBeDefined();
      expect(typeof api.getComment).toBe('function');
    });

    it('should have updateComment method', () => {
      expect(api.updateComment).toBeDefined();
      expect(typeof api.updateComment).toBe('function');
    });

    it('should have deleteComment method', () => {
      expect(api.deleteComment).toBeDefined();
      expect(typeof api.deleteComment).toBe('function');
    });

    it('should have exactly 5 public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof AirtableCommentsApi] === 'function');

      expect(methods).toHaveLength(5);
    });
  });

  describe('AirtableWebhooksApi - Webhook Operations', () => {
    let api: AirtableWebhooksApi;

    beforeEach(() => {
      api = new AirtableWebhooksApi(mockPATClient);
    });

    it('should have listWebhooks method', () => {
      expect(api.listWebhooks).toBeDefined();
      expect(typeof api.listWebhooks).toBe('function');
    });

    it('should have createWebhook method', () => {
      expect(api.createWebhook).toBeDefined();
      expect(typeof api.createWebhook).toBe('function');
    });

    it('should have getWebhook method', () => {
      expect(api.getWebhook).toBeDefined();
      expect(typeof api.getWebhook).toBe('function');
    });

    it('should have deleteWebhook method', () => {
      expect(api.deleteWebhook).toBeDefined();
      expect(typeof api.deleteWebhook).toBe('function');
    });

    it('should have enableWebhookNotifications method', () => {
      expect(api.enableWebhookNotifications).toBeDefined();
      expect(typeof api.enableWebhookNotifications).toBe('function');
    });

    it('should have listWebhookPayloads method', () => {
      expect(api.listWebhookPayloads).toBeDefined();
      expect(typeof api.listWebhookPayloads).toBe('function');
    });

    it('should have refreshWebhook method', () => {
      expect(api.refreshWebhook).toBeDefined();
      expect(typeof api.refreshWebhook).toBe('function');
    });

    it('should have exactly 7 public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof AirtableWebhooksApi] === 'function');

      expect(methods).toHaveLength(7);
    });
  });

  describe('AirtableEnterpriseApi - User & Group Operations', () => {
    let api: AirtableEnterpriseApi;

    beforeEach(() => {
      api = new AirtableEnterpriseApi(mockPATClient);
    });

    it('should have getEnterpriseInfo method', () => {
      expect(api.getEnterpriseInfo).toBeDefined();
      expect(typeof api.getEnterpriseInfo).toBe('function');
    });

    it('should have listUsers method', () => {
      expect(api.listUsers).toBeDefined();
      expect(typeof api.listUsers).toBe('function');
    });

    it('should have getUser method', () => {
      expect(api.getUser).toBeDefined();
      expect(typeof api.getUser).toBe('function');
    });

    it('should have removeUser method', () => {
      expect(api.removeUser).toBeDefined();
      expect(typeof api.removeUser).toBe('function');
    });

    it('should have grantAdmin method', () => {
      expect(api.grantAdmin).toBeDefined();
      expect(typeof api.grantAdmin).toBe('function');
    });

    it('should have revokeAdmin method', () => {
      expect(api.revokeAdmin).toBeDefined();
      expect(typeof api.revokeAdmin).toBe('function');
    });

    it('should have claimUsers method', () => {
      expect(api.claimUsers).toBeDefined();
      expect(typeof api.claimUsers).toBe('function');
    });

    it('should have listGroups method', () => {
      expect(api.listGroups).toBeDefined();
      expect(typeof api.listGroups).toBe('function');
    });

    it('should have createGroup method', () => {
      expect(api.createGroup).toBeDefined();
      expect(typeof api.createGroup).toBe('function');
    });

    it('should have getGroup method', () => {
      expect(api.getGroup).toBeDefined();
      expect(typeof api.getGroup).toBe('function');
    });

    it('should have updateGroup method', () => {
      expect(api.updateGroup).toBeDefined();
      expect(typeof api.updateGroup).toBe('function');
    });

    it('should have deleteGroup method', () => {
      expect(api.deleteGroup).toBeDefined();
      expect(typeof api.deleteGroup).toBe('function');
    });

    it('should have listAuditLogs method', () => {
      expect(api.listAuditLogs).toBeDefined();
      expect(typeof api.listAuditLogs).toBe('function');
    });
  });

  describe('AirtableEnterpriseApi - Workspace Operations', () => {
    let api: AirtableEnterpriseApi;

    beforeEach(() => {
      api = new AirtableEnterpriseApi(mockPATClient);
    });

    it('should have listWorkspaces method', () => {
      expect(api.listWorkspaces).toBeDefined();
      expect(typeof api.listWorkspaces).toBe('function');
    });

    it('should have createWorkspace method', () => {
      expect(api.createWorkspace).toBeDefined();
      expect(typeof api.createWorkspace).toBe('function');
    });

    it('should have getWorkspace method', () => {
      expect(api.getWorkspace).toBeDefined();
      expect(typeof api.getWorkspace).toBe('function');
    });

    it('should have deleteWorkspace method', () => {
      expect(api.deleteWorkspace).toBeDefined();
      expect(typeof api.deleteWorkspace).toBe('function');
    });

    it('should have listWorkspaceCollaborators method', () => {
      expect(api.listWorkspaceCollaborators).toBeDefined();
      expect(typeof api.listWorkspaceCollaborators).toBe('function');
    });

    it('should have addWorkspaceCollaborator method', () => {
      expect(api.addWorkspaceCollaborator).toBeDefined();
      expect(typeof api.addWorkspaceCollaborator).toBe('function');
    });

    it('should have updateWorkspaceCollaborator method', () => {
      expect(api.updateWorkspaceCollaborator).toBeDefined();
      expect(typeof api.updateWorkspaceCollaborator).toBe('function');
    });

    it('should have removeWorkspaceCollaborator method', () => {
      expect(api.removeWorkspaceCollaborator).toBeDefined();
      expect(typeof api.removeWorkspaceCollaborator).toBe('function');
    });
  });

  describe('AirtableEnterpriseApi - Base Collaborator Operations', () => {
    let api: AirtableEnterpriseApi;

    beforeEach(() => {
      api = new AirtableEnterpriseApi(mockPATClient);
    });

    it('should have listBaseCollaborators method', () => {
      expect(api.listBaseCollaborators).toBeDefined();
      expect(typeof api.listBaseCollaborators).toBe('function');
    });

    it('should have addBaseCollaborator method', () => {
      expect(api.addBaseCollaborator).toBeDefined();
      expect(typeof api.addBaseCollaborator).toBe('function');
    });

    it('should have updateBaseCollaborator method', () => {
      expect(api.updateBaseCollaborator).toBeDefined();
      expect(typeof api.updateBaseCollaborator).toBe('function');
    });

    it('should have removeBaseCollaborator method', () => {
      expect(api.removeBaseCollaborator).toBeDefined();
      expect(typeof api.removeBaseCollaborator).toBe('function');
    });

    it('should have exactly 25 public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof AirtableEnterpriseApi] === 'function');

      expect(methods).toHaveLength(25);
    });
  });
});
