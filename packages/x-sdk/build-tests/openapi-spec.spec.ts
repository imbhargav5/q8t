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
      expect(spec.info.title).toBe('X (Twitter) API');
      expect(spec.info.version).toBe('2');
    });

    it('should have server configuration', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.servers).toBeDefined();
      expect(spec.servers).toHaveLength(1);
      expect(spec.servers[0].url).toBe('https://api.twitter.com/2');
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

    it('should have /tweets path with POST operation', () => {
      expect(spec.paths['/tweets']).toBeDefined();
      expect(spec.paths['/tweets'].post).toBeDefined();
      expect(spec.paths['/tweets'].post?.operationId).toBe('createTweet');
    });

    it('should have /tweets/{id} path with GET and DELETE operations', () => {
      expect(spec.paths['/tweets/{id}']).toBeDefined();
      expect(spec.paths['/tweets/{id}'].get).toBeDefined();
      expect(spec.paths['/tweets/{id}'].get?.operationId).toBe('getTweet');
      expect(spec.paths['/tweets/{id}'].delete).toBeDefined();
      expect(spec.paths['/tweets/{id}'].delete?.operationId).toBe('deleteTweet');
    });

    it('should have /users/me path with GET operation', () => {
      expect(spec.paths['/users/me']).toBeDefined();
      expect(spec.paths['/users/me'].get).toBeDefined();
      expect(spec.paths['/users/me'].get?.operationId).toBe('getMe');
    });

    it('should have /users/{id} path with GET operation', () => {
      expect(spec.paths['/users/{id}']).toBeDefined();
      expect(spec.paths['/users/{id}'].get).toBeDefined();
      expect(spec.paths['/users/{id}'].get?.operationId).toBe('getUser');
    });

    it('should have /users/by/username/{username} path with GET operation', () => {
      expect(spec.paths['/users/by/username/{username}']).toBeDefined();
      expect(spec.paths['/users/by/username/{username}'].get).toBeDefined();
      expect(spec.paths['/users/by/username/{username}'].get?.operationId).toBe('getUserByUsername');
    });

    it('should have /users/{id}/tweets path with GET operation', () => {
      expect(spec.paths['/users/{id}/tweets']).toBeDefined();
      expect(spec.paths['/users/{id}/tweets'].get).toBeDefined();
      expect(spec.paths['/users/{id}/tweets'].get?.operationId).toBe('getUserTweets');
    });

    it('should have /users/{id}/followers path with GET operation', () => {
      expect(spec.paths['/users/{id}/followers']).toBeDefined();
      expect(spec.paths['/users/{id}/followers'].get).toBeDefined();
      expect(spec.paths['/users/{id}/followers'].get?.operationId).toBe('getFollowers');
    });

    it('should have /users/{id}/following path with GET operation', () => {
      expect(spec.paths['/users/{id}/following']).toBeDefined();
      expect(spec.paths['/users/{id}/following'].get).toBeDefined();
      expect(spec.paths['/users/{id}/following'].get?.operationId).toBe('getFollowing');
    });

    it('should have /users/{id}/liked_tweets path with GET operation', () => {
      expect(spec.paths['/users/{id}/liked_tweets']).toBeDefined();
      expect(spec.paths['/users/{id}/liked_tweets'].get).toBeDefined();
      expect(spec.paths['/users/{id}/liked_tweets'].get?.operationId).toBe('getLikedTweets');
    });

    it('should have /users/{id}/likes path with POST operation', () => {
      expect(spec.paths['/users/{id}/likes']).toBeDefined();
      expect(spec.paths['/users/{id}/likes'].post).toBeDefined();
      expect(spec.paths['/users/{id}/likes'].post?.operationId).toBe('likeTweet');
    });

    it('should have /users/{id}/retweets path with POST operation', () => {
      expect(spec.paths['/users/{id}/retweets']).toBeDefined();
      expect(spec.paths['/users/{id}/retweets'].post).toBeDefined();
      expect(spec.paths['/users/{id}/retweets'].post?.operationId).toBe('retweet');
    });

    it('should have exactly 11 paths defined', () => {
      expect(Object.keys(spec.paths)).toHaveLength(11);
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
        'createTweet',
        'getTweet',
        'deleteTweet',
        'getMe',
        'getUser',
        'getUserByUsername',
        'getUserTweets',
        'getFollowers',
        'getFollowing',
        'getLikedTweets',
        'likeTweet',
        'retweet',
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

    it('should have Tweet schema', () => {
      expect(spec.components.schemas.Tweet).toBeDefined();
      expect(spec.components.schemas.Tweet.type).toBe('object');
      expect(spec.components.schemas.Tweet.required).toContain('id');
      expect(spec.components.schemas.Tweet.required).toContain('text');
    });

    it('should have User schema', () => {
      expect(spec.components.schemas.User).toBeDefined();
      expect(spec.components.schemas.User.type).toBe('object');
      expect(spec.components.schemas.User.required).toContain('id');
      expect(spec.components.schemas.User.required).toContain('name');
      expect(spec.components.schemas.User.required).toContain('username');
    });

    it('should have request schemas', () => {
      expect(spec.components.schemas.CreateTweetRequest).toBeDefined();
      expect(spec.components.schemas.LikeTweetRequest).toBeDefined();
      expect(spec.components.schemas.RetweetRequest).toBeDefined();
    });

    it('should have response schemas', () => {
      expect(spec.components.schemas.TweetResponse).toBeDefined();
      expect(spec.components.schemas.TweetsResponse).toBeDefined();
      expect(spec.components.schemas.UserResponse).toBeDefined();
      expect(spec.components.schemas.UsersResponse).toBeDefined();
      expect(spec.components.schemas.DeleteTweetResponse).toBeDefined();
      expect(spec.components.schemas.LikeResponse).toBeDefined();
      expect(spec.components.schemas.RetweetResponse).toBeDefined();
    });

    it('should have utility schemas', () => {
      expect(spec.components.schemas.PaginationMeta).toBeDefined();
      expect(spec.components.schemas.TweetPublicMetrics).toBeDefined();
      expect(spec.components.schemas.UserPublicMetrics).toBeDefined();
      expect(spec.components.schemas.TweetEntities).toBeDefined();
    });
  });

  describe('Parameters', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have path parameters defined correctly', () => {
      const getTweetOp = spec.paths['/tweets/{id}'].get;
      expect(getTweetOp?.parameters).toBeDefined();

      const idParam = getTweetOp?.parameters?.find(p => p.name === 'id');
      expect(idParam).toBeDefined();
      expect(idParam?.in).toBe('path');
      expect(idParam?.required).toBe(true);
    });

    it('should have query parameters defined correctly', () => {
      const getTweetOp = spec.paths['/tweets/{id}'].get;
      const tweetFieldsParam = getTweetOp?.parameters?.find(p => p.name === 'tweet.fields');

      expect(tweetFieldsParam).toBeDefined();
      expect(tweetFieldsParam?.in).toBe('query');
    });

    it('should have pagination parameters in list operations', () => {
      const getUserTweetsOp = spec.paths['/users/{id}/tweets'].get;

      const maxResultsParam = getUserTweetsOp?.parameters?.find(p => p.name === 'max_results');
      const paginationTokenParam = getUserTweetsOp?.parameters?.find(p => p.name === 'pagination_token');

      expect(maxResultsParam).toBeDefined();
      expect(paginationTokenParam).toBeDefined();
    });
  });

  describe('Request Bodies', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have request body for POST operations', () => {
      const createTweetOp = spec.paths['/tweets'].post;
      expect(createTweetOp?.requestBody).toBeDefined();
      expect(createTweetOp?.requestBody?.required).toBe(true);
      expect(createTweetOp?.requestBody?.content['application/json']).toBeDefined();
    });

    it('should have correct schema references in request bodies', () => {
      const createTweetOp = spec.paths['/tweets'].post;
      const schema = createTweetOp?.requestBody?.content['application/json'].schema;

      expect(schema).toBeDefined();
      expect('$ref' in schema! && schema.$ref).toBe('#/components/schemas/CreateTweetRequest');
    });
  });

  describe('Responses', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have success responses defined', () => {
      const getTweetOp = spec.paths['/tweets/{id}'].get;
      expect(getTweetOp?.responses['200']).toBeDefined();
    });

    it('should have correct response schemas', () => {
      const getTweetOp = spec.paths['/tweets/{id}'].get;
      const responseSchema = getTweetOp?.responses['200'].content?.['application/json'].schema;

      expect(responseSchema).toBeDefined();
      expect('$ref' in responseSchema! && responseSchema.$ref).toBe('#/components/schemas/TweetResponse');
    });

    it('should have 201 response for POST operations', () => {
      const createTweetOp = spec.paths['/tweets'].post;
      expect(createTweetOp?.responses['201']).toBeDefined();
    });
  });
});
