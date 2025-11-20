// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface SuccessResponse {
  success?: boolean;
}

export interface WorkspacesResponse {
  teams?: Workspace[];
}

export interface WorkspaceResponse {
  team?: Workspace;
}

export interface Workspace {
  id?: string;
  name?: string;
  color?: string;
  avatar?: string;
  members?: Member[];
}

export interface Member {
  user?: User;
}

export interface User {
  id?: number;
  username?: string;
  email?: string;
  color?: string;
  profilePicture?: string;
  initials?: string;
  role?: number;
}

export interface SpacesResponse {
  spaces?: Space[];
}

export interface SpaceResponse {
  space?: Space;
}

export interface Space {
  id?: string;
  name?: string;
  private?: boolean;
  statuses?: Status[];
  multiple_assignees?: boolean;
  features?: Record<string, unknown>;
}

export interface Status {
  status?: string;
  type?: string;
  orderindex?: number;
  color?: string;
}

export interface CreateSpaceRequest {
  name: string;
  multiple_assignees?: boolean;
  features?: Record<string, unknown>;
}

export interface UpdateSpaceRequest {
  name?: string;
  color?: string;
  private?: boolean;
  admin_can_manage?: boolean;
}

export interface FoldersResponse {
  folders?: Folder[];
}

export interface FolderResponse {
  folder?: Folder;
}

export interface Folder {
  id?: string;
  name?: string;
  orderindex?: number;
  override_statuses?: boolean;
  hidden?: boolean;
  space?: Space;
  task_count?: string;
  lists?: List[];
}

export interface CreateFolderRequest {
  name: string;
}

export interface UpdateFolderRequest {
  name?: string;
}

export interface ListsResponse {
  lists?: List[];
}

export interface ListResponse {
  list?: List;
}

export interface List {
  id?: string;
  name?: string;
  orderindex?: number;
  content?: string;
  status?: Status;
  priority?: Priority;
  assignee?: User;
  task_count?: number;
  due_date?: string;
  start_date?: string;
  folder?: Folder;
  space?: Space;
  archived?: boolean;
}

export interface Priority {
  priority?: string;
  color?: string;
}

export interface CreateListRequest {
  name: string;
  content?: string;
  due_date?: number;
  due_date_time?: boolean;
  priority?: number;
  assignee?: number;
  status?: string;
}

export interface UpdateListRequest {
  name?: string;
  content?: string;
  due_date?: number;
  due_date_time?: boolean;
  priority?: number;
  assignee?: number;
  unset_status?: boolean;
}

export interface TasksResponse {
  tasks?: Task[];
  last_page?: boolean;
}

export interface TaskResponse {
  task?: Task;
}

export interface Task {
  id?: string;
  custom_id?: string;
  name?: string;
  text_content?: string;
  description?: string;
  status?: Status;
  orderindex?: string;
  date_created?: string;
  date_updated?: string;
  date_closed?: string;
  date_done?: string;
  archived?: boolean;
  creator?: User;
  assignees?: User[];
  watchers?: User[];
  checklists?: Checklist[];
  tags?: Tag[];
  parent?: string;
  priority?: Priority;
  due_date?: string;
  start_date?: string;
  points?: number;
  time_estimate?: number;
  time_spent?: number;
  custom_fields?: CustomField[];
  dependencies?: Record<string, unknown>[];
  linked_tasks?: Record<string, unknown>[];
  list?: List;
  folder?: Folder;
  space?: Space;
  url?: string;
}

export interface CreateTaskRequest {
  name: string;
  description?: string;
  assignees?: number[];
  tags?: string[];
  status?: string;
  priority?: number;
  due_date?: number;
  due_date_time?: boolean;
  time_estimate?: number;
  start_date?: number;
  start_date_time?: boolean;
  notify_all?: boolean;
  parent?: string;
  links_to?: string;
  check_required_custom_fields?: boolean;
  custom_fields?: Record<string, unknown>[];
}

