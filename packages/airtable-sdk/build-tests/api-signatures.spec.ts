/**
 * API Method Signatures Test Suite
 *
 * This test suite verifies that all API methods have the correct signatures
 * as defined in the OpenAPI specifications.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  AirtableWebApi,
  AirtableCommentsApi,
  AirtableWebhooksApi,
  AirtableEnterpriseApi,
} from '../lib';
import type { PATHttpClient } from '../src/auth/pat-client';
import type * as Types from '../lib/types';

describe('Airtable API - Method Signatures', () => {
  let mockClient: PATHttpClient;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    } as unknown as PATHttpClient;
  });

  describe('AirtableWebApi - Records Signatures', () => {
    let api: AirtableWebApi;

    beforeEach(() => {
      api = new AirtableWebApi(mockClient);
    });

    it('listRecords should accept baseId, tableIdOrName, and optional query params', async () => {
      const result1 = api.listRecords('baseId', 'tableName');
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.listRecords('baseId', 'tableName', {
        maxRecords: 10,
        pageSize: 5,
        filterByFormula: "AND({Status} = 'Active')",
        view: 'Grid view',
        fields: ['Name', 'Email'],
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('createRecords should accept baseId, tableIdOrName, and body', async () => {
      const body: Types.CreateRecordsRequest = {
        records: [
          { fields: { Name: 'Test', Email: 'test@example.com' } },
        ],
      };

      const result = api.createRecords('baseId', 'tableName', body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('updateRecords should accept baseId, tableIdOrName, and body with record IDs', async () => {
      const body: Types.UpdateRecordsRequest = {
        records: [
          { id: 'rec123', fields: { Status: 'Completed' } },
          { id: 'rec456', fields: { Status: 'In Progress' } },
        ],
      };

      const result = api.updateRecords('baseId', 'tableName', body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('deleteRecords should accept baseId, tableIdOrName, and query params with record IDs', async () => {
      const result = api.deleteRecords('baseId', 'tableName', {
        records: ['rec123', 'rec456', 'rec789'],
      });

      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('getRecord should accept baseId, tableIdOrName, and recordId', async () => {
      const result = api.getRecord('baseId', 'tableName', 'rec123');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('updateRecord should accept baseId, tableIdOrName, recordId, and body', async () => {
      const body: Types.UpdateRecordRequest = {
        fields: { Status: 'Done', Priority: 'High' },
      };

      const result = api.updateRecord('baseId', 'tableName', 'rec123', body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('deleteRecord should accept baseId, tableIdOrName, and recordId', async () => {
      const result = api.deleteRecord('baseId', 'tableName', 'rec123');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('AirtableWebApi - Metadata Signatures', () => {
    let api: AirtableWebApi;

    beforeEach(() => {
      api = new AirtableWebApi(mockClient);
    });

    it('listBases should accept optional query params', async () => {
      const result1 = api.listBases();
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.listBases({ offset: 'next_page_token' });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('listTables should accept baseId', async () => {
      const result = api.listTables('baseId');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('getTableSchema should accept baseId and tableIdOrName', async () => {
      const result = api.getTableSchema('baseId', 'tableName');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('createTable should accept baseId and body', async () => {
      const body: Types.CreateTableRequest = {
        name: 'New Table',
        fields: [
          { name: 'Name', type: 'singleLineText' },
          { name: 'Status', type: 'singleSelect', options: { choices: [{ name: 'Active' }] } },
        ],
      };

      const result = api.createTable('baseId', body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('createField should accept baseId, tableIdOrName, and body', async () => {
      const body: Types.CreateFieldRequest = {
        name: 'Priority',
        type: 'number',
        description: 'Priority level',
      };

      const result = api.createField('baseId', 'tableName', body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('AirtableCommentsApi - Signatures', () => {
    let api: AirtableCommentsApi;

    beforeEach(() => {
      api = new AirtableCommentsApi(mockClient);
    });

    it('listComments should accept baseId, tableIdOrName, recordId, and optional params', async () => {
      const result1 = api.listComments('baseId', 'tableName', 'rec123');
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.listComments('baseId', 'tableName', 'rec123', {
        pageSize: 50,
        offset: 'next_page',
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('createComment should accept baseId, tableIdOrName, recordId, and body', async () => {
      const body: Types.CreateCommentRequest = {
        text: 'This looks great! @user@example.com',
      };

      const result = api.createComment('baseId', 'tableName', 'rec123', body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('updateComment should accept baseId, tableIdOrName, recordId, commentId, and body', async () => {
      const body: Types.UpdateCommentRequest = {
        text: 'Updated comment text',
      };

      const result = api.updateComment('baseId', 'tableName', 'rec123', 'com456', body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('deleteComment should accept baseId, tableIdOrName, recordId, and commentId', async () => {
      const result = api.deleteComment('baseId', 'tableName', 'rec123', 'com456');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('AirtableWebhooksApi - Signatures', () => {
    let api: AirtableWebhooksApi;

    beforeEach(() => {
      api = new AirtableWebhooksApi(mockClient);
    });

    it('listWebhooks should accept baseId', async () => {
      const result = api.listWebhooks('baseId');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('createWebhook should accept baseId and body', async () => {
      const body: Types.CreateWebhookRequest = {
        notificationUrl: 'https://example.com/webhook',
        specification: {
          options: {
            filters: {
              dataTypes: ['tableData'],
              fromSources: ['client', 'publicApi'],
            },
          },
        },
      };

      const result = api.createWebhook('baseId', body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('enableWebhookNotifications should accept baseId, webhookId, and body', async () => {
      const body: Types.EnableNotificationsRequest = {
        enable: true,
      };

      const result = api.enableWebhookNotifications('baseId', 'webhook123', body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('listWebhookPayloads should accept baseId, webhookId, and optional params', async () => {
      const result1 = api.listWebhookPayloads('baseId', 'webhook123');
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.listWebhookPayloads('baseId', 'webhook123', {
        cursor: 100,
        limit: 50,
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('refreshWebhook should accept baseId and webhookId', async () => {
      const result = api.refreshWebhook('baseId', 'webhook123');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('AirtableEnterpriseApi - User Management Signatures', () => {
    let api: AirtableEnterpriseApi;

    beforeEach(() => {
      api = new AirtableEnterpriseApi(mockClient);
    });

    it('getEnterpriseInfo should return Promise without parameters', async () => {
      const result = api.getEnterpriseInfo();
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('listUsers should accept optional query params', async () => {
      const result1 = api.listUsers();
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.listUsers({
        offset: 'next_page',
        pageSize: 100,
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });

    it('getUser should accept userId', async () => {
      const result = api.getUser('user123');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('grantAdmin should accept userId', async () => {
      const result = api.grantAdmin('user123');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('revokeAdmin should accept userId', async () => {
      const result = api.revokeAdmin('user123');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('claimUsers should accept body with email array', async () => {
      const body: Types.ClaimUsersRequest = {
        emails: ['user1@example.com', 'user2@example.com'],
      };

      const result = api.claimUsers(body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('AirtableEnterpriseApi - Group Management Signatures', () => {
    let api: AirtableEnterpriseApi;

    beforeEach(() => {
      api = new AirtableEnterpriseApi(mockClient);
    });

    it('createGroup should accept body with name and members', async () => {
      const body: Types.CreateGroupRequest = {
        name: 'Engineering Team',
        memberUserIds: ['user1', 'user2', 'user3'],
      };

      const result = api.createGroup(body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('updateGroup should accept groupId and body', async () => {
      const body: Types.UpdateGroupRequest = {
        name: 'Updated Team Name',
        memberUserIds: ['user1', 'user2', 'user4'],
      };

      const result = api.updateGroup('group123', body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('deleteGroup should accept groupId', async () => {
      const result = api.deleteGroup('group123');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('AirtableEnterpriseApi - Workspace Management Signatures', () => {
    let api: AirtableEnterpriseApi;

    beforeEach(() => {
      api = new AirtableEnterpriseApi(mockClient);
    });

    it('createWorkspace should accept body with name', async () => {
      const body: Types.CreateWorkspaceRequest = {
        name: 'New Workspace',
      };

      const result = api.createWorkspace(body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('listWorkspaceCollaborators should accept workspaceId', async () => {
      const result = api.listWorkspaceCollaborators('workspace123');
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('addWorkspaceCollaborator should accept workspaceId and body', async () => {
      const body: Types.AddCollaboratorRequest = {
        email: 'newuser@example.com',
        permissionLevel: 'create',
      };

      const result = api.addWorkspaceCollaborator('workspace123', body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('updateWorkspaceCollaborator should accept workspaceId, collaboratorId, and body', async () => {
      const body: Types.UpdateCollaboratorRequest = {
        permissionLevel: 'edit',
      };

      const result = api.updateWorkspaceCollaborator('workspace123', 'collab456', body);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeDefined();
    });

    it('listAuditLogs should accept optional query params', async () => {
      const result1 = api.listAuditLogs();
      expect(result1).toBeInstanceOf(Promise);

      const result2 = api.listAuditLogs({
        startTime: '2025-01-01T00:00:00Z',
        endTime: '2025-01-31T23:59:59Z',
        actionType: 'createRecord',
        actorId: 'user123',
        pageSize: 100,
      });
      expect(result2).toBeInstanceOf(Promise);

      await expect(result1).resolves.toBeDefined();
      await expect(result2).resolves.toBeDefined();
    });
  });
});
