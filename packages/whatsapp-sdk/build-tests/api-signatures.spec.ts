/**
 * API Signatures Test Suite
 *
 * This test suite verifies that the generated API methods have correct
 * TypeScript signatures and parameter types.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { WhatsAppApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';
import type * as Types from '../lib/types';

describe('WhatsAppApi - Method Signatures', () => {
  let api: WhatsAppApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
    } as HttpClient;

    api = new WhatsAppApi(mockClient);
  });

  describe('Message Methods', () => {
    it('sendMessage should accept correct parameters', () => {
      const phoneNumberId = 'phone123';
      const body: Types.SendMessageRequest = {
        messaging_product: 'whatsapp',
        to: '1234567890',
        type: 'text',
        text: { body: 'Hello' },
      };

      // TypeScript will error if signature is wrong
      const result = api.sendMessage(phoneNumberId, body);
      expect(result).toBeInstanceOf(Promise);
    });

    it('markMessageAsRead should accept correct parameters', () => {
      const phoneNumberId = 'phone123';
      const body: Types.MarkAsReadRequest = {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: 'msg_123',
      };

      const result = api.markMessageAsRead(phoneNumberId, body);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('Media Methods', () => {
    it('uploadMedia should accept phone_number_id', () => {
      const result = api.uploadMedia('phone123');
      expect(result).toBeInstanceOf(Promise);
    });

    it('getMediaUrl should accept media_id', () => {
      const result = api.getMediaUrl('media123');
      expect(result).toBeInstanceOf(Promise);
    });

    it('deleteMedia should accept media_id', () => {
      const result = api.deleteMedia('media123');
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('Template Methods', () => {
    it('listTemplates should accept waba_id and optional query params', () => {
      const wabaId = 'waba123';

      // Without query params
      const result1 = api.listTemplates(wabaId);
      expect(result1).toBeInstanceOf(Promise);

      // With query params
      const result2 = api.listTemplates(wabaId, {
        name: 'template_name',
        status: 'APPROVED',
        limit: 10,
      });
      expect(result2).toBeInstanceOf(Promise);
    });

    it('createTemplate should accept waba_id and body', () => {
      const wabaId = 'waba123';
      const body: Types.CreateTemplateRequest = {
        name: 'welcome',
        language: 'en_US',
        category: 'UTILITY',
        components: [{ type: 'BODY', text: 'Welcome!' }],
      };

      const result = api.createTemplate(wabaId, body);
      expect(result).toBeInstanceOf(Promise);
    });

    it('getTemplate should accept template_id', () => {
      const result = api.getTemplate('template123');
      expect(result).toBeInstanceOf(Promise);
    });

    it('deleteTemplate should accept template_id and name param', () => {
      const result = api.deleteTemplate('template123', { name: 'template_name' });
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('Phone Number Methods', () => {
    it('listPhoneNumbers should accept waba_id', () => {
      const result = api.listPhoneNumbers('waba123');
      expect(result).toBeInstanceOf(Promise);
    });

    it('getPhoneNumber should accept phone_number_id', () => {
      const result = api.getPhoneNumber('phone123');
      expect(result).toBeInstanceOf(Promise);
    });

    it('registerPhoneNumber should accept phone_number_id and body', () => {
      const body: Types.RegisterPhoneRequest = {
        messaging_product: 'whatsapp',
        pin: '123456',
      };

      const result = api.registerPhoneNumber('phone123', body);
      expect(result).toBeInstanceOf(Promise);
    });

    it('deregisterPhoneNumber should accept phone_number_id and body', () => {
      const body: Types.DeregisterPhoneRequest = {
        messaging_product: 'whatsapp',
      };

      const result = api.deregisterPhoneNumber('phone123', body);
      expect(result).toBeInstanceOf(Promise);
    });

    it('requestVerificationCode should accept phone_number_id and body', () => {
      const body: Types.RequestCodeRequest = {
        code_method: 'SMS',
        language: 'en_US',
      };

      const result = api.requestVerificationCode('phone123', body);
      expect(result).toBeInstanceOf(Promise);
    });

    it('verifyPhoneNumber should accept phone_number_id and body', () => {
      const body: Types.VerifyCodeRequest = {
        code: '123456',
      };

      const result = api.verifyPhoneNumber('phone123', body);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('QR Code Methods', () => {
    it('listQRCodes should accept phone_number_id', () => {
      const result = api.listQRCodes('phone123');
      expect(result).toBeInstanceOf(Promise);
    });

    it('createQRCode should accept phone_number_id and body', () => {
      const body: Types.CreateQRCodeRequest = {
        prefilled_message: 'Hello',
        generate_qr_image: 'PNG',
      };

      const result = api.createQRCode('phone123', body);
      expect(result).toBeInstanceOf(Promise);
    });

    it('getQRCode should accept phone_number_id and qr_code_id', () => {
      const result = api.getQRCode('phone123', 'qr123');
      expect(result).toBeInstanceOf(Promise);
    });

    it('updateQRCode should accept phone_number_id, qr_code_id, and body', () => {
      const body: Types.UpdateQRCodeRequest = {
        code: 'new_code',
        prefilled_message: 'Updated message',
      };

      const result = api.updateQRCode('phone123', 'qr123', body);
      expect(result).toBeInstanceOf(Promise);
    });

    it('deleteQRCode should accept phone_number_id and qr_code_id', () => {
      const result = api.deleteQRCode('phone123', 'qr123');
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('Business Profile Methods', () => {
    it('getBusinessProfile should accept phone_number_id', () => {
      const result = api.getBusinessProfile('phone123');
      expect(result).toBeInstanceOf(Promise);
    });

    it('updateBusinessProfile should accept phone_number_id and body', () => {
      const body: Types.UpdateBusinessProfileRequest = {
        messaging_product: 'whatsapp',
        about: 'Updated about',
        address: '123 Main St',
      };

      const result = api.updateBusinessProfile('phone123', body);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('WABA Methods', () => {
    it('getWABA should accept waba_id', () => {
      const result = api.getWABA('waba123');
      expect(result).toBeInstanceOf(Promise);
    });

    it('getSubscribedApps should accept waba_id', () => {
      const result = api.getSubscribedApps('waba123');
      expect(result).toBeInstanceOf(Promise);
    });

    it('subscribeToWebhooks should accept waba_id', () => {
      const result = api.subscribeToWebhooks('waba123');
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('Return Types', () => {
    it('sendMessage should return Promise<SendMessageResponse>', async () => {
      const mockResponse: Types.SendMessageResponse = {
        messaging_product: 'whatsapp',
        contacts: [{ input: '1234567890', wa_id: '1234567890' }],
        messages: [{ id: 'msg_123' }],
      };

      mockClient.post = async () => mockResponse;

      const result = await api.sendMessage('phone123', {
        messaging_product: 'whatsapp',
        to: '1234567890',
        type: 'text',
        text: { body: 'Hello' },
      });

      expect(result).toEqual(mockResponse);
    });

    it('listTemplates should return Promise<TemplatesListResponse>', async () => {
      const mockResponse: Types.TemplatesListResponse = {
        data: [],
        paging: { cursors: { before: 'abc', after: 'def' } },
      };

      mockClient.get = async () => mockResponse;

      const result = await api.listTemplates('waba123');
      expect(result).toEqual(mockResponse);
    });

    it('getPhoneNumber should return Promise<PhoneNumber>', async () => {
      const mockResponse: Types.PhoneNumber = {
        id: 'phone_123',
        display_phone_number: '+1234567890',
        verified_name: 'My Business',
        quality_rating: 'GREEN',
      };

      mockClient.get = async () => mockResponse;

      const result = await api.getPhoneNumber('phone123');
      expect(result).toEqual(mockResponse);
    });
  });
});
