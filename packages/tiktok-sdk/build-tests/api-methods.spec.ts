import { describe, it, expect, beforeEach } from 'vitest';
import { UserOAuthApi } from '../lib/user-oauth/api';
import { ClientCredentialsApi } from '../lib/client-credentials/api';
import { BusinessApi } from '../lib/business/api';
import type { HttpClient } from '../src/auth/client';

// Mock HTTP client
const createMockClient = (): HttpClient => ({
  get: async () => ({}),
  post: async () => ({}),
  put: async () => ({}),
  delete: async () => ({}),
});

describe('UserOAuthApi - Method Existence', () => {
  let api: UserOAuthApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    mockClient = createMockClient();
    api = new UserOAuthApi(mockClient);
  });

  it('should have getUserInfo method', () => {
    expect(api.getUserInfo).toBeDefined();
    expect(typeof api.getUserInfo).toBe('function');
  });

  it('should have listVideos method', () => {
    expect(api.listVideos).toBeDefined();
    expect(typeof api.listVideos).toBe('function');
  });

  it('should have queryVideos method', () => {
    expect(api.queryVideos).toBeDefined();
    expect(typeof api.queryVideos).toBe('function');
  });

  it('should have queryCreatorInfo method', () => {
    expect(api.queryCreatorInfo).toBeDefined();
    expect(typeof api.queryCreatorInfo).toBe('function');
  });

  it('should have initializeVideoPost method', () => {
    expect(api.initializeVideoPost).toBeDefined();
    expect(typeof api.initializeVideoPost).toBe('function');
  });

  it('should have uploadVideo method', () => {
    expect(api.uploadVideo).toBeDefined();
    expect(typeof api.uploadVideo).toBe('function');
  });

  it('should have fetchPublishStatus method', () => {
    expect(api.fetchPublishStatus).toBeDefined();
    expect(typeof api.fetchPublishStatus).toBe('function');
  });

  it('should have exactly 7 methods', () => {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
      .filter(name => name !== 'constructor' && typeof (api as any)[name] === 'function');
    expect(methods.length).toBe(7);
  });
});

describe('ClientCredentialsApi - Method Existence', () => {
  let api: ClientCredentialsApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    mockClient = createMockClient();
    api = new ClientCredentialsApi(mockClient);
  });

  it('should have queryResearchVideos method', () => {
    expect(api.queryResearchVideos).toBeDefined();
    expect(typeof api.queryResearchVideos).toBe('function');
  });

  it('should have queryResearchUserInfo method', () => {
    expect(api.queryResearchUserInfo).toBeDefined();
    expect(typeof api.queryResearchUserInfo).toBe('function');
  });

  it('should have listVideoComments method', () => {
    expect(api.listVideoComments).toBeDefined();
    expect(typeof api.listVideoComments).toBe('function');
  });

  it('should have queryAds method', () => {
    expect(api.queryAds).toBeDefined();
    expect(typeof api.queryAds).toBe('function');
  });

  it('should have getAdDetails method', () => {
    expect(api.getAdDetails).toBeDefined();
    expect(typeof api.getAdDetails).toBe('function');
  });

  it('should have queryCommercialContent method', () => {
    expect(api.queryCommercialContent).toBeDefined();
    expect(typeof api.queryCommercialContent).toBe('function');
  });

  it('should have exactly 6 methods', () => {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
      .filter(name => name !== 'constructor' && typeof (api as any)[name] === 'function');
    expect(methods.length).toBe(6);
  });
});

describe('BusinessApi - Method Existence', () => {
  let api: BusinessApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    mockClient = createMockClient();
    api = new BusinessApi(mockClient);
  });

  // Campaign methods
  it('should have createCampaign method', () => {
    expect(api.createCampaign).toBeDefined();
    expect(typeof api.createCampaign).toBe('function');
  });

  it('should have getCampaigns method', () => {
    expect(api.getCampaigns).toBeDefined();
    expect(typeof api.getCampaigns).toBe('function');
  });

  it('should have updateCampaign method', () => {
    expect(api.updateCampaign).toBeDefined();
    expect(typeof api.updateCampaign).toBe('function');
  });

  it('should have updateCampaignStatus method', () => {
    expect(api.updateCampaignStatus).toBeDefined();
    expect(typeof api.updateCampaignStatus).toBe('function');
  });

  // Ad Group methods
  it('should have createAdGroup method', () => {
    expect(api.createAdGroup).toBeDefined();
    expect(typeof api.createAdGroup).toBe('function');
  });

  it('should have getAdGroups method', () => {
    expect(api.getAdGroups).toBeDefined();
    expect(typeof api.getAdGroups).toBe('function');
  });

  it('should have updateAdGroup method', () => {
    expect(api.updateAdGroup).toBeDefined();
    expect(typeof api.updateAdGroup).toBe('function');
  });

  it('should have updateAdGroupStatus method', () => {
    expect(api.updateAdGroupStatus).toBeDefined();
    expect(typeof api.updateAdGroupStatus).toBe('function');
  });

  // Ad methods
  it('should have createAd method', () => {
    expect(api.createAd).toBeDefined();
    expect(typeof api.createAd).toBe('function');
  });

  it('should have getAds method', () => {
    expect(api.getAds).toBeDefined();
    expect(typeof api.getAds).toBe('function');
  });

  it('should have updateAd method', () => {
    expect(api.updateAd).toBeDefined();
    expect(typeof api.updateAd).toBe('function');
  });

  it('should have updateAdStatus method', () => {
    expect(api.updateAdStatus).toBeDefined();
    expect(typeof api.updateAdStatus).toBe('function');
  });

  // Creative methods
  it('should have uploadVideo method', () => {
    expect(api.uploadVideo).toBeDefined();
    expect(typeof api.uploadVideo).toBe('function');
  });

  it('should have uploadImage method', () => {
    expect(api.uploadImage).toBeDefined();
    expect(typeof api.uploadImage).toBe('function');
  });

  // Reporting methods
  it('should have getIntegratedReport method', () => {
    expect(api.getIntegratedReport).toBeDefined();
    expect(typeof api.getIntegratedReport).toBe('function');
  });

  // Audience methods
  it('should have listCustomAudiences method', () => {
    expect(api.listCustomAudiences).toBeDefined();
    expect(typeof api.listCustomAudiences).toBe('function');
  });

  it('should have createCustomAudience method', () => {
    expect(api.createCustomAudience).toBeDefined();
    expect(typeof api.createCustomAudience).toBe('function');
  });

  it('should have exactly 17 methods', () => {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
      .filter(name => name !== 'constructor' && typeof (api as any)[name] === 'function');
    expect(methods.length).toBe(17);
  });
});
