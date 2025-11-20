// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Airtable Enterprise API

import type { PATHttpClient } from "../src/auth/pat-client";
import type * as Types from "./types";

export class AirtableEnterpriseApi {
  private client: PATHttpClient;

  constructor(client: PATHttpClient) {
    this.client = client;
  }

  /**
   * Get enterprise account info
   */
  async getEnterpriseInfo(): Promise<Types.EnterpriseInfo> {
    return this.client.get<Types.EnterpriseInfo>("/meta/enterpriseAccount");
  }

  /**
   * List enterprise users
   */
  async listUsers(queryParams?: { offset?: string; pageSize?: number }): Promise<Types.UserList> {
    const params: Record<string, string | number | boolean | string[] | undefined> = {};
    if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
    if (queryParams?.pageSize !== undefined) params["pageSize"] = queryParams.pageSize;
    return this.client.get<Types.UserList>("/meta/enterpriseAccount/users", params);
  }

  /**
   * Get user details
   */
  async getUser(userId: string): Promise<Types.User> {
    return this.client.get<Types.User>(`/meta/enterpriseAccount/users/${userId}`);
  }

  /**
   * Remove user
   */
  async removeUser(userId: string): Promise<void> {
    return this.client.delete<void>(`/meta/enterpriseAccount/users/${userId}`);
  }

  /**
   * Grant admin privileges
   */
  async grantAdmin(userId: string): Promise<Types.User> {
    return this.client.post<Types.User>(`/meta/enterpriseAccount/users/${userId}/grantAdmin`);
  }

  /**
   * Revoke admin privileges
   */
  async revokeAdmin(userId: string): Promise<Types.User> {
    return this.client.post<Types.User>(`/meta/enterpriseAccount/users/${userId}/revokeAdmin`);
  }

  /**
   * Claim users to enterprise
   */
  async claimUsers(body: Types.ClaimUsersRequest): Promise<void> {
    return this.client.post<void>("/meta/enterpriseAccount/claimUsers", body);
  }

  /**
   * List groups
   */
  async listGroups(queryParams?: { offset?: string; pageSize?: number }): Promise<Types.GroupList> {
    const params: Record<string, string | number | boolean | string[] | undefined> = {};
    if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
    if (queryParams?.pageSize !== undefined) params["pageSize"] = queryParams.pageSize;
    return this.client.get<Types.GroupList>("/meta/enterpriseAccount/groups", params);
  }

  /**
   * Create group
   */
  async createGroup(body: Types.CreateGroupRequest): Promise<Types.Group> {
    return this.client.post<Types.Group>("/meta/enterpriseAccount/groups", body);
  }

  /**
   * Get group details
   */
  async getGroup(groupId: string): Promise<Types.Group> {
    return this.client.get<Types.Group>(`/meta/enterpriseAccount/groups/${groupId}`);
  }

  /**
   * Delete group
   */
  async deleteGroup(groupId: string): Promise<void> {
    return this.client.delete<void>(`/meta/enterpriseAccount/groups/${groupId}`);
  }

  /**
   * Update group
   */
  async updateGroup(groupId: string, body: Types.UpdateGroupRequest): Promise<Types.Group> {
    return this.client.patch<Types.Group>(`/meta/enterpriseAccount/groups/${groupId}`, body);
  }

  /**
   * List audit log events
   */
  async listAuditLogs(queryParams?: { startTime?: string; endTime?: string; actionType?: string; actorId?: string; offset?: string; pageSize?: number }): Promise<Types.AuditLogList> {
    const params: Record<string, string | number | boolean | string[] | undefined> = {};
    if (queryParams?.startTime !== undefined) params["startTime"] = queryParams.startTime;
    if (queryParams?.endTime !== undefined) params["endTime"] = queryParams.endTime;
    if (queryParams?.actionType !== undefined) params["actionType"] = queryParams.actionType;
    if (queryParams?.actorId !== undefined) params["actorId"] = queryParams.actorId;
    if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
    if (queryParams?.pageSize !== undefined) params["pageSize"] = queryParams.pageSize;
    return this.client.get<Types.AuditLogList>("/meta/enterpriseAccount/auditLogs", params);
  }

  /**
   * List workspaces
   */
  async listWorkspaces(queryParams?: { offset?: string }): Promise<Types.WorkspaceList> {
    const params: Record<string, string | number | boolean | string[] | undefined> = {};
    if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
    return this.client.get<Types.WorkspaceList>("/meta/workspaces", params);
  }

  /**
   * Create workspace
   */
  async createWorkspace(body: Types.CreateWorkspaceRequest): Promise<Types.Workspace> {
    return this.client.post<Types.Workspace>("/meta/workspaces", body);
  }

  /**
   * Get workspace details
   */
  async getWorkspace(workspaceId: string): Promise<Types.Workspace> {
    return this.client.get<Types.Workspace>(`/meta/workspaces/${workspaceId}`);
  }

  /**
   * Delete workspace
   */
  async deleteWorkspace(workspaceId: string): Promise<void> {
    return this.client.delete<void>(`/meta/workspaces/${workspaceId}`);
  }

  /**
   * List workspace collaborators
   */
  async listWorkspaceCollaborators(workspaceId: string): Promise<Types.CollaboratorList> {
    return this.client.get<Types.CollaboratorList>(`/meta/workspaces/${workspaceId}/collaborators`);
  }

  /**
   * Add workspace collaborator
   */
  async addWorkspaceCollaborator(workspaceId: string, body: Types.AddCollaboratorRequest): Promise<Types.Collaborator> {
    return this.client.post<Types.Collaborator>(`/meta/workspaces/${workspaceId}/collaborators`, body);
  }

  /**
   * Remove workspace collaborator
   */
  async removeWorkspaceCollaborator(workspaceId: string, collaboratorId: string): Promise<void> {
    return this.client.delete<void>(`/meta/workspaces/${workspaceId}/collaborators/${collaboratorId}`);
  }

  /**
   * Update workspace collaborator
   */
  async updateWorkspaceCollaborator(workspaceId: string, collaboratorId: string, body: Types.UpdateCollaboratorRequest): Promise<Types.Collaborator> {
    return this.client.patch<Types.Collaborator>(`/meta/workspaces/${workspaceId}/collaborators/${collaboratorId}`, body);
  }

  /**
   * List base collaborators
   */
  async listBaseCollaborators(baseId: string): Promise<Types.CollaboratorList> {
    return this.client.get<Types.CollaboratorList>(`/meta/bases/${baseId}/collaborators`);
  }

  /**
   * Add base collaborator
   */
  async addBaseCollaborator(baseId: string, body: Types.AddCollaboratorRequest): Promise<Types.Collaborator> {
    return this.client.post<Types.Collaborator>(`/meta/bases/${baseId}/collaborators`, body);
  }

  /**
   * Remove base collaborator
   */
  async removeBaseCollaborator(baseId: string, collaboratorId: string): Promise<void> {
    return this.client.delete<void>(`/meta/bases/${baseId}/collaborators/${collaboratorId}`);
  }

  /**
   * Update base collaborator
   */
  async updateBaseCollaborator(baseId: string, collaboratorId: string, body: Types.UpdateCollaboratorRequest): Promise<Types.Collaborator> {
    return this.client.patch<Types.Collaborator>(`/meta/bases/${baseId}/collaborators/${collaboratorId}`, body);
  }

}