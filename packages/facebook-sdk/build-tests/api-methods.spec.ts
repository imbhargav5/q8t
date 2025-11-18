/**
 * API Methods Test Suite
 *
 * This test suite verifies that the generated FacebookApi class contains all
 * expected methods from the Graph API specification.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { FacebookApi } from '../lib/api';

describe('Facebook API Methods', () => {
  let api: FacebookApi;

  beforeAll(() => {
    // Create a mock HTTP client
    const mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
      patch: async () => ({}),
    };
    api = new FacebookApi(mockClient as any);
  });

  describe('User Methods', () => {
    it('should have getMe method', () => {
      expect(api.getMe).toBeDefined();
      expect(typeof api.getMe).toBe('function');
    });

    it('should have getUser method', () => {
      expect(api.getUser).toBeDefined();
      expect(typeof api.getUser).toBe('function');
    });

    it('should have getUserPosts method', () => {
      expect(api.getUserPosts).toBeDefined();
      expect(typeof api.getUserPosts).toBe('function');
    });

    it('should have getUserPhotos method', () => {
      expect(api.getUserPhotos).toBeDefined();
      expect(typeof api.getUserPhotos).toBe('function');
    });

    it('should have createUserPhoto method', () => {
      expect(api.createUserPhoto).toBeDefined();
      expect(typeof api.createUserPhoto).toBe('function');
    });

    it('should have getUserAlbums method', () => {
      expect(api.getUserAlbums).toBeDefined();
      expect(typeof api.getUserAlbums).toBe('function');
    });

    it('should have createUserAlbum method', () => {
      expect(api.createUserAlbum).toBeDefined();
      expect(typeof api.createUserAlbum).toBe('function');
    });

    it('should have getUserFriends method', () => {
      expect(api.getUserFriends).toBeDefined();
      expect(typeof api.getUserFriends).toBe('function');
    });
  });

  describe('Page Methods', () => {
    it('should have getPage method', () => {
      expect(api.getPage).toBeDefined();
      expect(typeof api.getPage).toBe('function');
    });

    it('should have getPageFeed method', () => {
      expect(api.getPageFeed).toBeDefined();
      expect(typeof api.getPageFeed).toBe('function');
    });

    it('should have createPagePost method', () => {
      expect(api.createPagePost).toBeDefined();
      expect(typeof api.createPagePost).toBe('function');
    });

    it('should have getPagePosts method', () => {
      expect(api.getPagePosts).toBeDefined();
      expect(typeof api.getPagePosts).toBe('function');
    });

    it('should have getPageInsights method', () => {
      expect(api.getPageInsights).toBeDefined();
      expect(typeof api.getPageInsights).toBe('function');
    });

    it('should have getPagePhotos method', () => {
      expect(api.getPagePhotos).toBeDefined();
      expect(typeof api.getPagePhotos).toBe('function');
    });

    it('should have createPagePhoto method', () => {
      expect(api.createPagePhoto).toBeDefined();
      expect(typeof api.createPagePhoto).toBe('function');
    });

    it('should have getPageAlbums method', () => {
      expect(api.getPageAlbums).toBeDefined();
      expect(typeof api.getPageAlbums).toBe('function');
    });

    it('should have createPageAlbum method', () => {
      expect(api.createPageAlbum).toBeDefined();
      expect(typeof api.createPageAlbum).toBe('function');
    });
  });

  describe('Post Methods', () => {
    it('should have getPost method', () => {
      expect(api.getPost).toBeDefined();
      expect(typeof api.getPost).toBe('function');
    });

    it('should have deletePost method', () => {
      expect(api.deletePost).toBeDefined();
      expect(typeof api.deletePost).toBe('function');
    });

    it('should have getPostComments method', () => {
      expect(api.getPostComments).toBeDefined();
      expect(typeof api.getPostComments).toBe('function');
    });

    it('should have createPostComment method', () => {
      expect(api.createPostComment).toBeDefined();
      expect(typeof api.createPostComment).toBe('function');
    });

    it('should have getPostLikes method', () => {
      expect(api.getPostLikes).toBeDefined();
      expect(typeof api.getPostLikes).toBe('function');
    });

    it('should have createPostLike method', () => {
      expect(api.createPostLike).toBeDefined();
      expect(typeof api.createPostLike).toBe('function');
    });

    it('should have deletePostLike method', () => {
      expect(api.deletePostLike).toBeDefined();
      expect(typeof api.deletePostLike).toBe('function');
    });

    it('should have getPostReactions method', () => {
      expect(api.getPostReactions).toBeDefined();
      expect(typeof api.getPostReactions).toBe('function');
    });

    it('should have getPostShares method', () => {
      expect(api.getPostShares).toBeDefined();
      expect(typeof api.getPostShares).toBe('function');
    });

    it('should have getPostInsights method', () => {
      expect(api.getPostInsights).toBeDefined();
      expect(typeof api.getPostInsights).toBe('function');
    });
  });

  describe('Photo Methods', () => {
    it('should have getPhoto method', () => {
      expect(api.getPhoto).toBeDefined();
      expect(typeof api.getPhoto).toBe('function');
    });

    it('should have deletePhoto method', () => {
      expect(api.deletePhoto).toBeDefined();
      expect(typeof api.deletePhoto).toBe('function');
    });

    it('should have getPhotoComments method', () => {
      expect(api.getPhotoComments).toBeDefined();
      expect(typeof api.getPhotoComments).toBe('function');
    });

    it('should have createPhotoComment method', () => {
      expect(api.createPhotoComment).toBeDefined();
      expect(typeof api.createPhotoComment).toBe('function');
    });

    it('should have getPhotoLikes method', () => {
      expect(api.getPhotoLikes).toBeDefined();
      expect(typeof api.getPhotoLikes).toBe('function');
    });

    it('should have createPhotoLike method', () => {
      expect(api.createPhotoLike).toBeDefined();
      expect(typeof api.createPhotoLike).toBe('function');
    });

    it('should have deletePhotoLike method', () => {
      expect(api.deletePhotoLike).toBeDefined();
      expect(typeof api.deletePhotoLike).toBe('function');
    });
  });

  describe('Album Methods', () => {
    it('should have getAlbum method', () => {
      expect(api.getAlbum).toBeDefined();
      expect(typeof api.getAlbum).toBe('function');
    });

    it('should have deleteAlbum method', () => {
      expect(api.deleteAlbum).toBeDefined();
      expect(typeof api.deleteAlbum).toBe('function');
    });

    it('should have getAlbumPhotos method', () => {
      expect(api.getAlbumPhotos).toBeDefined();
      expect(typeof api.getAlbumPhotos).toBe('function');
    });

    it('should have addPhotoToAlbum method', () => {
      expect(api.addPhotoToAlbum).toBeDefined();
      expect(typeof api.addPhotoToAlbum).toBe('function');
    });
  });

  describe('Comment Methods', () => {
    it('should have getComment method', () => {
      expect(api.getComment).toBeDefined();
      expect(typeof api.getComment).toBe('function');
    });

    it('should have deleteComment method', () => {
      expect(api.deleteComment).toBeDefined();
      expect(typeof api.deleteComment).toBe('function');
    });

    it('should have getCommentLikes method', () => {
      expect(api.getCommentLikes).toBeDefined();
      expect(typeof api.getCommentLikes).toBe('function');
    });

    it('should have createCommentLike method', () => {
      expect(api.createCommentLike).toBeDefined();
      expect(typeof api.createCommentLike).toBe('function');
    });

    it('should have deleteCommentLike method', () => {
      expect(api.deleteCommentLike).toBeDefined();
      expect(typeof api.deleteCommentLike).toBe('function');
    });
  });

  describe('Method Count', () => {
    it('should have all 43 expected API methods', () => {
      const expectedMethods = [
        // User methods (8)
        'getMe',
        'getUser',
        'getUserPosts',
        'getUserPhotos',
        'createUserPhoto',
        'getUserAlbums',
        'createUserAlbum',
        'getUserFriends',
        // Page methods (9)
        'getPage',
        'getPageFeed',
        'createPagePost',
        'getPagePosts',
        'getPageInsights',
        'getPagePhotos',
        'createPagePhoto',
        'getPageAlbums',
        'createPageAlbum',
        // Post methods (10)
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
        // Photo methods (7)
        'getPhoto',
        'deletePhoto',
        'getPhotoComments',
        'createPhotoComment',
        'getPhotoLikes',
        'createPhotoLike',
        'deletePhotoLike',
        // Album methods (4)
        'getAlbum',
        'deleteAlbum',
        'getAlbumPhotos',
        'addPhotoToAlbum',
        // Comment methods (5)
        'getComment',
        'deleteComment',
        'getCommentLikes',
        'createCommentLike',
        'deleteCommentLike',
      ];

      for (const method of expectedMethods) {
        expect(api).toHaveProperty(method);
        expect(typeof (api as any)[method]).toBe('function');
      }

      expect(expectedMethods).toHaveLength(43);
    });
  });
});
