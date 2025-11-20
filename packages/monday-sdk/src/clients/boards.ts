// Boards API client for Monday.com

import type { MondayGraphQLClient } from "../auth/client";

export interface Board {
  id: string;
  name: string;
  description?: string;
  state?: string;
  board_kind?: string;
  workspace_id?: string;
}

export interface QueryBoardsParams extends Record<string, unknown> {
  ids?: number[];
  limit?: number;
  page?: number;
  board_kind?: string;
  state?: string;
  workspace_ids?: number[];
}

export interface CreateBoardParams extends Record<string, unknown> {
  board_name: string;
  board_kind?: string;
  workspace_id?: number;
  template_id?: number;
  folder_id?: number;
}

export interface UpdateBoardParams extends Record<string, unknown> {
  board_id: number;
  board_attribute: string;
  new_value: string;
}

export class BoardsClient {
  constructor(private client: MondayGraphQLClient) {}

  /**
   * Query boards
   */
  async query(params?: QueryBoardsParams): Promise<Board[]> {
    const query = `
      query ($ids: [ID!], $limit: Int, $page: Int, $board_kind: BoardKind, $state: State, $workspace_ids: [ID!]) {
        boards(ids: $ids, limit: $limit, page: $page, board_kind: $board_kind, state: $state, workspace_ids: $workspace_ids) {
          id
          name
          description
          state
          board_kind
          workspace_id
        }
      }
    `;

    const result = await this.client.query<{ boards: Board[] }>(query, params);
    return result.boards;
  }

  /**
   * Create a new board
   */
  async create(params: CreateBoardParams): Promise<Board> {
    const mutation = `
      mutation ($board_name: String!, $board_kind: BoardKind, $workspace_id: ID, $template_id: ID, $folder_id: ID) {
        create_board(board_name: $board_name, board_kind: $board_kind, workspace_id: $workspace_id, template_id: $template_id, folder_id: $folder_id) {
          id
          name
          description
          state
          board_kind
          workspace_id
        }
      }
    `;

    const result = await this.client.mutate<{ create_board: Board }>(mutation, params);
    return result.create_board;
  }

  /**
   * Update a board
   */
  async update(params: UpdateBoardParams): Promise<Board> {
    const mutation = `
      mutation ($board_id: ID!, $board_attribute: BoardAttributes!, $new_value: String!) {
        update_board(board_id: $board_id, board_attribute: $board_attribute, new_value: $new_value) {
          id
          name
          description
          state
        }
      }
    `;

    const result = await this.client.mutate<{ update_board: Board }>(mutation, params);
    return result.update_board;
  }

  /**
   * Archive a board
   */
  async archive(boardId: number): Promise<Board> {
    const mutation = `
      mutation ($board_id: ID!) {
        archive_board(board_id: $board_id) {
          id
          name
          state
        }
      }
    `;

    const result = await this.client.mutate<{ archive_board: Board }>(mutation, {
      board_id: boardId,
    });
    return result.archive_board;
  }

  /**
   * Delete a board
   */
  async delete(boardId: number): Promise<Board> {
    const mutation = `
      mutation ($board_id: ID!) {
        delete_board(board_id: $board_id) {
          id
          name
        }
      }
    `;

    const result = await this.client.mutate<{ delete_board: Board }>(mutation, {
      board_id: boardId,
    });
    return result.delete_board;
  }

  /**
   * Duplicate a board
   */
  async duplicate(
    boardId: number,
    duplicateType?: string,
    boardName?: string,
    workspaceId?: number,
    folderId?: number
  ): Promise<Board> {
    const mutation = `
      mutation ($board_id: ID!, $duplicate_type: DuplicateBoardType, $board_name: String, $workspace_id: ID, $folder_id: ID) {
        duplicate_board(board_id: $board_id, duplicate_type: $duplicate_type, board_name: $board_name, workspace_id: $workspace_id, folder_id: $folder_id) {
          id
          name
          description
        }
      }
    `;

    const result = await this.client.mutate<{ duplicate_board: Board }>(mutation, {
      board_id: boardId,
      duplicate_type: duplicateType,
      board_name: boardName,
      workspace_id: workspaceId,
      folder_id: folderId,
    });
    return result.duplicate_board;
  }
}
