/**
 * Gateway API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the Gateway API OpenAPI specification
 * are present in the generated GatewayApi class.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { GatewayApi } from '../lib/gateway-api';
import type { GatewayHttpClient } from '../src/gateway/client';

describe('GatewayApi - Method Existence', () => {
  let api: GatewayApi;
  let mockClient: GatewayHttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      post: async () => ({}),
    } as GatewayHttpClient;

    api = new GatewayApi(mockClient);
  });

  describe('Verification Code Operations', () => {
    it('should have sendVerificationMessage method', () => {
      expect(api.sendVerificationMessage).toBeDefined();
      expect(typeof api.sendVerificationMessage).toBe('function');
    });

    it('should have checkSendAbility method', () => {
      expect(api.checkSendAbility).toBeDefined();
      expect(typeof api.checkSendAbility).toBe('function');
    });

    it('should have checkVerificationStatus method', () => {
      expect(api.checkVerificationStatus).toBeDefined();
      expect(typeof api.checkVerificationStatus).toBe('function');
    });

    it('should have revokeVerificationMessage method', () => {
      expect(api.revokeVerificationMessage).toBeDefined();
      expect(typeof api.revokeVerificationMessage).toBe('function');
    });

    it('should have reportDelivery method', () => {
      expect(api.reportDelivery).toBeDefined();
      expect(typeof api.reportDelivery).toBe('function');
    });
  });

  describe('Method Count Validation', () => {
    it('should have exactly 5 public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof GatewayApi] === 'function');

      expect(methods).toHaveLength(5);
    });

    it('should have all expected methods', () => {
      const expectedMethods = [
        'sendVerificationMessage',
        'checkSendAbility',
        'checkVerificationStatus',
        'revokeVerificationMessage',
        'reportDelivery',
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor');

      for (const method of expectedMethods) {
        expect(actualMethods).toContain(method);
      }
    });
  });
});
