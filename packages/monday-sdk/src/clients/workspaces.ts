// Workspaces API client for Monday.com

import type { MondayGraphQLClient } from "../auth/client";

export interface Workspace {
  id: string;
  name: string;
  kind?: string;
  description?: string;
}

export interface QueryWorkspacesParams extends Record<string, unknown> {
  ids?: number[];
  limit?: number;
  page?: number;
  kind?: string;
}

export interface CreateWorkspaceParams extends Record<string, unknown> {
  name: string;
  kind: string;
  description?: string;
}

export class WorkspacesClient {
  constructor(private client: MondayGraphQLClient) {}

  /**
   * Query workspaces
   */
  async query(params?: QueryWorkspacesParams): Promise<Workspace[]> {
    const query = `
      query ($ids: [ID!], $limit: Int, $page: Int, $kind: WorkspaceKind) {
        workspaces(ids: $ids, limit: $limit, page: $page, kind: $kind) {
          id
          name
          kind
          description
        }
      }
    `;

    const result = await this.client.query<{ workspaces: Workspace[] }>(query, params);
    return result.workspaces;
  }

  /**
   * Create a new workspace
   */
  async create(params: CreateWorkspaceParams): Promise<Workspace> {
    const mutation = `
      mutation ($name: String!, $kind: WorkspaceKind!, $description: String) {
        create_workspace(name: $name, kind: $kind, description: $description) {
          id
          name
          kind
          description
        }
      }
    `;

    const result = await this.client.mutate<{ create_workspace: Workspace }>(
      mutation,
      params
    );
    return result.create_workspace;
  }

  /**
   * Update a workspace
   */
  async update(
    workspaceId: number,
    attributes: { name?: string; description?: string }
  ): Promise<Workspace> {
    const mutation = `
      mutation ($workspace_id: ID!, $attributes: UpdateWorkspaceAttributesInput!) {
        update_workspace(workspace_id: $workspace_id, attributes: $attributes) {
          id
          name
          description
        }
      }
    `;

    const result = await this.client.mutate<{ update_workspace: Workspace }>(mutation, {
      workspace_id: workspaceId,
      attributes,
    });
    return result.update_workspace;
  }

  /**
   * Delete a workspace
   */
  async delete(workspaceId: number): Promise<Workspace> {
    const mutation = `
      mutation ($workspace_id: ID!) {
        delete_workspace(workspace_id: $workspace_id) {
          id
          name
        }
      }
    `;

    const result = await this.client.mutate<{ delete_workspace: Workspace }>(mutation, {
      workspace_id: workspaceId,
    });
    return result.delete_workspace;
  }
}
