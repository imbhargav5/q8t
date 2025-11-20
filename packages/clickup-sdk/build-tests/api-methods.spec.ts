/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specification
 * are present in the generated ClickUpApi class.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { ClickUpApi } from "../lib/api";
import type { HttpClient } from "../src/auth/client";

describe("ClickUpApi - Method Existence", () => {
  let api: ClickUpApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
    } as HttpClient;

    api = new ClickUpApi(mockClient);
  });

  describe("Workspace Operations", () => {
    it("should have getAuthorizedWorkspaces method", () => {
      expect(api.getAuthorizedWorkspaces).toBeDefined();
      expect(typeof api.getAuthorizedWorkspaces).toBe("function");
    });

    it("should have getWorkspace method", () => {
      expect(api.getWorkspace).toBeDefined();
      expect(typeof api.getWorkspace).toBe("function");
    });

    it("should have getSharedHierarchy method", () => {
      expect(api.getSharedHierarchy).toBeDefined();
      expect(typeof api.getSharedHierarchy).toBe("function");
    });
  });

  describe("Space Operations", () => {
    it("should have getSpaces method", () => {
      expect(api.getSpaces).toBeDefined();
      expect(typeof api.getSpaces).toBe("function");
    });

    it("should have createSpace method", () => {
      expect(api.createSpace).toBeDefined();
      expect(typeof api.createSpace).toBe("function");
    });

    it("should have getSpace method", () => {
      expect(api.getSpace).toBeDefined();
      expect(typeof api.getSpace).toBe("function");
    });

    it("should have updateSpace method", () => {
      expect(api.updateSpace).toBeDefined();
      expect(typeof api.updateSpace).toBe("function");
    });

    it("should have deleteSpace method", () => {
      expect(api.deleteSpace).toBeDefined();
      expect(typeof api.deleteSpace).toBe("function");
    });
  });

  describe("Folder Operations", () => {
    it("should have getFolders method", () => {
      expect(api.getFolders).toBeDefined();
      expect(typeof api.getFolders).toBe("function");
    });

    it("should have createFolder method", () => {
      expect(api.createFolder).toBeDefined();
      expect(typeof api.createFolder).toBe("function");
    });

    it("should have getFolder method", () => {
      expect(api.getFolder).toBeDefined();
      expect(typeof api.getFolder).toBe("function");
    });

    it("should have updateFolder method", () => {
      expect(api.updateFolder).toBeDefined();
      expect(typeof api.updateFolder).toBe("function");
    });

    it("should have deleteFolder method", () => {
      expect(api.deleteFolder).toBeDefined();
      expect(typeof api.deleteFolder).toBe("function");
    });
  });

  describe("List Operations", () => {
    it("should have getListsInFolder method", () => {
      expect(api.getListsInFolder).toBeDefined();
      expect(typeof api.getListsInFolder).toBe("function");
    });

    it("should have createListInFolder method", () => {
      expect(api.createListInFolder).toBeDefined();
      expect(typeof api.createListInFolder).toBe("function");
    });

    it("should have getFolderlessLists method", () => {
      expect(api.getFolderlessLists).toBeDefined();
      expect(typeof api.getFolderlessLists).toBe("function");
    });

    it("should have createFolderlessList method", () => {
      expect(api.createFolderlessList).toBeDefined();
      expect(typeof api.createFolderlessList).toBe("function");
    });

    it("should have getList method", () => {
      expect(api.getList).toBeDefined();
      expect(typeof api.getList).toBe("function");
    });

    it("should have updateList method", () => {
      expect(api.updateList).toBeDefined();
      expect(typeof api.updateList).toBe("function");
    });

    it("should have deleteList method", () => {
      expect(api.deleteList).toBeDefined();
      expect(typeof api.deleteList).toBe("function");
    });
  });

  describe("Task Operations", () => {
    it("should have getTasksInList method", () => {
      expect(api.getTasksInList).toBeDefined();
      expect(typeof api.getTasksInList).toBe("function");
    });

    it("should have createTask method", () => {
      expect(api.createTask).toBeDefined();
      expect(typeof api.createTask).toBe("function");
    });

    it("should have getTask method", () => {
      expect(api.getTask).toBeDefined();
      expect(typeof api.getTask).toBe("function");
    });

    it("should have updateTask method", () => {
      expect(api.updateTask).toBeDefined();
      expect(typeof api.updateTask).toBe("function");
    });

    it("should have deleteTask method", () => {
      expect(api.deleteTask).toBeDefined();
      expect(typeof api.deleteTask).toBe("function");
    });

    it("should have getFilteredTeamTasks method", () => {
      expect(api.getFilteredTeamTasks).toBeDefined();
      expect(typeof api.getFilteredTeamTasks).toBe("function");
    });
  });

  describe("Comment Operations", () => {
    it("should have getTaskComments method", () => {
      expect(api.getTaskComments).toBeDefined();
      expect(typeof api.getTaskComments).toBe("function");
    });

    it("should have createTaskComment method", () => {
      expect(api.createTaskComment).toBeDefined();
      expect(typeof api.createTaskComment).toBe("function");
    });

    it("should have getListComments method", () => {
      expect(api.getListComments).toBeDefined();
      expect(typeof api.getListComments).toBe("function");
    });

    it("should have createListComment method", () => {
      expect(api.createListComment).toBeDefined();
      expect(typeof api.createListComment).toBe("function");
    });

    it("should have getViewComments method", () => {
      expect(api.getViewComments).toBeDefined();
      expect(typeof api.getViewComments).toBe("function");
    });

    it("should have createViewComment method", () => {
      expect(api.createViewComment).toBeDefined();
      expect(typeof api.createViewComment).toBe("function");
    });

    it("should have updateComment method", () => {
      expect(api.updateComment).toBeDefined();
      expect(typeof api.updateComment).toBe("function");
    });

    it("should have deleteComment method", () => {
      expect(api.deleteComment).toBeDefined();
      expect(typeof api.deleteComment).toBe("function");
    });
  });

  describe("Checklist Operations", () => {
    it("should have createChecklist method", () => {
      expect(api.createChecklist).toBeDefined();
      expect(typeof api.createChecklist).toBe("function");
    });

    it("should have updateChecklist method", () => {
      expect(api.updateChecklist).toBeDefined();
      expect(typeof api.updateChecklist).toBe("function");
    });

    it("should have deleteChecklist method", () => {
      expect(api.deleteChecklist).toBeDefined();
      expect(typeof api.deleteChecklist).toBe("function");
    });

    it("should have createChecklistItem method", () => {
      expect(api.createChecklistItem).toBeDefined();
      expect(typeof api.createChecklistItem).toBe("function");
    });

    it("should have updateChecklistItem method", () => {
      expect(api.updateChecklistItem).toBeDefined();
      expect(typeof api.updateChecklistItem).toBe("function");
    });

    it("should have deleteChecklistItem method", () => {
      expect(api.deleteChecklistItem).toBeDefined();
      expect(typeof api.deleteChecklistItem).toBe("function");
    });
  });

  describe("Goal Operations", () => {
    it("should have getGoals method", () => {
      expect(api.getGoals).toBeDefined();
      expect(typeof api.getGoals).toBe("function");
    });

    it("should have createGoal method", () => {
      expect(api.createGoal).toBeDefined();
      expect(typeof api.createGoal).toBe("function");
    });

    it("should have getGoal method", () => {
      expect(api.getGoal).toBeDefined();
      expect(typeof api.getGoal).toBe("function");
    });

    it("should have updateGoal method", () => {
      expect(api.updateGoal).toBeDefined();
      expect(typeof api.updateGoal).toBe("function");
    });

    it("should have deleteGoal method", () => {
      expect(api.deleteGoal).toBeDefined();
      expect(typeof api.deleteGoal).toBe("function");
    });

    it("should have createKeyResult method", () => {
      expect(api.createKeyResult).toBeDefined();
      expect(typeof api.createKeyResult).toBe("function");
    });

    it("should have updateKeyResult method", () => {
      expect(api.updateKeyResult).toBeDefined();
      expect(typeof api.updateKeyResult).toBe("function");
    });

    it("should have deleteKeyResult method", () => {
      expect(api.deleteKeyResult).toBeDefined();
      expect(typeof api.deleteKeyResult).toBe("function");
    });
  });

  describe("Member Operations", () => {
    it("should have getTeamMembers method", () => {
      expect(api.getTeamMembers).toBeDefined();
      expect(typeof api.getTeamMembers).toBe("function");
    });

    it("should have getListMembers method", () => {
      expect(api.getListMembers).toBeDefined();
      expect(typeof api.getListMembers).toBe("function");
    });

    it("should have getTaskMembers method", () => {
      expect(api.getTaskMembers).toBeDefined();
      expect(typeof api.getTaskMembers).toBe("function");
    });
  });

  describe("Tag Operations", () => {
    it("should have getSpaceTags method", () => {
      expect(api.getSpaceTags).toBeDefined();
      expect(typeof api.getSpaceTags).toBe("function");
    });

    it("should have createSpaceTag method", () => {
      expect(api.createSpaceTag).toBeDefined();
      expect(typeof api.createSpaceTag).toBe("function");
    });

    it("should have updateTag method", () => {
      expect(api.updateTag).toBeDefined();
      expect(typeof api.updateTag).toBe("function");
    });

    it("should have deleteTag method", () => {
      expect(api.deleteTag).toBeDefined();
      expect(typeof api.deleteTag).toBe("function");
    });

    it("should have addTaskTag method", () => {
      expect(api.addTaskTag).toBeDefined();
      expect(typeof api.addTaskTag).toBe("function");
    });

    it("should have removeTaskTag method", () => {
      expect(api.removeTaskTag).toBeDefined();
      expect(typeof api.removeTaskTag).toBe("function");
    });
  });

  describe("Custom Field Operations", () => {
    it("should have getAccessibleCustomFields method", () => {
      expect(api.getAccessibleCustomFields).toBeDefined();
      expect(typeof api.getAccessibleCustomFields).toBe("function");
    });

    it("should have setCustomFieldValue method", () => {
      expect(api.setCustomFieldValue).toBeDefined();
      expect(typeof api.setCustomFieldValue).toBe("function");
    });

    it("should have setTaskCustomFieldValue method", () => {
      expect(api.setTaskCustomFieldValue).toBeDefined();
      expect(typeof api.setTaskCustomFieldValue).toBe("function");
    });

    it("should have removeTaskCustomFieldValue method", () => {
      expect(api.removeTaskCustomFieldValue).toBeDefined();
      expect(typeof api.removeTaskCustomFieldValue).toBe("function");
    });
  });

  describe("Dependency Operations", () => {
    it("should have addTaskDependency method", () => {
      expect(api.addTaskDependency).toBeDefined();
      expect(typeof api.addTaskDependency).toBe("function");
    });

    it("should have removeTaskDependency method", () => {
      expect(api.removeTaskDependency).toBeDefined();
      expect(typeof api.removeTaskDependency).toBe("function");
    });

    it("should have addTaskLink method", () => {
      expect(api.addTaskLink).toBeDefined();
      expect(typeof api.addTaskLink).toBe("function");
    });

    it("should have removeTaskLink method", () => {
      expect(api.removeTaskLink).toBeDefined();
      expect(typeof api.removeTaskLink).toBe("function");
    });
  });

  describe("Time Tracking Operations", () => {
    it("should have getTimeEntries method", () => {
      expect(api.getTimeEntries).toBeDefined();
      expect(typeof api.getTimeEntries).toBe("function");
    });

    it("should have createTimeEntry method", () => {
      expect(api.createTimeEntry).toBeDefined();
      expect(typeof api.createTimeEntry).toBe("function");
    });

    it("should have getTimeEntry method", () => {
      expect(api.getTimeEntry).toBeDefined();
      expect(typeof api.getTimeEntry).toBe("function");
    });

    it("should have updateTimeEntry method", () => {
      expect(api.updateTimeEntry).toBeDefined();
      expect(typeof api.updateTimeEntry).toBe("function");
    });

    it("should have deleteTimeEntry method", () => {
      expect(api.deleteTimeEntry).toBeDefined();
      expect(typeof api.deleteTimeEntry).toBe("function");
    });

    it("should have startTimeEntry method", () => {
      expect(api.startTimeEntry).toBeDefined();
      expect(typeof api.startTimeEntry).toBe("function");
    });

    it("should have stopTimeEntry method", () => {
      expect(api.stopTimeEntry).toBeDefined();
      expect(typeof api.stopTimeEntry).toBe("function");
    });

    it("should have getCurrentTimeEntry method", () => {
      expect(api.getCurrentTimeEntry).toBeDefined();
      expect(typeof api.getCurrentTimeEntry).toBe("function");
    });
  });

  describe("View Operations", () => {
    it("should have getTeamViews method", () => {
      expect(api.getTeamViews).toBeDefined();
      expect(typeof api.getTeamViews).toBe("function");
    });

    it("should have getSpaceViews method", () => {
      expect(api.getSpaceViews).toBeDefined();
      expect(typeof api.getSpaceViews).toBe("function");
    });

    it("should have getFolderViews method", () => {
      expect(api.getFolderViews).toBeDefined();
      expect(typeof api.getFolderViews).toBe("function");
    });

    it("should have getListViews method", () => {
      expect(api.getListViews).toBeDefined();
      expect(typeof api.getListViews).toBe("function");
    });

    it("should have getView method", () => {
      expect(api.getView).toBeDefined();
      expect(typeof api.getView).toBe("function");
    });

    it("should have getViewTasks method", () => {
      expect(api.getViewTasks).toBeDefined();
      expect(typeof api.getViewTasks).toBe("function");
    });
  });

  describe("Webhook Operations", () => {
    it("should have getWebhooks method", () => {
      expect(api.getWebhooks).toBeDefined();
      expect(typeof api.getWebhooks).toBe("function");
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

  describe("Guest Operations", () => {
    it("should have inviteGuest method", () => {
      expect(api.inviteGuest).toBeDefined();
      expect(typeof api.inviteGuest).toBe("function");
    });

    it("should have getGuest method", () => {
      expect(api.getGuest).toBeDefined();
      expect(typeof api.getGuest).toBe("function");
    });

    it("should have updateGuest method", () => {
      expect(api.updateGuest).toBeDefined();
      expect(typeof api.updateGuest).toBe("function");
    });

    it("should have removeGuest method", () => {
      expect(api.removeGuest).toBeDefined();
      expect(typeof api.removeGuest).toBe("function");
    });
  });

  describe("User Group Operations", () => {
    it("should have getUserGroups method", () => {
      expect(api.getUserGroups).toBeDefined();
      expect(typeof api.getUserGroups).toBe("function");
    });

    it("should have getUserGroup method", () => {
      expect(api.getUserGroup).toBeDefined();
      expect(typeof api.getUserGroup).toBe("function");
    });
  });

  describe("User Operations", () => {
    it("should have getAuthenticatedUser method", () => {
      expect(api.getAuthenticatedUser).toBeDefined();
      expect(typeof api.getAuthenticatedUser).toBe("function");
    });
  });

  describe("Method Count Validation", () => {
    it("should have exactly 90 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api)).filter(
        (name) => name !== "constructor" && typeof api[name as keyof ClickUpApi] === "function",
      );

      expect(methods).toHaveLength(90);
    });

    it("should have all expected methods", () => {
      const expectedMethods = [
        "addTaskDependency",
        "addTaskLink",
        "addTaskTag",
        "createChecklist",
        "createChecklistItem",
        "createFolder",
        "createFolderlessList",
        "createGoal",
        "createKeyResult",
        "createListComment",
        "createListInFolder",
        "createSpace",
        "createSpaceTag",
        "createTask",
        "createTaskComment",
        "createTimeEntry",
        "createViewComment",
        "createWebhook",
        "deleteChecklist",
        "deleteChecklistItem",
        "deleteComment",
        "deleteFolder",
        "deleteGoal",
        "deleteKeyResult",
        "deleteList",
        "deleteSpace",
        "deleteTag",
        "deleteTask",
        "deleteTimeEntry",
        "deleteWebhook",
        "getAccessibleCustomFields",
        "getAuthenticatedUser",
        "getAuthorizedWorkspaces",
        "getCurrentTimeEntry",
        "getFilteredTeamTasks",
        "getFolder",
        "getFolderViews",
        "getFolderlessLists",
        "getFolders",
        "getGoal",
        "getGoals",
        "getGuest",
        "getList",
        "getListComments",
        "getListMembers",
        "getListViews",
        "getListsInFolder",
        "getSharedHierarchy",
        "getSpace",
        "getSpaceTags",
        "getSpaceViews",
        "getSpaces",
        "getTask",
        "getTaskComments",
        "getTaskMembers",
        "getTasksInList",
        "getTeamMembers",
        "getTeamViews",
        "getTimeEntries",
        "getTimeEntry",
        "getUserGroup",
        "getUserGroups",
        "getView",
        "getViewComments",
        "getViewTasks",
        "getWebhooks",
        "getWorkspace",
        "inviteGuest",
        "removeGuest",
        "removeTaskCustomFieldValue",
        "removeTaskDependency",
        "removeTaskLink",
        "removeTaskTag",
        "setCustomFieldValue",
        "setTaskCustomFieldValue",
        "startTimeEntry",
        "stopTimeEntry",
        "updateChecklist",
        "updateChecklistItem",
        "updateComment",
        "updateFolder",
        "updateGoal",
        "updateGuest",
        "updateKeyResult",
        "updateList",
        "updateSpace",
        "updateTag",
        "updateTask",
        "updateTimeEntry",
        "updateWebhook",
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api)).filter(
        (name) => name !== "constructor",
      );

      for (const method of expectedMethods) {
        expect(actualMethods).toContain(method);
      }
    });
  });
});
