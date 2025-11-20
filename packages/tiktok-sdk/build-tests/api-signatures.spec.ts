import { describe, it, expect, beforeEach } from 'vitest';
import { UserOAuthApi } from '../lib/user-oauth/api';
import { ClientCredentialsApi } from '../lib/client-credentials/api';
import { BusinessApi } from '../lib/business/api';
import type * as UserOAuthTypes from '../lib/user-oauth/types';
import type * as ClientCredentialsTypes from '../lib/client-credentials/types';
import type * as BusinessTypes from '../lib/business/types';
import type { HttpClient } from '../src/auth/client';

const createMockClient = (): HttpClient => ({
  get: async () => ({}),
  post: async () => ({}),
  put: async () => ({}),
  delete: async () => ({}),
});

describe('UserOAuthApi - Method Signatures', () => {
  let api: UserOAuthApi;

  beforeEach(() => {
    api = new UserOAuthApi(createMockClient());
  });

  it('getUserInfo should accept correct parameters', () => {
    const result = api.getUserInfo({ fields: 'open_id,display_name' });
    expect(result).toBeInstanceOf(Promise);
  });

  it('listVideos should accept VideoListRequest', () => {
    const request: UserOAuthTypes.VideoListRequest = {
      fields: 'id,title,create_time',
      max_count: 20,
    };
    const result = api.listVideos(request);
    expect(result).toBeInstanceOf(Promise);
  });

  it('queryVideos should accept VideoQueryRequest', () => {
    const request: UserOAuthTypes.VideoQueryRequest = {
      filters: {
        video_ids: ['123', '456'],
      },
      fields: 'id,title',
    };
    const result = api.queryVideos(request);
    expect(result).toBeInstanceOf(Promise);
  });

  it('initializeVideoPost should accept VideoInitRequest', () => {
    const request: UserOAuthTypes.VideoInitRequest = {
      source_info: {
        source: 'FILE_UPLOAD',
        video_size: 1024000,
        chunk_size: 10240,
        total_chunk_count: 100,
      },
    };
    const result = api.initializeVideoPost(request);
    expect(result).toBeInstanceOf(Promise);
  });

  it('fetchPublishStatus should accept PublishStatusRequest', () => {
    const request: UserOAuthTypes.PublishStatusRequest = {
      publish_id: 'pub123',
    };
    const result = api.fetchPublishStatus(request);
    expect(result).toBeInstanceOf(Promise);
  });
});

describe('ClientCredentialsApi - Method Signatures', () => {
  let api: ClientCredentialsApi;

  beforeEach(() => {
    api = new ClientCredentialsApi(createMockClient());
  });

  it('queryResearchVideos should accept ResearchVideoQueryRequest', () => {
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
      fields: ['id', 'create_time', 'view_count'],
      max_count: 20,
    };
    const result = api.queryResearchVideos(request);
    expect(result).toBeInstanceOf(Promise);
  });

  it('queryResearchUserInfo should accept ResearchUserInfoRequest', () => {
    const request: ClientCredentialsTypes.ResearchUserInfoRequest = {
      username: 'test_user',
      fields: ['display_name', 'follower_count'],
    };
    const result = api.queryResearchUserInfo(request);
    expect(result).toBeInstanceOf(Promise);
  });

  it('listVideoComments should accept VideoCommentsRequest', () => {
    const request: ClientCredentialsTypes.VideoCommentsRequest = {
      video_id: 'vid123',
      fields: ['id', 'text', 'like_count'],
      max_count: 50,
    };
    const result = api.listVideoComments(request);
    expect(result).toBeInstanceOf(Promise);
  });

  it('queryAds should accept AdQueryRequest', () => {
    const request: ClientCredentialsTypes.AdQueryRequest = {
      filters: {
        ad_published_date_range: {
          start_date: '2025-01-01',
          end_date: '2025-01-31',
        },
        country: ['US'],
      },
      fields: ['ad_id', 'ad_text', 'ad_reach'],
      max_count: 30,
    };
    const result = api.queryAds(request);
    expect(result).toBeInstanceOf(Promise);
  });
});

describe('BusinessApi - Method Signatures', () => {
  let api: BusinessApi;

  beforeEach(() => {
    api = new BusinessApi(createMockClient());
  });

  it('createCampaign should accept CampaignCreateRequest', () => {
    const request: BusinessTypes.CampaignCreateRequest = {
      advertiser_id: 'adv123',
      campaign_name: 'Test Campaign',
      objective_type: 'TRAFFIC',
    };
    const result = api.createCampaign(request);
    expect(result).toBeInstanceOf(Promise);
  });

  it('getCampaigns should accept query parameters', () => {
    const result = api.getCampaigns({
      advertiser_id: 'adv123',
      page: 1,
      page_size: 10,
    });
    expect(result).toBeInstanceOf(Promise);
  });

  it('updateCampaign should accept CampaignUpdateRequest', () => {
    const request: BusinessTypes.CampaignUpdateRequest = {
      advertiser_id: 'adv123',
      campaign_id: 'camp123',
      campaign_name: 'Updated Campaign',
    };
    const result = api.updateCampaign(request);
    expect(result).toBeInstanceOf(Promise);
  });

  it('createAdGroup should accept AdGroupCreateRequest', () => {
    const request: BusinessTypes.AdGroupCreateRequest = {
      advertiser_id: 'adv123',
      campaign_id: 'camp123',
      adgroup_name: 'Test Ad Group',
    };
    const result = api.createAdGroup(request);
    expect(result).toBeInstanceOf(Promise);
  });

  it('createAd should accept AdCreateRequest', () => {
    const request: BusinessTypes.AdCreateRequest = {
      advertiser_id: 'adv123',
      adgroup_id: 'adg123',
      ad_name: 'Test Ad',
    };
    const result = api.createAd(request);
    expect(result).toBeInstanceOf(Promise);
  });

  it('getIntegratedReport should accept query parameters', () => {
    const result = api.getIntegratedReport({
      advertiser_id: 'adv123',
      report_type: 'BASIC',
      dimensions: ['campaign_id'],
      metrics: ['spend', 'impressions'],
      data_level: 'AUCTION_CAMPAIGN',
      start_date: '2025-01-01',
      end_date: '2025-01-31',
    });
    expect(result).toBeInstanceOf(Promise);
  });

  it('createCustomAudience should accept CustomAudienceCreateRequest', () => {
    const request: BusinessTypes.CustomAudienceCreateRequest = {
      advertiser_id: 'adv123',
      custom_audience_name: 'Test Audience',
      audience_type: 'CUSTOMER_FILE',
    };
    const result = api.createCustomAudience(request);
    expect(result).toBeInstanceOf(Promise);
  });
});
