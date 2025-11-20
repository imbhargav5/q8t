/**
 * Types Test Suite
 *
 * This test suite verifies that all types are correctly exported and usable.
 */

import { describe, it, expect } from "vitest";
import type {
  Board,
  QueryBoardsParams,
  CreateBoardParams,
  UpdateBoardParams,
  Item,
  QueryItemsParams,
  CreateItemParams,
  UpdateItemParams,
  Column,
  CreateColumnParams,
  ChangeColumnValueParams,
  Update,
  QueryUpdatesParams,
  CreateUpdateParams,
  User,
  QueryUsersParams,
  Workspace,
  QueryWorkspacesParams,
  CreateWorkspaceParams,
  Webhook,
  QueryWebhooksParams,
  CreateWebhookParams,
} from "../src/clients";

import type {
  MondayConfig,
  MondayOAuthConfig,
} from "../src/auth/config";

import type {
  MondayTokenConfig,
  MondayOAuthClientConfig,
  MondayShortLivedTokenConfig,
} from "../src/sdk";

describe("Monday SDK - Types", () => {
  describe("Board Types", () => {
    it("should export Board interface", () => {
      const board: Board = {
        id: "123",
        name: "My Board",
        description: "Test board",
        state: "active",
        board_kind: "public",
        workspace_id: "456",
      };

      expect(board.id).toBe("123");
      expect(board.name).toBe("My Board");
    });

    it("should export QueryBoardsParams interface", () => {
      const params: QueryBoardsParams = {
        ids: [123, 456],
        limit: 10,
        page: 1,
        board_kind: "public",
        state: "active",
        workspace_ids: [789],
      };

      expect(params.limit).toBe(10);
      expect(params.ids).toHaveLength(2);
    });

    it("should export CreateBoardParams interface", () => {
      const params: CreateBoardParams = {
        board_name: "New Board",
        board_kind: "public",
        workspace_id: 123,
      };

      expect(params.board_name).toBe("New Board");
    });

    it("should export UpdateBoardParams interface", () => {
      const params: UpdateBoardParams = {
        board_id: 123,
        board_attribute: "name",
        new_value: "Updated Name",
      };

      expect(params.board_id).toBe(123);
    });
  });

  describe("Item Types", () => {
    it("should export Item interface", () => {
      const item: Item = {
        id: "123",
        name: "My Item",
        state: "active",
        created_at: "2024-01-01",
        updated_at: "2024-01-02",
        board: {
          id: "456",
          name: "My Board",
        },
      };

      expect(item.id).toBe("123");
      expect(item.name).toBe("My Item");
      expect(item.board?.id).toBe("456");
    });

    it("should export QueryItemsParams interface", () => {
      const params: QueryItemsParams = {
        ids: [123, 456],
        limit: 25,
        page: 1,
        newest_first: true,
        exclude_nonactive: false,
      };

      expect(params.newest_first).toBe(true);
    });

    it("should export CreateItemParams interface", () => {
      const params: CreateItemParams = {
        board_id: 123,
        item_name: "New Task",
        group_id: "group1",
        column_values: {
          status: "Working on it",
        },
        create_labels_if_missing: true,
      };

      expect(params.item_name).toBe("New Task");
      expect(params.column_values).toBeDefined();
    });

    it("should export UpdateItemParams interface", () => {
      const params: UpdateItemParams = {
        board_id: 123,
        item_id: 456,
        column_values: {
          status: "Done",
        },
      };

      expect(params.item_id).toBe(456);
    });
  });

  describe("Column Types", () => {
    it("should export Column interface", () => {
      const column: Column = {
        id: "col1",
        title: "Status",
        type: "status",
        settings_str: "{}",
        archived: false,
      };

      expect(column.title).toBe("Status");
      expect(column.type).toBe("status");
    });

    it("should export CreateColumnParams interface", () => {
      const params: CreateColumnParams = {
        board_id: 123,
        title: "New Column",
        column_type: "text",
        defaults: {},
      };

      expect(params.title).toBe("New Column");
    });

    it("should export ChangeColumnValueParams interface", () => {
      const params: ChangeColumnValueParams = {
        board_id: 123,
        item_id: 456,
        column_id: "col1",
        value: "new value",
      };

      expect(params.column_id).toBe("col1");
    });
  });

  describe("Update Types", () => {
    it("should export Update interface", () => {
      const update: Update = {
        id: "123",
        body: "This is a comment",
        created_at: "2024-01-01",
        updated_at: "2024-01-02",
        creator: {
          id: "456",
          name: "John Doe",
        },
      };

      expect(update.body).toBe("This is a comment");
      expect(update.creator?.name).toBe("John Doe");
    });

    it("should export QueryUpdatesParams interface", () => {
      const params: QueryUpdatesParams = {
        limit: 10,
        page: 1,
      };

      expect(params.limit).toBe(10);
    });

    it("should export CreateUpdateParams interface", () => {
      const params: CreateUpdateParams = {
        item_id: 123,
        body: "New comment",
        parent_id: "456",
      };

      expect(params.body).toBe("New comment");
    });
  });

  describe("User Types", () => {
    it("should export User interface", () => {
      const user: User = {
        id: "123",
        name: "John Doe",
        email: "john@example.com",
        enabled: true,
        is_guest: false,
        is_pending: false,
        title: "Developer",
        photo_thumb: "https://example.com/photo.jpg",
      };

      expect(user.name).toBe("John Doe");
      expect(user.email).toBe("john@example.com");
    });

    it("should export QueryUsersParams interface", () => {
      const params: QueryUsersParams = {
        ids: [123, 456],
        kind: "all",
        newest_first: true,
        limit: 50,
        emails: ["test@example.com"],
        name: "John",
      };

      expect(params.limit).toBe(50);
      expect(params.emails).toContain("test@example.com");
    });
  });

  describe("Workspace Types", () => {
    it("should export Workspace interface", () => {
      const workspace: Workspace = {
        id: "123",
        name: "My Workspace",
        kind: "open",
        description: "Team workspace",
      };

      expect(workspace.name).toBe("My Workspace");
    });

    it("should export QueryWorkspacesParams interface", () => {
      const params: QueryWorkspacesParams = {
        ids: [123],
        limit: 10,
        page: 1,
        kind: "open",
      };

      expect(params.kind).toBe("open");
    });

    it("should export CreateWorkspaceParams interface", () => {
      const params: CreateWorkspaceParams = {
        name: "New Workspace",
        kind: "open",
        description: "Description",
      };

      expect(params.name).toBe("New Workspace");
    });
  });

  describe("Webhook Types", () => {
    it("should export Webhook interface", () => {
      const webhook: Webhook = {
        id: "123",
        board_id: "456",
        url: "https://example.com/webhook",
        event: "create_item",
        config: "{}",
      };

      expect(webhook.url).toBe("https://example.com/webhook");
      expect(webhook.event).toBe("create_item");
    });

    it("should export QueryWebhooksParams interface", () => {
      const params: QueryWebhooksParams = {
        board_id: 123,
        app_webhooks_only: false,
      };

      expect(params.board_id).toBe(123);
    });

    it("should export CreateWebhookParams interface", () => {
      const params: CreateWebhookParams = {
        board_id: 123,
        url: "https://example.com/webhook",
        event: "create_item",
      };

      expect(params.url).toBe("https://example.com/webhook");
    });
  });

  describe("Config Types", () => {
    it("should export MondayConfig interface", () => {
      const config: MondayConfig = {
        apiVersion: "2024-10",
        timeout: 30000,
      };

      expect(config.timeout).toBe(30000);
    });

    it("should export MondayOAuthConfig interface", () => {
      const config: MondayOAuthConfig = {
        clientId: "client-id",
        clientSecret: "client-secret",
        redirectUri: "https://example.com/callback",
        scopes: ["boards:read", "boards:write"],
      };

      expect(config.scopes).toHaveLength(2);
    });

    it("should export MondayTokenConfig interface", () => {
      const config: MondayTokenConfig = {
        token: "test-token",
        timeout: 60000,
      };

      expect(config.token).toBe("test-token");
    });

    it("should export MondayOAuthClientConfig interface", () => {
      const config: MondayOAuthClientConfig = {
        accessToken: "oauth-token",
        onTokenRefresh: (newToken: string) => {
          // Handle refresh
        },
      };

      expect(config.accessToken).toBe("oauth-token");
      expect(config.onTokenRefresh).toBeDefined();
    });

    it("should export MondayShortLivedTokenConfig interface", () => {
      const config: MondayShortLivedTokenConfig = {
        shortLivedToken: "short-token",
        validityInMinutes: 1,
      };

      expect(config.shortLivedToken).toBe("short-token");
      expect(config.validityInMinutes).toBe(1);
    });
  });

  describe("Type Structure Validation", () => {
    it("should allow optional fields in Board", () => {
      const minimalBoard: Board = {
        id: "123",
        name: "Board",
      };

      expect(minimalBoard).toBeDefined();
    });

    it("should allow optional fields in Item", () => {
      const minimalItem: Item = {
        id: "123",
        name: "Item",
      };

      expect(minimalItem).toBeDefined();
    });

    it("should allow optional fields in User", () => {
      const minimalUser: User = {
        id: "123",
        name: "User",
        email: "user@example.com",
      };

      expect(minimalUser).toBeDefined();
    });

    it("should require essential fields in CreateItemParams", () => {
      const params: CreateItemParams = {
        board_id: 123,
        item_name: "Task",
      };

      // TypeScript compilation ensures required fields
      expect(params.board_id).toBeDefined();
      expect(params.item_name).toBeDefined();
    });
  });
});
