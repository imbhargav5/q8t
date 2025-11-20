import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserOAuthApi } from '../lib/user-oauth/api';
import { ClientCredentialsApi } from '../lib/client-credentials/api';
import { BusinessApi } from '../lib/business/api';
import type * as UserOAuthTypes from '../lib/user-oauth/types';
import type * as ClientCredentialsTypes from '../lib/client-credentials/types';
import type * as BusinessTypes from '../lib/business/types';
import type { HttpClient } from '../src/auth/client';

describe('UserOAuthApi - HTTP Client Integration', () => {
  let api: UserOAuthApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    api = new UserOAuthApi(mockClient);
  });

  it('getUserInfo should GET to /user/info/ with query params', async () => {
    await api.getUserInfo({ fields: 'open_id,display_name' });

    expect(mockClient.get).toHaveBeenCalledWith('/user/info/', {
      fields: 'open_id,display_name',
    });
    expect(mockClient.get).toHaveBeenCalledTimes(1);
  });

  it('listVideos should POST to /video/list/ with request body', async () => {
    const request: UserOAuthTypes.VideoListRequest = {
      fields: 'id,title',
      max_count: 20,
    };
    await api.listVideos(request);

    expect(mockClient.post).toHaveBeenCalledWith('/video/list/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });

  it('queryVideos should POST to /video/query/ with request body', async () => {
    const request: UserOAuthTypes.VideoQueryRequest = {
      filters: {
        video_ids: ['123', '456'],
      },
      fields: 'id,title',
    };
    await api.queryVideos(request);

    expect(mockClient.post).toHaveBeenCalledWith('/video/query/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });

  it('initializeVideoPost should POST to /post/publish/video/init/ with request body', async () => {
    const request: UserOAuthTypes.VideoInitRequest = {
      source_info: {
        source: 'FILE_UPLOAD',
        video_size: 1024000,
        chunk_size: 10240,
        total_chunk_count: 100,
      },
    };
    await api.initializeVideoPost(request);

    expect(mockClient.post).toHaveBeenCalledWith('/post/publish/video/init/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });

  it('fetchPublishStatus should POST to /post/publish/status/fetch/ with request body', async () => {
    const request: UserOAuthTypes.PublishStatusRequest = {
      publish_id: 'pub123',
    };
    await api.fetchPublishStatus(request);

    expect(mockClient.post).toHaveBeenCalledWith('/post/publish/status/fetch/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });
});

describe('ClientCredentialsApi - HTTP Client Integration', () => {
  let api: ClientCredentialsApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    api = new ClientCredentialsApi(mockClient);
  });

  it('queryResearchVideos should POST to /research/video/query/ with request body', async () => {
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
      fields: ['id', 'create_time'],
      max_count: 20,
    };
    await api.queryResearchVideos(request);

    expect(mockClient.post).toHaveBeenCalledWith('/research/video/query/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });

  it('queryResearchUserInfo should POST to /research/user/info/ with request body', async () => {
    const request: ClientCredentialsTypes.ResearchUserInfoRequest = {
      username: 'test_user',
      fields: ['display_name', 'follower_count'],
    };
    await api.queryResearchUserInfo(request);

    expect(mockClient.post).toHaveBeenCalledWith('/research/user/info/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });

  it('listVideoComments should POST to /research/video/comment/list/ with request body', async () => {
    const request: ClientCredentialsTypes.VideoCommentsRequest = {
      video_id: 'vid123',
      fields: ['id', 'text'],
      max_count: 50,
    };
    await api.listVideoComments(request);

    expect(mockClient.post).toHaveBeenCalledWith('/research/video/comment/list/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });

  it('queryAds should POST to /research/adlib/ad/query/ with request body', async () => {
    const request: ClientCredentialsTypes.AdQueryRequest = {
      filters: {
        ad_published_date_range: {
          start_date: '2025-01-01',
          end_date: '2025-01-31',
        },
        country: ['US'],
      },
      fields: ['ad_id', 'ad_text'],
      max_count: 30,
    };
    await api.queryAds(request);

    expect(mockClient.post).toHaveBeenCalledWith('/research/adlib/ad/query/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });

  it('getAdDetails should POST to /research/adlib/ad/detail/ with request body', async () => {
    const request: ClientCredentialsTypes.AdDetailRequest = {
      ad_ids: ['ad123', 'ad456'],
      fields: ['ad_id', 'ad_text'],
    };
    await api.getAdDetails(request);

    expect(mockClient.post).toHaveBeenCalledWith('/research/adlib/ad/detail/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });
});

describe('BusinessApi - HTTP Client Integration', () => {
  let api: BusinessApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    api = new BusinessApi(mockClient);
  });

  it('createCampaign should POST to /campaign/create/ with request body', async () => {
    const request: BusinessTypes.CampaignCreateRequest = {
      advertiser_id: 'adv123',
      campaign_name: 'Test Campaign',
      objective_type: 'TRAFFIC',
    };
    await api.createCampaign(request);

    expect(mockClient.post).toHaveBeenCalledWith('/campaign/create/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });

  it('getCampaigns should GET to /campaign/get/ with query params', async () => {
    await api.getCampaigns({
      advertiser_id: 'adv123',
      page: 1,
      page_size: 10,
    });

    expect(mockClient.get).toHaveBeenCalledWith('/campaign/get/', {
      advertiser_id: 'adv123',
      page: 1,
      page_size: 10,
    });
    expect(mockClient.get).toHaveBeenCalledTimes(1);
  });

  it('updateCampaign should POST to /campaign/update/ with request body', async () => {
    const request: BusinessTypes.CampaignUpdateRequest = {
      advertiser_id: 'adv123',
      campaign_id: 'camp123',
      campaign_name: 'Updated Campaign',
    };
    await api.updateCampaign(request);

    expect(mockClient.post).toHaveBeenCalledWith('/campaign/update/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });

  it('updateCampaignStatus should POST to /campaign/status/update/ with request body', async () => {
    const request: BusinessTypes.CampaignStatusUpdateRequest = {
      advertiser_id: 'adv123',
      campaign_ids: ['camp123', 'camp456'],
      operation_status: 'ENABLE',
    };
    await api.updateCampaignStatus(request);

    expect(mockClient.post).toHaveBeenCalledWith('/campaign/status/update/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });

  it('createAdGroup should POST to /adgroup/create/ with request body', async () => {
    const request: BusinessTypes.AdGroupCreateRequest = {
      advertiser_id: 'adv123',
      campaign_id: 'camp123',
      adgroup_name: 'Test Ad Group',
    };
    await api.createAdGroup(request);

    expect(mockClient.post).toHaveBeenCalledWith('/adgroup/create/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });

  it('getAdGroups should GET to /adgroup/get/ with query params', async () => {
    await api.getAdGroups({
      advertiser_id: 'adv123',
      page: 1,
      page_size: 10,
    });

    expect(mockClient.get).toHaveBeenCalledWith('/adgroup/get/', {
      advertiser_id: 'adv123',
      page: 1,
      page_size: 10,
    });
    expect(mockClient.get).toHaveBeenCalledTimes(1);
  });

  it('createAd should POST to /ad/create/ with request body', async () => {
    const request: BusinessTypes.AdCreateRequest = {
      advertiser_id: 'adv123',
      adgroup_id: 'adg123',
      ad_name: 'Test Ad',
    };
    await api.createAd(request);

    expect(mockClient.post).toHaveBeenCalledWith('/ad/create/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });

  it('getIntegratedReport should GET to /report/integrated/get/ with query params', async () => {
    await api.getIntegratedReport({
      advertiser_id: 'adv123',
      report_type: 'BASIC',
      dimensions: ['campaign_id'],
      metrics: ['spend'],
      data_level: 'AUCTION_CAMPAIGN',
      start_date: '2025-01-01',
      end_date: '2025-01-31',
    });

    expect(mockClient.get).toHaveBeenCalledWith('/report/integrated/get/', {
      advertiser_id: 'adv123',
      report_type: 'BASIC',
      dimensions: ['campaign_id'],
      metrics: ['spend'],
      data_level: 'AUCTION_CAMPAIGN',
      start_date: '2025-01-01',
      end_date: '2025-01-31',
    });
    expect(mockClient.get).toHaveBeenCalledTimes(1);
  });

  it('createCustomAudience should POST to /dmp/custom_audience/create/ with request body', async () => {
    const request: BusinessTypes.CustomAudienceCreateRequest = {
      advertiser_id: 'adv123',
      custom_audience_name: 'Test Audience',
      audience_type: 'CUSTOMER_FILE',
    };
    await api.createCustomAudience(request);

    expect(mockClient.post).toHaveBeenCalledWith('/dmp/custom_audience/create/', request);
    expect(mockClient.post).toHaveBeenCalledTimes(1);
  });
});
