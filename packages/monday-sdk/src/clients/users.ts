// Users API client for Monday.com

import type { MondayGraphQLClient } from "../auth/client";

export interface User {
  id: string;
  name: string;
  email: string;
  enabled?: boolean;
  is_guest?: boolean;
  is_pending?: boolean;
  title?: string;
  photo_thumb?: string;
}

export interface QueryUsersParams extends Record<string, unknown> {
  ids?: number[];
  kind?: string;
  newest_first?: boolean;
  limit?: number;
  emails?: string[];
  name?: string;
}

export class UsersClient {
  constructor(private client: MondayGraphQLClient) {}

  /**
   * Query users
   */
  async query(params?: QueryUsersParams): Promise<User[]> {
    const query = `
      query ($ids: [ID!], $kind: UserKind, $newest_first: Boolean, $limit: Int, $emails: [String!], $name: String) {
        users(ids: $ids, kind: $kind, newest_first: $newest_first, limit: $limit, emails: $emails, name: $name) {
          id
          name
          email
          enabled
          is_guest
          is_pending
          title
          photo_thumb
        }
      }
    `;

    const result = await this.client.query<{ users: User[] }>(query, params);
    return result.users;
  }

  /**
   * Add users to a board
   */
  async addToBoard(
    boardId: number,
    userIds: number[],
    kind?: string
  ): Promise<User[]> {
    const mutation = `
      mutation ($board_id: ID!, $user_ids: [ID!]!, $kind: UserKind) {
        add_users_to_board(board_id: $board_id, user_ids: $user_ids, kind: $kind) {
          id
          name
          email
        }
      }
    `;

    const result = await this.client.mutate<{ add_users_to_board: User[] }>(mutation, {
      board_id: boardId,
      user_ids: userIds,
      kind,
    });
    return result.add_users_to_board;
  }

  /**
   * Add users to a workspace
   */
  async addToWorkspace(workspaceId: number, userIds: number[], kind?: string): Promise<User[]> {
    const mutation = `
      mutation ($workspace_id: ID!, $user_ids: [ID!]!, $kind: UserKind) {
        add_users_to_workspace(workspace_id: $workspace_id, user_ids: $user_ids, kind: $kind) {
          id
          name
          email
        }
      }
    `;

    const result = await this.client.mutate<{ add_users_to_workspace: User[] }>(mutation, {
      workspace_id: workspaceId,
      user_ids: userIds,
      kind,
    });
    return result.add_users_to_workspace;
  }

  /**
   * Add users to a team
   */
  async addToTeam(teamId: number, userIds: number[]): Promise<User[]> {
    const mutation = `
      mutation ($team_id: ID!, $user_ids: [ID!]!) {
        add_users_to_team(team_id: $team_id, user_ids: $user_ids) {
          id
          name
          email
        }
      }
    `;

    const result = await this.client.mutate<{ add_users_to_team: User[] }>(mutation, {
      team_id: teamId,
      user_ids: userIds,
    });
    return result.add_users_to_team;
  }

  /**
   * Delete users from workspace
   */
  async deleteFromWorkspace(workspaceId: number, userIds: number[]): Promise<User[]> {
    const mutation = `
      mutation ($workspace_id: ID!, $user_ids: [ID!]!) {
        delete_users_from_workspace(workspace_id: $workspace_id, user_ids: $user_ids) {
          id
          name
        }
      }
    `;

    const result = await this.client.mutate<{ delete_users_from_workspace: User[] }>(
      mutation,
      {
        workspace_id: workspaceId,
        user_ids: userIds,
      }
    );
    return result.delete_users_from_workspace;
  }

  /**
   * Remove users from team
   */
  async removeFromTeam(teamId: number, userIds: number[]): Promise<User[]> {
    const mutation = `
      mutation ($team_id: ID!, $user_ids: [ID!]!) {
        remove_users_from_team(team_id: $team_id, user_ids: $user_ids) {
          id
          name
        }
      }
    `;

    const result = await this.client.mutate<{ remove_users_from_team: User[] }>(mutation, {
      team_id: teamId,
      user_ids: userIds,
    });
    return result.remove_users_from_team;
  }
}
