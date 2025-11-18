/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specification
 * are present in the generated SlackApi class.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { SlackApi } from '../lib/api';
import type { HttpClient } from '../src/auth/client';

describe('SlackApi - Method Existence', () => {
  let api: SlackApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
      patch: async () => ({}),
    } as HttpClient;

    api = new SlackApi(mockClient);
  });

  describe('Admin Apps Operations', () => {
    it('should have admin_apps_approve method', () => {
      expect(api.admin_apps_approve).toBeDefined();
      expect(typeof api.admin_apps_approve).toBe('function');
    });

    it('should have admin_apps_approved_list method', () => {
      expect(api.admin_apps_approved_list).toBeDefined();
      expect(typeof api.admin_apps_approved_list).toBe('function');
    });

    it('should have admin_apps_requests_list method', () => {
      expect(api.admin_apps_requests_list).toBeDefined();
      expect(typeof api.admin_apps_requests_list).toBe('function');
    });

    it('should have admin_apps_restrict method', () => {
      expect(api.admin_apps_restrict).toBeDefined();
      expect(typeof api.admin_apps_restrict).toBe('function');
    });

    it('should have admin_apps_restricted_list method', () => {
      expect(api.admin_apps_restricted_list).toBeDefined();
      expect(typeof api.admin_apps_restricted_list).toBe('function');
    });
  });

  describe('Admin Conversations Operations', () => {
    it('should have admin_conversations_archive method', () => {
      expect(api.admin_conversations_archive).toBeDefined();
      expect(typeof api.admin_conversations_archive).toBe('function');
    });

    it('should have admin_conversations_convertToPrivate method', () => {
      expect(api.admin_conversations_convertToPrivate).toBeDefined();
      expect(typeof api.admin_conversations_convertToPrivate).toBe('function');
    });

    it('should have admin_conversations_create method', () => {
      expect(api.admin_conversations_create).toBeDefined();
      expect(typeof api.admin_conversations_create).toBe('function');
    });

    it('should have admin_conversations_delete method', () => {
      expect(api.admin_conversations_delete).toBeDefined();
      expect(typeof api.admin_conversations_delete).toBe('function');
    });

    it('should have admin_conversations_disconnectShared method', () => {
      expect(api.admin_conversations_disconnectShared).toBeDefined();
      expect(typeof api.admin_conversations_disconnectShared).toBe('function');
    });

    it('should have admin_conversations_ekm_listOriginalConnectedChannelInfo method', () => {
      expect(api.admin_conversations_ekm_listOriginalConnectedChannelInfo).toBeDefined();
      expect(typeof api.admin_conversations_ekm_listOriginalConnectedChannelInfo).toBe('function');
    });

    it('should have admin_conversations_getConversationPrefs method', () => {
      expect(api.admin_conversations_getConversationPrefs).toBeDefined();
      expect(typeof api.admin_conversations_getConversationPrefs).toBe('function');
    });

    it('should have admin_conversations_getTeams method', () => {
      expect(api.admin_conversations_getTeams).toBeDefined();
      expect(typeof api.admin_conversations_getTeams).toBe('function');
    });

    it('should have admin_conversations_invite method', () => {
      expect(api.admin_conversations_invite).toBeDefined();
      expect(typeof api.admin_conversations_invite).toBe('function');
    });

    it('should have admin_conversations_rename method', () => {
      expect(api.admin_conversations_rename).toBeDefined();
      expect(typeof api.admin_conversations_rename).toBe('function');
    });

    it('should have admin_conversations_restrictAccess_addGroup method', () => {
      expect(api.admin_conversations_restrictAccess_addGroup).toBeDefined();
      expect(typeof api.admin_conversations_restrictAccess_addGroup).toBe('function');
    });

    it('should have admin_conversations_restrictAccess_listGroups method', () => {
      expect(api.admin_conversations_restrictAccess_listGroups).toBeDefined();
      expect(typeof api.admin_conversations_restrictAccess_listGroups).toBe('function');
    });

    it('should have admin_conversations_restrictAccess_removeGroup method', () => {
      expect(api.admin_conversations_restrictAccess_removeGroup).toBeDefined();
      expect(typeof api.admin_conversations_restrictAccess_removeGroup).toBe('function');
    });

    it('should have admin_conversations_search method', () => {
      expect(api.admin_conversations_search).toBeDefined();
      expect(typeof api.admin_conversations_search).toBe('function');
    });

    it('should have admin_conversations_setConversationPrefs method', () => {
      expect(api.admin_conversations_setConversationPrefs).toBeDefined();
      expect(typeof api.admin_conversations_setConversationPrefs).toBe('function');
    });

    it('should have admin_conversations_setTeams method', () => {
      expect(api.admin_conversations_setTeams).toBeDefined();
      expect(typeof api.admin_conversations_setTeams).toBe('function');
    });

    it('should have admin_conversations_unarchive method', () => {
      expect(api.admin_conversations_unarchive).toBeDefined();
      expect(typeof api.admin_conversations_unarchive).toBe('function');
    });
  });

  describe('Admin Emoji Operations', () => {
    it('should have admin_emoji_add method', () => {
      expect(api.admin_emoji_add).toBeDefined();
      expect(typeof api.admin_emoji_add).toBe('function');
    });

    it('should have admin_emoji_addAlias method', () => {
      expect(api.admin_emoji_addAlias).toBeDefined();
      expect(typeof api.admin_emoji_addAlias).toBe('function');
    });

    it('should have admin_emoji_list method', () => {
      expect(api.admin_emoji_list).toBeDefined();
      expect(typeof api.admin_emoji_list).toBe('function');
    });

    it('should have admin_emoji_remove method', () => {
      expect(api.admin_emoji_remove).toBeDefined();
      expect(typeof api.admin_emoji_remove).toBe('function');
    });

    it('should have admin_emoji_rename method', () => {
      expect(api.admin_emoji_rename).toBeDefined();
      expect(typeof api.admin_emoji_rename).toBe('function');
    });
  });

  describe('Admin Invite Requests Operations', () => {
    it('should have admin_inviteRequests_approve method', () => {
      expect(api.admin_inviteRequests_approve).toBeDefined();
      expect(typeof api.admin_inviteRequests_approve).toBe('function');
    });

    it('should have admin_inviteRequests_approved_list method', () => {
      expect(api.admin_inviteRequests_approved_list).toBeDefined();
      expect(typeof api.admin_inviteRequests_approved_list).toBe('function');
    });

    it('should have admin_inviteRequests_denied_list method', () => {
      expect(api.admin_inviteRequests_denied_list).toBeDefined();
      expect(typeof api.admin_inviteRequests_denied_list).toBe('function');
    });

    it('should have admin_inviteRequests_deny method', () => {
      expect(api.admin_inviteRequests_deny).toBeDefined();
      expect(typeof api.admin_inviteRequests_deny).toBe('function');
    });

    it('should have admin_inviteRequests_list method', () => {
      expect(api.admin_inviteRequests_list).toBeDefined();
      expect(typeof api.admin_inviteRequests_list).toBe('function');
    });
  });

  describe('Admin Teams Operations', () => {
    it('should have admin_teams_admins_list method', () => {
      expect(api.admin_teams_admins_list).toBeDefined();
      expect(typeof api.admin_teams_admins_list).toBe('function');
    });

    it('should have admin_teams_create method', () => {
      expect(api.admin_teams_create).toBeDefined();
      expect(typeof api.admin_teams_create).toBe('function');
    });

    it('should have admin_teams_list method', () => {
      expect(api.admin_teams_list).toBeDefined();
      expect(typeof api.admin_teams_list).toBe('function');
    });

    it('should have admin_teams_owners_list method', () => {
      expect(api.admin_teams_owners_list).toBeDefined();
      expect(typeof api.admin_teams_owners_list).toBe('function');
    });

    it('should have admin_teams_settings_info method', () => {
      expect(api.admin_teams_settings_info).toBeDefined();
      expect(typeof api.admin_teams_settings_info).toBe('function');
    });

    it('should have admin_teams_settings_setDefaultChannels method', () => {
      expect(api.admin_teams_settings_setDefaultChannels).toBeDefined();
      expect(typeof api.admin_teams_settings_setDefaultChannels).toBe('function');
    });

    it('should have admin_teams_settings_setDescription method', () => {
      expect(api.admin_teams_settings_setDescription).toBeDefined();
      expect(typeof api.admin_teams_settings_setDescription).toBe('function');
    });

    it('should have admin_teams_settings_setDiscoverability method', () => {
      expect(api.admin_teams_settings_setDiscoverability).toBeDefined();
      expect(typeof api.admin_teams_settings_setDiscoverability).toBe('function');
    });

    it('should have admin_teams_settings_setIcon method', () => {
      expect(api.admin_teams_settings_setIcon).toBeDefined();
      expect(typeof api.admin_teams_settings_setIcon).toBe('function');
    });

    it('should have admin_teams_settings_setName method', () => {
      expect(api.admin_teams_settings_setName).toBeDefined();
      expect(typeof api.admin_teams_settings_setName).toBe('function');
    });
  });

  describe('Admin Usergroups Operations', () => {
    it('should have admin_usergroups_addChannels method', () => {
      expect(api.admin_usergroups_addChannels).toBeDefined();
      expect(typeof api.admin_usergroups_addChannels).toBe('function');
    });

    it('should have admin_usergroups_addTeams method', () => {
      expect(api.admin_usergroups_addTeams).toBeDefined();
      expect(typeof api.admin_usergroups_addTeams).toBe('function');
    });

    it('should have admin_usergroups_listChannels method', () => {
      expect(api.admin_usergroups_listChannels).toBeDefined();
      expect(typeof api.admin_usergroups_listChannels).toBe('function');
    });

    it('should have admin_usergroups_removeChannels method', () => {
      expect(api.admin_usergroups_removeChannels).toBeDefined();
      expect(typeof api.admin_usergroups_removeChannels).toBe('function');
    });
  });

  describe('Admin Users Operations', () => {
    it('should have admin_users_assign method', () => {
      expect(api.admin_users_assign).toBeDefined();
      expect(typeof api.admin_users_assign).toBe('function');
    });

    it('should have admin_users_invite method', () => {
      expect(api.admin_users_invite).toBeDefined();
      expect(typeof api.admin_users_invite).toBe('function');
    });

    it('should have admin_users_list method', () => {
      expect(api.admin_users_list).toBeDefined();
      expect(typeof api.admin_users_list).toBe('function');
    });

    it('should have admin_users_remove method', () => {
      expect(api.admin_users_remove).toBeDefined();
      expect(typeof api.admin_users_remove).toBe('function');
    });

    it('should have admin_users_session_invalidate method', () => {
      expect(api.admin_users_session_invalidate).toBeDefined();
      expect(typeof api.admin_users_session_invalidate).toBe('function');
    });

    it('should have admin_users_session_reset method', () => {
      expect(api.admin_users_session_reset).toBeDefined();
      expect(typeof api.admin_users_session_reset).toBe('function');
    });

    it('should have admin_users_setAdmin method', () => {
      expect(api.admin_users_setAdmin).toBeDefined();
      expect(typeof api.admin_users_setAdmin).toBe('function');
    });

    it('should have admin_users_setExpiration method', () => {
      expect(api.admin_users_setExpiration).toBeDefined();
      expect(typeof api.admin_users_setExpiration).toBe('function');
    });

    it('should have admin_users_setOwner method', () => {
      expect(api.admin_users_setOwner).toBeDefined();
      expect(typeof api.admin_users_setOwner).toBe('function');
    });

    it('should have admin_users_setRegular method', () => {
      expect(api.admin_users_setRegular).toBeDefined();
      expect(typeof api.admin_users_setRegular).toBe('function');
    });
  });

  describe('Chat Operations', () => {
    it('should have chat_delete method', () => {
      expect(api.chat_delete).toBeDefined();
      expect(typeof api.chat_delete).toBe('function');
    });

    it('should have chat_deleteScheduledMessage method', () => {
      expect(api.chat_deleteScheduledMessage).toBeDefined();
      expect(typeof api.chat_deleteScheduledMessage).toBe('function');
    });

    it('should have chat_getPermalink method', () => {
      expect(api.chat_getPermalink).toBeDefined();
      expect(typeof api.chat_getPermalink).toBe('function');
    });

    it('should have chat_meMessage method', () => {
      expect(api.chat_meMessage).toBeDefined();
      expect(typeof api.chat_meMessage).toBe('function');
    });

    it('should have chat_postEphemeral method', () => {
      expect(api.chat_postEphemeral).toBeDefined();
      expect(typeof api.chat_postEphemeral).toBe('function');
    });

    it('should have chat_postMessage method', () => {
      expect(api.chat_postMessage).toBeDefined();
      expect(typeof api.chat_postMessage).toBe('function');
    });

    it('should have chat_scheduleMessage method', () => {
      expect(api.chat_scheduleMessage).toBeDefined();
      expect(typeof api.chat_scheduleMessage).toBe('function');
    });

    it('should have chat_scheduledMessages_list method', () => {
      expect(api.chat_scheduledMessages_list).toBeDefined();
      expect(typeof api.chat_scheduledMessages_list).toBe('function');
    });

    it('should have chat_unfurl method', () => {
      expect(api.chat_unfurl).toBeDefined();
      expect(typeof api.chat_unfurl).toBe('function');
    });

    it('should have chat_update method', () => {
      expect(api.chat_update).toBeDefined();
      expect(typeof api.chat_update).toBe('function');
    });
  });

  describe('Conversations Operations', () => {
    it('should have conversations_archive method', () => {
      expect(api.conversations_archive).toBeDefined();
      expect(typeof api.conversations_archive).toBe('function');
    });

    it('should have conversations_close method', () => {
      expect(api.conversations_close).toBeDefined();
      expect(typeof api.conversations_close).toBe('function');
    });

    it('should have conversations_create method', () => {
      expect(api.conversations_create).toBeDefined();
      expect(typeof api.conversations_create).toBe('function');
    });

    it('should have conversations_history method', () => {
      expect(api.conversations_history).toBeDefined();
      expect(typeof api.conversations_history).toBe('function');
    });

    it('should have conversations_info method', () => {
      expect(api.conversations_info).toBeDefined();
      expect(typeof api.conversations_info).toBe('function');
    });

    it('should have conversations_invite method', () => {
      expect(api.conversations_invite).toBeDefined();
      expect(typeof api.conversations_invite).toBe('function');
    });

    it('should have conversations_join method', () => {
      expect(api.conversations_join).toBeDefined();
      expect(typeof api.conversations_join).toBe('function');
    });

    it('should have conversations_kick method', () => {
      expect(api.conversations_kick).toBeDefined();
      expect(typeof api.conversations_kick).toBe('function');
    });

    it('should have conversations_leave method', () => {
      expect(api.conversations_leave).toBeDefined();
      expect(typeof api.conversations_leave).toBe('function');
    });

    it('should have conversations_list method', () => {
      expect(api.conversations_list).toBeDefined();
      expect(typeof api.conversations_list).toBe('function');
    });

    it('should have conversations_mark method', () => {
      expect(api.conversations_mark).toBeDefined();
      expect(typeof api.conversations_mark).toBe('function');
    });

    it('should have conversations_members method', () => {
      expect(api.conversations_members).toBeDefined();
      expect(typeof api.conversations_members).toBe('function');
    });

    it('should have conversations_open method', () => {
      expect(api.conversations_open).toBeDefined();
      expect(typeof api.conversations_open).toBe('function');
    });

    it('should have conversations_rename method', () => {
      expect(api.conversations_rename).toBeDefined();
      expect(typeof api.conversations_rename).toBe('function');
    });

    it('should have conversations_replies method', () => {
      expect(api.conversations_replies).toBeDefined();
      expect(typeof api.conversations_replies).toBe('function');
    });

    it('should have conversations_setPurpose method', () => {
      expect(api.conversations_setPurpose).toBeDefined();
      expect(typeof api.conversations_setPurpose).toBe('function');
    });

    it('should have conversations_setTopic method', () => {
      expect(api.conversations_setTopic).toBeDefined();
      expect(typeof api.conversations_setTopic).toBe('function');
    });

    it('should have conversations_unarchive method', () => {
      expect(api.conversations_unarchive).toBeDefined();
      expect(typeof api.conversations_unarchive).toBe('function');
    });
  });

  describe('Method Count Validation', () => {
    it('should have exactly 174 public methods (excluding constructor)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor' && typeof api[name as keyof SlackApi] === 'function');

      expect(methods).toHaveLength(174);
    });

    it('should have all expected Slack API methods', () => {
      const expectedMethods = [
        // Admin Apps
        'admin_apps_approve',
        'admin_apps_approved_list',
        'admin_apps_requests_list',
        'admin_apps_restrict',
        'admin_apps_restricted_list',
        // Admin Conversations
        'admin_conversations_archive',
        'admin_conversations_convertToPrivate',
        'admin_conversations_create',
        'admin_conversations_delete',
        'admin_conversations_disconnectShared',
        'admin_conversations_ekm_listOriginalConnectedChannelInfo',
        'admin_conversations_getConversationPrefs',
        'admin_conversations_getTeams',
        'admin_conversations_invite',
        'admin_conversations_rename',
        'admin_conversations_restrictAccess_addGroup',
        'admin_conversations_restrictAccess_listGroups',
        'admin_conversations_restrictAccess_removeGroup',
        'admin_conversations_search',
        'admin_conversations_setConversationPrefs',
        'admin_conversations_setTeams',
        'admin_conversations_unarchive',
        // Admin Emoji
        'admin_emoji_add',
        'admin_emoji_addAlias',
        'admin_emoji_list',
        'admin_emoji_remove',
        'admin_emoji_rename',
        // Admin Invite Requests
        'admin_inviteRequests_approve',
        'admin_inviteRequests_approved_list',
        'admin_inviteRequests_denied_list',
        'admin_inviteRequests_deny',
        'admin_inviteRequests_list',
        // Admin Teams
        'admin_teams_admins_list',
        'admin_teams_create',
        'admin_teams_list',
        'admin_teams_owners_list',
        'admin_teams_settings_info',
        'admin_teams_settings_setDefaultChannels',
        'admin_teams_settings_setDescription',
        'admin_teams_settings_setDiscoverability',
        'admin_teams_settings_setIcon',
        'admin_teams_settings_setName',
        // Admin Usergroups
        'admin_usergroups_addChannels',
        'admin_usergroups_addTeams',
        'admin_usergroups_listChannels',
        'admin_usergroups_removeChannels',
        // Admin Users
        'admin_users_assign',
        'admin_users_invite',
        'admin_users_list',
        'admin_users_remove',
        'admin_users_session_invalidate',
        'admin_users_session_reset',
        'admin_users_setAdmin',
        'admin_users_setExpiration',
        'admin_users_setOwner',
        'admin_users_setRegular',
        // Chat
        'chat_delete',
        'chat_deleteScheduledMessage',
        'chat_getPermalink',
        'chat_meMessage',
        'chat_postEphemeral',
        'chat_postMessage',
        'chat_scheduleMessage',
        'chat_scheduledMessages_list',
        'chat_unfurl',
        'chat_update',
        // Conversations
        'conversations_archive',
        'conversations_close',
        'conversations_create',
        'conversations_history',
        'conversations_info',
        'conversations_invite',
        'conversations_join',
        'conversations_kick',
        'conversations_leave',
        'conversations_list',
        'conversations_mark',
        'conversations_members',
        'conversations_open',
        'conversations_rename',
        'conversations_replies',
        'conversations_setPurpose',
        'conversations_setTopic',
        'conversations_unarchive',
        // API Test
        'api_test',
        // Auth
        'auth_revoke',
        'auth_test',
        // Users
        'users_conversations',
        'users_deletePhoto',
        'users_getPresence',
        'users_identity',
        'users_info',
        'users_list',
        'users_lookupByEmail',
        'users_profile_get',
        'users_profile_set',
        'users_setActive',
        'users_setPhoto',
        'users_setPresence',
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
        .filter(name => name !== 'constructor');

      for (const method of expectedMethods) {
        expect(actualMethods, `Expected method "${method}" to exist`).toContain(method);
      }
    });
  });
});
