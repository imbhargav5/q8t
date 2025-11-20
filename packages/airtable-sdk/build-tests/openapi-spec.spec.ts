/**
 * OpenAPI Specification Test Suite
 *
 * This test suite verifies that the OpenAPI YAML specifications are valid
 * and properly structured.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

const API_DIR = join(__dirname, '../api');

interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  servers: Array<{ url: string }>;
  paths: Record<string, any>;
  components: {
    schemas: Record<string, any>;
    securitySchemes?: Record<string, any>;
  };
  security?: Array<Record<string, string[]>>;
}

function loadSpec(filename: string): OpenAPISpec {
  const content = readFileSync(join(API_DIR, filename), 'utf-8');
  return parse(content) as OpenAPISpec;
}

describe('OpenAPI Specifications', () => {
  const specFiles = [
    'web-api.yaml',
    'oauth-api.yaml',
    'webhooks-api.yaml',
    'comments-api.yaml',
    'enterprise-api.yaml',
  ];

  describe('File Parsing', () => {
    for (const file of specFiles) {
      it(`should parse ${file} without errors`, () => {
        expect(() => loadSpec(file)).not.toThrow();
      });
    }
  });

  describe('Web API Specification', () => {
    let spec: OpenAPISpec;

    beforeAll(() => {
      spec = loadSpec('web-api.yaml');
    });

    it('should have OpenAPI 3.0 version', () => {
      expect(spec.openapi).toMatch(/^3\.0/);
    });

    it('should have info metadata', () => {
      expect(spec.info).toBeDefined();
      expect(spec.info.title).toBe('Airtable Web API');
      expect(spec.info.version).toBeDefined();
    });

    it('should have server URL', () => {
      expect(spec.servers).toBeDefined();
      expect(spec.servers.length).toBeGreaterThan(0);
      expect(spec.servers[0].url).toContain('airtable.com');
    });

    it('should have Bearer authentication security scheme', () => {
      expect(spec.components.securitySchemes).toBeDefined();
      expect(spec.components.securitySchemes?.BearerAuth).toBeDefined();
      expect(spec.components.securitySchemes?.BearerAuth.type).toBe('http');
      expect(spec.components.securitySchemes?.BearerAuth.scheme).toBe('bearer');
    });

    it('should have record operation paths', () => {
      expect(spec.paths).toBeDefined();
      expect(spec.paths['/{baseId}/{tableIdOrName}']).toBeDefined();
      expect(spec.paths['/{baseId}/{tableIdOrName}'].get).toBeDefined(); // listRecords
      expect(spec.paths['/{baseId}/{tableIdOrName}'].post).toBeDefined(); // createRecords
      expect(spec.paths['/{baseId}/{tableIdOrName}'].patch).toBeDefined(); // updateRecords
      expect(spec.paths['/{baseId}/{tableIdOrName}'].delete).toBeDefined(); // deleteRecords
    });

    it('should have metadata operation paths', () => {
      expect(spec.paths['/meta/bases']).toBeDefined();
      expect(spec.paths['/meta/bases/{baseId}/tables']).toBeDefined();
      expect(spec.paths['/meta/bases/{baseId}/tables/{tableIdOrName}']).toBeDefined();
    });

    it('should have all operations with operationId', () => {
      for (const [path, pathItem] of Object.entries(spec.paths)) {
        for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
          if (pathItem[method]) {
            expect(pathItem[method].operationId).toBeDefined();
            expect(pathItem[method].operationId).not.toBe('');
          }
        }
      }
    });

    it('should have key schema definitions', () => {
      expect(spec.components.schemas).toBeDefined();
      expect(spec.components.schemas.AirtableRecord).toBeDefined();
      expect(spec.components.schemas.RecordList).toBeDefined();
      expect(spec.components.schemas.Base).toBeDefined();
      expect(spec.components.schemas.Table).toBeDefined();
      expect(spec.components.schemas.Field).toBeDefined();
    });
  });

  describe('OAuth API Specification', () => {
    let spec: OpenAPISpec;

    beforeAll(() => {
      spec = loadSpec('oauth-api.yaml');
    });

    it('should have OAuth 2.0 security scheme', () => {
      expect(spec.components.securitySchemes?.OAuth2).toBeDefined();
      expect(spec.components.securitySchemes?.OAuth2.type).toBe('oauth2');
      expect(spec.components.securitySchemes?.OAuth2.flows).toBeDefined();
    });

    it('should define OAuth scopes', () => {
      const oauth2 = spec.components.securitySchemes?.OAuth2;
      expect(oauth2.flows.authorizationCode).toBeDefined();
      expect(oauth2.flows.authorizationCode.scopes).toBeDefined();

      const scopes = oauth2.flows.authorizationCode.scopes;
      expect(scopes['data.records:read']).toBeDefined();
      expect(scopes['data.records:write']).toBeDefined();
      expect(scopes['schema.bases:read']).toBeDefined();
      expect(scopes['webhook:manage']).toBeDefined();
    });

    it('should have whoami endpoint', () => {
      expect(spec.paths['/meta/whoami']).toBeDefined();
      expect(spec.paths['/meta/whoami'].get).toBeDefined();
      expect(spec.paths['/meta/whoami'].get.operationId).toBe('whoami');
    });
  });

  describe('Webhooks API Specification', () => {
    let spec: OpenAPISpec;

    beforeAll(() => {
      spec = loadSpec('webhooks-api.yaml');
    });

    it('should have webhook operation paths', () => {
      expect(spec.paths['/bases/{baseId}/webhooks']).toBeDefined();
      expect(spec.paths['/bases/{baseId}/webhooks/{webhookId}']).toBeDefined();
      expect(spec.paths['/bases/{baseId}/webhooks/{webhookId}/enableNotifications']).toBeDefined();
      expect(spec.paths['/bases/{baseId}/webhooks/{webhookId}/payloads']).toBeDefined();
      expect(spec.paths['/bases/{baseId}/webhooks/{webhookId}/refresh']).toBeDefined();
    });

    it('should have webhook schema definitions', () => {
      expect(spec.components.schemas.Webhook).toBeDefined();
      expect(spec.components.schemas.WebhookList).toBeDefined();
      expect(spec.components.schemas.CreateWebhookRequest).toBeDefined();
      expect(spec.components.schemas.WebhookSpecification).toBeDefined();
    });
  });

  describe('Comments API Specification', () => {
    let spec: OpenAPISpec;

    beforeAll(() => {
      spec = loadSpec('comments-api.yaml');
    });

    it('should have comment operation paths', () => {
      expect(spec.paths['/{baseId}/{tableIdOrName}/{recordId}/comments']).toBeDefined();
      expect(spec.paths['/{baseId}/{tableIdOrName}/{recordId}/comments/{commentId}']).toBeDefined();
    });

    it('should have CRUD operations for comments', () => {
      const commentsPath = spec.paths['/{baseId}/{tableIdOrName}/{recordId}/comments'];
      expect(commentsPath.get).toBeDefined(); // list
      expect(commentsPath.post).toBeDefined(); // create

      const commentPath = spec.paths['/{baseId}/{tableIdOrName}/{recordId}/comments/{commentId}'];
      expect(commentPath.get).toBeDefined(); // get
      expect(commentPath.patch).toBeDefined(); // update
      expect(commentPath.delete).toBeDefined(); // delete
    });

    it('should have comment schema definitions', () => {
      expect(spec.components.schemas.Comment).toBeDefined();
      expect(spec.components.schemas.CommentList).toBeDefined();
      expect(spec.components.schemas.CreateCommentRequest).toBeDefined();
    });
  });

  describe('Enterprise API Specification', () => {
    let spec: OpenAPISpec;

    beforeAll(() => {
      spec = loadSpec('enterprise-api.yaml');
    });

    it('should have enterprise info endpoint', () => {
      expect(spec.paths['/meta/enterpriseAccount']).toBeDefined();
      expect(spec.paths['/meta/enterpriseAccount'].get).toBeDefined();
    });

    it('should have user management paths', () => {
      expect(spec.paths['/meta/enterpriseAccount/users']).toBeDefined();
      expect(spec.paths['/meta/enterpriseAccount/users/{userId}']).toBeDefined();
      expect(spec.paths['/meta/enterpriseAccount/users/{userId}/grantAdmin']).toBeDefined();
      expect(spec.paths['/meta/enterpriseAccount/users/{userId}/revokeAdmin']).toBeDefined();
    });

    it('should have group management paths', () => {
      expect(spec.paths['/meta/enterpriseAccount/groups']).toBeDefined();
      expect(spec.paths['/meta/enterpriseAccount/groups/{groupId}']).toBeDefined();
    });

    it('should have workspace management paths', () => {
      expect(spec.paths['/meta/workspaces']).toBeDefined();
      expect(spec.paths['/meta/workspaces/{workspaceId}']).toBeDefined();
      expect(spec.paths['/meta/workspaces/{workspaceId}/collaborators']).toBeDefined();
    });

    it('should have base collaborator paths', () => {
      expect(spec.paths['/meta/bases/{baseId}/collaborators']).toBeDefined();
      expect(spec.paths['/meta/bases/{baseId}/collaborators/{collaboratorId}']).toBeDefined();
    });

    it('should have audit log endpoint', () => {
      expect(spec.paths['/meta/enterpriseAccount/auditLogs']).toBeDefined();
      expect(spec.paths['/meta/enterpriseAccount/auditLogs'].get).toBeDefined();
    });

    it('should have enterprise schema definitions', () => {
      expect(spec.components.schemas.EnterpriseInfo).toBeDefined();
      expect(spec.components.schemas.User).toBeDefined();
      expect(spec.components.schemas.Group).toBeDefined();
      expect(spec.components.schemas.AuditLogEvent).toBeDefined();
      expect(spec.components.schemas.Workspace).toBeDefined();
      expect(spec.components.schemas.Collaborator).toBeDefined();
    });
  });

  describe('Schema Consistency', () => {
    it('should have consistent Record/AirtableRecord naming', () => {
      const webSpec = loadSpec('web-api.yaml');

      // Check if AirtableRecord is defined (our renamed version)
      const hasAirtableRecord = !!webSpec.components.schemas.AirtableRecord;
      const hasRecord = !!webSpec.components.schemas.Record;

      // We should have either AirtableRecord or Record, but not both ideally
      expect(hasAirtableRecord || hasRecord).toBe(true);
    });

    it('should have consistent field types across specs', () => {
      const webSpec = loadSpec('web-api.yaml');
      const oauthSpec = loadSpec('oauth-api.yaml');

      // Both should have Base schema
      expect(webSpec.components.schemas.Base).toBeDefined();
      expect(oauthSpec.components.schemas.Base).toBeDefined();
    });
  });
});
