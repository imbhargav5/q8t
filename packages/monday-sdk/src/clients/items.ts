// Items API client for Monday.com

import type { MondayGraphQLClient } from "../auth/client";

export interface Item {
  id: string;
  name: string;
  state?: string;
  created_at?: string;
  updated_at?: string;
  board?: {
    id: string;
    name: string;
  };
}

export interface QueryItemsParams extends Record<string, unknown> {
  ids?: number[];
  limit?: number;
  page?: number;
  newest_first?: boolean;
  exclude_nonactive?: boolean;
}

export interface CreateItemParams {
  board_id: number;
  group_id?: string;
  item_name: string;
  column_values?: Record<string, unknown>;
  create_labels_if_missing?: boolean;
}

export interface UpdateItemParams {
  board_id: number;
  item_id: number;
  column_values: Record<string, unknown>;
  create_labels_if_missing?: boolean;
}

export class ItemsClient {
  constructor(private client: MondayGraphQLClient) {}

  /**
   * Query items by IDs
   */
  async query(params?: QueryItemsParams): Promise<Item[]> {
    const query = `
      query ($ids: [ID!], $limit: Int, $page: Int, $newest_first: Boolean, $exclude_nonactive: Boolean) {
        items(ids: $ids, limit: $limit, page: $page, newest_first: $newest_first, exclude_nonactive: $exclude_nonactive) {
          id
          name
          state
          created_at
          updated_at
          board {
            id
            name
          }
        }
      }
    `;

    const result = await this.client.query<{ items: Item[] }>(query, params);
    return result.items;
  }

  /**
   * Create a new item
   */
  async create(params: CreateItemParams): Promise<Item> {
    const mutation = `
      mutation ($board_id: ID!, $group_id: String, $item_name: String!, $column_values: JSON, $create_labels_if_missing: Boolean) {
        create_item(board_id: $board_id, group_id: $group_id, item_name: $item_name, column_values: $column_values, create_labels_if_missing: $create_labels_if_missing) {
          id
          name
          state
          created_at
        }
      }
    `;

    const variables = {
      ...params,
      column_values: params.column_values
        ? JSON.stringify(params.column_values)
        : undefined,
    };

    const result = await this.client.mutate<{ create_item: Item }>(mutation, variables);
    return result.create_item;
  }

  /**
   * Change multiple column values
   */
  async updateColumns(params: UpdateItemParams): Promise<Item> {
    const mutation = `
      mutation ($board_id: ID!, $item_id: ID!, $column_values: JSON!, $create_labels_if_missing: Boolean) {
        change_multiple_column_values(board_id: $board_id, item_id: $item_id, column_values: $column_values, create_labels_if_missing: $create_labels_if_missing) {
          id
          name
          updated_at
        }
      }
    `;

    const variables = {
      ...params,
      column_values: JSON.stringify(params.column_values),
    };

    const result = await this.client.mutate<{ change_multiple_column_values: Item }>(
      mutation,
      variables
    );
    return result.change_multiple_column_values;
  }

  /**
   * Archive an item
   */
  async archive(itemId: number): Promise<Item> {
    const mutation = `
      mutation ($item_id: ID!) {
        archive_item(item_id: $item_id) {
          id
          name
          state
        }
      }
    `;

    const result = await this.client.mutate<{ archive_item: Item }>(mutation, {
      item_id: itemId,
    });
    return result.archive_item;
  }

  /**
   * Delete an item
   */
  async delete(itemId: number): Promise<Item> {
    const mutation = `
      mutation ($item_id: ID!) {
        delete_item(item_id: $item_id) {
          id
          name
        }
      }
    `;

    const result = await this.client.mutate<{ delete_item: Item }>(mutation, {
      item_id: itemId,
    });
    return result.delete_item;
  }

  /**
   * Duplicate an item
   */
  async duplicate(
    boardId: number,
    itemId: number,
    withUpdates?: boolean
  ): Promise<Item> {
    const mutation = `
      mutation ($board_id: ID!, $item_id: ID!, $with_updates: Boolean) {
        duplicate_item(board_id: $board_id, item_id: $item_id, with_updates: $with_updates) {
          id
          name
          created_at
        }
      }
    `;

    const result = await this.client.mutate<{ duplicate_item: Item }>(mutation, {
      board_id: boardId,
      item_id: itemId,
      with_updates: withUpdates,
    });
    return result.duplicate_item;
  }

  /**
   * Move item to a different group
   */
  async moveToGroup(itemId: number, groupId: string): Promise<Item> {
    const mutation = `
      mutation ($item_id: ID!, $group_id: String!) {
        move_item_to_group(item_id: $item_id, group_id: $group_id) {
          id
          name
        }
      }
    `;

    const result = await this.client.mutate<{ move_item_to_group: Item }>(mutation, {
      item_id: itemId,
      group_id: groupId,
    });
    return result.move_item_to_group;
  }

  /**
   * Move item to a different board
   */
  async moveToBoard(
    boardId: number,
    groupId: string,
    itemId: number,
    columnsMapping?: Record<string, unknown>
  ): Promise<Item> {
    const mutation = `
      mutation ($board_id: ID!, $group_id: String!, $item_id: ID!, $columns_mapping: [ColumnMappingInput!]) {
        move_item_to_board(board_id: $board_id, group_id: $group_id, item_id: $item_id, columns_mapping: $columns_mapping) {
          id
          name
          board {
            id
            name
          }
        }
      }
    `;

    const result = await this.client.mutate<{ move_item_to_board: Item }>(mutation, {
      board_id: boardId,
      group_id: groupId,
      item_id: itemId,
      columns_mapping: columnsMapping,
    });
    return result.move_item_to_board;
  }

  /**
   * Clear all updates from an item
   */
  async clearUpdates(itemId: number): Promise<Item> {
    const mutation = `
      mutation ($item_id: ID!) {
        clear_item_updates(item_id: $item_id) {
          id
          name
        }
      }
    `;

    const result = await this.client.mutate<{ clear_item_updates: Item }>(mutation, {
      item_id: itemId,
    });
    return result.clear_item_updates;
  }
}
