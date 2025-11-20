/**
 * API Integration Test Suite
 *
 * This test suite verifies that the unified Telegram SDK properly integrates
 * all three API types (Bot, Gateway, Client).
 */

import { describe, it, expect } from 'vitest';
import { TelegramSDK } from '../src/index';

describe('Telegram SDK Integration', () => {
  describe('SDK Exports', () => {
    it('should export TelegramSDK class', () => {
      expect(TelegramSDK).toBeDefined();
      expect(typeof TelegramSDK).toBe('function');
    });

    it('should have static factory methods', () => {
      expect(TelegramSDK.createBotClient).toBeDefined();
      expect(typeof TelegramSDK.createBotClient).toBe('function');

      expect(TelegramSDK.createGatewayClient).toBeDefined();
      expect(typeof TelegramSDK.createGatewayClient).toBe('function');

      expect(TelegramSDK.createClientClient).toBeDefined();
      expect(typeof TelegramSDK.createClientClient).toBe('function');
    });
  });

  describe('Bot API Integration', () => {
    it('should create Bot API instance', () => {
      const bot = TelegramSDK.createBotClient({
        botToken: 'test-token-123',
      });

      expect(bot).toBeDefined();
      expect(bot.sendMessage).toBeDefined();
      expect(bot.getUpdates).toBeDefined();
      expect(bot.getMe).toBeDefined();
    });

    it('should have all Bot API methods', () => {
      const bot = TelegramSDK.createBotClient({
        botToken: 'test-token-123',
      });

      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(bot))
        .filter(name => name !== 'constructor');

      expect(methods.length).toBeGreaterThan(40);
    });
  });

  describe('Gateway API Integration', () => {
    it('should create Gateway API instance', () => {
      const gateway = TelegramSDK.createGatewayClient({
        accessToken: 'test-access-token',
      });

      expect(gateway).toBeDefined();
      expect(gateway.sendVerificationMessage).toBeDefined();
      expect(gateway.checkSendAbility).toBeDefined();
      expect(gateway.checkVerificationStatus).toBeDefined();
    });

    it('should have all Gateway API methods', () => {
      const gateway = TelegramSDK.createGatewayClient({
        accessToken: 'test-access-token',
      });

      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(gateway))
        .filter(name => name !== 'constructor');

      expect(methods).toHaveLength(5);
    });
  });

  describe('Client API Integration', () => {
    it('should create Client API instance', async () => {
      const client = await TelegramSDK.createClientClient({
        apiId: 12345,
        apiHash: 'test-hash',
        session: {
          authKey: 'test-key',
          dcId: 2,
          createdAt: Date.now(),
          lastActivityAt: Date.now(),
        },
      });

      expect(client).toBeDefined();
      expect(client.authSendCode).toBeDefined();
      expect(client.messagesSendMessage).toBeDefined();
      expect(client.messagesGetDialogs).toBeDefined();
    });

    it('should have all Client API methods', async () => {
      const client = await TelegramSDK.createClientClient({
        apiId: 12345,
        apiHash: 'test-hash',
        session: {
          authKey: 'test-key',
          dcId: 2,
          createdAt: Date.now(),
          lastActivityAt: Date.now(),
        },
      });

      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(client))
        .filter(name => name !== 'constructor');

      expect(methods.length).toBeGreaterThan(35);
    });
  });

  describe('Type Exports', () => {
    it('should export Bot API types', async () => {
      const { BotTypes } = await import('../lib/index');
      expect(BotTypes).toBeDefined();
    });

    it('should export Gateway API types', async () => {
      const { GatewayTypes } = await import('../lib/index');
      expect(GatewayTypes).toBeDefined();
    });

    it('should export Client API types', async () => {
      const { ClientTypes } = await import('../lib/index');
      expect(ClientTypes).toBeDefined();
    });
  });

  describe('Auth Module Exports', () => {
    it('should export Bot auth utilities', async () => {
      const { createBotClient, TelegramBotConfig } = await import('../src/index');
      expect(createBotClient).toBeDefined();
    });

    it('should export Gateway auth utilities', async () => {
      const { createGatewayClient, TelegramGatewayConfig } = await import('../src/index');
      expect(createGatewayClient).toBeDefined();
    });

    it('should export Client auth utilities', async () => {
      const {
        createClientClient,
        TelegramClientConfig,
        isSessionValid,
        createSession,
      } = await import('../src/index');

      expect(createClientClient).toBeDefined();
      expect(isSessionValid).toBeDefined();
      expect(createSession).toBeDefined();
    });
  });
});
