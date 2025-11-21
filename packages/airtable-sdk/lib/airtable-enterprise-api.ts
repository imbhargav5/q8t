// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Airtable Enterprise API

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class AirtableEnterpriseApi {
  constructor() {}

  /**
   * Get enterprise account info
   */
  getEnterpriseInfo(): Effect.Effect<Types.EnterpriseInfo, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.EnterpriseInfo>("/meta/enterpriseAccount");
    });
  }

  /**
   * List enterprise users
   */
  listUsers(queryParams?: { offset?: string; pageSize?: number }): Effect.Effect<Types.UserList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      const params: Record<string, string | number | boolean | string[] | undefined> = {};
      if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
      if (queryParams?.pageSize !== undefined) params["pageSize"] = queryParams.pageSize;
      return yield* client.get<Types.UserList>("/meta/enterpriseAccount/users", { queryParams: params });
    });
  }

  /**
   * Get user details
   */
  getUser(userId: string): Effect.Effect<Types.User, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.User>(`/meta/enterpriseAccount/users/${userId}`);
    });
  }

  /**
   * Remove user
   */
  removeUser(userId: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.delete<void>(`/meta/enterpriseAccount/users/${userId}`);
    });
  }

  /**
   * Grant admin privileges
   */
  grantAdmin(userId: string): Effect.Effect<Types.User, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.User>(`/meta/enterpriseAccount/users/${userId}/grantAdmin`);
    });
  }

  /**
   * Revoke admin privileges
   */
  revokeAdmin(userId: string): Effect.Effect<Types.User, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.User>(`/meta/enterpriseAccount/users/${userId}/revokeAdmin`);
    });
  }

  /**
   * Claim users to enterprise
   */
  claimUsers(body: Types.ClaimUsersRequest): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<void>("/meta/enterpriseAccount/claimUsers", { body });
    });
  }

  /**
   * List groups
   */
  listGroups(queryParams?: { offset?: string; pageSize?: number }): Effect.Effect<Types.GroupList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      const params: Record<string, string | number | boolean | string[] | undefined> = {};
      if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
      if (queryParams?.pageSize !== undefined) params["pageSize"] = queryParams.pageSize;
      return yield* client.get<Types.GroupList>("/meta/enterpriseAccount/groups", { queryParams: params });
    });
  }

  /**
   * Create group
   */
  createGroup(body: Types.CreateGroupRequest): Effect.Effect<Types.Group, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.Group>("/meta/enterpriseAccount/groups", { body });
    });
  }

  /**
   * Get group details
   */
  getGroup(groupId: string): Effect.Effect<Types.Group, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.Group>(`/meta/enterpriseAccount/groups/${groupId}`);
    });
  }

  /**
   * Delete group
   */
  deleteGroup(groupId: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.delete<void>(`/meta/enterpriseAccount/groups/${groupId}`);
    });
  }

  /**
   * Update group
   */
  updateGroup(groupId: string, body: Types.UpdateGroupRequest): Effect.Effect<Types.Group, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.patch<Types.Group>(`/meta/enterpriseAccount/groups/${groupId}`, { body });
    });
  }

  /**
   * List audit log events
   */
  listAuditLogs(queryParams?: { startTime?: string; endTime?: string; actionType?: string; actorId?: string; offset?: string; pageSize?: number }): Effect.Effect<Types.AuditLogList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      const params: Record<string, string | number | boolean | string[] | undefined> = {};
      if (queryParams?.startTime !== undefined) params["startTime"] = queryParams.startTime;
      if (queryParams?.endTime !== undefined) params["endTime"] = queryParams.endTime;
      if (queryParams?.actionType !== undefined) params["actionType"] = queryParams.actionType;
      if (queryParams?.actorId !== undefined) params["actorId"] = queryParams.actorId;
      if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
      if (queryParams?.pageSize !== undefined) params["pageSize"] = queryParams.pageSize;
      return yield* client.get<Types.AuditLogList>("/meta/enterpriseAccount/auditLogs", { queryParams: params });
    });
  }

  /**
   * List workspaces
   */
  listWorkspaces(queryParams?: { offset?: string }): Effect.Effect<Types.WorkspaceList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      const params: Record<string, string | number | boolean | string[] | undefined> = {};
      if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
      return yield* client.get<Types.WorkspaceList>("/meta/workspaces", { queryParams: params });
    });
  }

  /**
   * Create workspace
   */
  createWorkspace(body: Types.CreateWorkspaceRequest): Effect.Effect<Types.Workspace, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.Workspace>("/meta/workspaces", { body });
    });
  }

  /**
   * Get workspace details
   */
  getWorkspace(workspaceId: string): Effect.Effect<Types.Workspace, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.Workspace>(`/meta/workspaces/${workspaceId}`);
    });
  }

  /**
   * Delete workspace
   */
  deleteWorkspace(workspaceId: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.delete<void>(`/meta/workspaces/${workspaceId}`);
    });
  }

  /**
   * List workspace collaborators
   */
  listWorkspaceCollaborators(workspaceId: string): Effect.Effect<Types.CollaboratorList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.CollaboratorList>(`/meta/workspaces/${workspaceId}/collaborators`);
    });
  }

  /**
   * Add workspace collaborator
   */
  addWorkspaceCollaborator(workspaceId: string, body: Types.AddCollaboratorRequest): Effect.Effect<Types.Collaborator, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.Collaborator>(`/meta/workspaces/${workspaceId}/collaborators`, { body });
    });
  }

  /**
   * Remove workspace collaborator
   */
  removeWorkspaceCollaborator(workspaceId: string, collaboratorId: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.delete<void>(`/meta/workspaces/${workspaceId}/collaborators/${collaboratorId}`);
    });
  }

  /**
   * Update workspace collaborator
   */
  updateWorkspaceCollaborator(workspaceId: string, collaboratorId: string, body: Types.UpdateCollaboratorRequest): Effect.Effect<Types.Collaborator, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.patch<Types.Collaborator>(`/meta/workspaces/${workspaceId}/collaborators/${collaboratorId}`, { body });
    });
  }

  /**
   * List base collaborators
   */
  listBaseCollaborators(baseId: string): Effect.Effect<Types.CollaboratorList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.CollaboratorList>(`/meta/bases/${baseId}/collaborators`);
    });
  }

  /**
   * Add base collaborator
   */
  addBaseCollaborator(baseId: string, body: Types.AddCollaboratorRequest): Effect.Effect<Types.Collaborator, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.Collaborator>(`/meta/bases/${baseId}/collaborators`, { body });
    });
  }

  /**
   * Remove base collaborator
   */
  removeBaseCollaborator(baseId: string, collaboratorId: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.delete<void>(`/meta/bases/${baseId}/collaborators/${collaboratorId}`);
    });
  }

  /**
   * Update base collaborator
   */
  updateBaseCollaborator(baseId: string, collaboratorId: string, body: Types.UpdateCollaboratorRequest): Effect.Effect<Types.Collaborator, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.patch<Types.Collaborator>(`/meta/bases/${baseId}/collaborators/${collaboratorId}`, { body });
    });
  }

}