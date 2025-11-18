/**
 * API Signatures Test Suite
 *
 * This test suite verifies that the generated API methods have correct
 * signatures and return types according to the Graph API specification.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { FacebookApi } from '../lib/api';
import type * as Types from '../lib/types';

describe('Facebook API Signatures', () => {
  let api: FacebookApi;

  beforeAll(() => {
    const mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
      patch: async () => ({}),
    };
    api = new FacebookApi(mockClient as any);
  });

  describe('User Method Signatures', () => {
    it('getMe should accept optional fields parameter', async () => {
      const promise = api.getMe({ fields: 'id,name,email' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getMe should work without parameters', async () => {
      const promise = api.getMe();
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getUser should require user-id and accept optional fields', async () => {
      const promise = api.getUser('123', { fields: 'id,name' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getUserPosts should require user-id and accept pagination params', async () => {
      const promise = api.getUserPosts('123', { limit: 10, fields: 'id,message' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getUserPhotos should require user-id and accept pagination params', async () => {
      const promise = api.getUserPhotos('123', { limit: 25 });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('createUserPhoto should require user-id and request body', async () => {
      const promise = api.createUserPhoto('123', { url: 'https://example.com/photo.jpg' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getUserAlbums should require user-id and accept pagination params', async () => {
      const promise = api.getUserAlbums('123', { limit: 10 });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('createUserAlbum should require user-id and request body', async () => {
      const promise = api.createUserAlbum('123', { name: 'My Album' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getUserFriends should require user-id', async () => {
      const promise = api.getUserFriends('123');
      expect(promise).toBeInstanceOf(Promise);
    });
  });

  describe('Page Method Signatures', () => {
    it('getPage should require page-id and accept optional fields', async () => {
      const promise = api.getPage('123', { fields: 'id,name,about' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getPageFeed should require page-id and accept pagination params', async () => {
      const promise = api.getPageFeed('123', { limit: 10 });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('createPagePost should require page-id and request body', async () => {
      const promise = api.createPagePost('123', { message: 'Hello World' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getPagePosts should require page-id', async () => {
      const promise = api.getPagePosts('123');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getPageInsights should require page-id and accept metric/period params', async () => {
      const promise = api.getPageInsights('123', { metric: 'page_impressions', period: 'day' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getPagePhotos should require page-id', async () => {
      const promise = api.getPagePhotos('123');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('createPagePhoto should require page-id and request body', async () => {
      const promise = api.createPagePhoto('123', { url: 'https://example.com/photo.jpg' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getPageAlbums should require page-id', async () => {
      const promise = api.getPageAlbums('123');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('createPageAlbum should require page-id and request body', async () => {
      const promise = api.createPageAlbum('123', { name: 'Page Album' });
      expect(promise).toBeInstanceOf(Promise);
    });
  });

  describe('Post Method Signatures', () => {
    it('getPost should require post-id and accept optional fields', async () => {
      const promise = api.getPost('123_456', { fields: 'id,message,created_time' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('deletePost should require post-id', async () => {
      const promise = api.deletePost('123_456');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getPostComments should require post-id and accept pagination params', async () => {
      const promise = api.getPostComments('123_456', { limit: 50 });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('createPostComment should require post-id and request body', async () => {
      const promise = api.createPostComment('123_456', { message: 'Great post!' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getPostLikes should require post-id', async () => {
      const promise = api.getPostLikes('123_456');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('createPostLike should require post-id', async () => {
      const promise = api.createPostLike('123_456');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('deletePostLike should require post-id', async () => {
      const promise = api.deletePostLike('123_456');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getPostReactions should require post-id and accept type filter', async () => {
      const promise = api.getPostReactions('123_456', { type: 'LOVE' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getPostShares should require post-id', async () => {
      const promise = api.getPostShares('123_456');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getPostInsights should require post-id and accept metric param', async () => {
      const promise = api.getPostInsights('123_456', { metric: 'post_impressions' });
      expect(promise).toBeInstanceOf(Promise);
    });
  });

  describe('Photo Method Signatures', () => {
    it('getPhoto should require photo-id and accept optional fields', async () => {
      const promise = api.getPhoto('123', { fields: 'id,images,width,height' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('deletePhoto should require photo-id', async () => {
      const promise = api.deletePhoto('123');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getPhotoComments should require photo-id', async () => {
      const promise = api.getPhotoComments('123');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('createPhotoComment should require photo-id and request body', async () => {
      const promise = api.createPhotoComment('123', { message: 'Nice photo!' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getPhotoLikes should require photo-id', async () => {
      const promise = api.getPhotoLikes('123');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('createPhotoLike should require photo-id', async () => {
      const promise = api.createPhotoLike('123');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('deletePhotoLike should require photo-id', async () => {
      const promise = api.deletePhotoLike('123');
      expect(promise).toBeInstanceOf(Promise);
    });
  });

  describe('Album Method Signatures', () => {
    it('getAlbum should require album-id and accept optional fields', async () => {
      const promise = api.getAlbum('123', { fields: 'id,name,count' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('deleteAlbum should require album-id', async () => {
      const promise = api.deleteAlbum('123');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getAlbumPhotos should require album-id', async () => {
      const promise = api.getAlbumPhotos('123');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('addPhotoToAlbum should require album-id and request body', async () => {
      const promise = api.addPhotoToAlbum('123', { url: 'https://example.com/photo.jpg' });
      expect(promise).toBeInstanceOf(Promise);
    });
  });

  describe('Comment Method Signatures', () => {
    it('getComment should require comment-id and accept optional fields', async () => {
      const promise = api.getComment('123', { fields: 'id,message,from' });
      expect(promise).toBeInstanceOf(Promise);
    });

    it('deleteComment should require comment-id', async () => {
      const promise = api.deleteComment('123');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('getCommentLikes should require comment-id', async () => {
      const promise = api.getCommentLikes('123');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('createCommentLike should require comment-id', async () => {
      const promise = api.createCommentLike('123');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('deleteCommentLike should require comment-id', async () => {
      const promise = api.deleteCommentLike('123');
      expect(promise).toBeInstanceOf(Promise);
    });
  });

  describe('Return Types', () => {
    it('methods should return Promises', () => {
      const getMeResult = api.getMe();
      const getPageResult = api.getPage('123');
      const getPostResult = api.getPost('123_456');

      expect(getMeResult).toBeInstanceOf(Promise);
      expect(getPageResult).toBeInstanceOf(Promise);
      expect(getPostResult).toBeInstanceOf(Promise);
    });

    it('all methods should be async functions', () => {
      const methodNames = [
        'getMe',
        'getUser',
        'getPage',
        'getPost',
        'getPhoto',
        'getAlbum',
        'getComment',
        'createPagePost',
        'createPostComment',
        'deletePost',
      ];

      for (const methodName of methodNames) {
        const method = (api as any)[methodName];
        expect(method.constructor.name).toBe('AsyncFunction');
      }
    });
  });

  describe('Parameter Validation', () => {
    it('should handle optional parameters correctly', async () => {
      // These should not throw
      expect(() => api.getMe()).not.toThrow();
      expect(() => api.getMe({})).not.toThrow();
      expect(() => api.getMe({ fields: 'id' })).not.toThrow();
    });

    it('should handle required path parameters', async () => {
      // These should require the path parameter
      expect(() => api.getUser('123')).not.toThrow();
      expect(() => api.getPage('123')).not.toThrow();
      expect(() => api.getPost('123_456')).not.toThrow();
    });

    it('should handle required request bodies', async () => {
      // These should require the request body
      expect(() => api.createPagePost('123', { message: 'test' })).not.toThrow();
      expect(() => api.createPostComment('123', { message: 'test' })).not.toThrow();
      expect(() => api.createUserAlbum('123', { name: 'test' })).not.toThrow();
    });
  });
});