export interface UpdateTaskRequest {
  name?: string;
  description?: string;
  status?: string;
  priority?: number;
  due_date?: number;
  due_date_time?: boolean;
  parent?: string;
  time_estimate?: number;
  start_date?: number;
  start_date_time?: boolean;
  assignees?: { add?: number[]; rem?: number[] };
}

export interface CommentsResponse {
  comments?: Comment[];
}

export interface CommentResponse {
  comment?: Comment;
}

export interface Comment {
  id?: string;
  comment?: Record<string, unknown>[];
  comment_text?: string;
  user?: User;
  date?: string;
}

export interface CreateCommentRequest {
  comment_text: string;
  assignee?: number;
  notify_all?: boolean;
}

export interface UpdateCommentRequest {
  comment_text: string;
  assignee?: number;
  resolved?: boolean;
}

export interface ChecklistResponse {
  checklist?: Checklist;
}

export interface Checklist {
  id?: string;
  task_id?: string;
  name?: string;
  orderindex?: number;
  resolved?: number;
  unresolved?: number;
  items?: ChecklistItem[];
}

export interface ChecklistItem {
  id?: string;
  name?: string;
  orderindex?: number;
  assignee?: User;
  resolved?: boolean;
  parent?: string;
  date_created?: string;
}

export interface CreateChecklistRequest {
  name: string;
}

export interface UpdateChecklistRequest {
  name?: string;
  position?: number;
}

export interface ChecklistItemResponse {
  checklist_item?: ChecklistItem;
}

export interface CreateChecklistItemRequest {
  name: string;
  assignee?: number;
}

export interface UpdateChecklistItemRequest {
  name?: string;
  assignee?: number;
  resolved?: boolean;
  parent?: string;
}

export interface GoalsResponse {
  goals?: Goal[];
}

export interface GoalResponse {
  goal?: Goal;
}

export interface Goal {
  id?: string;
  name?: string;
  team_id?: string;
  date_created?: string;
  start_date?: string;
  due_date?: string;
  description?: string;
  private?: boolean;
  archived?: boolean;
  creator?: number;
  color?: string;
  pretty_id?: string;
  multiple_owners?: boolean;
  folder_id?: string;
  members?: User[];
  owners?: User[];
  key_results?: KeyResult[];
}

export interface KeyResult {
  id?: string;
  goal_id?: string;
  name?: string;
  creator?: number;
  type?: string;
  unit?: string;
  steps_start?: number;
  steps_end?: number;
  steps_current?: number;
  completed?: boolean;
  task_ids?: string[];
  list_ids?: string[];
  owners?: User[];
}

export interface CreateGoalRequest {
  name: string;
  due_date?: number;
  description?: string;
  multiple_owners?: boolean;
  owners?: number[];
  color?: string;
}

export interface UpdateGoalRequest {
  name?: string;
  due_date?: number;
  description?: string;
  rem_owners?: number[];
  add_owners?: number[];
  color?: string;
}

export interface KeyResultResponse {
  key_result?: KeyResult;
}

export interface CreateKeyResultRequest {
  name: string;
  owners?: number[];
  type: string;
  steps_start?: number;
  steps_end?: number;
  unit?: string;
  task_ids?: string[];
  list_ids?: string[];
}

export interface UpdateKeyResultRequest {
  steps_current?: number;
  note?: string;
}

export interface MembersResponse {
  members?: Member[];
}

export interface TagsResponse {
  tags?: Tag[];
}

export interface TagResponse {
  tag?: Tag;
}

export interface Tag {
  name?: string;
  tag_fg?: string;
  tag_bg?: string;
  creator?: number;
}

export interface CreateTagRequest {
  name: string;
  tag_fg?: string;
  tag_bg?: string;
}

export interface UpdateTagRequest {
  name?: string;
  tag_fg?: string;
  tag_bg?: string;
}

