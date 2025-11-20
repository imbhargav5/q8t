/**
 * Client Methods Test Suite
 *
 * This test suite verifies that all client classes have the expected methods
 * and that they are properly exported.
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  BoardsClient,
  ItemsClient,
  ColumnsClient,
  UpdatesClient,
  UsersClient,
  WorkspacesClient,
  WebhooksClient,
} from "../src/clients";
import type { MondayGraphQLClient } from "../src/auth/client";

describe("Monday SDK - Client Methods", () => {
  let mockGraphQLClient: MondayGraphQLClient;

  beforeEach(() => {
    // Create a mock GraphQL client
    mockGraphQLClient = {
      query: async () => ({}),
      mutate: async () => ({}),
    } as unknown as MondayGraphQLClient;
  });

  describe("BoardsClient", () => {
    let client: BoardsClient;

    beforeEach(() => {
      client = new BoardsClient(mockGraphQLClient);
    });

    it("should have query method", () => {
      expect(client.query).toBeDefined();
      expect(typeof client.query).toBe("function");
    });

    it("should have create method", () => {
      expect(client.create).toBeDefined();
      expect(typeof client.create).toBe("function");
    });

    it("should have update method", () => {
      expect(client.update).toBeDefined();
      expect(typeof client.update).toBe("function");
    });

    it("should have archive method", () => {
      expect(client.archive).toBeDefined();
      expect(typeof client.archive).toBe("function");
    });

    it("should have delete method", () => {
      expect(client.delete).toBeDefined();
      expect(typeof client.delete).toBe("function");
    });

    it("should have duplicate method", () => {
      expect(client.duplicate).toBeDefined();
      expect(typeof client.duplicate).toBe("function");
    });

    it("should have exactly 6 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(client)).filter(
        (name) => name !== "constructor" && typeof (client as any)[name] === "function"
      );
      expect(methods).toHaveLength(6);
    });
  });

  describe("ItemsClient", () => {
    let client: ItemsClient;

    beforeEach(() => {
      client = new ItemsClient(mockGraphQLClient);
    });

    it("should have query method", () => {
      expect(client.query).toBeDefined();
      expect(typeof client.query).toBe("function");
    });

    it("should have create method", () => {
      expect(client.create).toBeDefined();
      expect(typeof client.create).toBe("function");
    });

    it("should have updateColumns method", () => {
      expect(client.updateColumns).toBeDefined();
      expect(typeof client.updateColumns).toBe("function");
    });

    it("should have archive method", () => {
      expect(client.archive).toBeDefined();
      expect(typeof client.archive).toBe("function");
    });

    it("should have delete method", () => {
      expect(client.delete).toBeDefined();
      expect(typeof client.delete).toBe("function");
    });

    it("should have duplicate method", () => {
      expect(client.duplicate).toBeDefined();
      expect(typeof client.duplicate).toBe("function");
    });

    it("should have moveToGroup method", () => {
      expect(client.moveToGroup).toBeDefined();
      expect(typeof client.moveToGroup).toBe("function");
    });

    it("should have moveToBoard method", () => {
      expect(client.moveToBoard).toBeDefined();
      expect(typeof client.moveToBoard).toBe("function");
    });

    it("should have clearUpdates method", () => {
      expect(client.clearUpdates).toBeDefined();
      expect(typeof client.clearUpdates).toBe("function");
    });

    it("should have exactly 9 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(client)).filter(
        (name) => name !== "constructor" && typeof (client as any)[name] === "function"
      );
      expect(methods).toHaveLength(9);
    });
  });

  describe("ColumnsClient", () => {
    let client: ColumnsClient;

    beforeEach(() => {
      client = new ColumnsClient(mockGraphQLClient);
    });

    it("should have create method", () => {
      expect(client.create).toBeDefined();
      expect(typeof client.create).toBe("function");
    });

    it("should have createStatus method", () => {
      expect(client.createStatus).toBeDefined();
      expect(typeof client.createStatus).toBe("function");
    });

    it("should have createDropdown method", () => {
      expect(client.createDropdown).toBeDefined();
      expect(typeof client.createDropdown).toBe("function");
    });

    it("should have changeValue method", () => {
      expect(client.changeValue).toBeDefined();
      expect(typeof client.changeValue).toBe("function");
    });

    it("should have changeTitle method", () => {
      expect(client.changeTitle).toBeDefined();
      expect(typeof client.changeTitle).toBe("function");
    });

    it("should have delete method", () => {
      expect(client.delete).toBeDefined();
      expect(typeof client.delete).toBe("function");
    });

    it("should have update method", () => {
      expect(client.update).toBeDefined();
      expect(typeof client.update).toBe("function");
    });

    it("should have exactly 7 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(client)).filter(
        (name) => name !== "constructor" && typeof (client as any)[name] === "function"
      );
      expect(methods).toHaveLength(7);
    });
  });

  describe("UpdatesClient", () => {
    let client: UpdatesClient;

    beforeEach(() => {
      client = new UpdatesClient(mockGraphQLClient);
    });

    it("should have query method", () => {
      expect(client.query).toBeDefined();
      expect(typeof client.query).toBe("function");
    });

    it("should have create method", () => {
      expect(client.create).toBeDefined();
      expect(typeof client.create).toBe("function");
    });

    it("should have edit method", () => {
      expect(client.edit).toBeDefined();
      expect(typeof client.edit).toBe("function");
    });

    it("should have delete method", () => {
      expect(client.delete).toBeDefined();
      expect(typeof client.delete).toBe("function");
    });

    it("should have like method", () => {
      expect(client.like).toBeDefined();
      expect(typeof client.like).toBe("function");
    });

    it("should have unlike method", () => {
      expect(client.unlike).toBeDefined();
      expect(typeof client.unlike).toBe("function");
    });

    it("should have pin method", () => {
      expect(client.pin).toBeDefined();
      expect(typeof client.pin).toBe("function");
    });

    it("should have unpin method", () => {
      expect(client.unpin).toBeDefined();
      expect(typeof client.unpin).toBe("function");
    });

    it("should have exactly 8 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(client)).filter(
        (name) => name !== "constructor" && typeof (client as any)[name] === "function"
      );
      expect(methods).toHaveLength(8);
    });
  });

  describe("UsersClient", () => {
    let client: UsersClient;

    beforeEach(() => {
      client = new UsersClient(mockGraphQLClient);
    });

    it("should have query method", () => {
      expect(client.query).toBeDefined();
      expect(typeof client.query).toBe("function");
    });

    it("should have addToBoard method", () => {
      expect(client.addToBoard).toBeDefined();
      expect(typeof client.addToBoard).toBe("function");
    });

    it("should have addToWorkspace method", () => {
      expect(client.addToWorkspace).toBeDefined();
      expect(typeof client.addToWorkspace).toBe("function");
    });

    it("should have addToTeam method", () => {
      expect(client.addToTeam).toBeDefined();
      expect(typeof client.addToTeam).toBe("function");
    });

    it("should have deleteFromWorkspace method", () => {
      expect(client.deleteFromWorkspace).toBeDefined();
      expect(typeof client.deleteFromWorkspace).toBe("function");
    });

    it("should have removeFromTeam method", () => {
      expect(client.removeFromTeam).toBeDefined();
      expect(typeof client.removeFromTeam).toBe("function");
    });

    it("should have exactly 6 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(client)).filter(
        (name) => name !== "constructor" && typeof (client as any)[name] === "function"
      );
      expect(methods).toHaveLength(6);
    });
  });

  describe("WorkspacesClient", () => {
    let client: WorkspacesClient;

    beforeEach(() => {
      client = new WorkspacesClient(mockGraphQLClient);
    });

    it("should have query method", () => {
      expect(client.query).toBeDefined();
      expect(typeof client.query).toBe("function");
    });

    it("should have create method", () => {
      expect(client.create).toBeDefined();
      expect(typeof client.create).toBe("function");
    });

    it("should have update method", () => {
      expect(client.update).toBeDefined();
      expect(typeof client.update).toBe("function");
    });

    it("should have delete method", () => {
      expect(client.delete).toBeDefined();
      expect(typeof client.delete).toBe("function");
    });

    it("should have exactly 4 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(client)).filter(
        (name) => name !== "constructor" && typeof (client as any)[name] === "function"
      );
      expect(methods).toHaveLength(4);
    });
  });

  describe("WebhooksClient", () => {
    let client: WebhooksClient;

    beforeEach(() => {
      client = new WebhooksClient(mockGraphQLClient);
    });

    it("should have query method", () => {
      expect(client.query).toBeDefined();
      expect(typeof client.query).toBe("function");
    });

    it("should have create method", () => {
      expect(client.create).toBeDefined();
      expect(typeof client.create).toBe("function");
    });

    it("should have delete method", () => {
      expect(client.delete).toBeDefined();
      expect(typeof client.delete).toBe("function");
    });

    it("should have exactly 3 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(client)).filter(
        (name) => name !== "constructor" && typeof (client as any)[name] === "function"
      );
      expect(methods).toHaveLength(3);
    });
  });

  describe("Total Method Count", () => {
    it("should have 43 total API methods across all clients", () => {
      const boards = new BoardsClient(mockGraphQLClient);
      const items = new ItemsClient(mockGraphQLClient);
      const columns = new ColumnsClient(mockGraphQLClient);
      const updates = new UpdatesClient(mockGraphQLClient);
      const users = new UsersClient(mockGraphQLClient);
      const workspaces = new WorkspacesClient(mockGraphQLClient);
      const webhooks = new WebhooksClient(mockGraphQLClient);

      const countMethods = (obj: any) =>
        Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(
          (name) => name !== "constructor" && typeof obj[name] === "function"
        ).length;

      const total =
        countMethods(boards) +
        countMethods(items) +
        countMethods(columns) +
        countMethods(updates) +
        countMethods(users) +
        countMethods(workspaces) +
        countMethods(webhooks);

      expect(total).toBe(43);
    });
  });
});
