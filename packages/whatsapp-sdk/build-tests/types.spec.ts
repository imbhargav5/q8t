/**
 * Types Test Suite
 *
 * This test suite verifies that the generated TypeScript types are valid
 * and match the OpenAPI schema definitions.
 */

import { describe, it, expect } from 'vitest';
import * as Types from '../lib/types';

describe('Generated Types', () => {
  describe('Message Types', () => {
    it('should export SendMessageRequest type', () => {
      const request: Types.SendMessageRequest = {
        messaging_product: 'whatsapp',
        to: '1234567890',
        type: 'text',
        text: { body: 'Hello' },
      };
      expect(request).toBeDefined();
    });

    it('should export TextObject type', () => {
      const text: Types.TextObject = {
        body: 'Hello, World!',
        preview_url: true,
      };
      expect(text).toBeDefined();
    });

    it('should export TemplateObject type', () => {
      const template: Types.TemplateObject = {
        name: 'hello_world',
        language: { code: 'en_US' },
      };
      expect(template).toBeDefined();
    });

    it('should export MediaObject type', () => {
      const media: Types.MediaObject = {
        id: 'media123',
        link: 'https://example.com/image.jpg',
        caption: 'Test image',
      };
      expect(media).toBeDefined();
    });

    it('should export InteractiveObject type', () => {
      const interactive: Types.InteractiveObject = {
        type: 'button',
        action: {
          buttons: [
            {
              type: 'reply',
              reply: { id: 'btn1', title: 'Button 1' },
            },
          ],
        },
      };
      expect(interactive).toBeDefined();
    });

    it('should export LocationObject type', () => {
      const location: Types.LocationObject = {
        longitude: -122.425332,
        latitude: 37.758056,
        name: 'Test Location',
        address: '123 Main St',
      };
      expect(location).toBeDefined();
    });

    it('should export ContactObject type', () => {
      const contact: Types.ContactObject = {
        name: {
          formatted_name: 'John Doe',
          first_name: 'John',
          last_name: 'Doe',
        },
        phones: [{ phone: '+1234567890', type: 'CELL' }],
      };
      expect(contact).toBeDefined();
    });
  });

  describe('Response Types', () => {
    it('should export SendMessageResponse type', () => {
      const response: Types.SendMessageResponse = {
        messaging_product: 'whatsapp',
        contacts: [{ input: '1234567890', wa_id: '1234567890' }],
        messages: [{ id: 'msg_123', message_status: 'sent' }],
      };
      expect(response).toBeDefined();
    });

    it('should export SuccessResponse type', () => {
      const response: Types.SuccessResponse = {
        success: true,
      };
      expect(response).toBeDefined();
    });
  });

  describe('Template Types', () => {
    it('should export CreateTemplateRequest type', () => {
      const request: Types.CreateTemplateRequest = {
        name: 'welcome_message',
        language: 'en_US',
        category: 'UTILITY',
        components: [
          {
            type: 'BODY',
            text: 'Welcome {{1}}!',
          },
        ],
      };
      expect(request).toBeDefined();
    });

    it('should export Template type', () => {
      const template: Types.Template = {
        id: 'template_123',
        name: 'welcome_message',
        status: 'APPROVED',
        category: 'UTILITY',
        language: 'en_US',
        components: [],
      };
      expect(template).toBeDefined();
    });

    it('should export TemplatesListResponse type', () => {
      const response: Types.TemplatesListResponse = {
        data: [],
        paging: {
          cursors: { before: 'abc', after: 'def' },
        },
      };
      expect(response).toBeDefined();
    });
  });

  describe('Media Types', () => {
    it('should export MediaUploadResponse type', () => {
      const response: Types.MediaUploadResponse = {
        id: 'media_123',
      };
      expect(response).toBeDefined();
    });

    it('should export MediaUrlResponse type', () => {
      const response: Types.MediaUrlResponse = {
        url: 'https://example.com/media',
        mime_type: 'image/jpeg',
        sha256: 'abc123',
        file_size: 12345,
        id: 'media_123',
        messaging_product: 'whatsapp',
      };
      expect(response).toBeDefined();
    });
  });

  describe('Phone Number Types', () => {
    it('should export PhoneNumber type', () => {
      const phoneNumber: Types.PhoneNumber = {
        id: 'phone_123',
        display_phone_number: '+1234567890',
        verified_name: 'My Business',
        quality_rating: 'GREEN',
        code_verification_status: 'VERIFIED',
      };
      expect(phoneNumber).toBeDefined();
    });

    it('should export PhoneNumbersResponse type', () => {
      const response: Types.PhoneNumbersResponse = {
        data: [],
        paging: { cursors: { before: 'abc', after: 'def' } },
      };
      expect(response).toBeDefined();
    });

    it('should export RegisterPhoneRequest type', () => {
      const request: Types.RegisterPhoneRequest = {
        messaging_product: 'whatsapp',
        pin: '123456',
      };
      expect(request).toBeDefined();
    });

    it('should export VerifyCodeRequest type', () => {
      const request: Types.VerifyCodeRequest = {
        code: '123456',
      };
      expect(request).toBeDefined();
    });
  });

  describe('QR Code Types', () => {
    it('should export QRCode type', () => {
      const qrCode: Types.QRCode = {
        code: 'qr_123',
        prefilled_message: 'Hello',
        deep_link_url: 'https://wa.me/qr/abc123',
        qr_image_url: 'https://example.com/qr.png',
      };
      expect(qrCode).toBeDefined();
    });

    it('should export QRCodesResponse type', () => {
      const response: Types.QRCodesResponse = {
        data: [],
      };
      expect(response).toBeDefined();
    });

    it('should export CreateQRCodeRequest type', () => {
      const request: Types.CreateQRCodeRequest = {
        prefilled_message: 'Hello',
        generate_qr_image: 'PNG',
      };
      expect(request).toBeDefined();
    });
  });

  describe('Business Profile Types', () => {
    it('should export BusinessProfile type', () => {
      const profile: Types.BusinessProfile = {
        about: 'We are a business',
        address: '123 Main St',
        description: 'Our description',
        email: 'contact@example.com',
        messaging_product: 'whatsapp',
        websites: ['https://example.com'],
        vertical: 'RETAIL',
      };
      expect(profile).toBeDefined();
    });

    it('should export UpdateBusinessProfileRequest type', () => {
      const request: Types.UpdateBusinessProfileRequest = {
        messaging_product: 'whatsapp',
        about: 'Updated about',
        address: 'New address',
      };
      expect(request).toBeDefined();
    });
  });

  describe('WABA Types', () => {
    it('should export WABA type', () => {
      const waba: Types.WABA = {
        id: 'waba_123',
        name: 'My WABA',
        timezone_id: 'America/New_York',
        message_template_namespace: 'namespace_123',
      };
      expect(waba).toBeDefined();
    });

    it('should export SubscribedAppsResponse type', () => {
      const response: Types.SubscribedAppsResponse = {
        data: [],
      };
      expect(response).toBeDefined();
    });
  });

  describe('Utility Types', () => {
    it('should export Paging type', () => {
      const paging: Types.Paging = {
        cursors: { before: 'abc', after: 'def' },
        next: 'https://graph.facebook.com/next',
        previous: 'https://graph.facebook.com/previous',
      };
      expect(paging).toBeDefined();
    });

    it('should export Cursors type', () => {
      const cursors: Types.Cursors = {
        before: 'abc123',
        after: 'def456',
      };
      expect(cursors).toBeDefined();
    });
  });

  describe('Enum Types', () => {
    it('should support message type enum values', () => {
      const types: Array<Types.SendMessageRequest['type']> = [
        'text',
        'template',
        'image',
        'video',
        'audio',
        'document',
        'sticker',
        'location',
        'contacts',
        'interactive',
        'reaction',
      ];
      expect(types.length).toBe(11);
    });

    it('should support template category enum values', () => {
      const categories: Array<Types.CreateTemplateRequest['category']> = [
        'AUTHENTICATION',
        'MARKETING',
        'UTILITY',
      ];
      expect(categories.length).toBe(3);
    });

    it('should support template status enum values', () => {
      const statuses: Array<Types.Template['status']> = [
        'APPROVED',
        'PENDING',
        'REJECTED',
        'PAUSED',
        'DISABLED',
      ];
      expect(statuses.length).toBe(5);
    });

    it('should support quality rating enum values', () => {
      const ratings: Array<Types.PhoneNumber['quality_rating']> = [
        'GREEN',
        'YELLOW',
        'RED',
      ];
      expect(ratings.length).toBe(3);
    });
  });
});
