/**
 * Types Test Suite
 *
 * This test suite verifies that the generated TypeScript types are valid
 * and match the OpenAPI schema definitions.
 */

import { describe, it, expect } from 'vitest';
import * as Types from '../lib/types';

describe('Generated Types', () => {
  describe('Record Types', () => {
    it('should export AirtableRecord type', () => {
      const record: Types.AirtableRecord = {
        id: 'rec123',
        createdTime: '2025-01-01T00:00:00Z',
        fields: {
          Name: 'Test Record',
          Status: 'Active',
          Priority: 5,
        },
      };
      expect(record).toBeDefined();
      expect(record.id).toBe('rec123');
      expect(record.fields).toBeDefined();
    });

    it('should export RecordList type', () => {
      const recordList: Types.RecordList = {
        records: [
          { id: 'rec1', fields: { Name: 'Record 1' } },
          { id: 'rec2', fields: { Name: 'Record 2' } },
        ],
        offset: 'next_page_token',
      };
      expect(recordList).toBeDefined();
      expect(recordList.records).toHaveLength(2);
    });

    it('should export CreateRecordRequest type', () => {
      const request: Types.CreateRecordRequest = {
        fields: {
          Name: 'New Record',
          Email: 'test@example.com',
          Status: 'Draft',
        },
      };
      expect(request).toBeDefined();
      expect(request.fields).toBeDefined();
    });

    it('should export CreateRecordsRequest type', () => {
      const request: Types.CreateRecordsRequest = {
        records: [
          { fields: { Name: 'Record 1' } },
          { fields: { Name: 'Record 2' } },
        ],
        typecast: true,
      };
      expect(request).toBeDefined();
      expect(request.records).toHaveLength(2);
      expect(request.typecast).toBe(true);
    });

    it('should export UpdateRecordRequest type', () => {
      const request: Types.UpdateRecordRequest = {
        fields: {
          Status: 'Completed',
          Priority: 10,
        },
      };
      expect(request).toBeDefined();
      expect(request.fields.Status).toBe('Completed');
    });

    it('should export UpdateRecordsRequest type', () => {
      const request: Types.UpdateRecordsRequest = {
        records: [
          { id: 'rec1', fields: { Status: 'Done' } },
          { id: 'rec2', fields: { Status: 'In Progress' } },
        ],
        performUpsert: {
          fieldsToMergeOn: ['Email'],
        },
      };
      expect(request).toBeDefined();
      expect(request.records).toHaveLength(2);
      expect(request.performUpsert?.fieldsToMergeOn).toContain('Email');
    });

    it('should export DeleteRecordsResponse type', () => {
      const response: Types.DeleteRecordsResponse = {
        records: [
          { id: 'rec1', deleted: true },
          { id: 'rec2', deleted: true },
        ],
      };
      expect(response).toBeDefined();
      expect(response.records).toHaveLength(2);
      expect(response.records?.[0].deleted).toBe(true);
    });
  });

  describe('Base and Table Types', () => {
    it('should export Base type', () => {
      const base: Types.Base = {
        id: 'app123',
        name: 'My Base',
        permissionLevel: 'create',
      };
      expect(base).toBeDefined();
      expect(base.id).toBe('app123');
      expect(base.permissionLevel).toBe('create');
    });

    it('should export BaseList type', () => {
      const baseList: Types.BaseList = {
        bases: [
          { id: 'app1', name: 'Base 1', permissionLevel: 'edit' },
          { id: 'app2', name: 'Base 2', permissionLevel: 'read' },
        ],
        offset: 'next_token',
      };
      expect(baseList).toBeDefined();
      expect(baseList.bases).toHaveLength(2);
    });

    it('should export Table type', () => {
      const table: Types.Table = {
        id: 'tbl123',
        name: 'Contacts',
        primaryFieldId: 'fld456',
        fields: [
          { id: 'fld1', name: 'Name', type: 'singleLineText' },
          { id: 'fld2', name: 'Email', type: 'email' },
        ],
        views: [
          { id: 'viw1', name: 'Grid view', type: 'grid' },
        ],
      };
      expect(table).toBeDefined();
      expect(table.id).toBe('tbl123');
      expect(table.fields).toHaveLength(2);
      expect(table.views).toHaveLength(1);
    });

    it('should export Field type', () => {
      const field: Types.Field = {
        id: 'fld123',
        name: 'Status',
        type: 'singleSelect',
        description: 'Current status of the record',
        options: {
          choices: [
            { name: 'Active', color: 'green' },
            { name: 'Inactive', color: 'red' },
          ],
        },
      };
      expect(field).toBeDefined();
      expect(field.type).toBe('singleSelect');
      expect(field.options).toBeDefined();
    });

    it('should export View type', () => {
      const view: Types.View = {
        id: 'viw123',
        name: 'My View',
        type: 'grid',
      };
      expect(view).toBeDefined();
      expect(view.type).toBe('grid');
    });

    it('should export CreateTableRequest type', () => {
      const request: Types.CreateTableRequest = {
        name: 'New Table',
        fields: [
          { name: 'Name', type: 'singleLineText' },
          { name: 'Status', type: 'singleSelect', options: { choices: [{ name: 'Active' }] } },
        ],
        description: 'A new table for testing',
      };
      expect(request).toBeDefined();
      expect(request.fields).toHaveLength(2);
    });

    it('should export CreateFieldRequest type', () => {
      const request: Types.CreateFieldRequest = {
        name: 'Priority',
        type: 'number',
        description: 'Priority level from 1-10',
        options: { precision: 0 },
      };
      expect(request).toBeDefined();
      expect(request.type).toBe('number');
    });
  });

  describe('Comment Types', () => {
    it('should export Comment type', () => {
      const comment: Types.Comment = {
        id: 'com123',
        text: 'This looks great!',
        createdTime: '2025-01-01T12:00:00Z',
        lastUpdatedTime: '2025-01-01T13:00:00Z',
        author: {
          id: 'usr123',
          email: 'user@example.com',
          name: 'John Doe',
        },
      };
      expect(comment).toBeDefined();
      expect(comment.text).toBe('This looks great!');
      expect(comment.author).toBeDefined();
    });

    it('should export CommentList type', () => {
      const commentList: Types.CommentList = {
        comments: [
          { id: 'com1', text: 'Comment 1' },
          { id: 'com2', text: 'Comment 2' },
        ],
        offset: 'next_page',
      };
      expect(commentList).toBeDefined();
      expect(commentList.comments).toHaveLength(2);
    });

    it('should export CreateCommentRequest type', () => {
      const request: Types.CreateCommentRequest = {
        text: 'New comment text @user@example.com',
      };
      expect(request).toBeDefined();
      expect(request.text).toContain('@user@example.com');
    });
  });

  describe('Webhook Types', () => {
    it('should export Webhook type', () => {
      const webhook: Types.Webhook = {
        id: 'ach123',
        macSecretBase64: 'secret_key_base64',
        expirationTime: '2025-12-31T23:59:59Z',
        areNotificationsEnabled: true,
        cursorForNextPayload: 1234567890,
      };
      expect(webhook).toBeDefined();
      expect(webhook.id).toBe('ach123');
      expect(webhook.areNotificationsEnabled).toBe(true);
    });

    it('should export WebhookList type', () => {
      const webhookList: Types.WebhookList = {
        webhooks: [
          { id: 'ach1', areNotificationsEnabled: true },
          { id: 'ach2', areNotificationsEnabled: false },
        ],
      };
      expect(webhookList).toBeDefined();
      expect(webhookList.webhooks).toHaveLength(2);
    });

    it('should export CreateWebhookRequest type', () => {
      const request: Types.CreateWebhookRequest = {
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
      expect(request).toBeDefined();
      expect(request.notificationUrl).toBe('https://example.com/webhook');
    });

    it('should export WebhookSpecification type', () => {
      const spec: Types.WebhookSpecification = {
        options: {
          filters: {
            dataTypes: ['tableData', 'tableFields'],
            recordChangeScope: 'table',
            watchDataInFieldIds: ['fld1', 'fld2'],
          },
        },
      };
      expect(spec).toBeDefined();
      expect(spec.options?.filters?.dataTypes).toContain('tableData');
    });
  });

  describe('Enterprise Types', () => {
    it('should export EnterpriseInfo type', () => {
      const info: Types.EnterpriseInfo = {
        id: 'ent123',
        createdTime: '2020-01-01T00:00:00Z',
        userDomain: 'example.com',
        workspaceIds: ['wsp1', 'wsp2', 'wsp3'],
      };
      expect(info).toBeDefined();
      expect(info.workspaceIds).toHaveLength(3);
    });

    it('should export User type', () => {
      const user: Types.User = {
        id: 'usr123',
        state: 'active',
        email: 'user@example.com',
        name: 'John Doe',
        createdTime: '2024-01-01T00:00:00Z',
        lastActivityTime: '2025-01-20T12:00:00Z',
        isAdmin: false,
      };
      expect(user).toBeDefined();
      expect(user.state).toBe('active');
      expect(user.isAdmin).toBe(false);
    });

    it('should export Group type', () => {
      const group: Types.Group = {
        id: 'grp123',
        name: 'Engineering Team',
        createdTime: '2024-01-01T00:00:00Z',
        memberUserIds: ['usr1', 'usr2', 'usr3'],
      };
      expect(group).toBeDefined();
      expect(group.memberUserIds).toHaveLength(3);
    });

    it('should export AuditLogEvent type', () => {
      const event: Types.AuditLogEvent = {
        id: 'evt123',
        timestamp: '2025-01-20T10:00:00Z',
        action: 'createRecord',
        actor: {
          type: 'user',
          id: 'usr123',
          email: 'user@example.com',
        },
        context: {
          base: { id: 'app123', name: 'My Base' },
          workspace: { id: 'wsp123', name: 'My Workspace' },
        },
      };
      expect(event).toBeDefined();
      expect(event.action).toBe('createRecord');
      expect(event.actor?.email).toBe('user@example.com');
    });

    it('should export Workspace type', () => {
      const workspace: Types.Workspace = {
        id: 'wsp123',
        name: 'Engineering Workspace',
        createdTime: '2024-01-01T00:00:00Z',
        isPrimaryWorkspace: false,
      };
      expect(workspace).toBeDefined();
      expect(workspace.isPrimaryWorkspace).toBe(false);
    });

    it('should export Collaborator type', () => {
      const collaborator: Types.Collaborator = {
        id: 'collab123',
        email: 'collaborator@example.com',
        permissionLevel: 'edit',
        createdTime: '2024-06-01T00:00:00Z',
      };
      expect(collaborator).toBeDefined();
      expect(collaborator.permissionLevel).toBe('edit');
    });

    it('should export ClaimUsersRequest type', () => {
      const request: Types.ClaimUsersRequest = {
        emails: ['user1@example.com', 'user2@example.com', 'user3@example.com'],
      };
      expect(request).toBeDefined();
      expect(request.emails).toHaveLength(3);
    });

    it('should export CreateGroupRequest type', () => {
      const request: Types.CreateGroupRequest = {
        name: 'Design Team',
        memberUserIds: ['usr1', 'usr2'],
      };
      expect(request).toBeDefined();
      expect(request.name).toBe('Design Team');
    });

    it('should export AddCollaboratorRequest type', () => {
      const request: Types.AddCollaboratorRequest = {
        email: 'newuser@example.com',
        permissionLevel: 'create',
      };
      expect(request).toBeDefined();
      expect(request.permissionLevel).toBe('create');
    });
  });

  describe('OAuth Types', () => {
    it('should export UserInfo type', () => {
      const userInfo: Types.UserInfo = {
        id: 'usr123',
        scopes: ['data.records:read', 'data.records:write', 'schema.bases:read'],
        email: 'oauth-user@example.com',
      };
      expect(userInfo).toBeDefined();
      expect(userInfo.scopes).toHaveLength(3);
      expect(userInfo.scopes).toContain('data.records:read');
    });
  });
});
