import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { parseOpenAPISpec } from '../src/generator/parser';

const SPEC_PATHS = {
  userOAuth: join(__dirname, '../api/user-oauth-api.yaml'),
  clientCredentials: join(__dirname, '../api/client-credentials-api.yaml'),
  business: join(__dirname, '../api/business-api.yaml'),
};

describe('User OAuth API Specification', () => {
  let spec: ReturnType<typeof parseOpenAPISpec>;

  it('should successfully parse the User OAuth API spec', () => {
    spec = parseOpenAPISpec(SPEC_PATHS.userOAuth);
    expect(spec).toBeDefined();
    expect(spec.openapi).toBeDefined();
  });

  it('should have correct API metadata', () => {
    expect(spec.info).toBeDefined();
    expect(spec.info.title).toBe('TikTok User OAuth API');
    expect(spec.info.version).toBeDefined();
  });

  it('should have servers defined', () => {
    expect(spec.servers).toBeDefined();
    expect(spec.servers.length).toBeGreaterThan(0);
    expect(spec.servers[0].url).toContain('open.tiktokapis.com');
  });

  it('should have paths defined', () => {
    expect(spec.paths).toBeDefined();
    expect(Object.keys(spec.paths).length).toBeGreaterThan(0);
  });

  it('should have user info endpoint', () => {
    expect(spec.paths['/user/info/']).toBeDefined();
    expect(spec.paths['/user/info/'].get).toBeDefined();
  });

  it('should have video list endpoint', () => {
    expect(spec.paths['/video/list/']).toBeDefined();
    expect(spec.paths['/video/list/'].post).toBeDefined();
  });

  it('should have content posting endpoints', () => {
    expect(spec.paths['/post/publish/creator_info/query/']).toBeDefined();
    expect(spec.paths['/post/publish/video/init/']).toBeDefined();
    expect(spec.paths['/post/publish/status/fetch/']).toBeDefined();
  });

  it('should have component schemas', () => {
    expect(spec.components).toBeDefined();
    expect(spec.components.schemas).toBeDefined();
    expect(Object.keys(spec.components.schemas).length).toBeGreaterThan(0);
  });

  it('should have all operations with unique IDs', () => {
    const operationIds = new Set<string>();

    for (const [, pathItem] of Object.entries(spec.paths)) {
      const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
      for (const method of methods) {
        const operation = pathItem[method];
        if (operation && operation.operationId) {
          expect(operationIds.has(operation.operationId)).toBe(false);
          operationIds.add(operation.operationId);
        }
      }
    }

    expect(operationIds.size).toBeGreaterThan(0);
  });
});

describe('Client Credentials API Specification', () => {
  let spec: ReturnType<typeof parseOpenAPISpec>;

  it('should successfully parse the Client Credentials API spec', () => {
    spec = parseOpenAPISpec(SPEC_PATHS.clientCredentials);
    expect(spec).toBeDefined();
    expect(spec.openapi).toBeDefined();
  });

  it('should have correct API metadata', () => {
    expect(spec.info).toBeDefined();
    expect(spec.info.title).toBe('TikTok Client Credentials API');
    expect(spec.info.version).toBeDefined();
  });

  it('should have servers defined', () => {
    expect(spec.servers).toBeDefined();
    expect(spec.servers.length).toBeGreaterThan(0);
    expect(spec.servers[0].url).toContain('open.tiktokapis.com');
  });

  it('should have research API endpoints', () => {
    expect(spec.paths['/research/video/query/']).toBeDefined();
    expect(spec.paths['/research/user/info/']).toBeDefined();
    expect(spec.paths['/research/video/comment/list/']).toBeDefined();
  });

  it('should have commercial content API endpoints', () => {
    expect(spec.paths['/research/adlib/ad/query/']).toBeDefined();
    expect(spec.paths['/research/adlib/ad/detail/']).toBeDefined();
    expect(spec.paths['/research/adlib/commercial_content/report/']).toBeDefined();
  });

  it('should have component schemas', () => {
    expect(spec.components).toBeDefined();
    expect(spec.components.schemas).toBeDefined();
    expect(Object.keys(spec.components.schemas).length).toBeGreaterThan(0);
  });

  it('should have all operations with unique IDs', () => {
    const operationIds = new Set<string>();

    for (const [, pathItem] of Object.entries(spec.paths)) {
      const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
      for (const method of methods) {
        const operation = pathItem[method];
        if (operation && operation.operationId) {
          expect(operationIds.has(operation.operationId)).toBe(false);
          operationIds.add(operation.operationId);
        }
      }
    }

    expect(operationIds.size).toBeGreaterThan(0);
  });
});

describe('Business API Specification', () => {
  let spec: ReturnType<typeof parseOpenAPISpec>;

  it('should successfully parse the Business API spec', () => {
    spec = parseOpenAPISpec(SPEC_PATHS.business);
    expect(spec).toBeDefined();
    expect(spec.openapi).toBeDefined();
  });

  it('should have correct API metadata', () => {
    expect(spec.info).toBeDefined();
    expect(spec.info.title).toBe('TikTok Business/Marketing API');
    expect(spec.info.version).toBeDefined();
  });

  it('should have servers defined', () => {
    expect(spec.servers).toBeDefined();
    expect(spec.servers.length).toBeGreaterThan(0);
    expect(spec.servers[0].url).toContain('business-api.tiktok.com');
  });

  it('should have campaign management endpoints', () => {
    expect(spec.paths['/campaign/create/']).toBeDefined();
    expect(spec.paths['/campaign/get/']).toBeDefined();
    expect(spec.paths['/campaign/update/']).toBeDefined();
    expect(spec.paths['/campaign/status/update/']).toBeDefined();
  });

  it('should have ad group management endpoints', () => {
    expect(spec.paths['/adgroup/create/']).toBeDefined();
    expect(spec.paths['/adgroup/get/']).toBeDefined();
    expect(spec.paths['/adgroup/update/']).toBeDefined();
    expect(spec.paths['/adgroup/status/update/']).toBeDefined();
  });

  it('should have ad management endpoints', () => {
    expect(spec.paths['/ad/create/']).toBeDefined();
    expect(spec.paths['/ad/get/']).toBeDefined();
    expect(spec.paths['/ad/update/']).toBeDefined();
    expect(spec.paths['/ad/status/update/']).toBeDefined();
  });

  it('should have creative asset endpoints', () => {
    expect(spec.paths['/file/video/upload/']).toBeDefined();
    expect(spec.paths['/file/image/upload/']).toBeDefined();
  });

  it('should have reporting endpoints', () => {
    expect(spec.paths['/report/integrated/get/']).toBeDefined();
  });

  it('should have audience management endpoints', () => {
    expect(spec.paths['/dmp/custom_audience/list/']).toBeDefined();
    expect(spec.paths['/dmp/custom_audience/create/']).toBeDefined();
  });

  it('should have component schemas', () => {
    expect(spec.components).toBeDefined();
    expect(spec.components.schemas).toBeDefined();
    expect(Object.keys(spec.components.schemas).length).toBeGreaterThan(0);
  });

  it('should have all operations with unique IDs', () => {
    const operationIds = new Set<string>();

    for (const [, pathItem] of Object.entries(spec.paths)) {
      const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
      for (const method of methods) {
        const operation = pathItem[method];
        if (operation && operation.operationId) {
          expect(operationIds.has(operation.operationId)).toBe(false);
          operationIds.add(operation.operationId);
        }
      }
    }

    expect(operationIds.size).toBeGreaterThan(0);
  });
});
