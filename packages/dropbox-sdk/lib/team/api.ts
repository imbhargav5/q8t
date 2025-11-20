// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Dropbox Team API

import type * as Types from "./types";

export interface HttpClient {
  get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T>;
  post<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
  put<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
  delete<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
}

export class DropboxTeamApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List team members
   */
  async listMembersV2(body: { limit?: number; include_removed?: boolean }): Promise<{
    members?: Types.TeamMemberInfo[];
    cursor?: string;
    has_more?: boolean;
  }> {
    return this.client.post<{
      members?: Types.TeamMemberInfo[];
      cursor?: string;
      has_more?: boolean;
    }>("/team/members/list_v2", body);
  }

  /**
   * Continue listing team members
   */
  async listMembersContinueV2(body: { cursor: string }): Promise<{
    members?: Types.TeamMemberInfo[];
    cursor?: string;
    has_more?: boolean;
  }> {
    return this.client.post<{
      members?: Types.TeamMemberInfo[];
      cursor?: string;
      has_more?: boolean;
    }>("/team/members/list/continue_v2", body);
  }

  /**
   * Get team member info
   */
  async getMembersInfo(body: { members: unknown[] }): Promise<unknown[]> {
    return this.client.post<unknown[]>("/team/members/get_info", body);
  }

  /**
   * Add team member
   */
  async addMember(body: { new_members: unknown[]; force_async?: boolean }): Promise<unknown> {
    return this.client.post<unknown>("/team/members/add", body);
  }

  /**
   * Remove team member
   */
  async removeMember(body: {
    user: unknown;
    wipe_data?: boolean;
    transfer_dest_id?: unknown;
    transfer_admin_id?: unknown;
    keep_account?: boolean;
  }): Promise<void> {
    return this.client.post<void>("/team/members/remove", body);
  }

  /**
   * Suspend team member
   */
  async suspendMember(body: { user: unknown; wipe_data?: boolean }): Promise<void> {
    return this.client.post<void>("/team/members/suspend", body);
  }

  /**
   * Unsuspend team member
   */
  async unsuspendMember(body: { user: unknown }): Promise<void> {
    return this.client.post<void>("/team/members/unsuspend", body);
  }

  /**
   * List groups
   */
  async listGroups(body: { limit?: number }): Promise<{
    groups?: Types.GroupInfo[];
    cursor?: string;
    has_more?: boolean;
  }> {
    return this.client.post<{ groups?: Types.GroupInfo[]; cursor?: string; has_more?: boolean }>(
      "/team/groups/list",
      body,
    );
  }

  /**
   * Create group
   */
  async createGroup(body: {
    group_name: string;
    group_management_type?: string;
  }): Promise<Types.GroupInfo> {
    return this.client.post<Types.GroupInfo>("/team/groups/create", body);
  }

  /**
   * Delete group
   */
  async deleteGroup(body: { group: unknown }): Promise<void> {
    return this.client.post<void>("/team/groups/delete", body);
  }

  /**
   * Add members to group
   */
  async addMembersToGroup(body: { group: unknown; members: unknown[] }): Promise<void> {
    return this.client.post<void>("/team/groups/members/add", body);
  }

  /**
   * Remove members from group
   */
  async removeMembersFromGroup(body: { group: unknown; users: unknown[] }): Promise<void> {
    return this.client.post<void>("/team/groups/members/remove", body);
  }

  /**
   * List team folders
   */
  async listTeamFolders(body: { limit?: number }): Promise<{
    team_folders?: Types.TeamFolderMetadata[];
    cursor?: string;
    has_more?: boolean;
  }> {
    return this.client.post<{
      team_folders?: Types.TeamFolderMetadata[];
      cursor?: string;
      has_more?: boolean;
    }>("/team/team_folder/list", body);
  }

  /**
   * Create team folder
   */
  async createTeamFolder(body: {
    name: string;
    sync_setting?: string;
  }): Promise<Types.TeamFolderMetadata> {
    return this.client.post<Types.TeamFolderMetadata>("/team/team_folder/create", body);
  }

  /**
   * Archive team folder
   */
  async archiveTeamFolder(body: {
    team_folder_id: string;
    force_async_off?: boolean;
  }): Promise<void> {
    return this.client.post<void>("/team/team_folder/archive", body);
  }

  /**
   * List member devices
   */
  async listMemberDevices(body: {
    team_member_id: string;
    include_web_sessions?: boolean;
    include_desktop_clients?: boolean;
    include_mobile_clients?: boolean;
  }): Promise<Types.MemberDevices> {
    return this.client.post<Types.MemberDevices>("/team/devices/list_member_devices", body);
  }

  /**
   * List all members' devices
   */
  async listMembersDevices(body: {
    cursor?: string;
    include_web_sessions?: boolean;
    include_desktop_clients?: boolean;
    include_mobile_clients?: boolean;
  }): Promise<{ devices?: Types.MemberDevices[]; has_more?: boolean; cursor?: string }> {
    return this.client.post<{
      devices?: Types.MemberDevices[];
      has_more?: boolean;
      cursor?: string;
    }>("/team/devices/list_members_devices", body);
  }

  /**
   * List namespaces
   */
  async listNamespaces(body: { limit?: number }): Promise<{
    namespaces?: Types.TeamNamespace[];
    cursor?: string;
    has_more?: boolean;
  }> {
    return this.client.post<{
      namespaces?: Types.TeamNamespace[];
      cursor?: string;
      has_more?: boolean;
    }>("/team/namespaces/list", body);
  }

  /**
   * Continue listing namespaces
   */
  async listNamespacesContinue(body: { cursor: string }): Promise<{
    namespaces?: Types.TeamNamespace[];
    cursor?: string;
    has_more?: boolean;
  }> {
    return this.client.post<{
      namespaces?: Types.TeamNamespace[];
      cursor?: string;
      has_more?: boolean;
    }>("/team/namespaces/list/continue", body);
  }
}
