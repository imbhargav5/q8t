// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class SlackApi {
  constructor() {}

  admin_apps_approve({ app_id, request_id, team_id }: { app_id?: string; request_id?: string; team_id?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.apps.approve", body);
  }

  admin_apps_approved_list({ token, limit, cursor, team_id, enterprise_id }: { token: string; limit?: number; cursor?: string; team_id?: string; enterprise_id?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.apps.approved.list", {
      "token": token,
      "limit": limit,
      "cursor": cursor,
      "team_id": team_id,
      "enterprise_id": enterprise_id,
    });
  }

  admin_apps_requests_list({ token, limit, cursor, team_id }: { token: string; limit?: number; cursor?: string; team_id?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.apps.requests.list", {
      "token": token,
      "limit": limit,
      "cursor": cursor,
      "team_id": team_id,
    });
  }

  admin_apps_restrict({ app_id, request_id, team_id }: { app_id?: string; request_id?: string; team_id?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.apps.restrict", body);
  }

  admin_apps_restricted_list({ token, limit, cursor, team_id, enterprise_id }: { token: string; limit?: number; cursor?: string; team_id?: string; enterprise_id?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.apps.restricted.list", {
      "token": token,
      "limit": limit,
      "cursor": cursor,
      "team_id": team_id,
      "enterprise_id": enterprise_id,
    });
  }

  admin_conversations_archive({ channel_id }: { channel_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.conversations.archive", body);
  }

  admin_conversations_convertToPrivate({ channel_id }: { channel_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.conversations.convertToPrivate", body);
  }

  admin_conversations_create({ name, description, is_private, org_wide, team_id }: { name: string; description?: string; is_private: boolean; org_wide?: boolean; team_id?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.conversations.create", body);
  }

  admin_conversations_delete({ channel_id }: { channel_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.conversations.delete", body);
  }

  admin_conversations_disconnectShared({ channel_id, leaving_team_ids }: { channel_id: string; leaving_team_ids?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.conversations.disconnectShared", body);
  }

  admin_conversations_ekm_listOriginalConnectedChannelInfo({ token, channel_ids, team_ids, limit, cursor }: { token: string; channel_ids?: string; team_ids?: string; limit?: number; cursor?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.conversations.ekm.listOriginalConnectedChannelInfo", {
      "token": token,
      "channel_ids": channel_ids,
      "team_ids": team_ids,
      "limit": limit,
      "cursor": cursor,
    });
  }

  admin_conversations_getConversationPrefs({ channel_id }: { channel_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.conversations.getConversationPrefs", {
      "channel_id": channel_id,
    });
  }

  admin_conversations_getTeams({ channel_id, cursor, limit }: { channel_id: string; cursor?: string; limit?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.conversations.getTeams", {
      "channel_id": channel_id,
      "cursor": cursor,
      "limit": limit,
    });
  }

  admin_conversations_invite({ user_ids, channel_id }: { user_ids: string; channel_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.conversations.invite", body);
  }

  admin_conversations_rename({ channel_id, name }: { channel_id: string; name: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.conversations.rename", body);
  }

  admin_conversations_restrictAccess_addGroup({ token, team_id, group_id, channel_id }: { token: string; team_id?: string; group_id: string; channel_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.conversations.restrictAccess.addGroup", body);
  }

  admin_conversations_restrictAccess_listGroups({ token, channel_id, team_id }: { token: string; channel_id: string; team_id?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.conversations.restrictAccess.listGroups", {
      "token": token,
      "channel_id": channel_id,
      "team_id": team_id,
    });
  }

  admin_conversations_restrictAccess_removeGroup({ token, team_id, group_id, channel_id }: { token: string; team_id: string; group_id: string; channel_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.conversations.restrictAccess.removeGroup", body);
  }

  admin_conversations_search({ team_ids, query, limit, cursor, search_channel_types, sort, sort_dir }: { team_ids?: string; query?: string; limit?: number; cursor?: string; search_channel_types?: string; sort?: string; sort_dir?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.conversations.search", {
      "team_ids": team_ids,
      "query": query,
      "limit": limit,
      "cursor": cursor,
      "search_channel_types": search_channel_types,
      "sort": sort,
      "sort_dir": sort_dir,
    });
  }

  admin_conversations_setConversationPrefs({ channel_id, prefs }: { channel_id: string; prefs: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.conversations.setConversationPrefs", body);
  }

  admin_conversations_setTeams({ channel_id, team_id, target_team_ids, org_channel }: { channel_id: string; team_id?: string; target_team_ids?: string; org_channel?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.conversations.setTeams", body);
  }

  admin_conversations_unarchive({ channel_id }: { channel_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.conversations.unarchive", body);
  }

  admin_emoji_add({ token, name, url }: { token: string; name: string; url: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.emoji.add", body);
  }

  admin_emoji_addAlias({ token, name, alias_for }: { token: string; name: string; alias_for: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.emoji.addAlias", body);
  }

  admin_emoji_list({ token, cursor, limit }: { token: string; cursor?: string; limit?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.emoji.list", {
      "token": token,
      "cursor": cursor,
      "limit": limit,
    });
  }

  admin_emoji_remove({ token, name }: { token: string; name: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.emoji.remove", body);
  }

  admin_emoji_rename({ token, name, new_name }: { token: string; name: string; new_name: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.emoji.rename", body);
  }

  admin_inviteRequests_approve({ team_id, invite_request_id }: { team_id?: string; invite_request_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.inviteRequests.approve", body);
  }

  admin_inviteRequests_approved_list({ team_id, cursor, limit }: { team_id?: string; cursor?: string; limit?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.inviteRequests.approved.list", {
      "team_id": team_id,
      "cursor": cursor,
      "limit": limit,
    });
  }

  admin_inviteRequests_denied_list({ team_id, cursor, limit }: { team_id?: string; cursor?: string; limit?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.inviteRequests.denied.list", {
      "team_id": team_id,
      "cursor": cursor,
      "limit": limit,
    });
  }

  admin_inviteRequests_deny({ team_id, invite_request_id }: { team_id?: string; invite_request_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.inviteRequests.deny", body);
  }

  admin_inviteRequests_list({ team_id, cursor, limit }: { team_id?: string; cursor?: string; limit?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.inviteRequests.list", {
      "team_id": team_id,
      "cursor": cursor,
      "limit": limit,
    });
  }

  admin_teams_admins_list({ token, limit, cursor, team_id }: { token: string; limit?: number; cursor?: string; team_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.teams.admins.list", {
      "token": token,
      "limit": limit,
      "cursor": cursor,
      "team_id": team_id,
    });
  }

  admin_teams_create({ team_domain, team_name, team_description, team_discoverability }: { team_domain: string; team_name: string; team_description?: string; team_discoverability?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.teams.create", body);
  }

  admin_teams_list({ limit, cursor }: { limit?: number; cursor?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.teams.list", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  admin_teams_owners_list({ token, team_id, limit, cursor }: { token: string; team_id: string; limit?: number; cursor?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.teams.owners.list", {
      "token": token,
      "team_id": team_id,
      "limit": limit,
      "cursor": cursor,
    });
  }

  admin_teams_settings_info({ team_id }: { team_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.teams.settings.info", {
      "team_id": team_id,
    });
  }

  admin_teams_settings_setDefaultChannels({ token, team_id, channel_ids }: { token: string; team_id: string; channel_ids: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.teams.settings.setDefaultChannels", body);
  }

  admin_teams_settings_setDescription({ team_id, description }: { team_id: string; description: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.teams.settings.setDescription", body);
  }

  admin_teams_settings_setDiscoverability({ team_id, discoverability }: { team_id: string; discoverability: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.teams.settings.setDiscoverability", body);
  }

  admin_teams_settings_setIcon({ token, image_url, team_id }: { token: string; image_url: string; team_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.teams.settings.setIcon", body);
  }

  admin_teams_settings_setName({ team_id, name }: { team_id: string; name: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.teams.settings.setName", body);
  }

  admin_usergroups_addChannels({ usergroup_id, team_id, channel_ids }: { usergroup_id: string; team_id?: string; channel_ids: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.usergroups.addChannels", body);
  }

  admin_usergroups_addTeams({ usergroup_id, team_ids, auto_provision }: { usergroup_id: string; team_ids: string; auto_provision?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.usergroups.addTeams", body);
  }

  admin_usergroups_listChannels({ usergroup_id, team_id, include_num_members }: { usergroup_id: string; team_id?: string; include_num_members?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.usergroups.listChannels", {
      "usergroup_id": usergroup_id,
      "team_id": team_id,
      "include_num_members": include_num_members,
    });
  }

  admin_usergroups_removeChannels({ usergroup_id, channel_ids }: { usergroup_id: string; channel_ids: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.usergroups.removeChannels", body);
  }

  admin_users_assign({ team_id, user_id, is_restricted, is_ultra_restricted, channel_ids }: { team_id: string; user_id: string; is_restricted?: boolean; is_ultra_restricted?: boolean; channel_ids?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.users.assign", body);
  }

  admin_users_invite({ team_id, email, channel_ids, custom_message, real_name, resend, is_restricted, is_ultra_restricted, guest_expiration_ts }: { team_id: string; email: string; channel_ids: string; custom_message?: string; real_name?: string; resend?: boolean; is_restricted?: boolean; is_ultra_restricted?: boolean; guest_expiration_ts?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.users.invite", body);
  }

  admin_users_list({ team_id, cursor, limit }: { team_id: string; cursor?: string; limit?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/admin.users.list", {
      "team_id": team_id,
      "cursor": cursor,
      "limit": limit,
    });
  }

  admin_users_remove({ team_id, user_id }: { team_id: string; user_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.users.remove", body);
  }

  admin_users_session_invalidate({ team_id, session_id }: { team_id: string; session_id: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.users.session.invalidate", body);
  }

  admin_users_session_reset({ user_id, mobile_only, web_only }: { user_id: string; mobile_only?: boolean; web_only?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.users.session.reset", body);
  }

  admin_users_setAdmin({ team_id, user_id }: { team_id: string; user_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.users.setAdmin", body);
  }

  admin_users_setExpiration({ team_id, user_id, expiration_ts }: { team_id: string; user_id: string; expiration_ts: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.users.setExpiration", body);
  }

  admin_users_setOwner({ team_id, user_id }: { team_id: string; user_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.users.setOwner", body);
  }

  admin_users_setRegular({ team_id, user_id }: { team_id: string; user_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/admin.users.setRegular", body);
  }

  api_test({ error, foo }: { error?: string; foo?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/api.test", {
      "error": error,
      "foo": foo,
    });
  }

  apps_event_authorizations_list({ event_context, cursor, limit }: { event_context: string; cursor?: string; limit?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/apps.event.authorizations.list", {
      "event_context": event_context,
      "cursor": cursor,
      "limit": limit,
    });
  }

  apps_permissions_info({ token }: { token?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/apps.permissions.info", {
      "token": token,
    });
  }

  apps_permissions_request({ token, scopes, trigger_id }: { token: string; scopes: string; trigger_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/apps.permissions.request", {
      "token": token,
      "scopes": scopes,
      "trigger_id": trigger_id,
    });
  }

  apps_permissions_resources_list({ token, cursor, limit }: { token: string; cursor?: string; limit?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/apps.permissions.resources.list", {
      "token": token,
      "cursor": cursor,
      "limit": limit,
    });
  }

  apps_permissions_scopes_list({ token }: { token: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/apps.permissions.scopes.list", {
      "token": token,
    });
  }

  apps_permissions_users_list({ token, cursor, limit }: { token: string; cursor?: string; limit?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/apps.permissions.users.list", {
      "token": token,
      "cursor": cursor,
      "limit": limit,
    });
  }

  apps_permissions_users_request({ token, scopes, trigger_id, user }: { token: string; scopes: string; trigger_id: string; user: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/apps.permissions.users.request", {
      "token": token,
      "scopes": scopes,
      "trigger_id": trigger_id,
      "user": user,
    });
  }

  apps_uninstall({ token, client_id, client_secret }: { token?: string; client_id?: string; client_secret?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/apps.uninstall", {
      "token": token,
      "client_id": client_id,
      "client_secret": client_secret,
    });
  }

  auth_revoke({ token, test }: { token: string; test?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/auth.revoke", {
      "token": token,
      "test": test,
    });
  }

  auth_test(): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/auth.test");
  }

  bots_info({ token, bot }: { token: string; bot?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/bots.info", {
      "token": token,
      "bot": bot,
    });
  }

  calls_add({ external_unique_id, external_display_id, join_url, desktop_app_join_url, date_start, title, created_by, users }: { external_unique_id: string; external_display_id?: string; join_url: string; desktop_app_join_url?: string; date_start?: number; title?: string; created_by?: string; users?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/calls.add", body);
  }

  calls_end({ id, duration }: { id: string; duration?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/calls.end", body);
  }

  calls_info({ id }: { id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/calls.info", {
      "id": id,
    });
  }

  calls_participants_add({ id, users }: { id: string; users: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/calls.participants.add", body);
  }

  calls_participants_remove({ id, users }: { id: string; users: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/calls.participants.remove", body);
  }

  calls_update({ id, title, join_url, desktop_app_join_url }: { id: string; title?: string; join_url?: string; desktop_app_join_url?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/calls.update", body);
  }

  chat_delete({ ts, channel, as_user }: { ts?: number; channel?: string; as_user?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/chat.delete", body);
  }

  chat_deleteScheduledMessage({ as_user, channel, scheduled_message_id }: { as_user?: boolean; channel: string; scheduled_message_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/chat.deleteScheduledMessage", body);
  }

  chat_getPermalink({ token, channel, message_ts }: { token: string; channel: string; message_ts: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/chat.getPermalink", {
      "token": token,
      "channel": channel,
      "message_ts": message_ts,
    });
  }

  chat_meMessage({ channel, text }: { channel?: string; text?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/chat.meMessage", body);
  }

  chat_postEphemeral({ as_user, attachments, blocks, channel, icon_emoji, icon_url, link_names, parse, text, thread_ts, user, username }: { as_user?: boolean; attachments?: string; blocks?: string; channel: string; icon_emoji?: string; icon_url?: string; link_names?: boolean; parse?: string; text?: string; thread_ts?: string; user: string; username?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/chat.postEphemeral", body);
  }

  chat_postMessage({ as_user, attachments, blocks, channel, icon_emoji, icon_url, link_names, mrkdwn, parse, reply_broadcast, text, thread_ts, unfurl_links, unfurl_media, username }: { as_user?: string; attachments?: string; blocks?: string; channel: string; icon_emoji?: string; icon_url?: string; link_names?: boolean; mrkdwn?: boolean; parse?: string; reply_broadcast?: boolean; text?: string; thread_ts?: string; unfurl_links?: boolean; unfurl_media?: boolean; username?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/chat.postMessage", body);
  }

  chat_scheduleMessage({ channel, text, post_at, parse, as_user, link_names, attachments, blocks, unfurl_links, unfurl_media, thread_ts, reply_broadcast }: { channel?: string; text?: string; post_at?: string; parse?: string; as_user?: boolean; link_names?: boolean; attachments?: string; blocks?: string; unfurl_links?: boolean; unfurl_media?: boolean; thread_ts?: number; reply_broadcast?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/chat.scheduleMessage", body);
  }

  chat_scheduledMessages_list({ channel, latest, oldest, limit, cursor }: { channel?: string; latest?: number; oldest?: number; limit?: number; cursor?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/chat.scheduledMessages.list", {
      "channel": channel,
      "latest": latest,
      "oldest": oldest,
      "limit": limit,
      "cursor": cursor,
    });
  }

  chat_unfurl({ channel, ts, unfurls, user_auth_message, user_auth_required, user_auth_url }: { channel: string; ts: string; unfurls?: string; user_auth_message?: string; user_auth_required?: boolean; user_auth_url?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/chat.unfurl", body);
  }

  chat_update({ as_user, attachments, blocks, channel, link_names, parse, text, ts }: { as_user?: string; attachments?: string; blocks?: string; channel: string; link_names?: string; parse?: string; text?: string; ts: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/chat.update", body);
  }

  conversations_archive({ channel }: { channel?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.archive", body);
  }

  conversations_close({ channel }: { channel?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.close", body);
  }

  conversations_create({ name, is_private }: { name?: string; is_private?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.create", body);
  }

  conversations_history({ token, channel, latest, oldest, inclusive, limit, cursor }: { token?: string; channel?: string; latest?: number; oldest?: number; inclusive?: boolean; limit?: number; cursor?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/conversations.history", {
      "token": token,
      "channel": channel,
      "latest": latest,
      "oldest": oldest,
      "inclusive": inclusive,
      "limit": limit,
      "cursor": cursor,
    });
  }

  conversations_info({ token, channel, include_locale, include_num_members }: { token?: string; channel?: string; include_locale?: boolean; include_num_members?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/conversations.info", {
      "token": token,
      "channel": channel,
      "include_locale": include_locale,
      "include_num_members": include_num_members,
    });
  }

  conversations_invite({ channel, users }: { channel?: string; users?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.invite", body);
  }

  conversations_join({ channel }: { channel?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.join", body);
  }

  conversations_kick({ channel, user }: { channel?: string; user?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.kick", body);
  }

  conversations_leave({ channel }: { channel?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.leave", body);
  }

  conversations_list({ token, exclude_archived, types, limit, cursor }: { token?: string; exclude_archived?: boolean; types?: string; limit?: number; cursor?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/conversations.list", {
      "token": token,
      "exclude_archived": exclude_archived,
      "types": types,
      "limit": limit,
      "cursor": cursor,
    });
  }

  conversations_mark({ channel, ts }: { channel?: string; ts?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.mark", body);
  }

  conversations_members({ token, channel, limit, cursor }: { token?: string; channel?: string; limit?: number; cursor?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/conversations.members", {
      "token": token,
      "channel": channel,
      "limit": limit,
      "cursor": cursor,
    });
  }

  conversations_open({ channel, users, return_im }: { channel?: string; users?: string; return_im?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.open", body);
  }

  conversations_rename({ channel, name }: { channel?: string; name?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.rename", body);
  }

  conversations_replies({ token, channel, ts, latest, oldest, inclusive, limit, cursor }: { token?: string; channel?: string; ts?: number; latest?: number; oldest?: number; inclusive?: boolean; limit?: number; cursor?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/conversations.replies", {
      "token": token,
      "channel": channel,
      "ts": ts,
      "latest": latest,
      "oldest": oldest,
      "inclusive": inclusive,
      "limit": limit,
      "cursor": cursor,
    });
  }

  conversations_setPurpose({ channel, purpose }: { channel?: string; purpose?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.setPurpose", body);
  }

  conversations_setTopic({ channel, topic }: { channel?: string; topic?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.setTopic", body);
  }

  conversations_unarchive({ channel }: { channel?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/conversations.unarchive", body);
  }

  dialog_open({ dialog, trigger_id }: { dialog: string; trigger_id: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/dialog.open", {
      "dialog": dialog,
      "trigger_id": trigger_id,
    });
  }

  dnd_endDnd(): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/dnd.endDnd");
  }

  dnd_endSnooze(): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/dnd.endSnooze");
  }

  dnd_info({ token, user }: { token?: string; user?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/dnd.info", {
      "token": token,
      "user": user,
    });
  }

  dnd_setSnooze({ token, num_minutes }: { token: string; num_minutes: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/dnd.setSnooze", body);
  }

  dnd_teamInfo({ token, users }: { token?: string; users?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/dnd.teamInfo", {
      "token": token,
      "users": users,
    });
  }

  emoji_list({ token }: { token: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/emoji.list", {
      "token": token,
    });
  }

  files_comments_delete({ file, id }: { file?: string; id?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/files.comments.delete", body);
  }

  files_delete({ file }: { file?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/files.delete", body);
  }

  files_info({ token, file, count, page, limit, cursor }: { token?: string; file?: string; count?: string; page?: string; limit?: number; cursor?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/files.info", {
      "token": token,
      "file": file,
      "count": count,
      "page": page,
      "limit": limit,
      "cursor": cursor,
    });
  }

  files_list({ token, user, channel, ts_from, ts_to, types, count, page, show_files_hidden_by_limit }: { token?: string; user?: string; channel?: string; ts_from?: number; ts_to?: number; types?: string; count?: string; page?: string; show_files_hidden_by_limit?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/files.list", {
      "token": token,
      "user": user,
      "channel": channel,
      "ts_from": ts_from,
      "ts_to": ts_to,
      "types": types,
      "count": count,
      "page": page,
      "show_files_hidden_by_limit": show_files_hidden_by_limit,
    });
  }

  files_remote_add({ token, external_id, title, filetype, external_url, preview_image, indexable_file_contents }: { token?: string; external_id?: string; title?: string; filetype?: string; external_url?: string; preview_image?: string; indexable_file_contents?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/files.remote.add", body);
  }

  files_remote_info({ token, file, external_id }: { token?: string; file?: string; external_id?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/files.remote.info", {
      "token": token,
      "file": file,
      "external_id": external_id,
    });
  }

  files_remote_list({ token, channel, ts_from, ts_to, limit, cursor }: { token?: string; channel?: string; ts_from?: number; ts_to?: number; limit?: number; cursor?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/files.remote.list", {
      "token": token,
      "channel": channel,
      "ts_from": ts_from,
      "ts_to": ts_to,
      "limit": limit,
      "cursor": cursor,
    });
  }

  files_remote_remove({ token, file, external_id }: { token?: string; file?: string; external_id?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/files.remote.remove", body);
  }

  files_remote_share({ token, file, external_id, channels }: { token?: string; file?: string; external_id?: string; channels?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/files.remote.share", {
      "token": token,
      "file": file,
      "external_id": external_id,
      "channels": channels,
    });
  }

  files_remote_update({ token, file, external_id, title, filetype, external_url, preview_image, indexable_file_contents }: { token?: string; file?: string; external_id?: string; title?: string; filetype?: string; external_url?: string; preview_image?: string; indexable_file_contents?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/files.remote.update", body);
  }

  files_revokePublicURL({ file }: { file?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/files.revokePublicURL", body);
  }

  files_sharedPublicURL({ file }: { file?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/files.sharedPublicURL", body);
  }

  files_upload({ token, file, content, filetype, filename, title, initial_comment, channels, thread_ts }: { token?: string; file?: string; content?: string; filetype?: string; filename?: string; title?: string; initial_comment?: string; channels?: string; thread_ts?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/files.upload", body);
  }

  migration_exchange({ token, users, team_id, to_old }: { token: string; users: string; team_id?: string; to_old?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/migration.exchange", {
      "token": token,
      "users": users,
      "team_id": team_id,
      "to_old": to_old,
    });
  }

  oauth_access({ client_id, client_secret, code, redirect_uri, single_channel }: { client_id?: string; client_secret?: string; code?: string; redirect_uri?: string; single_channel?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/oauth.access", {
      "client_id": client_id,
      "client_secret": client_secret,
      "code": code,
      "redirect_uri": redirect_uri,
      "single_channel": single_channel,
    });
  }

  oauth_token({ client_id, client_secret, code, redirect_uri, single_channel }: { client_id?: string; client_secret?: string; code?: string; redirect_uri?: string; single_channel?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/oauth.token", {
      "client_id": client_id,
      "client_secret": client_secret,
      "code": code,
      "redirect_uri": redirect_uri,
      "single_channel": single_channel,
    });
  }

  oauth_v2_access({ client_id, client_secret, code, redirect_uri }: { client_id?: string; client_secret?: string; code: string; redirect_uri?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/oauth.v2.access", {
      "client_id": client_id,
      "client_secret": client_secret,
      "code": code,
      "redirect_uri": redirect_uri,
    });
  }

  pins_add({ channel, timestamp }: { channel: string; timestamp?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/pins.add", body);
  }

  pins_list({ token, channel }: { token: string; channel: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/pins.list", {
      "token": token,
      "channel": channel,
    });
  }

  pins_remove({ channel, timestamp }: { channel: string; timestamp?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/pins.remove", body);
  }

  reactions_add({ channel, name, timestamp }: { channel: string; name: string; timestamp: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/reactions.add", body);
  }

  reactions_get({ token, channel, file, file_comment, full, timestamp }: { token: string; channel?: string; file?: string; file_comment?: string; full?: boolean; timestamp?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/reactions.get", {
      "token": token,
      "channel": channel,
      "file": file,
      "file_comment": file_comment,
      "full": full,
      "timestamp": timestamp,
    });
  }

  reactions_list({ token, user, full, count, page, cursor, limit }: { token: string; user?: string; full?: boolean; count?: number; page?: number; cursor?: string; limit?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/reactions.list", {
      "token": token,
      "user": user,
      "full": full,
      "count": count,
      "page": page,
      "cursor": cursor,
      "limit": limit,
    });
  }

  reactions_remove({ name, file, file_comment, channel, timestamp }: { name: string; file?: string; file_comment?: string; channel?: string; timestamp?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/reactions.remove", body);
  }

  reminders_add({ text, time, user }: { text: string; time: string; user?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/reminders.add", body);
  }

  reminders_complete({ reminder }: { reminder?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/reminders.complete", body);
  }

  reminders_delete({ reminder }: { reminder?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/reminders.delete", body);
  }

  reminders_info({ token, reminder }: { token?: string; reminder?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/reminders.info", {
      "token": token,
      "reminder": reminder,
    });
  }

  reminders_list({ token }: { token?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/reminders.list", {
      "token": token,
    });
  }

  rtm_connect({ token, batch_presence_aware, presence_sub }: { token: string; batch_presence_aware?: boolean; presence_sub?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/rtm.connect", {
      "token": token,
      "batch_presence_aware": batch_presence_aware,
      "presence_sub": presence_sub,
    });
  }

  search_messages({ token, count, highlight, page, query, sort, sort_dir }: { token: string; count?: number; highlight?: boolean; page?: number; query: string; sort?: string; sort_dir?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/search.messages", {
      "token": token,
      "count": count,
      "highlight": highlight,
      "page": page,
      "query": query,
      "sort": sort,
      "sort_dir": sort_dir,
    });
  }

  stars_add({ channel, file, file_comment, timestamp }: { channel?: string; file?: string; file_comment?: string; timestamp?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/stars.add", body);
  }

  stars_list({ token, count, page, cursor, limit }: { token?: string; count?: string; page?: string; cursor?: string; limit?: number } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/stars.list", {
      "token": token,
      "count": count,
      "page": page,
      "cursor": cursor,
      "limit": limit,
    });
  }

  stars_remove({ channel, file, file_comment, timestamp }: { channel?: string; file?: string; file_comment?: string; timestamp?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/stars.remove", body);
  }

  team_accessLogs({ token, before, count, page }: { token: string; before?: string; count?: string; page?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/team.accessLogs", {
      "token": token,
      "before": before,
      "count": count,
      "page": page,
    });
  }

  team_billableInfo({ token, user }: { token: string; user?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/team.billableInfo", {
      "token": token,
      "user": user,
    });
  }

  team_info({ token, team }: { token: string; team?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/team.info", {
      "token": token,
      "team": team,
    });
  }

  team_integrationLogs({ token, app_id, change_type, count, page, service_id, user }: { token: string; app_id?: string; change_type?: string; count?: string; page?: string; service_id?: string; user?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/team.integrationLogs", {
      "token": token,
      "app_id": app_id,
      "change_type": change_type,
      "count": count,
      "page": page,
      "service_id": service_id,
      "user": user,
    });
  }

  team_profile_get({ token, visibility }: { token: string; visibility?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/team.profile.get", {
      "token": token,
      "visibility": visibility,
    });
  }

  usergroups_create({ channels, description, handle, include_count, name }: { channels?: string; description?: string; handle?: string; include_count?: boolean; name: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/usergroups.create", body);
  }

  usergroups_disable({ include_count, usergroup }: { include_count?: boolean; usergroup: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/usergroups.disable", body);
  }

  usergroups_enable({ include_count, usergroup }: { include_count?: boolean; usergroup: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/usergroups.enable", body);
  }

  usergroups_list({ include_users, token, include_count, include_disabled }: { include_users?: boolean; token: string; include_count?: boolean; include_disabled?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/usergroups.list", {
      "include_users": include_users,
      "token": token,
      "include_count": include_count,
      "include_disabled": include_disabled,
    });
  }

  usergroups_update({ handle, description, channels, include_count, usergroup, name }: { handle?: string; description?: string; channels?: string; include_count?: boolean; usergroup: string; name?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/usergroups.update", body);
  }

  usergroups_users_list({ token, include_disabled, usergroup }: { token: string; include_disabled?: boolean; usergroup: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/usergroups.users.list", {
      "token": token,
      "include_disabled": include_disabled,
      "usergroup": usergroup,
    });
  }

  usergroups_users_update({ include_count, usergroup, users }: { include_count?: boolean; usergroup: string; users: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/usergroups.users.update", body);
  }

  users_conversations({ token, user, types, exclude_archived, limit, cursor }: { token?: string; user?: string; types?: string; exclude_archived?: boolean; limit?: number; cursor?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/users.conversations", {
      "token": token,
      "user": user,
      "types": types,
      "exclude_archived": exclude_archived,
      "limit": limit,
      "cursor": cursor,
    });
  }

  users_deletePhoto({ token }: { token: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/users.deletePhoto", body);
  }

  users_getPresence({ token, user }: { token: string; user?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/users.getPresence", {
      "token": token,
      "user": user,
    });
  }

  users_identity({ token }: { token?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/users.identity", {
      "token": token,
    });
  }

  users_info({ token, include_locale, user }: { token: string; include_locale?: boolean; user?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/users.info", {
      "token": token,
      "include_locale": include_locale,
      "user": user,
    });
  }

  users_list({ token, limit, cursor, include_locale }: { token?: string; limit?: number; cursor?: string; include_locale?: boolean } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/users.list", {
      "token": token,
      "limit": limit,
      "cursor": cursor,
      "include_locale": include_locale,
    });
  }

  users_lookupByEmail({ token, email }: { token: string; email: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/users.lookupByEmail", {
      "token": token,
      "email": email,
    });
  }

  users_profile_get({ token, include_labels, user }: { token: string; include_labels?: boolean; user?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/users.profile.get", {
      "token": token,
      "include_labels": include_labels,
      "user": user,
    });
  }

  users_profile_set({ name, profile, user, value }: { name?: string; profile?: string; user?: string; value?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/users.profile.set", body);
  }

  users_setActive(): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/users.setActive");
  }

  users_setPhoto({ token, crop_w, crop_x, crop_y, image }: { token: string; crop_w?: string; crop_x?: string; crop_y?: string; image?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/users.setPhoto", body);
  }

  users_setPresence({ presence }: { presence: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.post<Types.SlackResponse>("/users.setPresence", body);
  }

  views_open({ trigger_id, view }: { trigger_id: string; view: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/views.open", {
      "trigger_id": trigger_id,
      "view": view,
    });
  }

  views_publish({ user_id, view, hash }: { user_id: string; view: string; hash?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/views.publish", {
      "user_id": user_id,
      "view": view,
      "hash": hash,
    });
  }

  views_push({ trigger_id, view }: { trigger_id: string; view: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/views.push", {
      "trigger_id": trigger_id,
      "view": view,
    });
  }

  views_update({ view_id, external_id, view, hash }: { view_id?: string; external_id?: string; view?: string; hash?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/views.update", {
      "view_id": view_id,
      "external_id": external_id,
      "view": view,
      "hash": hash,
    });
  }

  workflows_stepCompleted({ workflow_step_execute_id, outputs }: { workflow_step_execute_id: string; outputs?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/workflows.stepCompleted", {
      "workflow_step_execute_id": workflow_step_execute_id,
      "outputs": outputs,
    });
  }

  workflows_stepFailed({ workflow_step_execute_id, error }: { workflow_step_execute_id: string; error: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/workflows.stepFailed", {
      "workflow_step_execute_id": workflow_step_execute_id,
      "error": error,
    });
  }

  workflows_updateStep({ workflow_step_edit_id, inputs, outputs, step_name, step_image_url }: { workflow_step_edit_id: string; inputs?: string; outputs?: string; step_name?: string; step_image_url?: string } = {}): Effect.Effect<Types.SlackResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return yield* client.get<Types.SlackResponse>("/workflows.updateStep", {
      "workflow_step_edit_id": workflow_step_edit_id,
      "inputs": inputs,
      "outputs": outputs,
      "step_name": step_name,
      "step_image_url": step_image_url,
    });
  }

}