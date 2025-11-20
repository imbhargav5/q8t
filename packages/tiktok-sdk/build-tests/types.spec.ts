import { describe, it, expect } from 'vitest';
import * as UserOAuthTypes from '../lib/user-oauth/types';
import * as ClientCredentialsTypes from '../lib/client-credentials/types';
import * as BusinessTypes from '../lib/business/types';

describe('User OAuth API Types', () => {
  it('should export UserInfoResponse type', () => {
    const response: UserOAuthTypes.UserInfoResponse = {
      data: {
        user: {
          open_id: 'test123',
          display_name: 'Test User',
        },
      },
      error: {
        code: 'ok',
        message: 'Success',
        log_id: 'log123',
      },
    };
    expect(response).toBeDefined();
    expect(response.data.user.open_id).toBe('test123');
  });

  it('should export VideoListRequest type', () => {
    const request: UserOAuthTypes.VideoListRequest = {
      fields: 'id,title,create_time,view_count',
      max_count: 20,
      cursor: 0,
    };
    expect(request).toBeDefined();
    expect(request.max_count).toBe(20);
  });

  it('should export VideoListResponse type', () => {
    const response: UserOAuthTypes.VideoListResponse = {
      data: {
        videos: [
          {
            id: 'vid123',
            title: 'Test Video',
          },
        ],
        has_more: false,
      },
      error: {
        code: 'ok',
        message: 'Success',
        log_id: 'log123',
      },
    };
    expect(response).toBeDefined();
    expect(response.data.videos).toHaveLength(1);
  });

  it('should export VideoInitRequest type', () => {
    const request: UserOAuthTypes.VideoInitRequest = {
      source_info: {
        source: 'FILE_UPLOAD',
        video_size: 1024000,
        chunk_size: 10240,
        total_chunk_count: 100,
      },
      post_info: {
        title: 'My Video',
        privacy_level: 'PUBLIC_TO_EVERYONE',
      },
    };
    expect(request).toBeDefined();
    expect(request.source_info.source).toBe('FILE_UPLOAD');
  });

  it('should export PublishStatusRequest type', () => {
    const request: UserOAuthTypes.PublishStatusRequest = {
      publish_id: 'pub123',
    };
    expect(request).toBeDefined();
    expect(request.publish_id).toBe('pub123');
  });
});

describe('Client Credentials API Types', () => {
  it('should export ResearchVideoQueryRequest type', () => {
    const request: ClientCredentialsTypes.ResearchVideoQueryRequest = {
      query: {
        and: [
          {
            operation: 'EQ',
            field_name: 'region_code',
            field_values: ['US'],
          },
        ],
      },
      fields: ['id', 'create_time', 'view_count', 'like_count'],
      max_count: 100,
      start_date: '20250101',
      end_date: '20250131',
    };
    expect(request).toBeDefined();
    expect(request.query.and).toHaveLength(1);
  });

  it('should export ResearchUserInfoRequest type', () => {
    const request: ClientCredentialsTypes.ResearchUserInfoRequest = {
      username: 'test_user',
      fields: ['display_name', 'follower_count', 'video_count'],
    };
    expect(request).toBeDefined();
    expect(request.username).toBe('test_user');
  });

  it('should export VideoCommentsRequest type', () => {
    const request: ClientCredentialsTypes.VideoCommentsRequest = {
      video_id: 'vid123',
      fields: ['id', 'text', 'like_count', 'create_time'],
      max_count: 50,
    };
    expect(request).toBeDefined();
    expect(request.video_id).toBe('vid123');
  });

  it('should export AdQueryRequest type', () => {
    const request: ClientCredentialsTypes.AdQueryRequest = {
      filters: {
        ad_published_date_range: {
          start_date: '2025-01-01',
          end_date: '2025-01-31',
        },
        country: ['US', 'UK'],
        search_term: 'technology',
      },
      fields: ['ad_id', 'ad_text', 'advertiser_page_name', 'ad_reach'],
      max_count: 50,
    };
    expect(request).toBeDefined();
    expect(request.filters.country).toContain('US');
  });

  it('should export ResearchVideo type', () => {
    const video: ClientCredentialsTypes.ResearchVideo = {
      id: 'vid123',
      create_time: 1234567890,
      region_code: 'US',
      view_count: 10000,
      like_count: 500,
      comment_count: 50,
      share_count: 25,
    };
    expect(video).toBeDefined();
    expect(video.view_count).toBe(10000);
  });
});

describe('Business API Types', () => {
  it('should export CampaignCreateRequest type', () => {
    const request: BusinessTypes.CampaignCreateRequest = {
      advertiser_id: 'adv123',
      campaign_name: 'Test Campaign',
      objective_type: 'TRAFFIC',
      budget_mode: 'BUDGET_MODE_DAY',
      budget: 100.0,
      operation_status: 'ENABLE',
    };
    expect(request).toBeDefined();
    expect(request.objective_type).toBe('TRAFFIC');
  });

  it('should export Campaign type', () => {
    const campaign: BusinessTypes.Campaign = {
      campaign_id: 'camp123',
      campaign_name: 'Test Campaign',
      advertiser_id: 'adv123',
      objective_type: 'TRAFFIC',
      budget_mode: 'BUDGET_MODE_DAY',
      operation_status: 'ENABLE',
    };
    expect(campaign).toBeDefined();
    expect(campaign.campaign_id).toBe('camp123');
  });

  it('should export AdGroupCreateRequest type', () => {
    const request: BusinessTypes.AdGroupCreateRequest = {
      advertiser_id: 'adv123',
      campaign_id: 'camp123',
      adgroup_name: 'Test Ad Group',
      placement_type: 'PLACEMENT_TYPE_AUTOMATIC',
      gender: 'GENDER_UNLIMITED',
    };
    expect(request).toBeDefined();
    expect(request.placement_type).toBe('PLACEMENT_TYPE_AUTOMATIC');
  });

  it('should export AdCreateRequest type', () => {
    const request: BusinessTypes.AdCreateRequest = {
      advertiser_id: 'adv123',
      adgroup_id: 'adg123',
      ad_name: 'Test Ad',
      ad_format: 'SINGLE_VIDEO',
      operation_status: 'ENABLE',
    };
    expect(request).toBeDefined();
    expect(request.ad_format).toBe('SINGLE_VIDEO');
  });

  it('should export CustomAudienceCreateRequest type', () => {
    const request: BusinessTypes.CustomAudienceCreateRequest = {
      advertiser_id: 'adv123',
      custom_audience_name: 'Test Audience',
      audience_type: 'CUSTOMER_FILE',
      file_paths: ['/path/to/file1.csv', '/path/to/file2.csv'],
    };
    expect(request).toBeDefined();
    expect(request.audience_type).toBe('CUSTOMER_FILE');
  });

  it('should export PageInfo type', () => {
    const pageInfo: BusinessTypes.PageInfo = {
      total_number: 100,
      page: 1,
      page_size: 10,
      total_page: 10,
    };
    expect(pageInfo).toBeDefined();
    expect(pageInfo.total_number).toBe(100);
  });
});
