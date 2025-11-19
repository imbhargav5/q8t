/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specification
 * are present in the generated WhatsAppApi class.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { WhatsAppApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';

describe('WhatsAppApi - Method Existence', () => {
  let api: WhatsAppApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
    } as HttpClient;

    api = new WhatsAppApi(mockClient);
  });

  describe('Message Operations', () => {
    it('should have sendMessage method', () => {
      expect(api.sendMessage).toBeDefined();
      expect(typeof api.sendMessage).toBe('function');
    });

    it('should have markMessageAsRead method', () => {
      expect(api.markMessageAsRead).toBeDefined();
      expect(typeof api.markMessageAsRead).toBe('function');
    });
  });

  describe('Media Operations', () => {
    it('should have uploadMedia method', () => {
      expect(api.uploadMedia).toBeDefined();
      expect(typeof api.uploadMedia).toBe('function');
    });

    it('should have getMediaUrl method', () => {
      expect(api.getMediaUrl).toBeDefined();
      expect(typeof api.getMediaUrl).toBe('function');
    });

    it('should have deleteMedia method', () => {
      expect(api.deleteMedia).toBeDefined();
      expect(typeof api.deleteMedia).toBe('function');
    });
  });

  describe('Template Operations', () => {
    it('should have listTemplates method', () => {
      expect(api.listTemplates).toBeDefined();
      expect(typeof api.listTemplates).toBe('function');
    });

    it('should have createTemplate method', () => {
      expect(api.createTemplate).toBeDefined();
      expect(typeof api.createTemplate).toBe('function');
    });

    it('should have getTemplate method', () => {
      expect(api.getTemplate).toBeDefined();
      expect(typeof api.getTemplate).toBe('function');
    });

    it('should have deleteTemplate method', () => {
      expect(api.deleteTemplate).toBeDefined();
      expect(typeof api.deleteTemplate).toBe('function');
    });
  });

  describe('Phone Number Operations', () => {
    it('should have listPhoneNumbers method', () => {
      expect(api.listPhoneNumbers).toBeDefined();
      expect(typeof api.listPhoneNumbers).toBe('function');
    });

    it('should have getPhoneNumber method', () => {
      expect(api.getPhoneNumber).toBeDefined();
      expect(typeof api.getPhoneNumber).toBe('function');
    });

    it('should have registerPhoneNumber method', () => {
      expect(api.registerPhoneNumber).toBeDefined();
      expect(typeof api.registerPhoneNumber).toBe('function');
    });

    it('should have deregisterPhoneNumber method', () => {
      expect(api.deregisterPhoneNumber).toBeDefined();
      expect(typeof api.deregisterPhoneNumber).toBe('function');
    });

    it('should have requestVerificationCode method', () => {
      expect(api.requestVerificationCode).toBeDefined();
      expect(typeof api.requestVerificationCode).toBe('function');
    });

    it('should have verifyPhoneNumber method', () => {
      expect(api.verifyPhoneNumber).toBeDefined();
      expect(typeof api.verifyPhoneNumber).toBe('function');
    });
  });

  describe('QR Code Operations', () => {
    it('should have listQRCodes method', () => {
      expect(api.listQRCodes).toBeDefined();
      expect(typeof api.listQRCodes).toBe('function');
    });

    it('should have createQRCode method', () => {
      expect(api.createQRCode).toBeDefined();
      expect(typeof api.createQRCode).toBe('function');
    });

    it('should have getQRCode method', () => {
      expect(api.getQRCode).toBeDefined();
      expect(typeof api.getQRCode).toBe('function');
    });

    it('should have updateQRCode method', () => {
      expect(api.updateQRCode).toBeDefined();
      expect(typeof api.updateQRCode).toBe('function');
    });

    it('should have deleteQRCode method', () => {
      expect(api.deleteQRCode).toBeDefined();
      expect(typeof api.deleteQRCode).toBe('function');
    });
  });

  describe('Business Profile Operations', () => {
    it('should have getBusinessProfile method', () => {
      expect(api.getBusinessProfile).toBeDefined();
      expect(typeof api.getBusinessProfile).toBe('function');
    });

    it('should have updateBusinessProfile method', () => {
      expect(api.updateBusinessProfile).toBeDefined();
      expect(typeof api.updateBusinessProfile).toBe('function');
    });
  });

  describe('WABA Operations', () => {
    it('should have getWABA method', () => {
      expect(api.getWABA).toBeDefined();
      expect(typeof api.getWABA).toBe('function');
    });

    it('should have getSubscribedApps method', () => {
      expect(api.getSubscribedApps).toBeDefined();
      expect(typeof api.getSubscribedApps).toBe('function');
    });

    it('should have subscribeToWebhooks method', () => {
      expect(api.subscribeToWebhooks).toBeDefined();
      expect(typeof api.subscribeToWebhooks).toBe('function');
    });
  });

  describe('Method Count Validation', () => {
    it('should have exactly 25 public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof WhatsAppApi] === 'function');

      expect(methods).toHaveLength(25);
    });

    it('should have all expected methods', () => {
      const expectedMethods = [
        'sendMessage',
        'markMessageAsRead',
        'uploadMedia',
        'getMediaUrl',
        'deleteMedia',
        'listTemplates',
        'createTemplate',
        'getTemplate',
        'deleteTemplate',
        'listPhoneNumbers',
        'getPhoneNumber',
        'registerPhoneNumber',
        'deregisterPhoneNumber',
        'requestVerificationCode',
        'verifyPhoneNumber',
        'listQRCodes',
        'createQRCode',
        'getQRCode',
        'updateQRCode',
        'deleteQRCode',
        'getBusinessProfile',
        'updateBusinessProfile',
        'getWABA',
        'getSubscribedApps',
        'subscribeToWebhooks',
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor');

      for (const method of expectedMethods) {
        expect(actualMethods).toContain(method);
      }
    });
  });
});
