/**
 * Types Test Suite
 *
 * This test suite verifies that all types defined in the OpenAPI specification
 * are correctly generated and exported.
 */

import { describe, it, expect } from 'vitest';
import * as Types from '../lib/types';

describe('Generated Types', () => {
  describe('Core Entity Types', () => {
    it('should export User interface', () => {
      const user: Types.User = {
        name: 'testuser',
        id: 't2_abc123',
      };

      expect(user.name).toBe('testuser');
      expect(user.id).toBe('t2_abc123');
    });

    it('should export User with optional fields', () => {
      const user: Types.User = {
        name: 'testuser',
        id: 't2_abc123',
        created_utc: 1234567890,
        link_karma: 1000,
        comment_karma: 5000,
        is_gold: true,
        is_mod: false,
        has_verified_email: true,
        icon_img: 'https://example.com/icon.png',
      };

      expect(user.link_karma).toBe(1000);
      expect(user.comment_karma).toBe(5000);
      expect(user.is_gold).toBe(true);
    });

    it('should export Post interface', () => {
      const post: Types.Post = {
        id: 'abc123',
        title: 'Test Post',
        subreddit: 'test',
      };

      expect(post.id).toBe('abc123');
      expect(post.title).toBe('Test Post');
      expect(post.subreddit).toBe('test');
    });

    it('should export Post with optional fields', () => {
      const post: Types.Post = {
        id: 'abc123',
        title: 'Test Post',
        subreddit: 'test',
        name: 't3_abc123',
        selftext: 'Post content',
        author: 'testuser',
        score: 100,
        upvote_ratio: 0.95,
        num_comments: 25,
        created_utc: 1234567890,
        url: 'https://reddit.com/r/test/comments/abc123',
        permalink: '/r/test/comments/abc123',
        is_self: true,
        over_18: false,
      };

      expect(post.author).toBe('testuser');
      expect(post.score).toBe(100);
      expect(post.num_comments).toBe(25);
    });

    it('should export Subreddit interface', () => {
      const subreddit: Types.Subreddit = {
        display_name: 'programming',
        id: 't5_abc123',
      };

      expect(subreddit.display_name).toBe('programming');
      expect(subreddit.id).toBe('t5_abc123');
    });

    it('should export Subreddit with optional fields', () => {
      const subreddit: Types.Subreddit = {
        display_name: 'programming',
        id: 't5_abc123',
        title: 'Programming',
        public_description: 'A subreddit for programming',
        subscribers: 1000000,
        created_utc: 1234567890,
        over18: false,
        icon_img: 'https://example.com/icon.png',
      };

      expect(subreddit.subscribers).toBe(1000000);
      expect(subreddit.over18).toBe(false);
    });
  });

  describe('Response Container Types', () => {
    it('should export KarmaResponse interface', () => {
      const karmaResponse: Types.KarmaResponse = {
        kind: 'KarmaList',
        data: [
          { sr: 'programming', comment_karma: 100, link_karma: 50 },
          { sr: 'javascript', comment_karma: 200, link_karma: 75 },
        ],
      };

      expect(karmaResponse.kind).toBe('KarmaList');
      expect(karmaResponse.data).toHaveLength(2);
    });

    it('should export ListingResponse interface', () => {
      const listingResponse: Types.ListingResponse = {
        kind: 'Listing',
        data: {
          after: 't3_after',
          before: 't3_before',
          children: [
            {
              kind: 't3',
              data: { id: 'abc123', title: 'Post 1', subreddit: 'test' },
            },
          ],
          dist: 1,
        },
      };

      expect(listingResponse.kind).toBe('Listing');
      expect(listingResponse.data?.children).toHaveLength(1);
    });

    it('should export UserAboutResponse interface', () => {
      const userAboutResponse: Types.UserAboutResponse = {
        kind: 't2',
        data: {
          name: 'testuser',
          id: 't2_abc123',
        },
      };

      expect(userAboutResponse.kind).toBe('t2');
      expect(userAboutResponse.data?.name).toBe('testuser');
    });

    it('should export SubredditAboutResponse interface', () => {
      const subredditAboutResponse: Types.SubredditAboutResponse = {
        kind: 't5',
        data: {
          display_name: 'programming',
          id: 't5_abc123',
        },
      };

      expect(subredditAboutResponse.kind).toBe('t5');
      expect(subredditAboutResponse.data?.display_name).toBe('programming');
    });
  });

  describe('Request Types', () => {
    it('should export SubmitPostRequest interface', () => {
      const request: Types.SubmitPostRequest = {
        sr: 'test',
        title: 'Test Post',
        kind: 'self',
      };

      expect(request.sr).toBe('test');
      expect(request.title).toBe('Test Post');
      expect(request.kind).toBe('self');
    });

    it('should export SubmitPostRequest with optional fields', () => {
      const request: Types.SubmitPostRequest = {
        sr: 'test',
        title: 'Test Post',
        kind: 'link',
        text: 'Post content',
        url: 'https://example.com',
        nsfw: false,
        spoiler: false,
      };

      expect(request.url).toBe('https://example.com');
      expect(request.nsfw).toBe(false);
    });

    it('should export CommentRequest interface', () => {
      const request: Types.CommentRequest = {
        thing_id: 't3_abc123',
        text: 'This is a comment',
      };

      expect(request.thing_id).toBe('t3_abc123');
      expect(request.text).toBe('This is a comment');
    });

    it('should export VoteRequest interface', () => {
      const request: Types.VoteRequest = {
        id: 't3_abc123',
        dir: 1,
      };

      expect(request.id).toBe('t3_abc123');
      expect(request.dir).toBe(1);
    });

    it('should export SaveRequest interface', () => {
      const request: Types.SaveRequest = {
        id: 't3_abc123',
      };

      expect(request.id).toBe('t3_abc123');
    });

    it('should export SaveRequest with optional fields', () => {
      const request: Types.SaveRequest = {
        id: 't3_abc123',
        category: 'favorites',
      };

      expect(request.category).toBe('favorites');
    });

    it('should export SearchSubredditsRequest interface', () => {
      const request: Types.SearchSubredditsRequest = {
        query: 'programming',
      };

      expect(request.query).toBe('programming');
    });

    it('should export SearchSubredditsRequest with optional fields', () => {
      const request: Types.SearchSubredditsRequest = {
        query: 'programming',
        include_over_18: false,
        include_unadvertisable: true,
      };

      expect(request.include_over_18).toBe(false);
      expect(request.include_unadvertisable).toBe(true);
    });
  });

  describe('Response Types', () => {
    it('should export SubmitResponse interface', () => {
      const response: Types.SubmitResponse = {
        json: {
          errors: [],
          data: {
            url: 'https://reddit.com/r/test/comments/abc123',
            id: 'abc123',
            name: 't3_abc123',
          },
        },
      };

      expect(response.json?.data?.id).toBe('abc123');
    });

    it('should export CommentResponse interface', () => {
      const response: Types.CommentResponse = {
        json: {
          errors: [],
          data: {},
        },
      };

      expect(response.json?.errors).toEqual([]);
    });

    it('should export VoteResponse interface', () => {
      const response: Types.VoteResponse = {
        success: true,
      };

      expect(response.success).toBe(true);
    });

    it('should export SaveResponse interface', () => {
      const response: Types.SaveResponse = {
        success: true,
      };

      expect(response.success).toBe(true);
    });

    it('should export SearchSubredditsResponse interface', () => {
      const response: Types.SearchSubredditsResponse = {
        subreddits: [
          {
            name: 'programming',
            subscriber_count: 1000000,
            active_user_count: 10000,
            icon_img: 'https://example.com/icon.png',
          },
        ],
      };

      expect(response.subreddits).toHaveLength(1);
      expect(response.subreddits?.[0].name).toBe('programming');
    });
  });

  describe('Utility Types', () => {
    it('should export KarmaBreakdown interface', () => {
      const karma: Types.KarmaBreakdown = {
        sr: 'programming',
        comment_karma: 100,
        link_karma: 50,
      };

      expect(karma.sr).toBe('programming');
      expect(karma.comment_karma).toBe(100);
    });

    it('should export ListingData interface', () => {
      const listingData: Types.ListingData = {
        after: 't3_after',
        before: 't3_before',
        children: [],
        dist: 0,
      };

      expect(listingData.after).toBe('t3_after');
      expect(listingData.dist).toBe(0);
    });

    it('should export PostWrapper interface', () => {
      const postWrapper: Types.PostWrapper = {
        kind: 't3',
        data: {
          id: 'abc123',
          title: 'Test Post',
          subreddit: 'test',
        },
      };

      expect(postWrapper.kind).toBe('t3');
      expect(postWrapper.data?.title).toBe('Test Post');
    });

    it('should export SubredditSearchResult interface', () => {
      const result: Types.SubredditSearchResult = {
        name: 'programming',
        subscriber_count: 1000000,
        active_user_count: 10000,
      };

      expect(result.name).toBe('programming');
      expect(result.subscriber_count).toBe(1000000);
    });
  });

  describe('Type Structure Validation', () => {
    it('should have User with all required fields', () => {
      const user: Types.User = {
        name: 'test',
        id: 't2_123',
      };

      // TypeScript compilation ensures required fields are present
      expect(user).toBeDefined();
    });

    it('should have Post with all required fields', () => {
      const post: Types.Post = {
        id: 'abc123',
        title: 'Test',
        subreddit: 'test',
      };

      // TypeScript compilation ensures required fields are present
      expect(post).toBeDefined();
    });

    it('should have Subreddit with all required fields', () => {
      const subreddit: Types.Subreddit = {
        display_name: 'test',
        id: 't5_123',
      };

      // TypeScript compilation ensures required fields are present
      expect(subreddit).toBeDefined();
    });

    it('should have SubmitPostRequest with required fields', () => {
      const request: Types.SubmitPostRequest = {
        sr: 'test',
        title: 'Test',
        kind: 'self',
      };

      // TypeScript compilation ensures required fields are present
      expect(request).toBeDefined();
    });

    it('should have CommentRequest with required fields', () => {
      const request: Types.CommentRequest = {
        thing_id: 't3_123',
        text: 'Test comment',
      };

      // TypeScript compilation ensures required fields are present
      expect(request).toBeDefined();
    });

    it('should have VoteRequest with required fields', () => {
      const request: Types.VoteRequest = {
        id: 't3_123',
        dir: 1,
      };

      // TypeScript compilation ensures required fields are present
      expect(request).toBeDefined();
    });

    it('should have SaveRequest with required fields', () => {
      const request: Types.SaveRequest = {
        id: 't3_123',
      };

      // TypeScript compilation ensures required fields are present
      expect(request).toBeDefined();
    });

    it('should have SearchSubredditsRequest with required fields', () => {
      const request: Types.SearchSubredditsRequest = {
        query: 'test',
      };

      // TypeScript compilation ensures required fields are present
      expect(request).toBeDefined();
    });
  });
});
