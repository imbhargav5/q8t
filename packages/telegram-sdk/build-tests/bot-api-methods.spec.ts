/**
 * Bot API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the Bot API OpenAPI specification
 * are present in the generated BotApi class.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { BotApi } from '../lib/bot-api';
import type { BotHttpClient } from '../src/bot/client';

describe('BotApi - Method Existence', () => {
  let api: BotApi;
  let mockClient: BotHttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
    } as BotHttpClient;

    api = new BotApi(mockClient);
  });

  describe('Getting Updates', () => {
    it('should have getUpdates method', () => {
      expect(api.getUpdates).toBeDefined();
      expect(typeof api.getUpdates).toBe('function');
    });

    it('should have setWebhook method', () => {
      expect(api.setWebhook).toBeDefined();
      expect(typeof api.setWebhook).toBe('function');
    });

    it('should have deleteWebhook method', () => {
      expect(api.deleteWebhook).toBeDefined();
      expect(typeof api.deleteWebhook).toBe('function');
    });

    it('should have getWebhookInfo method', () => {
      expect(api.getWebhookInfo).toBeDefined();
      expect(typeof api.getWebhookInfo).toBe('function');
    });
  });

  describe('Sending Messages', () => {
    it('should have sendMessage method', () => {
      expect(api.sendMessage).toBeDefined();
      expect(typeof api.sendMessage).toBe('function');
    });

    it('should have sendPhoto method', () => {
      expect(api.sendPhoto).toBeDefined();
      expect(typeof api.sendPhoto).toBe('function');
    });

    it('should have sendVideo method', () => {
      expect(api.sendVideo).toBeDefined();
      expect(typeof api.sendVideo).toBe('function');
    });

    it('should have sendDocument method', () => {
      expect(api.sendDocument).toBeDefined();
      expect(typeof api.sendDocument).toBe('function');
    });

    it('should have sendAudio method', () => {
      expect(api.sendAudio).toBeDefined();
      expect(typeof api.sendAudio).toBe('function');
    });

    it('should have sendVoice method', () => {
      expect(api.sendVoice).toBeDefined();
      expect(typeof api.sendVoice).toBe('function');
    });

    it('should have sendLocation method', () => {
      expect(api.sendLocation).toBeDefined();
      expect(typeof api.sendLocation).toBe('function');
    });

    it('should have sendPoll method', () => {
      expect(api.sendPoll).toBeDefined();
      expect(typeof api.sendPoll).toBe('function');
    });

    it('should have sendSticker method', () => {
      expect(api.sendSticker).toBeDefined();
      expect(typeof api.sendSticker).toBe('function');
    });
  });

  describe('Message Management', () => {
    it('should have forwardMessage method', () => {
      expect(api.forwardMessage).toBeDefined();
      expect(typeof api.forwardMessage).toBe('function');
    });

    it('should have copyMessage method', () => {
      expect(api.copyMessage).toBeDefined();
      expect(typeof api.copyMessage).toBe('function');
    });

    it('should have editMessageText method', () => {
      expect(api.editMessageText).toBeDefined();
      expect(typeof api.editMessageText).toBe('function');
    });

    it('should have editMessageCaption method', () => {
      expect(api.editMessageCaption).toBeDefined();
      expect(typeof api.editMessageCaption).toBe('function');
    });

    it('should have editMessageReplyMarkup method', () => {
      expect(api.editMessageReplyMarkup).toBeDefined();
      expect(typeof api.editMessageReplyMarkup).toBe('function');
    });

    it('should have deleteMessage method', () => {
      expect(api.deleteMessage).toBeDefined();
      expect(typeof api.deleteMessage).toBe('function');
    });
  });

  describe('Chat Management', () => {
    it('should have getChat method', () => {
      expect(api.getChat).toBeDefined();
      expect(typeof api.getChat).toBe('function');
    });

    it('should have getChatAdministrators method', () => {
      expect(api.getChatAdministrators).toBeDefined();
      expect(typeof api.getChatAdministrators).toBe('function');
    });

    it('should have getChatMemberCount method', () => {
      expect(api.getChatMemberCount).toBeDefined();
      expect(typeof api.getChatMemberCount).toBe('function');
    });

    it('should have getChatMember method', () => {
      expect(api.getChatMember).toBeDefined();
      expect(typeof api.getChatMember).toBe('function');
    });

    it('should have banChatMember method', () => {
      expect(api.banChatMember).toBeDefined();
      expect(typeof api.banChatMember).toBe('function');
    });

    it('should have unbanChatMember method', () => {
      expect(api.unbanChatMember).toBeDefined();
      expect(typeof api.unbanChatMember).toBe('function');
    });

    it('should have restrictChatMember method', () => {
      expect(api.restrictChatMember).toBeDefined();
      expect(typeof api.restrictChatMember).toBe('function');
    });

    it('should have promoteChatMember method', () => {
      expect(api.promoteChatMember).toBeDefined();
      expect(typeof api.promoteChatMember).toBe('function');
    });

    it('should have setChatAdministratorCustomTitle method', () => {
      expect(api.setChatAdministratorCustomTitle).toBeDefined();
      expect(typeof api.setChatAdministratorCustomTitle).toBe('function');
    });

    it('should have setChatPermissions method', () => {
      expect(api.setChatPermissions).toBeDefined();
      expect(typeof api.setChatPermissions).toBe('function');
    });

    it('should have setChatPhoto method', () => {
      expect(api.setChatPhoto).toBeDefined();
      expect(typeof api.setChatPhoto).toBe('function');
    });

    it('should have deleteChatPhoto method', () => {
      expect(api.deleteChatPhoto).toBeDefined();
      expect(typeof api.deleteChatPhoto).toBe('function');
    });

    it('should have setChatTitle method', () => {
      expect(api.setChatTitle).toBeDefined();
      expect(typeof api.setChatTitle).toBe('function');
    });

    it('should have setChatDescription method', () => {
      expect(api.setChatDescription).toBeDefined();
      expect(typeof api.setChatDescription).toBe('function');
    });

    it('should have pinChatMessage method', () => {
      expect(api.pinChatMessage).toBeDefined();
      expect(typeof api.pinChatMessage).toBe('function');
    });

    it('should have unpinChatMessage method', () => {
      expect(api.unpinChatMessage).toBeDefined();
      expect(typeof api.unpinChatMessage).toBe('function');
    });

    it('should have unpinAllChatMessages method', () => {
      expect(api.unpinAllChatMessages).toBeDefined();
      expect(typeof api.unpinAllChatMessages).toBe('function');
    });

    it('should have leaveChat method', () => {
      expect(api.leaveChat).toBeDefined();
      expect(typeof api.leaveChat).toBe('function');
    });
  });

  describe('File Operations', () => {
    it('should have getFile method', () => {
      expect(api.getFile).toBeDefined();
      expect(typeof api.getFile).toBe('function');
    });
  });

  describe('Bot Information', () => {
    it('should have getMe method', () => {
      expect(api.getMe).toBeDefined();
      expect(typeof api.getMe).toBe('function');
    });

    it('should have setMyCommands method', () => {
      expect(api.setMyCommands).toBeDefined();
      expect(typeof api.setMyCommands).toBe('function');
    });

    it('should have getMyCommands method', () => {
      expect(api.getMyCommands).toBeDefined();
      expect(typeof api.getMyCommands).toBe('function');
    });

    it('should have deleteMyCommands method', () => {
      expect(api.deleteMyCommands).toBeDefined();
      expect(typeof api.deleteMyCommands).toBe('function');
    });
  });

  describe('Sticker Management', () => {
    it('should have getStickerSet method', () => {
      expect(api.getStickerSet).toBeDefined();
      expect(typeof api.getStickerSet).toBe('function');
    });

    it('should have getCustomEmojiStickers method', () => {
      expect(api.getCustomEmojiStickers).toBeDefined();
      expect(typeof api.getCustomEmojiStickers).toBe('function');
    });
  });

  describe('Inline Mode', () => {
    it('should have answerInlineQuery method', () => {
      expect(api.answerInlineQuery).toBeDefined();
      expect(typeof api.answerInlineQuery).toBe('function');
    });

    it('should have answerCallbackQuery method', () => {
      expect(api.answerCallbackQuery).toBeDefined();
      expect(typeof api.answerCallbackQuery).toBe('function');
    });
  });

  describe('Method Count Validation', () => {
    it('should have exactly 46 public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof BotApi] === 'function');

      expect(methods).toHaveLength(46);
    });

    it('should have all core Bot API methods', () => {
      const coreMethods = [
        'sendMessage',
        'getUpdates',
        'setWebhook',
        'getMe',
        'sendPhoto',
        'sendVideo',
        'deleteMessage',
        'editMessageText',
        'getChat',
        'getChatMember',
        'banChatMember',
        'unbanChatMember',
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor');

      for (const method of coreMethods) {
        expect(actualMethods).toContain(method);
      }
    });
  });
});
