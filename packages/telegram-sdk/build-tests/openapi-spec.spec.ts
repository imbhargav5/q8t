/**
 * OpenAPI Specification Test Suite
 *
 * This test suite validates the OpenAPI specifications for all three Telegram APIs.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { join } from 'path';

describe('OpenAPI Specifications', () => {
  describe('Bot API Specification', () => {
    it('should have valid OpenAPI 3.0.3 spec', () => {
      const specPath = join(__dirname, '../api/bot-api.yaml');
      const content = readFileSync(specPath, 'utf-8');
      const spec = parse(content);

      expect(spec.openapi).toBe('3.0.3');
      expect(spec.info).toBeDefined();
      expect(spec.info.title).toBe('Telegram Bot API');
      expect(spec.paths).toBeDefined();
      expect(spec.components).toBeDefined();
      expect(spec.components.schemas).toBeDefined();
    });

    it('should have proper server configuration', () => {
      const specPath = join(__dirname, '../api/bot-api.yaml');
      const content = readFileSync(specPath, 'utf-8');
      const spec = parse(content);

      expect(spec.servers).toBeDefined();
      expect(spec.servers.length).toBeGreaterThan(0);
      expect(spec.servers[0].url).toBe('https://api.telegram.org');
    });

    it('should define core Bot API endpoints', () => {
      const specPath = join(__dirname, '../api/bot-api.yaml');
      const content = readFileSync(specPath, 'utf-8');
      const spec = parse(content);

      const paths = Object.keys(spec.paths);
      expect(paths).toContain('/bot{token}/getUpdates');
      expect(paths).toContain('/bot{token}/sendMessage');
      expect(paths).toContain('/bot{token}/getMe');
    });

    it('should define all message sending endpoints', () => {
      const specPath = join(__dirname, '../api/bot-api.yaml');
      const content = readFileSync(specPath, 'utf-8');
      const spec = parse(content);

      const paths = Object.keys(spec.paths);
      expect(paths).toContain('/bot{token}/sendPhoto');
      expect(paths).toContain('/bot{token}/sendVideo');
      expect(paths).toContain('/bot{token}/sendDocument');
      expect(paths).toContain('/bot{token}/sendAudio');
    });
  });

  describe('Gateway API Specification', () => {
    it('should have valid OpenAPI 3.0.3 spec', () => {
      const specPath = join(__dirname, '../api/gateway-api.yaml');
      const content = readFileSync(specPath, 'utf-8');
      const spec = parse(content);

      expect(spec.openapi).toBe('3.0.3');
      expect(spec.info).toBeDefined();
      expect(spec.info.title).toBe('Telegram Gateway API');
      expect(spec.paths).toBeDefined();
      expect(spec.components).toBeDefined();
      expect(spec.components.schemas).toBeDefined();
    });

    it('should have proper server configuration', () => {
      const specPath = join(__dirname, '../api/gateway-api.yaml');
      const content = readFileSync(specPath, 'utf-8');
      const spec = parse(content);

      expect(spec.servers).toBeDefined();
      expect(spec.servers.length).toBeGreaterThan(0);
      expect(spec.servers[0].url).toBe('https://gatewayapi.telegram.org');
    });

    it('should define all Gateway API endpoints', () => {
      const specPath = join(__dirname, '../api/gateway-api.yaml');
      const content = readFileSync(specPath, 'utf-8');
      const spec = parse(content);

      const paths = Object.keys(spec.paths);
      expect(paths).toContain('/sendVerificationMessage');
      expect(paths).toContain('/checkSendAbility');
      expect(paths).toContain('/checkVerificationStatus');
      expect(paths).toContain('/revokeVerificationMessage');
    });
  });

  describe('Client API Specification', () => {
    it('should have valid OpenAPI 3.0.3 spec', () => {
      const specPath = join(__dirname, '../api/client-api.yaml');
      const content = readFileSync(specPath, 'utf-8');
      const spec = parse(content);

      expect(spec.openapi).toBe('3.0.3');
      expect(spec.info).toBeDefined();
      expect(spec.info.title).toBe('Telegram Client API (MTProto)');
      expect(spec.paths).toBeDefined();
      expect(spec.components).toBeDefined();
      expect(spec.components.schemas).toBeDefined();
    });

    it('should have proper server configuration', () => {
      const specPath = join(__dirname, '../api/client-api.yaml');
      const content = readFileSync(specPath, 'utf-8');
      const spec = parse(content);

      expect(spec.servers).toBeDefined();
      expect(spec.servers.length).toBeGreaterThan(0);
      expect(spec.servers[0].url).toBe('https://api.telegram.org');
    });

    it('should define authentication endpoints', () => {
      const specPath = join(__dirname, '../api/client-api.yaml');
      const content = readFileSync(specPath, 'utf-8');
      const spec = parse(content);

      const paths = Object.keys(spec.paths);
      expect(paths).toContain('/auth.sendCode');
      expect(paths).toContain('/auth.signIn');
      expect(paths).toContain('/auth.signUp');
      expect(paths).toContain('/auth.checkPassword');
    });

    it('should define message endpoints', () => {
      const specPath = join(__dirname, '../api/client-api.yaml');
      const content = readFileSync(specPath, 'utf-8');
      const spec = parse(content);

      const paths = Object.keys(spec.paths);
      expect(paths).toContain('/messages.sendMessage');
      expect(paths).toContain('/messages.getHistory');
      expect(paths).toContain('/messages.getDialogs');
    });

    it('should define business API endpoints', () => {
      const specPath = join(__dirname, '../api/client-api.yaml');
      const content = readFileSync(specPath, 'utf-8');
      const spec = parse(content);

      const paths = Object.keys(spec.paths);
      expect(paths).toContain('/account.updateBusinessWorkHours');
      expect(paths).toContain('/account.updateBusinessLocation');
      expect(paths).toContain('/messages.getQuickReplies');
    });
  });
});
