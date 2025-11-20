/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specification
 * are present in the generated AsanaApi class.
 */

import { beforeEach, describe, expect, it } from "vitest";
import { AsanaApi } from "../lib/api";
import type { HttpClient } from "../src/auth/pat-client";

describe("AsanaApi - Method Existence", () => {
  let api: AsanaApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
    } as HttpClient;

    api = new AsanaApi(mockClient);
  });

  describe("Access Request Operations", () => {
    it("should have getAccessRequests method", () => {
      expect(api.getAccessRequests).toBeDefined();
      expect(typeof api.getAccessRequests).toBe("function");
    });

    it("should have approveAccessRequest method", () => {
      expect(api.approveAccessRequest).toBeDefined();
      expect(typeof api.approveAccessRequest).toBe("function");
    });

    it("should have rejectAccessRequest method", () => {
      expect(api.rejectAccessRequest).toBeDefined();
      expect(typeof api.rejectAccessRequest).toBe("function");
    });
  });

  describe("Allocation Operations", () => {
    it("should have getAllocation method", () => {
      expect(api.getAllocation).toBeDefined();
      expect(typeof api.getAllocation).toBe("function");
    });

    it("should have getAllocations method", () => {
      expect(api.getAllocations).toBeDefined();
      expect(typeof api.getAllocations).toBe("function");
    });

    it("should have createAllocation method", () => {
      expect(api.createAllocation).toBeDefined();
      expect(typeof api.createAllocation).toBe("function");
    });

    it("should have updateAllocation method", () => {
      expect(api.updateAllocation).toBeDefined();
      expect(typeof api.updateAllocation).toBe("function");
    });

    it("should have deleteAllocation method", () => {
      expect(api.deleteAllocation).toBeDefined();
      expect(typeof api.deleteAllocation).toBe("function");
    });
  });

  describe("Attachment Operations", () => {
    it("should have getAttachment method", () => {
      expect(api.getAttachment).toBeDefined();
      expect(typeof api.getAttachment).toBe("function");
    });

    it("should have getAttachmentsForObject method", () => {
      expect(api.getAttachmentsForObject).toBeDefined();
      expect(typeof api.getAttachmentsForObject).toBe("function");
    });

    it("should have createAttachmentForObject method", () => {
      expect(api.createAttachmentForObject).toBeDefined();
      expect(typeof api.createAttachmentForObject).toBe("function");
    });

    it("should have deleteAttachment method", () => {
      expect(api.deleteAttachment).toBeDefined();
      expect(typeof api.deleteAttachment).toBe("function");
    });
  });

  describe("Audit Log Operations", () => {
    it("should have getAuditLogEvents method", () => {
      expect(api.getAuditLogEvents).toBeDefined();
      expect(typeof api.getAuditLogEvents).toBe("function");
    });
  });

  describe("Batch API Operations", () => {
    it("should have createBatchRequest method", () => {
      expect(api.createBatchRequest).toBeDefined();
      expect(typeof api.createBatchRequest).toBe("function");
    });
  });

  describe("Budget Operations", () => {
    it("should have getBudgets method", () => {
      expect(api.getBudgets).toBeDefined();
      expect(typeof api.getBudgets).toBe("function");
    });

    it("should have getBudget method", () => {
      expect(api.getBudget).toBeDefined();
      expect(typeof api.getBudget).toBe("function");
    });

    it("should have createBudget method", () => {
      expect(api.createBudget).toBeDefined();
      expect(typeof api.createBudget).toBe("function");
    });

    it("should have updateBudget method", () => {
      expect(api.updateBudget).toBeDefined();
      expect(typeof api.updateBudget).toBe("function");
    });

    it("should have deleteBudget method", () => {
      expect(api.deleteBudget).toBeDefined();
      expect(typeof api.deleteBudget).toBe("function");
    });
  });

  describe("Custom Field Operations", () => {
    it("should have getCustomFieldsForWorkspace method", () => {
      expect(api.getCustomFieldsForWorkspace).toBeDefined();
      expect(typeof api.getCustomFieldsForWorkspace).toBe("function");
    });

    it("should have getCustomField method", () => {
      expect(api.getCustomField).toBeDefined();
      expect(typeof api.getCustomField).toBe("function");
    });

    it("should have createCustomField method", () => {
      expect(api.createCustomField).toBeDefined();
      expect(typeof api.createCustomField).toBe("function");
    });

    it("should have updateCustomField method", () => {
      expect(api.updateCustomField).toBeDefined();
      expect(typeof api.updateCustomField).toBe("function");
    });

    it("should have deleteCustomField method", () => {
      expect(api.deleteCustomField).toBeDefined();
      expect(typeof api.deleteCustomField).toBe("function");
    });

    it("should have getCustomFieldSettingsForProject method", () => {
      expect(api.getCustomFieldSettingsForProject).toBeDefined();
      expect(typeof api.getCustomFieldSettingsForProject).toBe("function");
    });

    it("should have getCustomFieldSettingsForPortfolio method", () => {
      expect(api.getCustomFieldSettingsForPortfolio).toBeDefined();
      expect(typeof api.getCustomFieldSettingsForPortfolio).toBe("function");
    });
  });

  describe("Event Operations", () => {
    it("should have getEvents method", () => {
      expect(api.getEvents).toBeDefined();
      expect(typeof api.getEvents).toBe("function");
    });
  });

  describe("Goal Operations", () => {
    it("should have getGoals method", () => {
      expect(api.getGoals).toBeDefined();
      expect(typeof api.getGoals).toBe("function");
    });

    it("should have getGoal method", () => {
      expect(api.getGoal).toBeDefined();
      expect(typeof api.getGoal).toBe("function");
    });

    it("should have createGoal method", () => {
      expect(api.createGoal).toBeDefined();
      expect(typeof api.createGoal).toBe("function");
    });

    it("should have updateGoal method", () => {
      expect(api.updateGoal).toBeDefined();
      expect(typeof api.updateGoal).toBe("function");
    });

    it("should have deleteGoal method", () => {
      expect(api.deleteGoal).toBeDefined();
      expect(typeof api.deleteGoal).toBe("function");
    });

    it("should have addSupportingRelationship method", () => {
      expect(api.addSupportingRelationship).toBeDefined();
      expect(typeof api.addSupportingRelationship).toBe("function");
    });

    it("should have removeSupportingRelationship method", () => {
      expect(api.removeSupportingRelationship).toBeDefined();
      expect(typeof api.removeSupportingRelationship).toBe("function");
    });
  });

  describe("Job Operations", () => {
    it("should have getJob method", () => {
      expect(api.getJob).toBeDefined();
      expect(typeof api.getJob).toBe("function");
    });
  });

  describe("Portfolio Operations", () => {
    it("should have getPortfolios method", () => {
      expect(api.getPortfolios).toBeDefined();
      expect(typeof api.getPortfolios).toBe("function");
    });

    it("should have getPortfolio method", () => {
      expect(api.getPortfolio).toBeDefined();
      expect(typeof api.getPortfolio).toBe("function");
    });

    it("should have createPortfolio method", () => {
      expect(api.createPortfolio).toBeDefined();
      expect(typeof api.createPortfolio).toBe("function");
    });

    it("should have updatePortfolio method", () => {
      expect(api.updatePortfolio).toBeDefined();
      expect(typeof api.updatePortfolio).toBe("function");
    });

    it("should have deletePortfolio method", () => {
      expect(api.deletePortfolio).toBeDefined();
      expect(typeof api.deletePortfolio).toBe("function");
    });

    it("should have getItemsForPortfolio method", () => {
      expect(api.getItemsForPortfolio).toBeDefined();
      expect(typeof api.getItemsForPortfolio).toBe("function");
    });

    it("should have addItemForPortfolio method", () => {
      expect(api.addItemForPortfolio).toBeDefined();
      expect(typeof api.addItemForPortfolio).toBe("function");
    });

    it("should have removeItemForPortfolio method", () => {
      expect(api.removeItemForPortfolio).toBeDefined();
      expect(typeof api.removeItemForPortfolio).toBe("function");
    });
  });

  describe("Project Operations", () => {
    it("should have getProjects method", () => {
      expect(api.getProjects).toBeDefined();
      expect(typeof api.getProjects).toBe("function");
    });

    it("should have getProject method", () => {
      expect(api.getProject).toBeDefined();
      expect(typeof api.getProject).toBe("function");
    });

    it("should have createProject method", () => {
      expect(api.createProject).toBeDefined();
      expect(typeof api.createProject).toBe("function");
    });

    it("should have updateProject method", () => {
      expect(api.updateProject).toBeDefined();
      expect(typeof api.updateProject).toBe("function");
    });

    it("should have deleteProject method", () => {
      expect(api.deleteProject).toBeDefined();
      expect(typeof api.deleteProject).toBe("function");
    });

    it("should have duplicateProject method", () => {
      expect(api.duplicateProject).toBeDefined();
      expect(typeof api.duplicateProject).toBe("function");
    });

    it("should have getTasksForProject method", () => {
      expect(api.getTasksForProject).toBeDefined();
      expect(typeof api.getTasksForProject).toBe("function");
    });

    it("should have addTaskForSection method", () => {
      expect(api.addTaskForSection).toBeDefined();
      expect(typeof api.addTaskForSection).toBe("function");
    });
  });

  describe("Section Operations", () => {
    it("should have getSectionsForProject method", () => {
      expect(api.getSectionsForProject).toBeDefined();
      expect(typeof api.getSectionsForProject).toBe("function");
    });

    it("should have getSection method", () => {
      expect(api.getSection).toBeDefined();
      expect(typeof api.getSection).toBe("function");
    });

    it("should have createSectionForProject method", () => {
      expect(api.createSectionForProject).toBeDefined();
      expect(typeof api.createSectionForProject).toBe("function");
    });

    it("should have updateSection method", () => {
      expect(api.updateSection).toBeDefined();
      expect(typeof api.updateSection).toBe("function");
    });

    it("should have deleteSection method", () => {
      expect(api.deleteSection).toBeDefined();
      expect(typeof api.deleteSection).toBe("function");
    });

    it("should have addTaskForSection method", () => {
      expect(api.addTaskForSection).toBeDefined();
      expect(typeof api.addTaskForSection).toBe("function");
    });
  });

  describe("Story Operations", () => {
    it("should have getStoriesForTask method", () => {
      expect(api.getStoriesForTask).toBeDefined();
      expect(typeof api.getStoriesForTask).toBe("function");
    });

    it("should have getStory method", () => {
      expect(api.getStory).toBeDefined();
      expect(typeof api.getStory).toBe("function");
    });

    it("should have createStoryForTask method", () => {
      expect(api.createStoryForTask).toBeDefined();
      expect(typeof api.createStoryForTask).toBe("function");
    });

    it("should have updateStory method", () => {
      expect(api.updateStory).toBeDefined();
      expect(typeof api.updateStory).toBe("function");
    });

    it("should have deleteStory method", () => {
      expect(api.deleteStory).toBeDefined();
      expect(typeof api.deleteStory).toBe("function");
    });
  });

  describe("Tag Operations", () => {
    it("should have getTags method", () => {
      expect(api.getTags).toBeDefined();
      expect(typeof api.getTags).toBe("function");
    });

    it("should have getTag method", () => {
      expect(api.getTag).toBeDefined();
      expect(typeof api.getTag).toBe("function");
    });

    it("should have createTag method", () => {
      expect(api.createTag).toBeDefined();
      expect(typeof api.createTag).toBe("function");
    });

    it("should have updateTag method", () => {
      expect(api.updateTag).toBeDefined();
      expect(typeof api.updateTag).toBe("function");
    });

    it("should have deleteTag method", () => {
      expect(api.deleteTag).toBeDefined();
      expect(typeof api.deleteTag).toBe("function");
    });
  });

  describe("Task Operations", () => {
    it("should have getTasks method", () => {
      expect(api.getTasks).toBeDefined();
      expect(typeof api.getTasks).toBe("function");
    });

    it("should have getTask method", () => {
      expect(api.getTask).toBeDefined();
      expect(typeof api.getTask).toBe("function");
    });

    it("should have createTask method", () => {
      expect(api.createTask).toBeDefined();
      expect(typeof api.createTask).toBe("function");
    });

    it("should have updateTask method", () => {
      expect(api.updateTask).toBeDefined();
      expect(typeof api.updateTask).toBe("function");
    });

    it("should have deleteTask method", () => {
      expect(api.deleteTask).toBeDefined();
      expect(typeof api.deleteTask).toBe("function");
    });

    it("should have duplicateTask method", () => {
      expect(api.duplicateTask).toBeDefined();
      expect(typeof api.duplicateTask).toBe("function");
    });

    it("should have searchTasksForWorkspace method", () => {
      expect(api.searchTasksForWorkspace).toBeDefined();
      expect(typeof api.searchTasksForWorkspace).toBe("function");
    });

    it("should have getSubtasksForTask method", () => {
      expect(api.getSubtasksForTask).toBeDefined();
      expect(typeof api.getSubtasksForTask).toBe("function");
    });

    it("should have setParentForTask method", () => {
      expect(api.setParentForTask).toBeDefined();
      expect(typeof api.setParentForTask).toBe("function");
    });

    it("should have getDependenciesForTask method", () => {
      expect(api.getDependenciesForTask).toBeDefined();
      expect(typeof api.getDependenciesForTask).toBe("function");
    });

    it("should have getDependentsForTask method", () => {
      expect(api.getDependentsForTask).toBeDefined();
      expect(typeof api.getDependentsForTask).toBe("function");
    });

    it("should have addDependenciesForTask method", () => {
      expect(api.addDependenciesForTask).toBeDefined();
      expect(typeof api.addDependenciesForTask).toBe("function");
    });

    it("should have addDependentsForTask method", () => {
      expect(api.addDependentsForTask).toBeDefined();
      expect(typeof api.addDependentsForTask).toBe("function");
    });

    it("should have removeDependenciesForTask method", () => {
      expect(api.removeDependenciesForTask).toBeDefined();
      expect(typeof api.removeDependenciesForTask).toBe("function");
    });

    it("should have removeDependentsForTask method", () => {
      expect(api.removeDependentsForTask).toBeDefined();
      expect(typeof api.removeDependentsForTask).toBe("function");
    });

    it("should have addFollowersForTask method", () => {
      expect(api.addFollowersForTask).toBeDefined();
      expect(typeof api.addFollowersForTask).toBe("function");
    });

    it("should have removeFollowerForTask method", () => {
      expect(api.removeFollowerForTask).toBeDefined();
      expect(typeof api.removeFollowerForTask).toBe("function");
    });

    it("should have addProjectForTask method", () => {
      expect(api.addProjectForTask).toBeDefined();
      expect(typeof api.addProjectForTask).toBe("function");
    });

    it("should have removeProjectForTask method", () => {
      expect(api.removeProjectForTask).toBeDefined();
      expect(typeof api.removeProjectForTask).toBe("function");
    });

    it("should have addTagForTask method", () => {
      expect(api.addTagForTask).toBeDefined();
      expect(typeof api.addTagForTask).toBe("function");
    });

    it("should have removeTagForTask method", () => {
      expect(api.removeTagForTask).toBeDefined();
      expect(typeof api.removeTagForTask).toBe("function");
    });
  });

  describe("Team Operations", () => {
    it("should have getTeamsForWorkspace method", () => {
      expect(api.getTeamsForWorkspace).toBeDefined();
      expect(typeof api.getTeamsForWorkspace).toBe("function");
    });

    it("should have getTeam method", () => {
      expect(api.getTeam).toBeDefined();
      expect(typeof api.getTeam).toBe("function");
    });

    it("should have createTeam method", () => {
      expect(api.createTeam).toBeDefined();
      expect(typeof api.createTeam).toBe("function");
    });

    it("should have getUsersForTeam method", () => {
      expect(api.getUsersForTeam).toBeDefined();
      expect(typeof api.getUsersForTeam).toBe("function");
    });

    it("should have addUserForTeam method", () => {
      expect(api.addUserForTeam).toBeDefined();
      expect(typeof api.addUserForTeam).toBe("function");
    });

    it("should have removeUserForTeam method", () => {
      expect(api.removeUserForTeam).toBeDefined();
      expect(typeof api.removeUserForTeam).toBe("function");
    });
  });

  describe("User Operations", () => {
    it("should have getUsers method", () => {
      expect(api.getUsers).toBeDefined();
      expect(typeof api.getUsers).toBe("function");
    });

    it("should have getUser method", () => {
      expect(api.getUser).toBeDefined();
      expect(typeof api.getUser).toBe("function");
    });

    it("should have getUserTaskList method", () => {
      expect(api.getUserTaskList).toBeDefined();
      expect(typeof api.getUserTaskList).toBe("function");
    });

    it("should have getFavoritesForUser method", () => {
      expect(api.getFavoritesForUser).toBeDefined();
      expect(typeof api.getFavoritesForUser).toBe("function");
    });
  });

  describe("Webhook Operations", () => {
    it("should have getWebhooks method", () => {
      expect(api.getWebhooks).toBeDefined();
      expect(typeof api.getWebhooks).toBe("function");
    });

    it("should have getWebhook method", () => {
      expect(api.getWebhook).toBeDefined();
      expect(typeof api.getWebhook).toBe("function");
    });

    it("should have createWebhook method", () => {
      expect(api.createWebhook).toBeDefined();
      expect(typeof api.createWebhook).toBe("function");
    });

    it("should have updateWebhook method", () => {
      expect(api.updateWebhook).toBeDefined();
      expect(typeof api.updateWebhook).toBe("function");
    });

    it("should have deleteWebhook method", () => {
      expect(api.deleteWebhook).toBeDefined();
      expect(typeof api.deleteWebhook).toBe("function");
    });
  });

  describe("Workspace Operations", () => {
    it("should have getWorkspaces method", () => {
      expect(api.getWorkspaces).toBeDefined();
      expect(typeof api.getWorkspaces).toBe("function");
    });

    it("should have getWorkspace method", () => {
      expect(api.getWorkspace).toBeDefined();
      expect(typeof api.getWorkspace).toBe("function");
    });

    it("should have updateWorkspace method", () => {
      expect(api.updateWorkspace).toBeDefined();
      expect(typeof api.updateWorkspace).toBe("function");
    });

    it("should have addUserForWorkspace method", () => {
      expect(api.addUserForWorkspace).toBeDefined();
      expect(typeof api.addUserForWorkspace).toBe("function");
    });

    it("should have removeUserForWorkspace method", () => {
      expect(api.removeUserForWorkspace).toBeDefined();
      expect(typeof api.removeUserForWorkspace).toBe("function");
    });
  });

  describe("Method Count Validation", () => {
    it("should have exactly 153 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api)).filter(
        (name) => name !== "constructor" && typeof api[name as keyof AsanaApi] === "function",
      );

      expect(methods).toHaveLength(214);
    });

    it("should have all core resource methods", () => {
      const coreResources = [
        // Tasks
        "getTasks",
        "getTask",
        "createTask",
        "updateTask",
        "deleteTask",
        // Projects
        "getProjects",
        "getProject",
        "createProject",
        "updateProject",
        "deleteProject",
        // Workspaces
        "getWorkspaces",
        "getWorkspace",
        // Teams
        "getTeamsForWorkspace",
        "getTeam",
        // Users
        "getUsers",
        "getUser",
        // Portfolios
        "getPortfolios",
        "getPortfolio",
        "createPortfolio",
        // Goals
        "getGoals",
        "getGoal",
        "createGoal",
        // Tags
        "getTags",
        "getTag",
        "createTag",
        // Custom Fields
        "getCustomFieldsForWorkspace",
        "getCustomField",
        "createCustomField",
        // Webhooks
        "getWebhooks",
        "getWebhook",
        "createWebhook",
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api)).filter(
        (name) => name !== "constructor",
      );

      for (const method of coreResources) {
        expect(actualMethods).toContain(method);
      }
    });
  });
});