export interface CustomFieldsResponse {
  fields?: CustomField[];
}

export interface CustomField {
  id?: string;
  name?: string;
  type?: string;
  type_config?: Record<string, unknown>;
  date_created?: string;
  hide_from_guests?: boolean;
  value?: Record<string, unknown>;
  required?: boolean;
}

export interface SetCustomFieldValueRequest {
  task_id: string;
  field_id: string;
  value: Record<string, unknown>;
}

export interface CustomFieldValueRequest {
  value?: string | number | boolean | string[];
  value_options?: Record<string, unknown>[];
}

export interface AddDependencyRequest {
  depends_on: string;
  dependency_of?: string;
}

export interface RemoveDependencyRequest {
  depends_on: string;
  dependency_of?: string;
}

export interface TimeEntriesResponse {
  data?: TimeEntry[];
}

export interface TimeEntryResponse {
  data?: TimeEntry;
}

export interface TimeEntry {
  id?: string;
  task?: Task;
  wid?: string;
  user?: User;
  billable?: boolean;
  start?: string;
  end?: string;
  duration?: string;
  description?: string;
  tags?: Tag[];
  source?: string;
  at?: string;
}

export interface CreateTimeEntryRequest {
  tid?: string;
  start: number;
  duration: number;
  description?: string;
  tags?: string[];
  billable?: boolean;
}

export interface UpdateTimeEntryRequest {
  description?: string;
  tags?: string[];
  start?: number;
  end?: number;
  billable?: boolean;
  duration?: number;
}

export interface StartTimeEntryRequest {
  tid: string;
  description?: string;
  tags?: string[];
  billable?: boolean;
}

export interface ViewsResponse {
  views?: View[];
}

export interface ViewResponse {
  view?: View;
}

export interface View {
  id?: string;
  name?: string;
  type?: string;
  parent?: Record<string, unknown>;
  grouping?: Record<string, unknown>;
  divide?: number;
  sorting?: Record<string, unknown>;
  filters?: Record<string, unknown>;
  columns?: Record<string, unknown>;
  team_sidebar?: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

export interface WebhooksResponse {
  webhooks?: Webhook[];
}

export interface WebhookResponse {
  webhook?: Webhook;
}

export interface Webhook {
  id?: string;
  userid?: number;
  team_id?: number;
  endpoint?: string;
  client_id?: string;
  events?: string[];
  task_id?: string;
  list_id?: string;
  folder_id?: string;
  space_id?: string;
  health?: Record<string, unknown>;
  secret?: string;
}

export interface CreateWebhookRequest {
  endpoint: string;
  events: string[];
  space_id?: string;
  folder_id?: string;
  list_id?: string;
  task_id?: string;
}

export interface UpdateWebhookRequest {
  endpoint?: string;
  events?: string[];
  status?: string;
}

export interface GuestResponse {
  guest?: Guest;
}

export interface Guest {
  user?: User;
  invited_by?: User;
}

export interface InviteGuestRequest {
  email: string;
  can_edit_tags?: boolean;
  can_see_time_spent?: boolean;
  can_see_time_estimated?: boolean;
  can_create_views?: boolean;
  custom_role_id?: number;
}

export interface UpdateGuestRequest {
  username?: string;
  can_edit_tags?: boolean;
  can_see_time_spent?: boolean;
  can_see_time_estimated?: boolean;
}

export interface UserGroupsResponse {
  groups?: UserGroup[];
}

export interface UserGroupResponse {
  group?: UserGroup;
}

export interface UserGroup {
  id?: string;
  team_id?: string;
  userid?: string;
  name?: string;
  handle?: string;
  date_created?: string;
  initials?: string;
  members?: User[];
  avatar?: Record<string, unknown>;
}

export interface UserResponse {
  user?: User;
}

export interface SharedHierarchyResponse {
  shared?: Record<string, unknown>;
}
