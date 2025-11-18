/**
 * OpenAPI Specification Test Suite
 *
 * This test suite verifies that the OpenAPI specification is valid and contains
 * all necessary components for SDK generation, ensuring comprehensive coverage
 * of Facebook Graph API endpoints.
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
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have OpenAPI version 3.x', () => {
      expect(spec.openapi).toMatch(/^3\./);
    });

    it('should have API info', () => {
      expect(spec.info).toBeDefined();
      expect(spec.info.title).toBe('Facebook Graph API');
      expect(spec.info.version).toBe('18.0');
    });

    it('should have server configuration', () => {
      expect(spec.servers).toBeDefined();
      expect(spec.servers.length).toBeGreaterThan(0);
      expect(spec.servers[0].url).toBe('https://graph.facebook.com/v18.0');
    });
  });

  describe('User Endpoints', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have /me path with GET operation', () => {
      expect(spec.paths['/me']).toBeDefined();
      expect(spec.paths['/me'].get).toBeDefined();
      expect(spec.paths['/me'].get?.operationId).toBe('getMe');
    });

    it('should have /{user-id} path with GET operation', () => {
      expect(spec.paths['/{user-id}']).toBeDefined();
      expect(spec.paths['/{user-id}'].get).toBeDefined();
      expect(spec.paths['/{user-id}'].get?.operationId).toBe('getUser');
    });

    it('should have /{user-id}/posts path with GET operation', () => {
      expect(spec.paths['/{user-id}/posts']).toBeDefined();
      expect(spec.paths['/{user-id}/posts'].get).toBeDefined();
      expect(spec.paths['/{user-id}/posts'].get?.operationId).toBe('getUserPosts');
    });

    it('should have /{user-id}/photos path with GET and POST operations', () => {
      expect(spec.paths['/{user-id}/photos']).toBeDefined();
      expect(spec.paths['/{user-id}/photos'].get).toBeDefined();
      expect(spec.paths['/{user-id}/photos'].get?.operationId).toBe('getUserPhotos');
      expect(spec.paths['/{user-id}/photos'].post).toBeDefined();
      expect(spec.paths['/{user-id}/photos'].post?.operationId).toBe('createUserPhoto');
    });

    it('should have /{user-id}/albums path with GET and POST operations', () => {
      expect(spec.paths['/{user-id}/albums']).toBeDefined();
      expect(spec.paths['/{user-id}/albums'].get).toBeDefined();
      expect(spec.paths['/{user-id}/albums'].get?.operationId).toBe('getUserAlbums');
      expect(spec.paths['/{user-id}/albums'].post).toBeDefined();
      expect(spec.paths['/{user-id}/albums'].post?.operationId).toBe('createUserAlbum');
    });

    it('should have /{user-id}/friends path with GET operation', () => {
      expect(spec.paths['/{user-id}/friends']).toBeDefined();
      expect(spec.paths['/{user-id}/friends'].get).toBeDefined();
      expect(spec.paths['/{user-id}/friends'].get?.operationId).toBe('getUserFriends');
    });
  });

  describe('Page Endpoints', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have /{page-id} path with GET operation', () => {
      expect(spec.paths['/{page-id}']).toBeDefined();
      expect(spec.paths['/{page-id}'].get).toBeDefined();
      expect(spec.paths['/{page-id}'].get?.operationId).toBe('getPage');
    });

    it('should have /{page-id}/feed path with GET and POST operations', () => {
      expect(spec.paths['/{page-id}/feed']).toBeDefined();
      expect(spec.paths['/{page-id}/feed'].get).toBeDefined();
      expect(spec.paths['/{page-id}/feed'].get?.operationId).toBe('getPageFeed');
      expect(spec.paths['/{page-id}/feed'].post).toBeDefined();
      expect(spec.paths['/{page-id}/feed'].post?.operationId).toBe('createPagePost');
    });

    it('should have /{page-id}/posts path with GET operation', () => {
      expect(spec.paths['/{page-id}/posts']).toBeDefined();
      expect(spec.paths['/{page-id}/posts'].get).toBeDefined();
      expect(spec.paths['/{page-id}/posts'].get?.operationId).toBe('getPagePosts');
    });

    it('should have /{page-id}/insights path with GET operation', () => {
      expect(spec.paths['/{page-id}/insights']).toBeDefined();
      expect(spec.paths['/{page-id}/insights'].get).toBeDefined();
      expect(spec.paths['/{page-id}/insights'].get?.operationId).toBe('getPageInsights');
    });

    it('should have /{page-id}/photos path with GET and POST operations', () => {
      expect(spec.paths['/{page-id}/photos']).toBeDefined();
      expect(spec.paths['/{page-id}/photos'].get).toBeDefined();
      expect(spec.paths['/{page-id}/photos'].get?.operationId).toBe('getPagePhotos');
      expect(spec.paths['/{page-id}/photos'].post).toBeDefined();
      expect(spec.paths['/{page-id}/photos'].post?.operationId).toBe('createPagePhoto');
    });

    it('should have /{page-id}/albums path with GET and POST operations', () => {
      expect(spec.paths['/{page-id}/albums']).toBeDefined();
      expect(spec.paths['/{page-id}/albums'].get).toBeDefined();
      expect(spec.paths['/{page-id}/albums'].get?.operationId).toBe('getPageAlbums');
      expect(spec.paths['/{page-id}/albums'].post).toBeDefined();
      expect(spec.paths['/{page-id}/albums'].post?.operationId).toBe('createPageAlbum');
    });
  });

  describe('Post Endpoints', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have /{post-id} path with GET and DELETE operations', () => {
      expect(spec.paths['/{post-id}']).toBeDefined();
      expect(spec.paths['/{post-id}'].get).toBeDefined();
      expect(spec.paths['/{post-id}'].get?.operationId).toBe('getPost');
      expect(spec.paths['/{post-id}'].delete).toBeDefined();
      expect(spec.paths['/{post-id}'].delete?.operationId).toBe('deletePost');
    });

    it('should have /{post-id}/comments path with GET and POST operations', () => {
      expect(spec.paths['/{post-id}/comments']).toBeDefined();
      expect(spec.paths['/{post-id}/comments'].get).toBeDefined();
      expect(spec.paths['/{post-id}/comments'].get?.operationId).toBe('getPostComments');
      expect(spec.paths['/{post-id}/comments'].post).toBeDefined();
      expect(spec.paths['/{post-id}/comments'].post?.operationId).toBe('createPostComment');
    });

    it('should have /{post-id}/likes path with GET, POST, and DELETE operations', () => {
      expect(spec.paths['/{post-id}/likes']).toBeDefined();
      expect(spec.paths['/{post-id}/likes'].get).toBeDefined();
      expect(spec.paths['/{post-id}/likes'].get?.operationId).toBe('getPostLikes');
      expect(spec.paths['/{post-id}/likes'].post).toBeDefined();
      expect(spec.paths['/{post-id}/likes'].post?.operationId).toBe('createPostLike');
      expect(spec.paths['/{post-id}/likes'].delete).toBeDefined();
      expect(spec.paths['/{post-id}/likes'].delete?.operationId).toBe('deletePostLike');
    });

    it('should have /{post-id}/reactions path with GET operation', () => {
      expect(spec.paths['/{post-id}/reactions']).toBeDefined();
      expect(spec.paths['/{post-id}/reactions'].get).toBeDefined();
      expect(spec.paths['/{post-id}/reactions'].get?.operationId).toBe('getPostReactions');
    });

    it('should have /{post-id}/shares path with GET operation', () => {
      expect(spec.paths['/{post-id}/shares']).toBeDefined();
      expect(spec.paths['/{post-id}/shares'].get).toBeDefined();
      expect(spec.paths['/{post-id}/shares'].get?.operationId).toBe('getPostShares');
    });

    it('should have /{post-id}/insights path with GET operation', () => {
      expect(spec.paths['/{post-id}/insights']).toBeDefined();
      expect(spec.paths['/{post-id}/insights'].get).toBeDefined();
      expect(spec.paths['/{post-id}/insights'].get?.operationId).toBe('getPostInsights');
    });
  });

  describe('Photo Endpoints', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have /{photo-id} path with GET and DELETE operations', () => {
      expect(spec.paths['/{photo-id}']).toBeDefined();
      expect(spec.paths['/{photo-id}'].get).toBeDefined();
      expect(spec.paths['/{photo-id}'].get?.operationId).toBe('getPhoto');
      expect(spec.paths['/{photo-id}'].delete).toBeDefined();
      expect(spec.paths['/{photo-id}'].delete?.operationId).toBe('deletePhoto');
    });

    it('should have /{photo-id}/comments path with GET and POST operations', () => {
      expect(spec.paths['/{photo-id}/comments']).toBeDefined();
      expect(spec.paths['/{photo-id}/comments'].get).toBeDefined();
      expect(spec.paths['/{photo-id}/comments'].get?.operationId).toBe('getPhotoComments');
      expect(spec.paths['/{photo-id}/comments'].post).toBeDefined();
      expect(spec.paths['/{photo-id}/comments'].post?.operationId).toBe('createPhotoComment');
    });

    it('should have /{photo-id}/likes path with GET, POST, and DELETE operations', () => {
      expect(spec.paths['/{photo-id}/likes']).toBeDefined();
      expect(spec.paths['/{photo-id}/likes'].get).toBeDefined();
      expect(spec.paths['/{photo-id}/likes'].get?.operationId).toBe('getPhotoLikes');
      expect(spec.paths['/{photo-id}/likes'].post).toBeDefined();
      expect(spec.paths['/{photo-id}/likes'].post?.operationId).toBe('createPhotoLike');
      expect(spec.paths['/{photo-id}/likes'].delete).toBeDefined();
      expect(spec.paths['/{photo-id}/likes'].delete?.operationId).toBe('deletePhotoLike');
    });
  });

  describe('Album Endpoints', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have /{album-id} path with GET and DELETE operations', () => {
      expect(spec.paths['/{album-id}']).toBeDefined();
      expect(spec.paths['/{album-id}'].get).toBeDefined();
      expect(spec.paths['/{album-id}'].get?.operationId).toBe('getAlbum');
      expect(spec.paths['/{album-id}'].delete).toBeDefined();
      expect(spec.paths['/{album-id}'].delete?.operationId).toBe('deleteAlbum');
    });

    it('should have /{album-id}/photos path with GET and POST operations', () => {
      expect(spec.paths['/{album-id}/photos']).toBeDefined();
      expect(spec.paths['/{album-id}/photos'].get).toBeDefined();
      expect(spec.paths['/{album-id}/photos'].get?.operationId).toBe('getAlbumPhotos');
      expect(spec.paths['/{album-id}/photos'].post).toBeDefined();
      expect(spec.paths['/{album-id}/photos'].post?.operationId).toBe('addPhotoToAlbum');
    });
  });

  describe('Comment Endpoints', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have /{comment-id} path with GET and DELETE operations', () => {
      expect(spec.paths['/{comment-id}']).toBeDefined();
      expect(spec.paths['/{comment-id}'].get).toBeDefined();
      expect(spec.paths['/{comment-id}'].get?.operationId).toBe('getComment');
      expect(spec.paths['/{comment-id}'].delete).toBeDefined();
      expect(spec.paths['/{comment-id}'].delete?.operationId).toBe('deleteComment');
    });

    it('should have /{comment-id}/likes path with GET, POST, and DELETE operations', () => {
      expect(spec.paths['/{comment-id}/likes']).toBeDefined();
      expect(spec.paths['/{comment-id}/likes'].get).toBeDefined();
      expect(spec.paths['/{comment-id}/likes'].get?.operationId).toBe('getCommentLikes');
      expect(spec.paths['/{comment-id}/likes'].post).toBeDefined();
      expect(spec.paths['/{comment-id}/likes'].post?.operationId).toBe('createCommentLike');
      expect(spec.paths['/{comment-id}/likes'].delete).toBeDefined();
      expect(spec.paths['/{comment-id}/likes'].delete?.operationId).toBe('deleteCommentLike');
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
        // User operations
        'getMe',
        'getUser',
        'getUserPosts',
        'getUserPhotos',
        'createUserPhoto',
        'getUserAlbums',
        'createUserAlbum',
        'getUserFriends',
        // Page operations
        'getPage',
        'getPageFeed',
        'createPagePost',
        'getPagePosts',
        'getPageInsights',
        'getPagePhotos',
        'createPagePhoto',
        'getPageAlbums',
        'createPageAlbum',
        // Post operations
        'getPost',
        'deletePost',
        'getPostComments',
        'createPostComment',
        'getPostLikes',
        'createPostLike',
        'deletePostLike',
        'getPostReactions',
        'getPostShares',
        'getPostInsights',
        // Photo operations
        'getPhoto',
        'deletePhoto',
        'getPhotoComments',
        'createPhotoComment',
        'getPhotoLikes',
        'createPhotoLike',
        'deletePhotoLike',
        // Album operations
        'getAlbum',
        'deleteAlbum',
        'getAlbumPhotos',
        'addPhotoToAlbum',
        // Comment operations
        'getComment',
        'deleteComment',
        'getCommentLikes',
        'createCommentLike',
        'deleteCommentLike',
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

    it('should have UserProfile schema', () => {
      expect(spec.components.schemas.UserProfile).toBeDefined();
      expect(spec.components.schemas.UserProfile.type).toBe('object');
      expect(spec.components.schemas.UserProfile.required).toContain('id');
      expect(spec.components.schemas.UserProfile.required).toContain('name');
    });

    it('should have Page schema', () => {
      expect(spec.components.schemas.Page).toBeDefined();
      expect(spec.components.schemas.Page.type).toBe('object');
      expect(spec.components.schemas.Page.required).toContain('id');
      expect(spec.components.schemas.Page.required).toContain('name');
    });

    it('should have Post schema', () => {
      expect(spec.components.schemas.Post).toBeDefined();
      expect(spec.components.schemas.Post.type).toBe('object');
      expect(spec.components.schemas.Post.required).toContain('id');
      expect(spec.components.schemas.Post.required).toContain('created_time');
    });

    it('should have Photo schema', () => {
      expect(spec.components.schemas.Photo).toBeDefined();
      expect(spec.components.schemas.Photo.type).toBe('object');
      expect(spec.components.schemas.Photo.required).toContain('id');
      expect(spec.components.schemas.Photo.required).toContain('created_time');
    });

    it('should have Album schema', () => {
      expect(spec.components.schemas.Album).toBeDefined();
      expect(spec.components.schemas.Album.type).toBe('object');
      expect(spec.components.schemas.Album.required).toContain('id');
      expect(spec.components.schemas.Album.required).toContain('name');
    });

    it('should have Comment schema', () => {
      expect(spec.components.schemas.Comment).toBeDefined();
      expect(spec.components.schemas.Comment.type).toBe('object');
      expect(spec.components.schemas.Comment.required).toContain('id');
      expect(spec.components.schemas.Comment.required).toContain('created_time');
    });

    it('should have feed schemas', () => {
      expect(spec.components.schemas.PageFeed).toBeDefined();
      expect(spec.components.schemas.PostFeed).toBeDefined();
      expect(spec.components.schemas.PhotoFeed).toBeDefined();
      expect(spec.components.schemas.AlbumFeed).toBeDefined();
      expect(spec.components.schemas.CommentFeed).toBeDefined();
      expect(spec.components.schemas.LikesFeed).toBeDefined();
      expect(spec.components.schemas.ReactionsFeed).toBeDefined();
      expect(spec.components.schemas.SharesFeed).toBeDefined();
      expect(spec.components.schemas.FriendsFeed).toBeDefined();
    });

    it('should have request schemas', () => {
      expect(spec.components.schemas.CreatePostRequest).toBeDefined();
      expect(spec.components.schemas.CreatePhotoRequest).toBeDefined();
      expect(spec.components.schemas.CreateAlbumRequest).toBeDefined();
      expect(spec.components.schemas.CreateCommentRequest).toBeDefined();
    });

    it('should have response schemas', () => {
      expect(spec.components.schemas.CreatePostResponse).toBeDefined();
      expect(spec.components.schemas.CreatePhotoResponse).toBeDefined();
      expect(spec.components.schemas.CreateAlbumResponse).toBeDefined();
      expect(spec.components.schemas.CreateCommentResponse).toBeDefined();
      expect(spec.components.schemas.PageInsights).toBeDefined();
      expect(spec.components.schemas.PostInsights).toBeDefined();
      expect(spec.components.schemas.DeleteResponse).toBeDefined();
      expect(spec.components.schemas.LikeResponse).toBeDefined();
    });

    it('should have Like and Reaction schemas', () => {
      expect(spec.components.schemas.Like).toBeDefined();
      expect(spec.components.schemas.Reaction).toBeDefined();
      expect(spec.components.schemas.Reaction.properties.type.enum).toEqual([
        'LIKE',
        'LOVE',
        'WOW',
        'HAHA',
        'SAD',
        'ANGRY',
        'CARE',
      ]);
    });

    it('should have Paging schema', () => {
      expect(spec.components.schemas.Paging).toBeDefined();
      expect(spec.components.schemas.Paging.type).toBe('object');
      expect(spec.components.schemas.Paging.properties.cursors).toBeDefined();
    });
  });

  describe('Parameters', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have path parameters defined correctly', () => {
      const getUserOp = spec.paths['/{user-id}'].get;
      expect(getUserOp?.parameters).toBeDefined();

      const userIdParam = getUserOp?.parameters?.find(p => p.name === 'user-id');
      expect(userIdParam).toBeDefined();
      expect(userIdParam?.in).toBe('path');
      expect(userIdParam?.required).toBe(true);
    });

    it('should have query parameters defined correctly', () => {
      const getMeOp = spec.paths['/me'].get;
      expect(getMeOp?.parameters).toBeDefined();

      const fieldsParam = getMeOp?.parameters?.find(p => p.name === 'fields');
      expect(fieldsParam).toBeDefined();
      expect(fieldsParam?.in).toBe('query');
    });

    it('should have pagination parameters in list operations', () => {
      const getPageFeedOp = spec.paths['/{page-id}/feed'].get;

      const limitParam = getPageFeedOp?.parameters?.find(p => p.name === 'limit');
      const fieldsParam = getPageFeedOp?.parameters?.find(p => p.name === 'fields');

      expect(limitParam).toBeDefined();
      expect(fieldsParam).toBeDefined();
    });

    it('should have reaction type parameter with enum', () => {
      const getReactionsOp = spec.paths['/{post-id}/reactions'].get;
      const typeParam = getReactionsOp?.parameters?.find(p => p.name === 'type');

      expect(typeParam).toBeDefined();
      expect(typeParam?.schema?.enum).toEqual([
        'LIKE',
        'LOVE',
        'WOW',
        'HAHA',
        'SAD',
        'ANGRY',
        'CARE',
      ]);
    });
  });

  describe('Request Bodies', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have request body for POST operations', () => {
      const createPostOp = spec.paths['/{page-id}/feed'].post;
      expect(createPostOp?.requestBody).toBeDefined();
      expect(createPostOp?.requestBody?.required).toBe(true);
      expect(createPostOp?.requestBody?.content['application/json']).toBeDefined();
    });

    it('should have correct schema references in request bodies', () => {
      const createPostOp = spec.paths['/{page-id}/feed'].post;
      const schema = createPostOp?.requestBody?.content['application/json'].schema;

      expect(schema).toBeDefined();
      expect('$ref' in schema! && schema.$ref).toBe('#/components/schemas/CreatePostRequest');
    });

    it('should have request body for comment creation', () => {
      const createCommentOp = spec.paths['/{post-id}/comments'].post;
      const schema = createCommentOp?.requestBody?.content['application/json'].schema;

      expect(schema).toBeDefined();
      expect('$ref' in schema! && schema.$ref).toBe('#/components/schemas/CreateCommentRequest');
    });
  });

  describe('Responses', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have success responses defined', () => {
      const getMeOp = spec.paths['/me'].get;
      expect(getMeOp?.responses['200']).toBeDefined();
    });

    it('should have correct response schemas', () => {
      const getMeOp = spec.paths['/me'].get;
      const responseSchema = getMeOp?.responses['200'].content?.['application/json'].schema;

      expect(responseSchema).toBeDefined();
      expect('$ref' in responseSchema!).toBe(true);
      if ('$ref' in responseSchema!) {
        expect(responseSchema.$ref).toBe('#/components/schemas/UserProfile');
      }
    });

    it('should have 200 response for all GET operations', () => {
      const getOperations = [
        spec.paths['/me'].get,
        spec.paths['/{user-id}'].get,
        spec.paths['/{page-id}'].get,
        spec.paths['/{post-id}'].get,
        spec.paths['/{photo-id}'].get,
        spec.paths['/{album-id}'].get,
        spec.paths['/{comment-id}'].get,
      ];

      for (const operation of getOperations) {
        expect(operation?.responses['200']).toBeDefined();
      }
    });

    it('should have 200 response for DELETE operations', () => {
      const deleteOperations = [
        spec.paths['/{post-id}'].delete,
        spec.paths['/{photo-id}'].delete,
        spec.paths['/{album-id}'].delete,
        spec.paths['/{comment-id}'].delete,
      ];

      for (const operation of deleteOperations) {
        expect(operation?.responses['200']).toBeDefined();
        const schema = operation?.responses['200'].content?.['application/json'].schema;
        expect('$ref' in schema! && schema.$ref).toBe('#/components/schemas/DeleteResponse');
      }
    });
  });
});
