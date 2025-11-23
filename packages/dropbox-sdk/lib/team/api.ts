// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Dropbox Team API

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class DropboxTeamApi {
  constructor() {}

  /**
   * List team members
   */
  listMembersV2(body: { limit?: number; include_removed?: boolean }): Effect.Effect<{ members?: Types.TeamMemberInfo[]; cursor?: string; has_more?: boolean }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ members?: Types.TeamMemberInfo[]; cursor?: string; has_more?: boolean }>("/team/members/list_v2", { body });
    });
  }

  /**
   * Continue listing team members
   */
  listMembersContinueV2(body: { cursor: string }): Effect.Effect<{ members?: Types.TeamMemberInfo[]; cursor?: string; has_more?: boolean }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ members?: Types.TeamMemberInfo[]; cursor?: string; has_more?: boolean }>("/team/members/list/continue_v2", { body });
    });
  }

  /**
   * Get team member info
   */
  getMembersInfo(body: { members: unknown[] }): Effect.Effect<unknown[], HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<unknown[]>("/team/members/get_info", { body });
    });
  }

  /**
   * Add team member
   */
  addMember(body: { new_members: unknown[]; force_async?: boolean }): Effect.Effect<unknown, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<unknown>("/team/members/add", { body });
    });
  }

  /**
   * Remove team member
   */
  removeMember(body: { user: unknown; wipe_data?: boolean; transfer_dest_id?: unknown; transfer_admin_id?: unknown; keep_account?: boolean }): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<void>("/team/members/remove", { body });
    });
  }

  /**
   * Suspend team member
   */
  suspendMember(body: { user: unknown; wipe_data?: boolean }): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<void>("/team/members/suspend", { body });
    });
  }

  /**
   * Unsuspend team member
   */
  unsuspendMember(body: { user: unknown }): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<void>("/team/members/unsuspend", { body });
    });
  }

  /**
   * List groups
   */
  listGroups(body: { limit?: number }): Effect.Effect<{ groups?: Types.GroupInfo[]; cursor?: string; has_more?: boolean }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ groups?: Types.GroupInfo[]; cursor?: string; has_more?: boolean }>("/team/groups/list", { body });
    });
  }

  /**
   * Create group
   */
  createGroup(body: { group_name: string; group_management_type?: string }): Effect.Effect<Types.GroupInfo, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.GroupInfo>("/team/groups/create", { body });
    });
  }

  /**
   * Delete group
   */
  deleteGroup(body: { group: unknown }): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<void>("/team/groups/delete", { body });
    });
  }

  /**
   * Add members to group
   */
  addMembersToGroup(body: { group: unknown; members: unknown[] }): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<void>("/team/groups/members/add", { body });
    });
  }

  /**
   * Remove members from group
   */
  removeMembersFromGroup(body: { group: unknown; users: unknown[] }): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<void>("/team/groups/members/remove", { body });
    });
  }

  /**
   * List team folders
   */
  listTeamFolders(body: { limit?: number }): Effect.Effect<{ team_folders?: Types.TeamFolderMetadata[]; cursor?: string; has_more?: boolean }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ team_folders?: Types.TeamFolderMetadata[]; cursor?: string; has_more?: boolean }>("/team/team_folder/list", { body });
    });
  }

  /**
   * Create team folder
   */
  createTeamFolder(body: { name: string; sync_setting?: string }): Effect.Effect<Types.TeamFolderMetadata, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.TeamFolderMetadata>("/team/team_folder/create", { body });
    });
  }

  /**
   * Archive team folder
   */
  archiveTeamFolder(body: { team_folder_id: string; force_async_off?: boolean }): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<void>("/team/team_folder/archive", { body });
    });
  }

  /**
   * List member devices
   */
  listMemberDevices(body: { team_member_id: string; include_web_sessions?: boolean; include_desktop_clients?: boolean; include_mobile_clients?: boolean }): Effect.Effect<Types.MemberDevices, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.MemberDevices>("/team/devices/list_member_devices", { body });
    });
  }

  /**
   * List all members' devices
   */
  listMembersDevices(body: { cursor?: string; include_web_sessions?: boolean; include_desktop_clients?: boolean; include_mobile_clients?: boolean }): Effect.Effect<{ devices?: Types.MemberDevices[]; has_more?: boolean; cursor?: string }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ devices?: Types.MemberDevices[]; has_more?: boolean; cursor?: string }>("/team/devices/list_members_devices", { body });
    });
  }

  /**
   * List namespaces
   */
  listNamespaces(body: { limit?: number }): Effect.Effect<{ namespaces?: Types.TeamNamespace[]; cursor?: string; has_more?: boolean }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ namespaces?: Types.TeamNamespace[]; cursor?: string; has_more?: boolean }>("/team/namespaces/list", { body });
    });
  }

  /**
   * Continue listing namespaces
   */
  listNamespacesContinue(body: { cursor: string }): Effect.Effect<{ namespaces?: Types.TeamNamespace[]; cursor?: string; has_more?: boolean }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ namespaces?: Types.TeamNamespace[]; cursor?: string; has_more?: boolean }>("/team/namespaces/list/continue", { body });
    });
  }

}