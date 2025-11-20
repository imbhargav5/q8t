// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class ClickUpApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get authorized workspaces
   */
  async getAuthorizedWorkspaces(): Promise<Types.WorkspacesResponse> {
    return this.client.get<Types.WorkspacesResponse>("/team");
  }

  /**
   * Get workspace details
   */
  async getWorkspace(team_id: string): Promise<Types.WorkspaceResponse> {
    return this.client.get<Types.WorkspaceResponse>(`/team/${team_id}`);
  }

  /**
   * Get spaces
   */
  async getSpaces(team_id: string, params?: { archived?: boolean }): Promise<Types.SpacesResponse> {
    return this.client.get<Types.SpacesResponse>(`/team/${team_id}/space`, params ? {
      "archived": params.archived,
    } : undefined);
  }

  /**
   * Create space
   */
  async createSpace(team_id: string, body: Types.CreateSpaceRequest): Promise<Types.SpaceResponse> {
    return this.client.post<Types.SpaceResponse>(`/team/${team_id}/space`, body);
  }

  /**
   * Get space
   */
  async getSpace(space_id: string): Promise<Types.SpaceResponse> {
    return this.client.get<Types.SpaceResponse>(`/space/${space_id}`);
  }

  /**
   * Update space
   */
  async updateSpace(space_id: string, body: Types.UpdateSpaceRequest): Promise<Types.SpaceResponse> {
    return this.client.put<Types.SpaceResponse>(`/space/${space_id}`, body);
  }

  /**
   * Delete space
   */
  async deleteSpace(space_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/space/${space_id}`);
  }

  /**
   * Get folders
   */
  async getFolders(space_id: string, params?: { archived?: boolean }): Promise<Types.FoldersResponse> {
    return this.client.get<Types.FoldersResponse>(`/space/${space_id}/folder`, params ? {
      "archived": params.archived,
    } : undefined);
  }

  /**
   * Create folder
   */
  async createFolder(space_id: string, body: Types.CreateFolderRequest): Promise<Types.FolderResponse> {
    return this.client.post<Types.FolderResponse>(`/space/${space_id}/folder`, body);
  }

  /**
   * Get folder
   */
  async getFolder(folder_id: string): Promise<Types.FolderResponse> {
    return this.client.get<Types.FolderResponse>(`/folder/${folder_id}`);
  }

  /**
   * Update folder
   */
  async updateFolder(folder_id: string, body: Types.UpdateFolderRequest): Promise<Types.FolderResponse> {
    return this.client.put<Types.FolderResponse>(`/folder/${folder_id}`, body);
  }

  /**
   * Delete folder
   */
  async deleteFolder(folder_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/folder/${folder_id}`);
  }

  /**
   * Get lists in folder
   */
  async getListsInFolder(folder_id: string, params?: { archived?: boolean }): Promise<Types.ListsResponse> {
    return this.client.get<Types.ListsResponse>(`/folder/${folder_id}/list`, params ? {
      "archived": params.archived,
    } : undefined);
  }

  /**
   * Create list in folder
   */
  async createListInFolder(folder_id: string, body: Types.CreateListRequest): Promise<Types.ListResponse> {
    return this.client.post<Types.ListResponse>(`/folder/${folder_id}/list`, body);
  }

  /**
   * Get folderless lists
   */
  async getFolderlessLists(space_id: string, params?: { archived?: boolean }): Promise<Types.ListsResponse> {
    return this.client.get<Types.ListsResponse>(`/space/${space_id}/list`, params ? {
      "archived": params.archived,
    } : undefined);
  }

  /**
   * Create folderless list
   */
  async createFolderlessList(space_id: string, body: Types.CreateListRequest): Promise<Types.ListResponse> {
    return this.client.post<Types.ListResponse>(`/space/${space_id}/list`, body);
  }

  /**
   * Get list
   */
  async getList(list_id: string): Promise<Types.ListResponse> {
    return this.client.get<Types.ListResponse>(`/list/${list_id}`);
  }

  /**
   * Update list
   */
  async updateList(list_id: string, body: Types.UpdateListRequest): Promise<Types.ListResponse> {
    return this.client.put<Types.ListResponse>(`/list/${list_id}`, body);
  }

  /**
   * Delete list
   */
  async deleteList(list_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/list/${list_id}`);
  }

  /**
   * Get tasks in list
   */
  async getTasksInList(list_id: string, params?: { archived?: boolean; page?: number; order_by?: string; reverse?: boolean; subtasks?: boolean; include_closed?: boolean }): Promise<Types.TasksResponse> {
    return this.client.get<Types.TasksResponse>(`/list/${list_id}/task`, params ? {
      "archived": params.archived,
      "page": params.page,
      "order_by": params.order_by,
      "reverse": params.reverse,
      "subtasks": params.subtasks,
      "include_closed": params.include_closed,
    } : undefined);
  }

  /**
   * Create task
   */
  async createTask(list_id: string, body: Types.CreateTaskRequest, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.TaskResponse> {
    return this.client.post<Types.TaskResponse>(`/list/${list_id}/task`, body);
  }

  /**
   * Get task
   */
  async getTask(task_id: string, params?: { custom_task_ids?: boolean; team_id?: string; include_subtasks?: boolean }): Promise<Types.TaskResponse> {
    return this.client.get<Types.TaskResponse>(`/task/${task_id}`, params ? {
      "custom_task_ids": params.custom_task_ids,
      "team_id": params.team_id,
      "include_subtasks": params.include_subtasks,
    } : undefined);
  }

  /**
   * Update task
   */
  async updateTask(task_id: string, body: Types.UpdateTaskRequest, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.TaskResponse> {
    return this.client.put<Types.TaskResponse>(`/task/${task_id}`, body);
  }

  /**
   * Delete task
   */
  async deleteTask(task_id: string, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/task/${task_id}`);
  }

  /**
   * Get filtered team tasks
   */
  async getFilteredTeamTasks(team_id: string, params?: { page?: number; order_by?: string; reverse?: boolean; subtasks?: boolean; space_ids?: string[]; project_ids?: string[]; list_ids?: string[]; statuses?: string[]; include_closed?: boolean; assignees?: string[]; tags?: string[]; due_date_gt?: number; due_date_lt?: number; date_created_gt?: number; date_created_lt?: number; date_updated_gt?: number; date_updated_lt?: number; custom_fields?: string[] }): Promise<Types.TasksResponse> {
    return this.client.get<Types.TasksResponse>(`/team/${team_id}/task`, params ? {
      "page": params.page,
      "order_by": params.order_by,
      "reverse": params.reverse,
      "subtasks": params.subtasks,
      "space_ids": params.space_ids,
      "project_ids": params.project_ids,
      "list_ids": params.list_ids,
      "statuses": params.statuses,
      "include_closed": params.include_closed,
      "assignees": params.assignees,
      "tags": params.tags,
      "due_date_gt": params.due_date_gt,
      "due_date_lt": params.due_date_lt,
      "date_created_gt": params.date_created_gt,
      "date_created_lt": params.date_created_lt,
      "date_updated_gt": params.date_updated_gt,
      "date_updated_lt": params.date_updated_lt,
      "custom_fields": params.custom_fields,
    } : undefined);
  }

  /**
   * Get task comments
   */
  async getTaskComments(task_id: string, params?: { custom_task_ids?: boolean; team_id?: string; start?: number; start_id?: string }): Promise<Types.CommentsResponse> {
    return this.client.get<Types.CommentsResponse>(`/task/${task_id}/comment`, params ? {
      "custom_task_ids": params.custom_task_ids,
      "team_id": params.team_id,
      "start": params.start,
      "start_id": params.start_id,
    } : undefined);
  }

  /**
   * Create task comment
   */
  async createTaskComment(task_id: string, body: Types.CreateCommentRequest, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.CommentResponse> {
    return this.client.post<Types.CommentResponse>(`/task/${task_id}/comment`, body);
  }

  /**
   * Get list comments
   */
  async getListComments(list_id: string, params?: { start?: number; start_id?: string }): Promise<Types.CommentsResponse> {
    return this.client.get<Types.CommentsResponse>(`/list/${list_id}/comment`, params ? {
      "start": params.start,
      "start_id": params.start_id,
    } : undefined);
  }

  /**
   * Create list comment
   */
  async createListComment(list_id: string, body: Types.CreateCommentRequest): Promise<Types.CommentResponse> {
    return this.client.post<Types.CommentResponse>(`/list/${list_id}/comment`, body);
  }

  /**
   * Get view comments
   */
  async getViewComments(view_id: string, params?: { start?: number; start_id?: string }): Promise<Types.CommentsResponse> {
    return this.client.get<Types.CommentsResponse>(`/view/${view_id}/comment`, params ? {
      "start": params.start,
      "start_id": params.start_id,
    } : undefined);
  }

  /**
   * Create view comment
   */
  async createViewComment(view_id: string, body: Types.CreateCommentRequest): Promise<Types.CommentResponse> {
    return this.client.post<Types.CommentResponse>(`/view/${view_id}/comment`, body);
  }

  /**
   * Update comment
   */
  async updateComment(comment_id: string, body: Types.UpdateCommentRequest): Promise<Types.CommentResponse> {
    return this.client.put<Types.CommentResponse>(`/comment/${comment_id}`, body);
  }

  /**
   * Delete comment
   */
  async deleteComment(comment_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/comment/${comment_id}`);
  }

  /**
   * Create checklist
   */
  async createChecklist(task_id: string, body: Types.CreateChecklistRequest, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.ChecklistResponse> {
    return this.client.post<Types.ChecklistResponse>(`/task/${task_id}/checklist`, body);
  }

  /**
   * Update checklist
   */
  async updateChecklist(checklist_id: string, body: Types.UpdateChecklistRequest): Promise<Types.ChecklistResponse> {
    return this.client.put<Types.ChecklistResponse>(`/checklist/${checklist_id}`, body);
  }

  /**
   * Delete checklist
   */
  async deleteChecklist(checklist_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/checklist/${checklist_id}`);
  }

  /**
   * Create checklist item
   */
  async createChecklistItem(checklist_id: string, body: Types.CreateChecklistItemRequest): Promise<Types.ChecklistItemResponse> {
    return this.client.post<Types.ChecklistItemResponse>(`/checklist/${checklist_id}/checklist_item`, body);
  }

  /**
   * Update checklist item
   */
  async updateChecklistItem(checklist_id: string, checklist_item_id: string, body: Types.UpdateChecklistItemRequest): Promise<Types.ChecklistItemResponse> {
    return this.client.put<Types.ChecklistItemResponse>(`/checklist/${checklist_id}/checklist_item/${checklist_item_id}`, body);
  }

  /**
   * Delete checklist item
   */
  async deleteChecklistItem(checklist_id: string, checklist_item_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/checklist/${checklist_id}/checklist_item/${checklist_item_id}`);
  }

  /**
   * Get goals
   */
  async getGoals(team_id: string, params?: { include_completed?: boolean }): Promise<Types.GoalsResponse> {
    return this.client.get<Types.GoalsResponse>(`/team/${team_id}/goal`, params ? {
      "include_completed": params.include_completed,
    } : undefined);
  }

  /**
   * Create goal
   */
  async createGoal(team_id: string, body: Types.CreateGoalRequest): Promise<Types.GoalResponse> {
    return this.client.post<Types.GoalResponse>(`/team/${team_id}/goal`, body);
  }

  /**
   * Get goal
   */
  async getGoal(goal_id: string): Promise<Types.GoalResponse> {
    return this.client.get<Types.GoalResponse>(`/goal/${goal_id}`);
  }

  /**
   * Update goal
   */
  async updateGoal(goal_id: string, body: Types.UpdateGoalRequest): Promise<Types.GoalResponse> {
    return this.client.put<Types.GoalResponse>(`/goal/${goal_id}`, body);
  }

  /**
   * Delete goal
   */
  async deleteGoal(goal_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/goal/${goal_id}`);
  }

  /**
   * Create key result
   */
  async createKeyResult(goal_id: string, body: Types.CreateKeyResultRequest): Promise<Types.KeyResultResponse> {
    return this.client.post<Types.KeyResultResponse>(`/goal/${goal_id}/key_result`, body);
  }

  /**
   * Update key result
   */
  async updateKeyResult(key_result_id: string, body: Types.UpdateKeyResultRequest): Promise<Types.KeyResultResponse> {
    return this.client.put<Types.KeyResultResponse>(`/key_result/${key_result_id}`, body);
  }

  /**
   * Delete key result
   */
  async deleteKeyResult(key_result_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/key_result/${key_result_id}`);
  }

  /**
   * Get team members
   */
  async getTeamMembers(team_id: string): Promise<Types.MembersResponse> {
    return this.client.get<Types.MembersResponse>(`/team/${team_id}/user`);
  }

  /**
   * Get list members
   */
  async getListMembers(list_id: string): Promise<Types.MembersResponse> {
    return this.client.get<Types.MembersResponse>(`/list/${list_id}/member`);
  }

  /**
   * Get task members
   */
  async getTaskMembers(task_id: string): Promise<Types.MembersResponse> {
    return this.client.get<Types.MembersResponse>(`/task/${task_id}/member`);
  }

  /**
   * Get space tags
   */
  async getSpaceTags(space_id: string): Promise<Types.TagsResponse> {
    return this.client.get<Types.TagsResponse>(`/space/${space_id}/tag`);
  }

  /**
   * Create space tag
   */
  async createSpaceTag(space_id: string, body: Types.CreateTagRequest): Promise<Types.TagResponse> {
    return this.client.post<Types.TagResponse>(`/space/${space_id}/tag`, body);
  }

  /**
   * Update tag
   */
  async updateTag(space_id: string, tag_name: string, body: Types.UpdateTagRequest): Promise<Types.TagResponse> {
    return this.client.put<Types.TagResponse>(`/space/${space_id}/tag/${tag_name}`, body);
  }

  /**
   * Delete tag
   */
  async deleteTag(space_id: string, tag_name: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/space/${space_id}/tag/${tag_name}`);
  }

  /**
   * Add task tag
   */
  async addTaskTag(task_id: string, tag_name: string, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/task/${task_id}/tag/${tag_name}`);
  }

  /**
   * Remove task tag
   */
  async removeTaskTag(task_id: string, tag_name: string, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/task/${task_id}/tag/${tag_name}`);
  }

  /**
   * Get accessible custom fields
   */
  async getAccessibleCustomFields(list_id: string): Promise<Types.CustomFieldsResponse> {
    return this.client.get<Types.CustomFieldsResponse>(`/list/${list_id}/field`);
  }

  /**
   * Set custom field value
   */
  async setCustomFieldValue(list_id: string, body: Types.SetCustomFieldValueRequest): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/list/${list_id}/field`, body);
  }

  /**
   * Set task custom field value
   */
  async setTaskCustomFieldValue(task_id: string, field_id: string, body: Types.CustomFieldValueRequest, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/task/${task_id}/field/${field_id}`, body);
  }

  /**
   * Remove task custom field value
   */
  async removeTaskCustomFieldValue(task_id: string, field_id: string, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/task/${task_id}/field/${field_id}`);
  }

  /**
   * Add task dependency
   */
  async addTaskDependency(task_id: string, body: Types.AddDependencyRequest, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/task/${task_id}/dependency`, body);
  }

  /**
   * Remove task dependency
   */
  async removeTaskDependency(task_id: string, body: Types.RemoveDependencyRequest, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/task/${task_id}/dependency`);
  }

  /**
   * Add task link
   */
  async addTaskLink(task_id: string, links_to: string, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/task/${task_id}/link/${links_to}`);
  }

  /**
   * Remove task link
   */
  async removeTaskLink(task_id: string, links_to: string, params?: { custom_task_ids?: boolean; team_id?: string }): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/task/${task_id}/link/${links_to}`);
  }

  /**
   * Get time entries
   */
  async getTimeEntries(team_id: string, params?: { start_date?: number; end_date?: number; assignee?: number; include_task_tags?: boolean; include_location_names?: boolean; space_id?: string; folder_id?: string; list_id?: string; task_id?: string }): Promise<Types.TimeEntriesResponse> {
    return this.client.get<Types.TimeEntriesResponse>(`/team/${team_id}/time_entries`, params ? {
      "start_date": params.start_date,
      "end_date": params.end_date,
      "assignee": params.assignee,
      "include_task_tags": params.include_task_tags,
      "include_location_names": params.include_location_names,
      "space_id": params.space_id,
      "folder_id": params.folder_id,
      "list_id": params.list_id,
      "task_id": params.task_id,
    } : undefined);
  }

  /**
   * Create time entry
   */
  async createTimeEntry(team_id: string, body: Types.CreateTimeEntryRequest): Promise<Types.TimeEntryResponse> {
    return this.client.post<Types.TimeEntryResponse>(`/team/${team_id}/time_entries`, body);
  }

  /**
   * Get time entry
   */
  async getTimeEntry(team_id: string, timer_id: string): Promise<Types.TimeEntryResponse> {
    return this.client.get<Types.TimeEntryResponse>(`/team/${team_id}/time_entries/${timer_id}`);
  }

  /**
   * Update time entry
   */
  async updateTimeEntry(team_id: string, timer_id: string, body: Types.UpdateTimeEntryRequest): Promise<Types.TimeEntryResponse> {
    return this.client.put<Types.TimeEntryResponse>(`/team/${team_id}/time_entries/${timer_id}`, body);
  }

  /**
   * Delete time entry
   */
  async deleteTimeEntry(team_id: string, timer_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/team/${team_id}/time_entries/${timer_id}`);
  }

  /**
   * Start timer
   */
  async startTimeEntry(team_id: string, body: Types.StartTimeEntryRequest): Promise<Types.TimeEntryResponse> {
    return this.client.post<Types.TimeEntryResponse>(`/team/${team_id}/time_entries/start`, body);
  }

  /**
   * Stop timer
   */
  async stopTimeEntry(team_id: string): Promise<Types.TimeEntryResponse> {
    return this.client.post<Types.TimeEntryResponse>(`/team/${team_id}/time_entries/stop`);
  }

  /**
   * Get current timer
   */
  async getCurrentTimeEntry(team_id: string, params?: { assignee?: number }): Promise<Types.TimeEntryResponse> {
    return this.client.get<Types.TimeEntryResponse>(`/team/${team_id}/time_entries/current`, params ? {
      "assignee": params.assignee,
    } : undefined);
  }

  /**
   * Get team views
   */
  async getTeamViews(team_id: string): Promise<Types.ViewsResponse> {
    return this.client.get<Types.ViewsResponse>(`/team/${team_id}/view`);
  }

  /**
   * Get space views
   */
  async getSpaceViews(space_id: string): Promise<Types.ViewsResponse> {
    return this.client.get<Types.ViewsResponse>(`/space/${space_id}/view`);
  }

  /**
   * Get folder views
   */
  async getFolderViews(folder_id: string): Promise<Types.ViewsResponse> {
    return this.client.get<Types.ViewsResponse>(`/folder/${folder_id}/view`);
  }

  /**
   * Get list views
   */
  async getListViews(list_id: string): Promise<Types.ViewsResponse> {
    return this.client.get<Types.ViewsResponse>(`/list/${list_id}/view`);
  }

  /**
   * Get view
   */
  async getView(view_id: string): Promise<Types.ViewResponse> {
    return this.client.get<Types.ViewResponse>(`/view/${view_id}`);
  }

  /**
   * Get view tasks
   */
  async getViewTasks(view_id: string, params?: { page?: number }): Promise<Types.TasksResponse> {
    return this.client.get<Types.TasksResponse>(`/view/${view_id}/task`, params ? {
      "page": params.page,
    } : undefined);
  }

  /**
   * Get webhooks
   */
  async getWebhooks(team_id: string): Promise<Types.WebhooksResponse> {
    return this.client.get<Types.WebhooksResponse>(`/team/${team_id}/webhook`);
  }

  /**
   * Create webhook
   */
  async createWebhook(team_id: string, body: Types.CreateWebhookRequest): Promise<Types.WebhookResponse> {
    return this.client.post<Types.WebhookResponse>(`/team/${team_id}/webhook`, body);
  }

  /**
   * Update webhook
   */
  async updateWebhook(webhook_id: string, body: Types.UpdateWebhookRequest): Promise<Types.WebhookResponse> {
    return this.client.put<Types.WebhookResponse>(`/webhook/${webhook_id}`, body);
  }

  /**
   * Delete webhook
   */
  async deleteWebhook(webhook_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/webhook/${webhook_id}`);
  }

  /**
   * Invite guest
   */
  async inviteGuest(team_id: string, body: Types.InviteGuestRequest): Promise<Types.GuestResponse> {
    return this.client.post<Types.GuestResponse>(`/team/${team_id}/guest`, body);
  }

  /**
   * Get guest
   */
  async getGuest(team_id: string, guest_id: string): Promise<Types.GuestResponse> {
    return this.client.get<Types.GuestResponse>(`/team/${team_id}/guest/${guest_id}`);
  }

  /**
   * Update guest
   */
  async updateGuest(team_id: string, guest_id: string, body: Types.UpdateGuestRequest): Promise<Types.GuestResponse> {
    return this.client.put<Types.GuestResponse>(`/team/${team_id}/guest/${guest_id}`, body);
  }

  /**
   * Remove guest
   */
  async removeGuest(team_id: string, guest_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/team/${team_id}/guest/${guest_id}`);
  }

  /**
   * Get user groups
   */
  async getUserGroups(team_id: string): Promise<Types.UserGroupsResponse> {
    return this.client.get<Types.UserGroupsResponse>(`/team/${team_id}/group`);
  }

  /**
   * Get user group
   */
  async getUserGroup(group_id: string): Promise<Types.UserGroupResponse> {
    return this.client.get<Types.UserGroupResponse>(`/group/${group_id}`);
  }

  /**
   * Get authenticated user
   */
  async getAuthenticatedUser(): Promise<Types.UserResponse> {
    return this.client.get<Types.UserResponse>("/user");
  }

  /**
   * Get shared hierarchy
   */
  async getSharedHierarchy(team_id: string): Promise<Types.SharedHierarchyResponse> {
    return this.client.get<Types.SharedHierarchyResponse>(`/team/${team_id}/shared`);
  }

}