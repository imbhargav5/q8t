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
    it('should have OpenAPI version 3.0.0', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.openapi).toBe('3.0.0');
    });

    it('should have API info', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.info).toBeDefined();
      expect(spec.info.title).toBe('Reddit API');
      expect(spec.info.version).toBe('1');
    });

    it('should have server configuration', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.servers).toBeDefined();
      expect(spec.servers).toHaveLength(1);
      expect(spec.servers[0].url).toBe('https://oauth.reddit.com');
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

    it('should have /api/v1/me path with GET operation', () => {
      expect(spec.paths['/api/v1/me']).toBeDefined();
      expect(spec.paths['/api/v1/me'].get).toBeDefined();
      expect(spec.paths['/api/v1/me'].get?.operationId).toBe('getMe');
    });

    it('should have /api/v1/me/karma path with GET operation', () => {
      expect(spec.paths['/api/v1/me/karma']).toBeDefined();
      expect(spec.paths['/api/v1/me/karma'].get).toBeDefined();
      expect(spec.paths['/api/v1/me/karma'].get?.operationId).toBe('getMyKarma');
    });

    it('should have /r/{subreddit}/hot path with GET operation', () => {
      expect(spec.paths['/r/{subreddit}/hot']).toBeDefined();
      expect(spec.paths['/r/{subreddit}/hot'].get).toBeDefined();
      expect(spec.paths['/r/{subreddit}/hot'].get?.operationId).toBe('getSubredditHot');
    });

    it('should have /r/{subreddit}/new path with GET operation', () => {
      expect(spec.paths['/r/{subreddit}/new']).toBeDefined();
      expect(spec.paths['/r/{subreddit}/new'].get).toBeDefined();
      expect(spec.paths['/r/{subreddit}/new'].get?.operationId).toBe('getSubredditNew');
    });

    it('should have /api/submit path with POST operation', () => {
      expect(spec.paths['/api/submit']).toBeDefined();
      expect(spec.paths['/api/submit'].post).toBeDefined();
      expect(spec.paths['/api/submit'].post?.operationId).toBe('submitPost');
    });

    it('should have /api/comment path with POST operation', () => {
      expect(spec.paths['/api/comment']).toBeDefined();
      expect(spec.paths['/api/comment'].post).toBeDefined();
      expect(spec.paths['/api/comment'].post?.operationId).toBe('submitComment');
    });

    it('should have /api/vote path with POST operation', () => {
      expect(spec.paths['/api/vote']).toBeDefined();
      expect(spec.paths['/api/vote'].post).toBeDefined();
      expect(spec.paths['/api/vote'].post?.operationId).toBe('vote');
    });

    it('should have /api/save path with POST operation', () => {
      expect(spec.paths['/api/save']).toBeDefined();
      expect(spec.paths['/api/save'].post).toBeDefined();
      expect(spec.paths['/api/save'].post?.operationId).toBe('saveItem');
    });

    it('should have /user/{username}/about path with GET operation', () => {
      expect(spec.paths['/user/{username}/about']).toBeDefined();
      expect(spec.paths['/user/{username}/about'].get).toBeDefined();
      expect(spec.paths['/user/{username}/about'].get?.operationId).toBe('getUserAbout');
    });

    it('should have /r/{subreddit}/about path with GET operation', () => {
      expect(spec.paths['/r/{subreddit}/about']).toBeDefined();
      expect(spec.paths['/r/{subreddit}/about'].get).toBeDefined();
      expect(spec.paths['/r/{subreddit}/about'].get?.operationId).toBe('getSubredditAbout');
    });

    it('should have /api/search_subreddits path with POST operation', () => {
      expect(spec.paths['/api/search_subreddits']).toBeDefined();
      expect(spec.paths['/api/search_subreddits'].post).toBeDefined();
      expect(spec.paths['/api/search_subreddits'].post?.operationId).toBe('searchSubreddits');
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

    it('should have all expected operation IDs', () => {
      const expectedOperationIds = [
        'getMe',
        'getMyKarma',
        'getSubredditHot',
        'getSubredditNew',
        'submitPost',
        'submitComment',
        'vote',
        'saveItem',
        'getUserAbout',
        'getSubredditAbout',
        'searchSubreddits',
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

    it('should have User schema', () => {
      expect(spec.components.schemas.User).toBeDefined();
      expect(spec.components.schemas.User.type).toBe('object');
      expect(spec.components.schemas.User.required).toContain('name');
      expect(spec.components.schemas.User.required).toContain('id');
    });

    it('should have Post schema', () => {
      expect(spec.components.schemas.Post).toBeDefined();
      expect(spec.components.schemas.Post.type).toBe('object');
      expect(spec.components.schemas.Post.required).toContain('id');
      expect(spec.components.schemas.Post.required).toContain('title');
      expect(spec.components.schemas.Post.required).toContain('subreddit');
    });

    it('should have Subreddit schema', () => {
      expect(spec.components.schemas.Subreddit).toBeDefined();
      expect(spec.components.schemas.Subreddit.type).toBe('object');
      expect(spec.components.schemas.Subreddit.required).toContain('display_name');
      expect(spec.components.schemas.Subreddit.required).toContain('id');
    });

    it('should have request schemas', () => {
      expect(spec.components.schemas.SubmitPostRequest).toBeDefined();
      expect(spec.components.schemas.CommentRequest).toBeDefined();
      expect(spec.components.schemas.VoteRequest).toBeDefined();
      expect(spec.components.schemas.SaveRequest).toBeDefined();
      expect(spec.components.schemas.SearchSubredditsRequest).toBeDefined();
    });

    it('should have response schemas', () => {
      expect(spec.components.schemas.KarmaResponse).toBeDefined();
      expect(spec.components.schemas.ListingResponse).toBeDefined();
      expect(spec.components.schemas.SubmitResponse).toBeDefined();
      expect(spec.components.schemas.CommentResponse).toBeDefined();
      expect(spec.components.schemas.VoteResponse).toBeDefined();
      expect(spec.components.schemas.SaveResponse).toBeDefined();
      expect(spec.components.schemas.UserAboutResponse).toBeDefined();
      expect(spec.components.schemas.SubredditAboutResponse).toBeDefined();
      expect(spec.components.schemas.SearchSubredditsResponse).toBeDefined();
    });

    it('should have utility schemas', () => {
      expect(spec.components.schemas.KarmaBreakdown).toBeDefined();
      expect(spec.components.schemas.ListingData).toBeDefined();
      expect(spec.components.schemas.PostWrapper).toBeDefined();
      expect(spec.components.schemas.SubredditSearchResult).toBeDefined();
    });
  });

  describe('Parameters', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have path parameters defined correctly', () => {
      const getSubredditHotOp = spec.paths['/r/{subreddit}/hot'].get;
      expect(getSubredditHotOp?.parameters).toBeDefined();

      const subredditParam = getSubredditHotOp?.parameters?.find(p => p.name === 'subreddit');
      expect(subredditParam).toBeDefined();
      expect(subredditParam?.in).toBe('path');
      expect(subredditParam?.required).toBe(true);
    });

    it('should have query parameters defined correctly', () => {
      const getSubredditHotOp = spec.paths['/r/{subreddit}/hot'].get;
      const limitParam = getSubredditHotOp?.parameters?.find(p => p.name === 'limit');

      expect(limitParam).toBeDefined();
      expect(limitParam?.in).toBe('query');
    });

    it('should have pagination parameters in list operations', () => {
      const getSubredditHotOp = spec.paths['/r/{subreddit}/hot'].get;

      const limitParam = getSubredditHotOp?.parameters?.find(p => p.name === 'limit');
      const afterParam = getSubredditHotOp?.parameters?.find(p => p.name === 'after');
      const beforeParam = getSubredditHotOp?.parameters?.find(p => p.name === 'before');

      expect(limitParam).toBeDefined();
      expect(afterParam).toBeDefined();
      expect(beforeParam).toBeDefined();
    });
  });

  describe('Request Bodies', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have request body for POST operations', () => {
      const submitPostOp = spec.paths['/api/submit'].post;
      expect(submitPostOp?.requestBody).toBeDefined();
      expect(submitPostOp?.requestBody?.required).toBe(true);
      expect(submitPostOp?.requestBody?.content['application/json']).toBeDefined();
    });

    it('should have correct schema references in request bodies', () => {
      const submitPostOp = spec.paths['/api/submit'].post;
      const schema = submitPostOp?.requestBody?.content['application/json'].schema;

      expect(schema).toBeDefined();
      expect('$ref' in schema! && schema.$ref).toBe('#/components/schemas/SubmitPostRequest');
    });
  });

  describe('Responses', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have success responses defined', () => {
      const getMeOp = spec.paths['/api/v1/me'].get;
      expect(getMeOp?.responses['200']).toBeDefined();
    });

    it('should have correct response schemas', () => {
      const getMeOp = spec.paths['/api/v1/me'].get;
      const responseSchema = getMeOp?.responses['200'].content?.['application/json'].schema;

      expect(responseSchema).toBeDefined();
      expect('$ref' in responseSchema! && responseSchema.$ref).toBe('#/components/schemas/User');
    });
  });
});
