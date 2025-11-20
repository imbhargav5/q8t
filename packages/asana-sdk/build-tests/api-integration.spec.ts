/**
 * API Integration Test Suite
 *
 * This test suite verifies that the generated API methods correctly call
 * the HTTP client with the expected paths, methods, and parameters.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { AsanaApi } from "../lib/api";
import type { HttpClient } from "../src/auth/pat-client";
import type * as Types from "../lib/types";

describe("AsanaApi - HTTP Client Integration", () => {
  let api: AsanaApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    } as unknown as HttpClient;

    api = new AsanaApi(mockClient);
  });

  describe("Task Operations", () => {
    it("createTask should POST to /tasks with request body", async () => {
      const request = {
        name: "Complete project documentation",
        workspace: "123456789",
      };

      await api.createTask(request);

      expect(mockClient.post).toHaveBeenCalledWith("/tasks", { data: request });
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it("getTask should GET from /tasks/:task_gid with query params", async () => {
      await api.getTask("123456", {
        opt_fields: ["name", "notes", "assignee"],
      });

      expect(mockClient.get).toHaveBeenCalledWith("/tasks/123456", {
        opt_fields: ["name", "notes", "assignee"],
      });
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it("getTask should GET from /tasks/:task_gid without query params", async () => {
      await api.getTask("123456");

      expect(mockClient.get).toHaveBeenCalledWith("/tasks/123456");
    });

    it("updateTask should PUT to /tasks/:task_gid with request body", async () => {
      const request = {
        name: "Updated task name",
        completed: true,
      };

      await api.updateTask("123456", request);

      expect(mockClient.put).toHaveBeenCalledWith("/tasks/123456", { data: request });
      expect(mockClient.put).toHaveBeenCalledTimes(1);
    });

    it("deleteTask should DELETE from /tasks/:task_gid", async () => {
      await api.deleteTask("123456");

      expect(mockClient.delete).toHaveBeenCalledWith("/tasks/123456");
      expect(mockClient.delete).toHaveBeenCalledTimes(1);
    });

    it("getTasks should GET from /tasks with query params", async () => {
      await api.getTasks({
        assignee: "me",
        workspace: "789",
        completed_since: "now",
      });

      expect(mockClient.get).toHaveBeenCalledWith("/tasks", {
        assignee: "me",
        workspace: "789",
        completed_since: "now",
      });
    });
  });

  describe("Project Operations", () => {
    it("getProjects should GET from /projects with query params", async () => {
      await api.getProjects({
        workspace: "123",
        team: "456",
      });

      expect(mockClient.get).toHaveBeenCalledWith("/projects", {
        workspace: "123",
        team: "456",
        opt_fields: undefined,
      });
    });

    it("getProject should GET from /projects/:project_gid", async () => {
      await api.getProject("456789", {
        opt_fields: ["name,notes,owner,team"],
      });

      expect(mockClient.get).toHaveBeenCalledWith("/projects/456789", {
        opt_fields: ["name,notes,owner,team"],
      });
    });

    it("createProject should POST to /projects with request body", async () => {
      const request = {
          name: "New Project",
          workspace: "123",
          team: "456",
        };

      await api.createProject(request);

      expect(mockClient.post).toHaveBeenCalledWith("/projects", { data: request });
    });

    it("updateProject should PUT to /projects/:project_gid", async () => {
      const request = {
          name: "Updated Project Name",
          archived: true,
        };

      await api.updateProject("789", request);

      expect(mockClient.put).toHaveBeenCalledWith("/projects/789", { data: request });
    });

    it("deleteProject should DELETE from /projects/:project_gid", async () => {
      await api.deleteProject("789");

      expect(mockClient.delete).toHaveBeenCalledWith("/projects/789");
    });
  });

  describe("Workspace Operations", () => {
    it("getWorkspaces should GET from /workspaces", async () => {
      await api.getWorkspaces();

      expect(mockClient.get).toHaveBeenCalledWith("/workspaces");
    });

    it("getWorkspace should GET from /workspaces/:workspace_gid", async () => {
      await api.getWorkspace("123456");

      expect(mockClient.get).toHaveBeenCalledWith("/workspaces/123456");
    });

    it("updateWorkspace should PUT to /workspaces/:workspace_gid", async () => {
      const request = {
          name: "Updated Workspace",
        };

      await api.updateWorkspace("123456", request);

      expect(mockClient.put).toHaveBeenCalledWith("/workspaces/123456", { data: request });
    });
  });

  describe("User Operations", () => {
    it("getUsers should GET from /users with query params", async () => {
      await api.getUsers({
        opt_fields: ["name", "email"],
      });

      expect(mockClient.get).toHaveBeenCalledWith("/users", {
        opt_fields: ["name", "email"],
      });
    });

    it("getUser should GET from /users/:user_gid", async () => {
      await api.getUser("789", {
        opt_fields: ["name,email"],
      });

      expect(mockClient.get).toHaveBeenCalledWith("/users/789", {
        opt_fields: ["name,email"],
      });
    });
  });

  describe("Portfolio Operations", () => {
    it("getPortfolios should GET from /portfolios with query params", async () => {
      await api.getPortfolios({
        workspace: "123",
        owner: "me",
      });

      expect(mockClient.get).toHaveBeenCalledWith("/portfolios", {
        workspace: "123",
        owner: "me",
      });
    });

    it("getPortfolio should GET from /portfolios/:portfolio_gid", async () => {
      await api.getPortfolio("456");

      expect(mockClient.get).toHaveBeenCalledWith("/portfolios/456");
    });

    it("createPortfolio should POST to /portfolios", async () => {
      const request = {
          name: "Q4 2025 Projects",
          workspace: "123",
          color: "light-green",
        };

      await api.createPortfolio(request);

      expect(mockClient.post).toHaveBeenCalledWith("/portfolios", { data: request });
    });

    it("addItemForPortfolio should POST to /portfolios/:portfolio_gid/addItem", async () => {
      const request = {
          item: "project123",
        };

      await api.addItemForPortfolio("456", request);

      expect(mockClient.post).toHaveBeenCalledWith("/portfolios/456/addItem", { data: request });
    });
  });

  describe("Goal Operations", () => {
    it("getGoals should GET from /goals with query params", async () => {
      await api.getGoals({
        workspace: "123",
        is_workspace_level: true,
      });

      expect(mockClient.get).toHaveBeenCalledWith("/goals", {
        workspace: "123",
        is_workspace_level: true,
      });
    });

    it("getGoal should GET from /goals/:goal_gid", async () => {
      await api.getGoal("789");

      expect(mockClient.get).toHaveBeenCalledWith("/goals/789");
    });

    it("createGoal should POST to /goals", async () => {
      const request = {
          name: "Increase customer satisfaction",
          workspace: "123",
        };

      await api.createGoal(request);

      expect(mockClient.post).toHaveBeenCalledWith("/goals", { data: request });
    });

    it("addSupportingRelationship should POST to /goals/:goal_gid/addSupportingRelationship", async () => {
      const request = {
          supporting_resource: "project456",
        };

      await api.addSupportingRelationship("789", request);

      expect(mockClient.post).toHaveBeenCalledWith(
        "/goals/789/addSupportingRelationship",
        { data: request },
      );
    });
  });

  describe("Team Operations", () => {
    it("getTeams should GET from /workspaces/:workspace_gid/teams", async () => {
      await api.getTeamsForWorkspace("123");

      expect(mockClient.get).toHaveBeenCalledWith("/workspaces/123/teams");
    });

    it("getTeam should GET from /teams/:team_gid", async () => {
      await api.getTeam("456");

      expect(mockClient.get).toHaveBeenCalledWith("/teams/456");
    });

    it("createTeam should POST to /teams", async () => {
      const request = {
          name: "Engineering Team",
          organization: "123",
        };

      await api.createTeam(request);

      expect(mockClient.post).toHaveBeenCalledWith("/teams", { data: request });
    });
  });

  describe("Tag Operations", () => {
    it("getTags should GET from /tags with query params", async () => {
      await api.getTags({
        workspace: "123",
      });

      expect(mockClient.get).toHaveBeenCalledWith("/tags", {
        workspace: "123",
      });
    });

    it("getTag should GET from /tags/:tag_gid", async () => {
      await api.getTag("789");

      expect(mockClient.get).toHaveBeenCalledWith("/tags/789");
    });

    it("createTag should POST to /tags", async () => {
      const request = {
          name: "Priority",
          workspace: "123",
        };

      await api.createTag(request);

      expect(mockClient.post).toHaveBeenCalledWith("/tags", { data: request });
    });
  });

  describe("Custom Field Operations", () => {
    it("getCustomFields should GET from /workspaces/:workspace_gid/custom_fields", async () => {
      await api.getCustomFieldsForWorkspace("123");

      expect(mockClient.get).toHaveBeenCalledWith("/workspaces/123/custom_fields");
    });

    it("getCustomField should GET from /custom_fields/:custom_field_gid", async () => {
      await api.getCustomField("456");

      expect(mockClient.get).toHaveBeenCalledWith("/custom_fields/456");
    });

    it("createCustomField should POST to /custom_fields", async () => {
      const request = {
          name: "Priority Level",
          resource_subtype: "enum",
          workspace: "123",
        };

      await api.createCustomField(request);

      expect(mockClient.post).toHaveBeenCalledWith("/custom_fields", { data: request });
    });
  });

  describe("Webhook Operations", () => {
    it("getWebhooks should GET from /webhooks with query params", async () => {
      await api.getWebhooks({
        workspace: "123",
      });

      expect(mockClient.get).toHaveBeenCalledWith("/webhooks", {
        workspace: "123",
        resource: undefined,
      });
    });

    it("getWebhook should GET from /webhooks/:webhook_gid", async () => {
      await api.getWebhook("789");

      expect(mockClient.get).toHaveBeenCalledWith("/webhooks/789");
    });

    it("createWebhook should POST to /webhooks", async () => {
      const request = {
          resource: "123",
          target: "https://example.com/webhook",
        };

      await api.createWebhook(request);

      expect(mockClient.post).toHaveBeenCalledWith("/webhooks", { data: request });
    });

    it("deleteWebhook should DELETE from /webhooks/:webhook_gid", async () => {
      await api.deleteWebhook("789");

      expect(mockClient.delete).toHaveBeenCalledWith("/webhooks/789");
    });
  });

  describe("Batch API Operations", () => {
    it("createBatchRequest should POST to /batch", async () => {
      const request = {
        actions: [
          {
            method: "GET",
            relative_path: "/workspaces",
            options: {},
          },
          {
            method: "GET",
            relative_path: "/tasks?assignee=me",
            options: {},
          },
        ],
      };

      await api.createBatchRequest(request);

      expect(mockClient.post).toHaveBeenCalledWith("/batch", { data: request });
    });
  });

  describe("Path Parameter Substitution", () => {
    it("should correctly substitute single path parameter", async () => {
      await api.getTask("task123");
      expect(mockClient.get).toHaveBeenCalledWith("/tasks/task123");
    });

    it("should correctly substitute multiple path segments", async () => {
      await api.getProject("proj456");
      expect(mockClient.get).toHaveBeenCalledWith("/projects/proj456");
    });

    it("should correctly substitute path parameter in nested paths", async () => {
      await api.getTasksForProject("proj789");
      expect(mockClient.get).toHaveBeenCalledWith("/projects/proj789/tasks");
    });

    it("should handle path parameters with hyphens", async () => {
      await api.getCustomFieldSettingsForProject("proj-123");
      expect(mockClient.get).toHaveBeenCalledWith(
        "/projects/proj-123/custom_field_settings",
      );
    });
  });

  describe("Query Parameter Handling", () => {
    it("should not pass query params when empty object is provided", async () => {
      await api.getTasks({});

      expect(mockClient.get).toHaveBeenCalledWith("/tasks", {
        assignee: undefined,
        workspace: undefined,
        completed_since: undefined,
        modified_since: undefined,
      });
    });

    it("should handle partial query parameters correctly", async () => {
      await api.getTasks({ assignee: "me" });

      expect(mockClient.get).toHaveBeenCalledWith("/tasks", {
        assignee: "me",
        workspace: undefined,
        completed_since: undefined,
        modified_since: undefined,
      });
    });

    it("should handle array query parameters", async () => {
      await api.getTasks({ opt_fields: ["name", "notes", "assignee"] });

      expect(mockClient.get).toHaveBeenCalledWith("/tasks", {
        assignee: undefined,
        workspace: undefined,
        completed_since: undefined,
        modified_since: undefined,
        opt_fields: ["name", "notes", "assignee"],
      });
    });
  });
});
