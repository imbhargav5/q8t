/**
 * Client API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the Client API (MTProto) OpenAPI specification
 * are present in the generated ClientApi class.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ClientApi } from '../lib/client-api';
import type { ClientHttpClient } from '../src/client/client';

describe('ClientApi - Method Existence', () => {
  let api: ClientApi;
  let mockClient: ClientHttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
      getSession: () => undefined,
    } as ClientHttpClient;

    api = new ClientApi(mockClient);
  });

  describe('Authentication Methods', () => {
    it('should have authSendCode method', () => {
      expect(api.authSendCode).toBeDefined();
      expect(typeof api.authSendCode).toBe('function');
    });

    it('should have authSignIn method', () => {
      expect(api.authSignIn).toBeDefined();
      expect(typeof api.authSignIn).toBe('function');
    });

    it('should have authSignUp method', () => {
      expect(api.authSignUp).toBeDefined();
      expect(typeof api.authSignUp).toBe('function');
    });

    it('should have authCheckPassword method', () => {
      expect(api.authCheckPassword).toBeDefined();
      expect(typeof api.authCheckPassword).toBe('function');
    });

    it('should have authLogOut method', () => {
      expect(api.authLogOut).toBeDefined();
      expect(typeof api.authLogOut).toBe('function');
    });

    it('should have authResetAuthorizations method', () => {
      expect(api.authResetAuthorizations).toBeDefined();
      expect(typeof api.authResetAuthorizations).toBe('function');
    });
  });

  describe('Account Methods', () => {
    it('should have accountGetPassword method', () => {
      expect(api.accountGetPassword).toBeDefined();
      expect(typeof api.accountGetPassword).toBe('function');
    });

    it('should have accountUpdateProfile method', () => {
      expect(api.accountUpdateProfile).toBeDefined();
      expect(typeof api.accountUpdateProfile).toBe('function');
    });

    it('should have accountUpdateStatus method', () => {
      expect(api.accountUpdateStatus).toBeDefined();
      expect(typeof api.accountUpdateStatus).toBe('function');
    });

    it('should have accountGetPrivacy method', () => {
      expect(api.accountGetPrivacy).toBeDefined();
      expect(typeof api.accountGetPrivacy).toBe('function');
    });

    it('should have accountSetPrivacy method', () => {
      expect(api.accountSetPrivacy).toBeDefined();
      expect(typeof api.accountSetPrivacy).toBe('function');
    });
  });

  describe('User Methods', () => {
    it('should have usersGetUsers method', () => {
      expect(api.usersGetUsers).toBeDefined();
      expect(typeof api.usersGetUsers).toBe('function');
    });

    it('should have usersGetFullUser method', () => {
      expect(api.usersGetFullUser).toBeDefined();
      expect(typeof api.usersGetFullUser).toBe('function');
    });
  });

  describe('Contacts Methods', () => {
    it('should have contactsGetContacts method', () => {
      expect(api.contactsGetContacts).toBeDefined();
      expect(typeof api.contactsGetContacts).toBe('function');
    });

    it('should have contactsImportContacts method', () => {
      expect(api.contactsImportContacts).toBeDefined();
      expect(typeof api.contactsImportContacts).toBe('function');
    });

    it('should have contactsDeleteContacts method', () => {
      expect(api.contactsDeleteContacts).toBeDefined();
      expect(typeof api.contactsDeleteContacts).toBe('function');
    });

    it('should have contactsBlock method', () => {
      expect(api.contactsBlock).toBeDefined();
      expect(typeof api.contactsBlock).toBe('function');
    });

    it('should have contactsUnblock method', () => {
      expect(api.contactsUnblock).toBeDefined();
      expect(typeof api.contactsUnblock).toBe('function');
    });
  });

  describe('Messages Methods', () => {
    it('should have messagesSendMessage method', () => {
      expect(api.messagesSendMessage).toBeDefined();
      expect(typeof api.messagesSendMessage).toBe('function');
    });

    it('should have messagesSendMedia method', () => {
      expect(api.messagesSendMedia).toBeDefined();
      expect(typeof api.messagesSendMedia).toBe('function');
    });

    it('should have messagesGetHistory method', () => {
      expect(api.messagesGetHistory).toBeDefined();
      expect(typeof api.messagesGetHistory).toBe('function');
    });

    it('should have messagesGetDialogs method', () => {
      expect(api.messagesGetDialogs).toBeDefined();
      expect(typeof api.messagesGetDialogs).toBe('function');
    });

    it('should have messagesReadHistory method', () => {
      expect(api.messagesReadHistory).toBeDefined();
      expect(typeof api.messagesReadHistory).toBe('function');
    });

    it('should have messagesDeleteMessages method', () => {
      expect(api.messagesDeleteMessages).toBeDefined();
      expect(typeof api.messagesDeleteMessages).toBe('function');
    });

    it('should have messagesEditMessage method', () => {
      expect(api.messagesEditMessage).toBeDefined();
      expect(typeof api.messagesEditMessage).toBe('function');
    });

    it('should have messagesForwardMessages method', () => {
      expect(api.messagesForwardMessages).toBeDefined();
      expect(typeof api.messagesForwardMessages).toBe('function');
    });

    it('should have messagesSendReaction method', () => {
      expect(api.messagesSendReaction).toBeDefined();
      expect(typeof api.messagesSendReaction).toBe('function');
    });
  });

  describe('Channels Methods', () => {
    it('should have channelsGetChannels method', () => {
      expect(api.channelsGetChannels).toBeDefined();
      expect(typeof api.channelsGetChannels).toBe('function');
    });

    it('should have channelsGetFullChannel method', () => {
      expect(api.channelsGetFullChannel).toBeDefined();
      expect(typeof api.channelsGetFullChannel).toBe('function');
    });

    it('should have channelsCreateChannel method', () => {
      expect(api.channelsCreateChannel).toBeDefined();
      expect(typeof api.channelsCreateChannel).toBe('function');
    });

    it('should have channelsJoinChannel method', () => {
      expect(api.channelsJoinChannel).toBeDefined();
      expect(typeof api.channelsJoinChannel).toBe('function');
    });

    it('should have channelsLeaveChannel method', () => {
      expect(api.channelsLeaveChannel).toBeDefined();
      expect(typeof api.channelsLeaveChannel).toBe('function');
    });
  });

  describe('Updates Methods', () => {
    it('should have updatesGetState method', () => {
      expect(api.updatesGetState).toBeDefined();
      expect(typeof api.updatesGetState).toBe('function');
    });

    it('should have updatesGetDifference method', () => {
      expect(api.updatesGetDifference).toBeDefined();
      expect(typeof api.updatesGetDifference).toBe('function');
    });
  });

  describe('Business API Methods', () => {
    it('should have accountUpdateBusinessWorkHours method', () => {
      expect(api.accountUpdateBusinessWorkHours).toBeDefined();
      expect(typeof api.accountUpdateBusinessWorkHours).toBe('function');
    });

    it('should have accountUpdateBusinessLocation method', () => {
      expect(api.accountUpdateBusinessLocation).toBeDefined();
      expect(typeof api.accountUpdateBusinessLocation).toBe('function');
    });

    it('should have accountUpdateBusinessIntro method', () => {
      expect(api.accountUpdateBusinessIntro).toBeDefined();
      expect(typeof api.accountUpdateBusinessIntro).toBe('function');
    });

    it('should have accountGetBusinessChatLinks method', () => {
      expect(api.accountGetBusinessChatLinks).toBeDefined();
      expect(typeof api.accountGetBusinessChatLinks).toBe('function');
    });

    it('should have messagesGetQuickReplies method', () => {
      expect(api.messagesGetQuickReplies).toBeDefined();
      expect(typeof api.messagesGetQuickReplies).toBe('function');
    });

    it('should have messagesSendQuickReplyMessages method', () => {
      expect(api.messagesSendQuickReplyMessages).toBeDefined();
      expect(typeof api.messagesSendQuickReplyMessages).toBe('function');
    });
  });

  describe('Method Count Validation', () => {
    it('should have at least 40 public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof ClientApi] === 'function');

      expect(methods.length).toBeGreaterThanOrEqual(40);
    });

    it('should have all core Client API methods', () => {
      const coreMethods = [
        'authSendCode',
        'authSignIn',
        'messagesSendMessage',
        'messagesGetDialogs',
        'messagesGetHistory',
        'channelsGetChannels',
        'usersGetUsers',
        'contactsGetContacts',
        'updatesGetState',
        'accountUpdateBusinessWorkHours',
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor');

      for (const method of coreMethods) {
        expect(actualMethods).toContain(method);
      }
    });
  });
});
