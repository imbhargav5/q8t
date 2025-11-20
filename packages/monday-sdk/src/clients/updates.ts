// Updates API client for Monday.com

import type { MondayGraphQLClient } from "../auth/client";

export interface Update {
  id: string;
  body: string;
  created_at?: string;
  updated_at?: string;
  creator?: {
    id: string;
    name: string;
  };
}

export interface QueryUpdatesParams extends Record<string, unknown> {
  limit?: number;
  page?: number;
}

export interface CreateUpdateParams extends Record<string, unknown> {
  item_id: number;
  body: string;
  parent_id?: string;
}

export class UpdatesClient {
  constructor(private client: MondayGraphQLClient) {}

  /**
   * Query updates
   */
  async query(params?: QueryUpdatesParams): Promise<Update[]> {
    const query = `
      query ($limit: Int, $page: Int) {
        updates(limit: $limit, page: $page) {
          id
          body
          created_at
          updated_at
          creator {
            id
            name
          }
        }
      }
    `;

    const result = await this.client.query<{ updates: Update[] }>(query, params);
    return result.updates;
  }

  /**
   * Create a new update
   */
  async create(params: CreateUpdateParams): Promise<Update> {
    const mutation = `
      mutation ($item_id: ID!, $body: String!, $parent_id: ID) {
        create_update(item_id: $item_id, body: $body, parent_id: $parent_id) {
          id
          body
          created_at
          creator {
            id
            name
          }
        }
      }
    `;

    const result = await this.client.mutate<{ create_update: Update }>(mutation, params);
    return result.create_update;
  }

  /**
   * Edit an update
   */
  async edit(updateId: number, body: string): Promise<Update> {
    const mutation = `
      mutation ($id: ID!, $body: String!) {
        edit_update(id: $id, body: $body) {
          id
          body
          updated_at
        }
      }
    `;

    const result = await this.client.mutate<{ edit_update: Update }>(mutation, {
      id: updateId,
      body,
    });
    return result.edit_update;
  }

  /**
   * Delete an update
   */
  async delete(updateId: number): Promise<Update> {
    const mutation = `
      mutation ($id: ID!) {
        delete_update(id: $id) {
          id
        }
      }
    `;

    const result = await this.client.mutate<{ delete_update: Update }>(mutation, {
      id: updateId,
    });
    return result.delete_update;
  }

  /**
   * Like an update
   */
  async like(updateId: number): Promise<Update> {
    const mutation = `
      mutation ($update_id: ID!) {
        like_update(update_id: $update_id) {
          id
        }
      }
    `;

    const result = await this.client.mutate<{ like_update: Update }>(mutation, {
      update_id: updateId,
    });
    return result.like_update;
  }

  /**
   * Unlike an update
   */
  async unlike(updateId: number): Promise<Update> {
    const mutation = `
      mutation ($update_id: ID!) {
        unlike_update(update_id: $update_id) {
          id
        }
      }
    `;

    const result = await this.client.mutate<{ unlike_update: Update }>(mutation, {
      update_id: updateId,
    });
    return result.unlike_update;
  }

  /**
   * Pin an update to the top
   */
  async pin(updateId: number): Promise<Update> {
    const mutation = `
      mutation ($update_id: ID!) {
        pin_to_top(update_id: $update_id) {
          id
        }
      }
    `;

    const result = await this.client.mutate<{ pin_to_top: Update }>(mutation, {
      update_id: updateId,
    });
    return result.pin_to_top;
  }

  /**
   * Unpin an update from the top
   */
  async unpin(updateId: number): Promise<Update> {
    const mutation = `
      mutation ($update_id: ID!) {
        unpin_from_top(update_id: $update_id) {
          id
        }
      }
    `;

    const result = await this.client.mutate<{ unpin_from_top: Update }>(mutation, {
      update_id: updateId,
    });
    return result.unpin_from_top;
  }
}
