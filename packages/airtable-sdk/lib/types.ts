// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/*.yaml OpenAPI specifications

export interface AirtableRecord {
  id?: string;
  createdTime?: string;
  fields?: Record<string, unknown>;
}

export interface RecordList {
  records?: AirtableRecord[];
  offset?: string;
}

export interface CreateRecordRequest {
  fields: Record<string, unknown>;
}

export interface CreateRecordsRequest {
  records: { fields?: Record<string, unknown> }[];
  typecast?: boolean;
}

export interface UpdateRecordRequest {
  fields: Record<string, unknown>;
}

export interface UpdateRecordsRequest {
  records: { id?: string; fields?: Record<string, unknown> }[];
  performUpsert?: { fieldsToMergeOn?: string[] };
  typecast?: boolean;
}

export interface DeleteRecordsResponse {
  records?: { id?: string; deleted?: boolean }[];
}

export interface Base {
  id?: string;
  name?: string;
  permissionLevel?: string;
}

export interface BaseList {
  bases?: Base[];
  offset?: string;
}

export interface Table {
  id?: string;
  name?: string;
  primaryFieldId?: string;
  fields?: Field[];
  views?: View[];
}

export interface TableList {
  tables?: Table[];
}

export interface Field {
  id?: string;
  name?: string;
  type?: string;
  description?: string;
  options?: Record<string, unknown>;
}

export interface View {
  id?: string;
  name?: string;
  type?: string;
}

export interface CreateTableRequest {
  name: string;
  fields: { name?: string; type?: string; description?: string; options?: Record<string, unknown> }[];
  description?: string;
}

export interface CreateFieldRequest {
  name: string;
  type: string;
  description?: string;
  options?: Record<string, unknown>;
}

export interface UpdateFieldRequest {
  name?: string;
  description?: string;
}

export interface UserInfo {
  id?: string;
  scopes?: string[];
  email?: string;
}

export interface Webhook {
  id?: string;
  /** Secret for verifying webhook payloads */
  macSecretBase64?: string;
  expirationTime?: string;
  areNotificationsEnabled?: boolean;
  cursorForNextPayload?: number;
  lastSuccessfulNotificationTime?: string;
  lastNotificationResult?: { success?: boolean; completionTimestamp?: string; durationMs?: number; errorMessage?: string };
  specification?: WebhookSpecification;
}

export interface WebhookSpecification {
  options?: { filters?: { dataTypes?: "tableData" | "tableFields" | "tableMetadata"[]; recordChangeScope?: string; watchDataInFieldIds?: string[]; fromSources?: "client" | "publicApi" | "formSubmission" | "automation" | "system" | "sync" | "anonymousUser"[] } };
}

export interface CreateWebhookRequest {
  notificationUrl: string;
  specification?: WebhookSpecification;
}

export interface WebhookList {
  webhooks?: Webhook[];
}

export interface WebhookPayload {
  base?: { id?: string };
  webhook?: { id?: string };
  timestamp?: string;
}

export interface WebhookPayloadList {
  cursor?: number;
  mightHaveMore?: boolean;
  payloads?: WebhookPayload[];
}

export interface EnableNotificationsRequest {
  enable: boolean;
}

export interface Comment {
  id?: string;
  text?: string;
  createdTime?: string;
  lastUpdatedTime?: string;
  mentioned?: Record<string, unknown>;
  author?: { id?: string; email?: string; name?: string };
}

export interface CommentList {
  comments?: Comment[];
  offset?: string;
}

export interface CreateCommentRequest {
  text: string;
}

export interface UpdateCommentRequest {
  text: string;
}

export interface EnterpriseInfo {
  id?: string;
  createdTime?: string;
  userDomain?: string;
  workspaceIds?: string[];
}

export interface User {
  id?: string;
  state?: "invited" | "active" | "deactivated";
  email?: string;
  name?: string;
  createdTime?: string;
  lastActivityTime?: string;
  isAdmin?: boolean;
}

export interface UserList {
  users?: User[];
  offset?: string;
}

export interface Group {
  id?: string;
  name?: string;
  createdTime?: string;
  memberUserIds?: string[];
}

export interface GroupList {
  groups?: Group[];
  offset?: string;
}

export interface AuditLogEvent {
  id?: string;
  timestamp?: string;
  action?: string;
  actor?: { type?: string; id?: string; email?: string };
  context?: { base?: { id?: string; name?: string }; workspace?: { id?: string; name?: string } };
  payload?: Record<string, unknown>;
}

export interface AuditLogList {
  events?: AuditLogEvent[];
  pagination?: { offset?: string; hasMore?: boolean };
}

export interface Workspace {
  id?: string;
  name?: string;
  createdTime?: string;
  isPrimaryWorkspace?: boolean;
}

export interface WorkspaceList {
  workspaces?: Workspace[];
}

export interface Collaborator {
  id?: string;
  email?: string;
  permissionLevel?: "none" | "read" | "comment" | "edit" | "create" | "owner";
  createdTime?: string;
}

export interface CollaboratorList {
  collaborators?: Collaborator[];
}

export interface CreateWorkspaceRequest {
  name: string;
}

export interface AddCollaboratorRequest {
  email: string;
  permissionLevel: "read" | "comment" | "edit" | "create";
}

export interface UpdateCollaboratorRequest {
  permissionLevel: "none" | "read" | "comment" | "edit" | "create";
}

export interface ClaimUsersRequest {
  emails: string[];
}

export interface CreateGroupRequest {
  name: string;
  memberUserIds?: string[];
}

export interface UpdateGroupRequest {
  name?: string;
  memberUserIds?: string[];
}
