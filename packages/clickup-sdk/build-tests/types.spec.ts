import { describe, it } from "vitest";
import type {
  WorkspacesResponse,
  SpacesResponse,
  FoldersResponse,
  ListsResponse,
  TasksResponse,
  Workspace,
  Space,
  Folder,
  List,
  Task,
  User,
  CreateSpaceRequest,
  CreateFolderRequest,
  CreateListRequest,
  CreateTaskRequest,
  UpdateTaskRequest,
  Comment,
  CommentsResponse,
  CreateCommentRequest,
  UpdateCommentRequest,
  Checklist,
  ChecklistItem,
  CreateChecklistRequest,
  CreateChecklistItemRequest,
  Goal,
  KeyResult,
  GoalsResponse,
  CreateGoalRequest,
  Tag,
  TagsResponse,
  CreateTagRequest,
  CustomField,
  CustomFieldsResponse,
  TimeEntry,
  TimeEntriesResponse,
  CreateTimeEntryRequest,
  View,
  ViewsResponse,
  Webhook,
  WebhooksResponse,
  CreateWebhookRequest,
} from "../lib/types";

describe("Generated Types", () => {
  it("should export core response types", () => {
    // Type-level test - if these types don't exist, TypeScript will error
    const _test1: WorkspacesResponse = {} as WorkspacesResponse;
    const _test2: SpacesResponse = {} as SpacesResponse;
    const _test3: FoldersResponse = {} as FoldersResponse;
    const _test4: ListsResponse = {} as ListsResponse;
    const _test5: TasksResponse = {} as TasksResponse;
  });

  it("should export core entity types", () => {
    // Type-level test
    const _test1: Workspace = {} as Workspace;
    const _test2: Space = {} as Space;
    const _test3: Folder = {} as Folder;
    const _test4: List = {} as List;
    const _test5: Task = {} as Task;
    const _test6: User = {} as User;
  });

  it("should export request types", () => {
    // Type-level test
    const _test1: CreateSpaceRequest = {} as CreateSpaceRequest;
    const _test2: CreateFolderRequest = {} as CreateFolderRequest;
    const _test3: CreateListRequest = {} as CreateListRequest;
    const _test4: CreateTaskRequest = {} as CreateTaskRequest;
    const _test5: UpdateTaskRequest = {} as UpdateTaskRequest;
  });

  it("should export comment types", () => {
    // Type-level test
    const _test1: Comment = {} as Comment;
    const _test2: CommentsResponse = {} as CommentsResponse;
    const _test3: CreateCommentRequest = {} as CreateCommentRequest;
    const _test4: UpdateCommentRequest = {} as UpdateCommentRequest;
  });

  it("should export checklist types", () => {
    // Type-level test
    const _test1: Checklist = {} as Checklist;
    const _test2: ChecklistItem = {} as ChecklistItem;
    const _test3: CreateChecklistRequest = {} as CreateChecklistRequest;
    const _test4: CreateChecklistItemRequest = {} as CreateChecklistItemRequest;
  });

  it("should export goal types", () => {
    // Type-level test
    const _test1: Goal = {} as Goal;
    const _test2: KeyResult = {} as KeyResult;
    const _test3: GoalsResponse = {} as GoalsResponse;
    const _test4: CreateGoalRequest = {} as CreateGoalRequest;
  });

  it("should export tag types", () => {
    // Type-level test
    const _test1: Tag = {} as Tag;
    const _test2: TagsResponse = {} as TagsResponse;
    const _test3: CreateTagRequest = {} as CreateTagRequest;
  });

  it("should export custom field types", () => {
    // Type-level test
    const _test1: CustomField = {} as CustomField;
    const _test2: CustomFieldsResponse = {} as CustomFieldsResponse;
  });

  it("should export time tracking types", () => {
    // Type-level test
    const _test1: TimeEntry = {} as TimeEntry;
    const _test2: TimeEntriesResponse = {} as TimeEntriesResponse;
    const _test3: CreateTimeEntryRequest = {} as CreateTimeEntryRequest;
  });

  it("should export view types", () => {
    // Type-level test
    const _test1: View = {} as View;
    const _test2: ViewsResponse = {} as ViewsResponse;
  });

  it("should export webhook types", () => {
    // Type-level test
    const _test1: Webhook = {} as Webhook;
    const _test2: WebhooksResponse = {} as WebhooksResponse;
    const _test3: CreateWebhookRequest = {} as CreateWebhookRequest;
  });
});
