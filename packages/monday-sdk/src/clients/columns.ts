// Columns API client for Monday.com

import type { MondayGraphQLClient } from "../auth/client";

export interface Column {
  id: string;
  title: string;
  type: string;
  settings_str?: string;
  archived?: boolean;
}

export interface CreateColumnParams extends Record<string, unknown> {
  board_id: number;
  title: string;
  column_type: string;
  defaults?: Record<string, unknown>;
}

export interface ChangeColumnValueParams {
  board_id: number;
  item_id: number;
  column_id: string;
  value: unknown;
}

export class ColumnsClient {
  constructor(private client: MondayGraphQLClient) {}

  /**
   * Create a new column
   */
  async create(params: CreateColumnParams): Promise<Column> {
    const mutation = `
      mutation ($board_id: ID!, $title: String!, $column_type: ColumnType!, $defaults: JSON) {
        create_column(board_id: $board_id, title: $title, column_type: $column_type, defaults: $defaults) {
          id
          title
          type
          settings_str
        }
      }
    `;

    const result = await this.client.mutate<{ create_column: Column }>(mutation, params);
    return result.create_column;
  }

  /**
   * Create a status column
   */
  async createStatus(
    boardId: number,
    title: string,
    settings?: Record<string, unknown>
  ): Promise<Column> {
    const mutation = `
      mutation ($board_id: ID!, $title: String!, $settings: StatusColumnSettings) {
        create_status_column(board_id: $board_id, title: $title, settings: $settings) {
          id
          title
          type
          settings_str
        }
      }
    `;

    const result = await this.client.mutate<{ create_status_column: Column }>(mutation, {
      board_id: boardId,
      title,
      settings,
    });
    return result.create_status_column;
  }

  /**
   * Create a dropdown column
   */
  async createDropdown(
    boardId: number,
    title: string,
    settings?: Record<string, unknown>
  ): Promise<Column> {
    const mutation = `
      mutation ($board_id: ID!, $title: String!, $settings: DropdownColumnSettings) {
        create_dropdown_column(board_id: $board_id, title: $title, settings: $settings) {
          id
          title
          type
          settings_str
        }
      }
    `;

    const result = await this.client.mutate<{ create_dropdown_column: Column }>(mutation, {
      board_id: boardId,
      title,
      settings,
    });
    return result.create_dropdown_column;
  }

  /**
   * Change a column value
   */
  async changeValue(params: ChangeColumnValueParams): Promise<unknown> {
    const mutation = `
      mutation ($board_id: ID!, $item_id: ID!, $column_id: String!, $value: JSON!) {
        change_column_value(board_id: $board_id, item_id: $item_id, column_id: $column_id, value: $value) {
          id
          name
        }
      }
    `;

    const variables = {
      ...params,
      value: typeof params.value === "string" ? params.value : JSON.stringify(params.value),
    };

    const result = await this.client.mutate(mutation, variables);
    return result;
  }

  /**
   * Change column title
   */
  async changeTitle(boardId: number, columnId: string, title: string): Promise<Column> {
    const mutation = `
      mutation ($board_id: ID!, $column_id: String!, $title: String!) {
        change_column_title(board_id: $board_id, column_id: $column_id, title: $title) {
          id
          title
        }
      }
    `;

    const result = await this.client.mutate<{ change_column_title: Column }>(mutation, {
      board_id: boardId,
      column_id: columnId,
      title,
    });
    return result.change_column_title;
  }

  /**
   * Delete a column
   */
  async delete(boardId: number, columnId: string): Promise<Column> {
    const mutation = `
      mutation ($board_id: ID!, $column_id: String!) {
        delete_column(board_id: $board_id, column_id: $column_id) {
          id
          title
        }
      }
    `;

    const result = await this.client.mutate<{ delete_column: Column }>(mutation, {
      board_id: boardId,
      column_id: columnId,
    });
    return result.delete_column;
  }

  /**
   * Update a column
   */
  async update(
    boardId: number,
    columnId: string,
    settings?: Record<string, unknown>
  ): Promise<Column> {
    const mutation = `
      mutation ($board_id: ID!, $column_id: String!, $settings: JSON) {
        update_column(board_id: $board_id, column_id: $column_id, settings: $settings) {
          id
          title
          type
          settings_str
        }
      }
    `;

    const result = await this.client.mutate<{ update_column: Column }>(mutation, {
      board_id: boardId,
      column_id: columnId,
      settings,
    });
    return result.update_column;
  }
}
