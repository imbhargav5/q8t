/**
 * OpenAPI Specification Test Suite
 *
 * Validates the structure and completeness of the OpenAPI specification.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { join } from 'path';

describe('OpenAPI Specification', () => {
  let spec: any;

  it('should load and parse the OpenAPI spec', () => {
    const specPath = join(__dirname, '../api/openapi.yaml');
    const content = readFileSync(specPath, 'utf-8');
    spec = parse(content);
    expect(spec).toBeDefined();
  });

  it('should have valid OpenAPI version', () => {
    expect(spec.openapi).toBe('3.0.3');
  });

  it('should have Threads API info', () => {
    expect(spec.info.title).toBe('Threads API');
    expect(spec.info.version).toBe('v1.0');
  });

  it('should have correct servers', () => {
    expect(spec.servers).toHaveLength(2);
    expect(spec.servers[0].url).toBe('https://graph.threads.net');
    expect(spec.servers[1].url).toBe('https://threads.net');
  });

  it('should have components schemas', () => {
    expect(spec.components.schemas).toBeDefined();
    expect(Object.keys(spec.components.schemas).length).toBeGreaterThan(0);
  });

  it('should have all required schemas', () => {
    const requiredSchemas = [
      'User',
      'Media',
      'MediaContainer',
      'PublishedMedia',
      'CreateMediaRequest',
      'PublishMediaRequest',
      'MediaInsight',
      'UserInsight',
      'ShortLivedTokenResponse',
      'LongLivedTokenResponse',
    ];

    for (const schema of requiredSchemas) {
      expect(spec.components.schemas[schema]).toBeDefined();
    }
  });

  it('should have paths defined', () => {
    expect(spec.paths).toBeDefined();
    expect(Object.keys(spec.paths).length).toBeGreaterThan(0);
  });

  it('should have 16 operations (3 auth + 3 users + 4 media + 3 replies + 2 insights + 1 search)', () => {
    let operationCount = 0;
    for (const pathItem of Object.values(spec.paths)) {
      const methods = ['get', 'post', 'put', 'delete', 'patch'];
      for (const method of methods) {
        if ((pathItem as any)[method]) {
          operationCount++;
        }
      }
    }
    expect(operationCount).toBe(16);
  });

  it('should have authentication paths', () => {
    expect(spec.paths['/oauth/access_token']).toBeDefined();
    expect(spec.paths['/access_token']).toBeDefined();
    expect(spec.paths['/refresh_access_token']).toBeDefined();
  });

  it('should have user profile paths', () => {
    expect(spec.paths['/me']).toBeDefined();
    expect(spec.paths['/v1.0/{user-id}']).toBeDefined();
    expect(spec.paths['/v1.0/{user-id}/threads_publishing_limit']).toBeDefined();
  });

  it('should have media publishing paths', () => {
    expect(spec.paths['/v1.0/{user-id}/threads']).toBeDefined();
    expect(spec.paths['/v1.0/{user-id}/threads_publish']).toBeDefined();
    expect(spec.paths['/v1.0/{media-id}']).toBeDefined();
  });

  it('should have reply management paths', () => {
    expect(spec.paths['/v1.0/{media-id}/replies']).toBeDefined();
    expect(spec.paths['/v1.0/{media-id}/conversation']).toBeDefined();
    expect(spec.paths['/v1.0/{reply-id}']).toBeDefined();
  });

  it('should have insights paths', () => {
    expect(spec.paths['/v1.0/{media-id}/insights']).toBeDefined();
    expect(spec.paths['/v1.0/{user-id}/threads_insights']).toBeDefined();
  });

  it('should have search path', () => {
    expect(spec.paths['/keyword_search']).toBeDefined();
  });
});
