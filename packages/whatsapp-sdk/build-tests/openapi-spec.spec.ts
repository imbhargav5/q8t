/**
 * OpenAPI Specification Test Suite
 *
 * This test suite verifies that the OpenAPI specification is valid and contains
 * all necessary components for SDK generation.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { parseOpenAPISpec } from '../src/generator/parser';
import { resolve } from 'path';

const specPath = resolve(__dirname, '../api/openapi.yaml');

describe('OpenAPI Specification Validation', () => {
  let spec: ReturnType<typeof parseOpenAPISpec>;

  it('should successfully parse the OpenAPI spec', () => {
    expect(() => {
      spec = parseOpenAPISpec(specPath);
    }).not.toThrow();

    spec = parseOpenAPISpec(specPath);
    expect(spec).toBeDefined();
  });

  describe('Specification Metadata', () => {
    it('should have OpenAPI version 3.0.0', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.openapi).toBe('3.0.0');
    });

    it('should have API info', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.info).toBeDefined();
      expect(spec.info.title).toBe('WhatsApp Cloud API');
      expect(spec.info.version).toBe('23.0');
    });

    it('should have server configuration', () => {
      spec = parseOpenAPISpec(specPath);
      expect(spec.servers).toBeDefined();
      expect(spec.servers).toHaveLength(1);
      expect(spec.servers[0].url).toBe('https://graph.facebook.com/v23.0');
    });
  });

  describe('Paths and Operations', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have paths defined', () => {
      expect(spec.paths).toBeDefined();
      expect(Object.keys(spec.paths).length).toBeGreaterThan(0);
    });

    it('should have /{phone_number_id}/messages path with POST operation', () => {
      expect(spec.paths['/{phone_number_id}/messages']).toBeDefined();
      expect(spec.paths['/{phone_number_id}/messages'].post).toBeDefined();
      expect(spec.paths['/{phone_number_id}/messages'].post?.operationId).toBe('sendMessage');
    });

    it('should have /{phone_number_id}/markAsRead path with POST operation', () => {
      expect(spec.paths['/{phone_number_id}/markAsRead']).toBeDefined();
      expect(spec.paths['/{phone_number_id}/markAsRead'].post).toBeDefined();
      expect(spec.paths['/{phone_number_id}/markAsRead'].post?.operationId).toBe('markMessageAsRead');
    });

    it('should have /{phone_number_id}/media path with POST operation', () => {
      expect(spec.paths['/{phone_number_id}/media']).toBeDefined();
      expect(spec.paths['/{phone_number_id}/media'].post).toBeDefined();
      expect(spec.paths['/{phone_number_id}/media'].post?.operationId).toBe('uploadMedia');
    });

    it('should have /{media_id} path with GET and DELETE operations', () => {
      expect(spec.paths['/{media_id}']).toBeDefined();
      expect(spec.paths['/{media_id}'].get).toBeDefined();
      expect(spec.paths['/{media_id}'].get?.operationId).toBe('getMediaUrl');
      expect(spec.paths['/{media_id}'].delete).toBeDefined();
      expect(spec.paths['/{media_id}'].delete?.operationId).toBe('deleteMedia');
    });

    it('should have /{waba_id}/message_templates path with GET and POST operations', () => {
      expect(spec.paths['/{waba_id}/message_templates']).toBeDefined();
      expect(spec.paths['/{waba_id}/message_templates'].get).toBeDefined();
      expect(spec.paths['/{waba_id}/message_templates'].get?.operationId).toBe('listTemplates');
      expect(spec.paths['/{waba_id}/message_templates'].post).toBeDefined();
      expect(spec.paths['/{waba_id}/message_templates'].post?.operationId).toBe('createTemplate');
    });

    it('should have /{template_id}/template path with GET and DELETE operations', () => {
      expect(spec.paths['/{template_id}/template']).toBeDefined();
      expect(spec.paths['/{template_id}/template'].get).toBeDefined();
      expect(spec.paths['/{template_id}/template'].get?.operationId).toBe('getTemplate');
      expect(spec.paths['/{template_id}/template'].delete).toBeDefined();
      expect(spec.paths['/{template_id}/template'].delete?.operationId).toBe('deleteTemplate');
    });

    it('should have phone number management paths', () => {
      expect(spec.paths['/{waba_id}/phone_numbers']).toBeDefined();
      expect(spec.paths['/{phone_number_id}/phoneNumber']).toBeDefined();
      expect(spec.paths['/{phone_number_id}/register']).toBeDefined();
      expect(spec.paths['/{phone_number_id}/deregister']).toBeDefined();
      expect(spec.paths['/{phone_number_id}/request_code']).toBeDefined();
      expect(spec.paths['/{phone_number_id}/verify_code']).toBeDefined();
    });

    it('should have QR code management paths', () => {
      expect(spec.paths['/{phone_number_id}/message_qrdls']).toBeDefined();
      expect(spec.paths['/{phone_number_id}/message_qrdls/{qr_code_id}']).toBeDefined();
    });

    it('should have business profile paths', () => {
      expect(spec.paths['/{phone_number_id}/whatsapp_business_profile']).toBeDefined();
    });

    it('should have WABA management paths', () => {
      expect(spec.paths['/{waba_id}/waba']).toBeDefined();
      expect(spec.paths['/{waba_id}/subscribed_apps']).toBeDefined();
    });

    it('should have exactly 17 paths defined', () => {
      expect(Object.keys(spec.paths)).toHaveLength(17);
    });
  });

  describe('Operation IDs', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have unique operation IDs', () => {
      const operationIds: string[] = [];

      for (const pathItem of Object.values(spec.paths)) {
        const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
        for (const method of methods) {
          const operation = pathItem[method];
          if (operation?.operationId) {
            operationIds.push(operation.operationId);
          }
        }
      }

      const uniqueIds = new Set(operationIds);
      expect(operationIds.length).toBe(uniqueIds.size);
    });

    it('should have all expected operation IDs', () => {
      const expectedOperationIds = [
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

      const actualOperationIds: string[] = [];
      for (const pathItem of Object.values(spec.paths)) {
        const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
        for (const method of methods) {
          const operation = pathItem[method];
          if (operation?.operationId) {
            actualOperationIds.push(operation.operationId);
          }
        }
      }

      for (const expectedId of expectedOperationIds) {
        expect(actualOperationIds).toContain(expectedId);
      }
    });
  });

  describe('Component Schemas', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have components.schemas defined', () => {
      expect(spec.components).toBeDefined();
      expect(spec.components.schemas).toBeDefined();
    });

    it('should have message request schemas', () => {
      expect(spec.components.schemas.SendMessageRequest).toBeDefined();
      expect(spec.components.schemas.MarkAsReadRequest).toBeDefined();
    });

    it('should have message component schemas', () => {
      expect(spec.components.schemas.TextObject).toBeDefined();
      expect(spec.components.schemas.TemplateObject).toBeDefined();
      expect(spec.components.schemas.MediaObject).toBeDefined();
      expect(spec.components.schemas.InteractiveObject).toBeDefined();
      expect(spec.components.schemas.LocationObject).toBeDefined();
      expect(spec.components.schemas.ContactObject).toBeDefined();
    });

    it('should have template schemas', () => {
      expect(spec.components.schemas.CreateTemplateRequest).toBeDefined();
      expect(spec.components.schemas.Template).toBeDefined();
      expect(spec.components.schemas.TemplatesListResponse).toBeDefined();
      expect(spec.components.schemas.TemplateComponentDefinition).toBeDefined();
    });

    it('should have phone number schemas', () => {
      expect(spec.components.schemas.PhoneNumber).toBeDefined();
      expect(spec.components.schemas.PhoneNumbersResponse).toBeDefined();
      expect(spec.components.schemas.RegisterPhoneRequest).toBeDefined();
      expect(spec.components.schemas.VerifyCodeRequest).toBeDefined();
    });

    it('should have QR code schemas', () => {
      expect(spec.components.schemas.QRCode).toBeDefined();
      expect(spec.components.schemas.QRCodesResponse).toBeDefined();
      expect(spec.components.schemas.CreateQRCodeRequest).toBeDefined();
    });

    it('should have business profile schemas', () => {
      expect(spec.components.schemas.BusinessProfile).toBeDefined();
      expect(spec.components.schemas.BusinessProfileResponse).toBeDefined();
      expect(spec.components.schemas.UpdateBusinessProfileRequest).toBeDefined();
    });

    it('should have WABA schemas', () => {
      expect(spec.components.schemas.WABA).toBeDefined();
      expect(spec.components.schemas.SubscribedAppsResponse).toBeDefined();
    });

    it('should have utility schemas', () => {
      expect(spec.components.schemas.SuccessResponse).toBeDefined();
      expect(spec.components.schemas.Paging).toBeDefined();
      expect(spec.components.schemas.Cursors).toBeDefined();
    });
  });

  describe('Parameters', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have path parameters defined correctly', () => {
      const sendMessageOp = spec.paths['/{phone_number_id}/messages'].post;
      expect(sendMessageOp?.parameters).toBeDefined();

      const phoneNumberIdParam = sendMessageOp?.parameters?.find(p => p.name === 'phone_number_id');
      expect(phoneNumberIdParam).toBeDefined();
      expect(phoneNumberIdParam?.in).toBe('path');
      expect(phoneNumberIdParam?.required).toBe(true);
    });

    it('should have query parameters defined correctly', () => {
      const listTemplatesOp = spec.paths['/{waba_id}/message_templates'].get;
      const nameParam = listTemplatesOp?.parameters?.find(p => p.name === 'name');
      const statusParam = listTemplatesOp?.parameters?.find(p => p.name === 'status');
      const limitParam = listTemplatesOp?.parameters?.find(p => p.name === 'limit');

      expect(nameParam).toBeDefined();
      expect(nameParam?.in).toBe('query');
      expect(statusParam).toBeDefined();
      expect(limitParam).toBeDefined();
    });
  });

  describe('Request Bodies', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have request body for sendMessage operation', () => {
      const sendMessageOp = spec.paths['/{phone_number_id}/messages'].post;
      expect(sendMessageOp?.requestBody).toBeDefined();
      expect(sendMessageOp?.requestBody?.required).toBe(true);
      expect(sendMessageOp?.requestBody?.content['application/json']).toBeDefined();
    });

    it('should have correct schema references in request bodies', () => {
      const sendMessageOp = spec.paths['/{phone_number_id}/messages'].post;
      const schema = sendMessageOp?.requestBody?.content['application/json'].schema;

      expect(schema).toBeDefined();
      expect('$ref' in schema! && schema.$ref).toBe('#/components/schemas/SendMessageRequest');
    });
  });

  describe('Responses', () => {
    beforeEach(() => {
      spec = parseOpenAPISpec(specPath);
    });

    it('should have success responses defined', () => {
      const sendMessageOp = spec.paths['/{phone_number_id}/messages'].post;
      expect(sendMessageOp?.responses['200']).toBeDefined();
    });

    it('should have correct response schemas', () => {
      const sendMessageOp = spec.paths['/{phone_number_id}/messages'].post;
      const responseSchema = sendMessageOp?.responses['200'].content?.['application/json'].schema;

      expect(responseSchema).toBeDefined();
      expect('$ref' in responseSchema! && responseSchema.$ref).toBe('#/components/schemas/SendMessageResponse');
    });
  });
});
