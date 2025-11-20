// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/asana_oas.yaml

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface AllocationBase {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The localized day on which the allocation starts. */
  start_date?: string;
  /** The localized day on which the allocation ends. */
  end_date?: string;
  /** The amount of time associated with the allocation, represented as a percentage or number of hours */
  effort?: { type?: "hours" | "percent"; value?: number };
}

export interface AllocationResponse {
  assignee: UserCompact & { name?: string };
  created_by: UserCompact;
  parent: ProjectCompact;
  resource_subtype: string;
}

export interface AllocationRequest {
  assignee: string;
  parent: string;
}

export interface AddCustomFieldSettingRequest {
  custom_field: string | CustomFieldCreateRequest;
  /** Whether this field should be considered important to this container (for instance, to display in the list view of items in the container). */
  is_important?: boolean;
  /** A gid of a Custom Field Setting on this container, before which the new Custom Field Setting will be added.  `insert_before` and `insert_after` parameters cannot both be specified. */
  insert_before?: string;
  /** A gid of a Custom Field Setting on this container, after which the new Custom Field Setting will be added.  `insert_before` and `insert_after` parameters cannot both be specified. */
  insert_after?: string;
}

export interface AddFollowersRequest {
  /** An array of strings identifying users. These can either be the string "me", an email, or the gid of a user. */
  followers: string;
}

export interface AddMembersRequest {
  /** An array of strings identifying users. These can either be the string "me", an email, or the gid of a user. */
  members: string;
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface AsanaNamedResource {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the object. */
  name?: string;
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface AsanaResource {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
}

export interface AttachmentBase {
}

/**
 * An *attachment* object represents any file attached to a task in Asana, whether it's an uploaded file or one associated via a third-party service such as Dropbox or Google Drive.
 */
export interface AttachmentCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the file. */
  name?: string;
  /** The service hosting the attachment. Valid values are `asana`, `dropbox`, `gdrive`, `onedrive`, `box`, `vimeo`, and `external`. */
  resource_subtype?: string;
}

export interface AttachmentRequest {
  /** The type of the attachment. Must be one of the given values. If not specified, a file attachment of type `asana` will be assumed. Note that if the value of `resource_subtype` is `external`, a `parent`, `name`, and `url` must also be provided.
 */
  resource_subtype?: "asana" | "external";
  /** Required for `asana` attachments.
 */
  file?: string;
  /** Required identifier of the parent task, project, or project_brief, as a string.
 */
  parent: string;
  /** The URL of the external resource being attached. Required for attachments of type `external`.
 */
  url?: string;
  /** The name of the external resource being attached. Required for attachments of type `external`.
 */
  name?: string;
  /** *Optional*. Only relevant for external attachments with a parent task.
A boolean indicating whether the current app should be connected with
the attachment for the purposes of showing an app components widget.
Requires the app to have been added to a project the parent task is in.
This property can only be set if an OAuth token is used to authenticate the request.

Criteria for displaying app widget:
1. An OAuth token must be used to authenticate the request
2. The app needs to have its `widget_metadata_url` configured in the developer console
3. The task the attachment is being attached to must be in a project with the app installed */
  connect_to_app?: boolean;
}

export interface AttachmentResponse {
  created_at: string;
  download_url: string;
  permanent_url: string;
  host: string;
  parent: TaskCompact & { resource_subtype?: string };
  size: number;
  view_url: string;
  connected_to_app: boolean;
}

/**
 * An object representing a single event within an Asana domain.

Every audit log event is comprised of an `event_type`, `actor`, `resource`, and `context`. Some events will include additional metadata about the event under `details`. See our [currently supported list of events](/docs/audit-log-events#supported-audit-log-events) for more details.
 */
export interface AuditLogEvent {
  /** Globally unique identifier of the `AuditLogEvent`, as a string. */
  gid?: string;
  /** The time the event was created. */
  created_at?: string;
  /** The type of the event. */
  event_type?: string;
  /** The category that this `event_type` belongs to. */
  event_category?: string;
  actor?: AuditLogEventActor;
  resource?: AuditLogEventResource;
  details?: AuditLogEventDetails;
  context?: AuditLogEventContext;
}

/**
 * The entity that triggered the event. Will typically be a user.
 */
export interface AuditLogEventActor {
  /** The type of actor.
Can be one of `user`, `asana`, `asana_support`, `anonymous`, or `external_administrator`. */
  actor_type?: "user" | "asana" | "asana_support" | "anonymous" | "external_administrator";
  /** Globally unique identifier of the actor, if it is a user. */
  gid?: string;
  /** The name of the actor, if it is a user. */
  name?: string;
  /** The email of the actor, if it is a user. */
  email?: string;
}

/**
 * The context from which this event originated.
 */
export interface AuditLogEventContext {
  /** The type of context.
Can be one of `web`, `desktop`, `mobile`, `asana_support`, `asana`, `email`, or `api`. */
  context_type?: "web" | "desktop" | "mobile" | "asana_support" | "asana" | "email" | "api";
  /** The authentication method used in the context of an API request.
Only present if the `context_type` is `api`. Can be one of `cookie`, `oauth`, `personal_access_token`, or `service_account`. */
  api_authentication_method?: "cookie" | "oauth" | "personal_access_token" | "service_account";
  /** The IP address of the client that initiated the event, if applicable. */
  client_ip_address?: string;
  /** The user agent of the client that initiated the event, if applicable. */
  user_agent?: string;
  /** The name of the OAuth App that initiated the event.
Only present if the `api_authentication_method` is `oauth`. */
  oauth_app_name?: string;
  /** The name of the automation rule that initiated the event. */
  rule_name?: string;
  /** The ID of the user who requested a change via support. */
  on_behalf_of_user_id?: number;
}

/**
 * Event specific details. The schema will vary depending on the `event_type`.
 */
export interface AuditLogEventDetails {
  /** The previous value of the field that was modified in the audited event. */
  old_value?: string;
  /** The new value after the modification in the audited event. */
  new_value?: string;
  /** The division or organizational unit where the event occurred. Primarily used to scope role change events (e.g., `user_division_admin_role_changed`), but may appear in other contexts involving group-level changes. */
  group?: Record<string, unknown>;
}

/**
 * The primary object that was affected by this event.
 */
export interface AuditLogEventResource {
  /** The type of resource. */
  resource_type?: string;
  /** The subtype of resource. Most resources will not have a subtype. */
  resource_subtype?: string;
  /** Globally unique identifier of the resource. */
  gid?: string;
  /** The name of the resource. */
  name?: string;
  /** The email of the resource, if applicable. */
  email?: string;
}

/**
 * A request object for use in a batch request.
 */
export interface BatchRequest {
  actions?: BatchRequestAction[];
}

/**
 * An action object for use in a batch request.
 */
export interface BatchRequestAction {
  /** The path of the desired endpoint relative to the API’s base URL. Query parameters are not accepted here; put them in `data` instead. */
  relative_path: string;
  /** The HTTP method you wish to emulate for the action. */
  method: "get" | "post" | "put" | "delete" | "patch" | "head";
  /** For `GET` requests, this should be a map of query parameters you would have normally passed in the URL. Options and pagination are not accepted here; put them in `options` instead. For `POST`, `PATCH`, and `PUT` methods, this should be the content you would have normally put in the data field of the body. */
  data?: Record<string, unknown>;
  /** Pagination (`limit` and `offset`) and output options (`fields` or `expand`) for the action. “Pretty” JSON output is not an available option on individual actions; if you want pretty output, specify that option on the parent request. */
  options?: { limit?: number; offset?: number; fields?: string[] };
}

/**
 * A response object returned from a batch request.
 */
export interface BatchResponse {
  /** The HTTP status code that the invoked endpoint returned. */
  status_code?: number;
  /** A map of HTTP headers specific to this result. This is primarily used for returning a `Location` header to accompany a `201 Created` result.  The parent HTTP response will contain all common headers. */
  headers?: Record<string, unknown>;
  /** The JSON body that the invoked endpoint returned. */
  body?: Record<string, unknown>;
}

/**
 * A *budget* object represents a budget for a given parent.
 */
export interface BudgetCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The type of the budget, in "cost" or "time". The value of this property will dictate how the corresponding values for actual, estimate, and total are interpreted. */
  budget_type?: "cost" | "time";
}

export interface BudgetResponse {
  estimate: BudgetEstimateResponse;
  actual: BudgetActualResponse;
  total: BudgetTotalResponse;
  parent: ProjectCompact & Record<string, unknown>;
}

export interface BudgetRequest {
  estimate: BudgetEstimateRequest;
  actual: BudgetActualRequest;
  total: BudgetTotalRequest;
  parent: string;
}

/**
 * Defines how the estimate portion of a budget is configured. This object controls whether the estimate is enabled, what data source it uses, and which tasks (by billable status) are included in calculating the estimate value. When disabled (enabled: false and source: none), the estimate is hidden and the API response will return `value: null` and `units: null` for this field.
 */
export interface BudgetEstimateRequest {
  /** Billable status filter applied to the estimate when `source` is `tasks`. Ignored when `source` is `capacity_plans` or `none`. When not provided, defaults to `billable`. */
  billable_status_filter?: "billable" | "non_billable" | "any";
  /** The data source for the estimate. `tasks`: use task-level estimated time attributed to the parent. `capacity_plans`: use capacity plan estimates attributed to the parent. `none`: disables the estimate; only valid when `enabled` is `false`. When `enabled` is `true`, `source` must not be `none`. */
  source?: "none" | "tasks" | "capacity_plans";
  /** Controls whether the estimate is displayed in the budget. This flag primarily affects UI presentation and the response payload. When `false` (and `source` is `none`), the estimate is hidden and the API response will return `value: null` and `units: null` for this field. */
  enabled?: boolean;
}

export interface BudgetEstimateResponse {
  units: string;
  value: number;
}

/**
 * Defines the configuration of the actual portion of a budget. The actual value represents aggregated time tracking data attributed to the budget’s parent. This object controls which time entries are included based on their billable status. When no entries match the selected filter, the value will be 0.
 */
export interface BudgetActualRequest {
  /** Billable status filter applied to time tracking entries contributing to the actual value. Determines which entries are included in aggregation. When not provided, defaults to `billable`. */
  billable_status_filter?: "billable" | "non_billable" | "any";
}

export interface BudgetActualResponse {
  value: number;
  units: string;
}

/**
 * Defines how the total portion of a budget is configured. The total represents a user-defined target value, not an aggregated one. This object specifies whether the total is displayed and the current value for the selected budget_type.
 */
export interface BudgetTotalRequest {
  /** Indicates whether the total value is active and should be displayed in the budget. This flag primarily affects UI presentation and the response payload. */
  enabled?: boolean;
  /** The user-set value for the total budget. When `budget_type` is `time`, represents minutes. When `budget_type` is `cost`, represents the monetary amount in the domain's currency. This value is stored separately for each `budget_type`, so switching between types preserves each value. */
  value?: number;
}

export interface BudgetTotalResponse {
  units: string;
}

export interface CustomFieldBase {
  description: string;
  enum_options: EnumOption[];
  precision: number;
  format: "currency" | "identifier" | "percentage" | "custom" | "duration" | "none";
  currency_code: string;
  custom_label: string;
  custom_label_position: "prefix" | "suffix" | "null";
  is_global_to_workspace: boolean;
  has_notifications_enabled: boolean;
  asana_created_field: "a_v_requirements" | "account_name" | "actionable" | "align_shipping_link" | "align_status" | "allotted_time" | "appointment" | "approval_stage" | "approved" | "article_series" | "board_committee" | "browser" | "campaign_audience" | "campaign_project_status" | "campaign_regions" | "channel_primary" | "client_topic_type" | "complete_by" | "contact" | "contact_email_address" | "content_channels" | "content_channels_needed" | "content_stage" | "content_type" | "contract" | "contract_status" | "cost" | "creation_stage" | "creative_channel" | "creative_needed" | "creative_needs" | "data_sensitivity" | "deal_size" | "delivery_appt" | "delivery_appt_date" | "department" | "department_responsible" | "design_request_needed" | "design_request_type" | "discussion_category" | "do_this_task" | "editorial_content_status" | "editorial_content_tag" | "editorial_content_type" | "effort" | "effort_level" | "est_completion_date" | "estimated_time" | "estimated_value" | "expected_cost" | "external_steps_needed" | "favorite_idea" | "feedback_type" | "financial" | "funding_amount" | "grant_application_process" | "hiring_candidate_status" | "idea_status" | "ids_link" | "ids_patient_link" | "implementation_stage" | "insurance" | "interview_area" | "interview_question_score" | "itero_scan_link" | "job_s_applied_to" | "lab" | "launch_status" | "lead_status" | "localization_language" | "localization_market_team" | "localization_status" | "meeting_minutes" | "meeting_needed" | "minutes" | "mrr" | "must_localize" | "name_of_foundation" | "need_to_follow_up" | "next_appointment" | "next_steps_sales" | "num_people" | "number_of_user_reports" | "office_location" | "onboarding_activity" | "owner" | "participants_needed" | "patient_date_of_birth" | "patient_email" | "patient_phone" | "patient_status" | "phone_number" | "planning_category" | "point_of_contact" | "position" | "post_format" | "prescription" | "priority" | "priority_level" | "product" | "product_stage" | "progress" | "project_size" | "project_status" | "proposed_budget" | "publish_status" | "reason_for_scan" | "referral" | "request_type" | "research_status" | "responsible_department" | "responsible_team" | "risk_assessment_status" | "room_name" | "sales_counterpart" | "sentiment" | "shipping_link" | "social_channels" | "stage" | "status" | "status_design" | "status_of_initiative" | "system_setup" | "task_progress" | "team" | "team_marketing" | "team_responsible" | "time_it_takes_to_complete_tasks" | "timeframe" | "treatment_type" | "type_work_requests_it" | "use_agency" | "user_name" | "vendor_category" | "vendor_type" | "word_count" | "null";
}

/**
 * Custom Fields store the metadata that is used in order to add user-specified information to tasks in Asana. Be sure to reference the [custom fields](/reference/custom-fields) developer documentation for more information about how custom fields relate to various resources in Asana.

Users in Asana can [lock custom fields](https://asana.com/guide/help/premium/custom-fields#gl-lock-fields), which will make them read-only when accessed by other users. Attempting to edit a locked custom field will return HTTP error code `403 Forbidden`.
 */
export interface CustomFieldCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the custom field. */
  name?: string;
  /** *Deprecated: new integrations should prefer the resource_subtype field.* The type of the custom field. Must be one of the given values.
 */
  type?: "text" | "enum" | "multi_enum" | "number" | "date" | "people";
  /** *Conditional*. Only relevant for custom fields of type `enum` or `multi_enum`. This array specifies the possible values which an `enum` custom field can adopt. To modify the enum options, refer to [working with enum options](/reference/createenumoptionforcustomfield). */
  enum_options?: EnumOption[];
  /** *Conditional*. This field applies only to [custom field values](/docs/custom-fields-guide#/accessing-custom-field-values-on-tasks-or-projects) and is not available for [custom field definitions](/docs/custom-fields-guide#/accessing-custom-field-definitions).
Determines if the custom field is enabled or not. For more details, see the [Custom Fields documentation](/docs/custom-fields-guide#/enabled-and-disabled-values). */
  enabled?: boolean;
  /** This field tells the type of the custom field. */
  representation_type?: "text" | "enum" | "multi_enum" | "number" | "date" | "people" | "formula" | "custom_id";
  /** This field is the unique custom ID string for the custom field. */
  id_prefix?: string;
  /** *Conditional*. Only relevant for custom fields of type `reference`. This array of strings reflects the allowed types of objects that can be written to a `reference` custom field value. */
  input_restrictions?: string[];
  /** *Conditional*. This flag describes whether a custom field is a formula custom field. */
  is_formula_field?: boolean;
  /** *Conditional*. Only relevant for custom fields of type `date`. This object reflects the chosen date (and optionally, time) value of a `date` custom field. If no date is selected, the value of `date_value` will be `null`. */
  date_value?: { date?: string; date_time?: string };
  enum_value?: EnumOption & Record<string, unknown>;
  /** *Conditional*. Only relevant for custom fields of type `multi_enum`. This object is the chosen values of a `multi_enum` custom field. */
  multi_enum_values?: EnumOption[];
  /** *Conditional*. This number is the value of a `number` custom field. */
  number_value?: number;
  /** *Conditional*. This string is the value of a `text` custom field. */
  text_value?: string;
  /** A string representation for the value of the custom field. Integrations that don't require the underlying type should use this field to read values. Using this field will future-proof an app against new custom field types. */
  display_value?: string;
}

export interface CustomFieldRequest {
  workspace: string;
  owned_by_app: boolean;
  people_value: string[];
  reference_value: string[];
}

export interface CustomFieldCreateRequest {
  resource_subtype: "text" | "enum" | "multi_enum" | "number" | "date" | "people" | "reference";
}

export interface CustomFieldResponse {
  representation_type: "text" | "enum" | "multi_enum" | "number" | "date" | "people" | "formula" | "custom_id" | "reference";
  id_prefix: string;
  input_restrictions: string[];
  is_formula_field: boolean;
  is_value_read_only: boolean;
  created_by: UserCompact & unknown;
  people_value: UserCompact[];
  reference_value: AsanaNamedResource[];
  privacy_setting: "public_with_guests" | "public" | "private";
  default_access_level: "admin" | "editor" | "user";
  resource_subtype: "text" | "enum" | "multi_enum" | "number" | "date" | "people" | "reference";
}

export interface CustomFieldSettingBase {
}

/**
 * Custom Fields Settings objects represent the many-to-many join of the Custom Field and Project as well as stores information that is relevant to that particular pairing.
 */
export interface CustomFieldSettingCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
}

export interface CustomFieldSettingResponse {
  project: ProjectCompact & Record<string, unknown>;
  is_important: boolean;
  parent: ProjectCompact & Record<string, unknown>;
  custom_field: CustomFieldResponse & Record<string, unknown>;
}

export interface CustomTypeBase {
}

/**
 * Custom Types extend the types of Asana Objects, currently only Custom Tasks are supported.
 */
export interface CustomTypeCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the custom type. */
  name?: string;
}

export interface CustomTypeResponse {
  status_options: CustomTypeStatusOptionResponse[];
}

export interface CustomTypeStatusOptionBase {
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface CustomTypeStatusOptionCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the custom type status option. */
  name?: string;
}

export interface CustomTypeStatusOptionResponse {
  completion_state: string;
  enabled: boolean;
  color: string;
}

/**
 * An empty object. Some endpoints do not return an object on success. The success is conveyed through a 2-- status code and returning an empty object.
 */
export interface EmptyResponse {
}

/**
 * Enum options are the possible values which an enum custom field can adopt. An enum custom field must contain at least 1 enum option but no more than 500.

You can add enum options to a custom field by using the `POST /custom_fields/custom_field_gid/enum_options` endpoint.

**It is not possible to remove or delete an enum option**. Instead, enum options can be disabled by updating the `enabled` field to false with the `PUT /enum_options/enum_option_gid` endpoint. Other attributes can be updated similarly.

On creation of an enum option, `enabled` is always set to `true`, meaning the enum option is a selectable value for the custom field. Setting `enabled=false` is equivalent to “trashing” the enum option in the Asana web app within the “Edit Fields” dialog. The enum option will no longer be selectable but, if the enum option value was previously set within a task, the task will retain the value.

Enum options are an ordered list and by default new enum options are inserted at the end. Ordering in relation to existing enum options can be specified on creation by using `insert_before` or `insert_after` to reference an existing enum option. Only one of `insert_before` and `insert_after` can be provided when creating a new enum option.

An enum options list can be reordered with the `POST /custom_fields/custom_field_gid/enum_options/insert` endpoint.
 */
export interface EnumOption {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the enum option. */
  name?: string;
  /** Whether or not the enum option is a selectable value for the custom field. */
  enabled?: boolean;
  /** The color of the enum option. Defaults to `none`. */
  color?: string;
}

export interface EnumOptionBase {
}

export interface EnumOptionInsertRequest {
  /** The gid of the enum option to relocate. */
  enum_option: string;
  /** An existing enum option within this custom field before which the new enum option should be inserted. Cannot be provided together with after_enum_option. */
  before_enum_option?: string;
  /** An existing enum option within this custom field after which the new enum option should be inserted. Cannot be provided together with before_enum_option. */
  after_enum_option?: string;
}

export interface EnumOptionRequest {
  insert_before: string;
  insert_after: string;
}

export interface Error {
  /** Message providing more detail about the error that occurred, if available. */
  message?: string;
  /** Additional information directing developers to resources on how to address and fix the problem, if available. */
  help?: string;
  /** *500 errors only*. A unique error phrase which can be used when contacting developer support to help identify the exact occurrence of the problem in Asana's logs. */
  phrase?: string;
}

/**
 * Sadly, sometimes requests to the API are not successful. Failures can
occur for a wide range of reasons. In all cases, the API should return
an HTTP Status Code that indicates the nature of the failure,
with a response body in JSON format containing additional information.


In the event of a server error the response body will contain an error
phrase. These phrases are automatically generated using the
[node-asana-phrase
library](https://github.com/Asana/node-asana-phrase) and can be used by
Asana support to quickly look up the incident that caused the server
error.
 */
export interface ErrorResponse {
  errors?: Error[];
}

/**
 * An *event* is an object representing a change to a resource that was
observed by an event subscription or delivered asynchronously to
the target location of an active webhook.

The event may be triggered by a different `user` than the
subscriber. For example, if user A subscribes to a task and user B
modified it, the event's user will be user B. Note: Some events
are generated by the system, and will have `null` as the user. API
consumers should make sure to handle this case.

The `resource` that triggered the event may be different from the one
that the events were requested for or the webhook is subscribed to. For
example, a subscription to a project will contain events for tasks
contained within the project.

**Note:** pay close attention to the relationship between the fields
`Event.action` and `Event.change.action`.
`Event.action` represents the action taken on the resource
itself, and `Event.change.action` represents how the information
within the resource's fields have been modified.

For instance, consider these scenarios:


* When at task is added to a project, `Event.action` will be
`added`, `Event.parent` will be an object with the `id` and
`type` of the project, and there will be no `change` field.


* When an assignee is set on the task, `Event.parent` will be
`null`, `Event.action` will be `changed`,
`Event.change.action` will be `changed`, and `new_value` will
be an object with the user's `id` and `type`.


* When a collaborator is added to the task, `Event.parent` will
be `null`, `Event.action` will be `changed`,
`Event.change.action` will be `added`, and `added_value` will be
an object with the user's `id` and `type`.
 */
export interface EventResponse {
  user?: UserCompact & unknown;
  resource?: AsanaNamedResource & unknown;
  /** *Deprecated: Refer to the resource_type of the resource.* The type of the resource that generated the event. */
  type?: string;
  /** The type of action taken on the **resource** that triggered the event.  This can be one of `changed`, `added`, `removed`, `deleted`, or `undeleted` depending on the nature of the event. */
  action?: string;
  parent?: AsanaNamedResource & unknown;
  /** The timestamp when the event occurred. */
  created_at?: string;
  /** Information about the type of change that has occurred. This field is only present when the value of the property `action`, describing the action taken on the **resource**, is `changed`. */
  change?: { field?: string; action?: string; new_value?: unknown; added_value?: unknown; removed_value?: unknown };
}

export interface GoalAddSubgoalRequest {
  /** The goal gid to add as subgoal to a parent goal */
  subgoal: string;
  /** An id of a subgoal of this parent goal. The new subgoal will be added before the one specified here. `insert_before` and `insert_after` parameters cannot both be specified. */
  insert_before?: string;
  /** An id of a subgoal of this parent goal. The new subgoal will be added after the one specified here. `insert_before` and `insert_after` parameters cannot both be specified. */
  insert_after?: string;
}

export interface GoalAddSupportingWorkRequest {
  /** The project/task/portfolio gid to add as supporting work for a goal */
  supporting_work: string;
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface GoalBase {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the goal. */
  name?: string;
  /** The notes of the goal with formatting as HTML. */
  html_notes?: string;
  /** Free-form textual information associated with the goal (i.e. its description). */
  notes?: string;
  /** The localized day on which this goal is due. This takes a date with format `YYYY-MM-DD`. */
  due_on?: string;
  /** The day on which work for this goal begins, or null if the goal has no start date. This takes a date with `YYYY-MM-DD` format, and cannot be set unless there is an accompanying due date. */
  start_on?: string;
  /** *Conditional*. This property is only present when the `workspace` provided is an organization. Whether the goal belongs to the `workspace` (and is listed as part of the workspace’s goals) or not. If it isn’t a workspace-level goal, it is a team-level goal, and is associated with the goal’s team. */
  is_workspace_level?: boolean;
  /** True if the goal is liked by the authorized user, false if not. */
  liked?: boolean;
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface GoalCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the goal. */
  name?: string;
  owner?: UserCompact & Record<string, unknown>;
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface GoalMetricBase {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning. */
  resource_subtype?: "number";
  /** *Conditional*. Only relevant for goal metrics of type `Number`. This field dictates the number of places after the decimal to round to, i.e. 0 is integer values, 1 rounds to the nearest tenth, and so on. Must be between 0 and 6, inclusive.
For percentage format, this may be unintuitive, as a value of 0.25 has a precision of 0, while a value of 0.251 has a precision of 1. This is due to 0.25 being displayed as 25%. */
  precision?: number;
  /** A supported unit of measure for the goal metric, or none. */
  unit?: "none" | "currency" | "percentage";
  /** ISO 4217 currency code to format this custom field. This will be null if the `unit` is not `currency`. */
  currency_code?: string;
  /** This number is the start value of a goal metric of type number. */
  initial_number_value?: number;
  /** This number is the end value of a goal metric of type number. This number cannot equal `initial_number_value`. */
  target_number_value?: number;
  /** This number is the current value of a goal metric of type number. */
  current_number_value?: number;
  /** This string is the current value of a goal metric of type string. */
  current_display_value?: string;
  /** This field defines how the progress value of a goal metric is being calculated. A goal's progress can be provided manually by the user, calculated automatically from contributing subgoals, projects, or tasks, or managed by an integration with an external data source, such as Salesforce. */
  progress_source?: "manual" | "subgoal_progress" | "project_task_completion" | "project_milestone_completion" | "task_completion" | "external";
  /** *Conditional*. Only relevant if `metric.progress_source` is one of `subgoal_progress`, `project_task_completion`, `project_milestone_completion`, or `task_completion`. If true, we use the supporting object's custom weight to calculate the goal's progress. If false, we treat all supporting objects as equally weighted */
  is_custom_weight?: boolean;
}

export interface GoalRemoveSupportingRelationshipRequest {
  /** The gid of the supporting resource to remove from the parent goal. Must be the gid of a goal, project, task, or portfolio. */
  supporting_resource: string;
}

export interface GoalAddSupportingRelationshipRequest {
  /** The gid of the supporting resource to add to the parent goal. Must be the gid of a goal, project, task, or portfolio. */
  supporting_resource: string;
  /** An id of a subgoal of this parent goal. The new subgoal will be added before the one specified here. `insert_before` and `insert_after` parameters cannot both be specified. Currently only supported when adding a subgoal. */
  insert_before?: string;
  /** An id of a subgoal of this parent goal. The new subgoal will be added after the one specified here. `insert_before` and `insert_after` parameters cannot both be specified. Currently only supported when adding a subgoal. */
  insert_after?: string;
  /** Defines how much the supporting goal’s progress contributes to the parent goal’s overall progress. When used with automatically calculated [Goal Metrics](/reference/creategoalmetric) (such as `progress_source = subgoal_progress`), this value must be greater than 0 for the subgoal to count toward the parent goal’s progress.
Accepts a number between 0 and 1 (inclusive). Defaults to `0`. */
  contribution_weight?: number;
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface GoalMetricCurrentValueRequest {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** *Conditional*. This number is the current value of a goal metric of type number. */
  current_number_value?: number;
}

export interface GoalMetricRequest {
}

export interface GoalRemoveSubgoalRequest {
  /** The goal gid to remove as subgoal from the parent goal */
  subgoal: string;
}

export interface GoalRequestBase {
  team: string;
  workspace: string;
  time_period: string;
  owner: string;
}

export interface GoalRequest {
  followers: string[];
}

export interface GoalUpdateRequest {
  status: string;
}

export interface GoalResponse {
  likes: Like[];
  num_likes: number;
  team: TeamCompact & Record<string, unknown>;
  workspace: WorkspaceCompact & Record<string, unknown>;
  followers: UserCompact[];
  time_period: TimePeriodCompact & Record<string, unknown>;
  metric: GoalMetricBase & { can_manage?: boolean };
  owner: UserCompact & Record<string, unknown>;
  current_status_update: StatusUpdateCompact & unknown;
  status: string;
}

export interface GoalRelationshipBase {
  supported_goal: GoalCompact & Record<string, unknown>;
}

/**
 * A *goal relationship* is an object representing the relationship between a goal and another goal, a project, a task, or a portfolio.
 */
export interface GoalRelationshipCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning. */
  resource_subtype?: "subgoal" | "supporting_work";
  supporting_resource?: ProjectCompact & Record<string, unknown>;
  /** The weight that the supporting resource's progress contributes to the supported goal's progress. This can be 0, 1, or any value in between. */
  contribution_weight?: number;
}

export interface GoalRelationshipRequest {
}

export interface GoalRelationshipResponse {
}

export interface JobBase {
}

/**
 * A *job* is an object representing a process that handles asynchronous work.
 */
export interface JobCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning. */
  resource_subtype?: string;
  /** The current status of this job. */
  status?: "not_started" | "in_progress" | "succeeded" | "failed";
  new_project?: ProjectCompact;
  new_task?: TaskCompact & Record<string, unknown>;
  new_project_template?: ProjectTemplateCompact;
  new_graph_export?: GraphExportCompact;
  new_resource_export?: ResourceExportCompact;
}

export interface JobResponse {
}

/**
 * An object to represent a user's like.
 */
export interface Like {
  /** Globally unique identifier of the object, as a string. */
  gid?: string;
  user?: UserCompact;
}

/**
 * A *member* object represents either a team or user.
 */
export interface MemberCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The type of the member (team or user) */
  resource_type?: string;
  /** The name of the member */
  name?: string;
}

export interface MembershipCompact {
}

export interface ModifyDependenciesRequest {
  /** An array of task gids that a task depends on. */
  dependencies?: string[];
}

/**
 * A set of dependent tasks.
 */
export interface ModifyDependentsRequest {
  /** An array of task gids that are dependents of the given task. */
  dependents?: string[];
}

/**
 * *Conditional*. This property is only present when a limit query parameter is provided in the request. When making a paginated request, the API will return a number of results as specified by the limit parameter. If more results exist, then the response will contain a next_page attribute, which will include an offset, a relative path attribute, and a full uri attribute. If there are no more pages available, next_page will be null and no offset will be provided. Note that an offset token will expire after some time, as data may have changed.
 */
export interface NextPage {
  /** Pagination offset for the request. */
  offset?: string;
  /** A relative path containing the query parameters to fetch for next_page */
  path?: string;
  /** A full uri containing the query parameters to fetch for next_page */
  uri?: string;
}

export interface OrganizationExportBase {
}

/**
 * An *organization_export* object represents a request to export the complete data of an Organization in JSON format.
 */
export interface OrganizationExportCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The time at which this resource was created. */
  created_at?: string;
  /** Download this URL to retrieve the full export of the organization
in JSON format. It will be compressed in a gzip (.gz) container.

*Note: May be null if the export is still in progress or
failed.  If present, this URL may only be valid for 1 hour from
the time of retrieval. You should avoid persisting this URL
somewhere and rather refresh on demand to ensure you do not keep
stale URLs.* */
  download_url?: string;
  /** The current state of the export. */
  state?: "pending" | "started" | "finished" | "error";
  organization?: WorkspaceCompact;
}

/**
 * An *organization_export* request starts a job to export the complete data of the given Organization.
 */
export interface OrganizationExportRequest {
  /** Globally unique identifier for the workspace or organization. */
  organization?: string;
}

export interface OrganizationExportResponse {
}

export interface PortfolioAddItemRequest {
  /** The item to add to the portfolio. */
  item: string;
  /** An id of an item in this portfolio. The new item will be added before the one specified here. `insert_before` and `insert_after` parameters cannot both be specified. */
  insert_before?: string;
  /** An id of an item in this portfolio. The new item will be added after the one specified here. `insert_before` and `insert_after` parameters cannot both be specified. */
  insert_after?: string;
}

export interface PortfolioBase {
  archived: boolean;
  color: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-brown" | "light-orange" | "light-purple" | "light-warm-gray";
  start_on: string;
  due_on: string;
  default_access_level: "admin" | "editor" | "viewer";
}

/**
 * A *portfolio* gives a high-level overview of the status of multiple initiatives in Asana. Portfolios provide a dashboard overview of the state of multiple projects, including a progress report and the most recent [project status](/reference/project-statuses) update.
Portfolios have some restrictions on size. Each portfolio has a max of 1500 items and, like projects, a max of 20 custom fields.
 */
export interface PortfolioCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the portfolio. */
  name?: string;
}

export interface PortfolioMembershipBase {
}

export interface DeprecatedPortfolioMembershipBase {
}

export interface DeprecatedPortfolioMembershipResponse {
}

/**
 * This object determines if a user is a member of a portfolio.
 */
export interface DeprecatedPortfolioMembershipCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  portfolio?: PortfolioCompact;
  user?: UserCompact;
  /** Whether the member has admin, editor, or viewer access to the portfolio. Portfolios do not support commenter access yet. */
  access_level?: "admin" | "editor" | "viewer";
}

/**
 * This object determines if a user is a member of a portfolio.
 */
export interface PortfolioMembershipCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  parent?: PortfolioCompact;
  member?: MemberCompact;
  /** Whether the member has admin, editor, or viewer access to the portfolio. Portfolios do not support commenter access yet. */
  access_level?: "admin" | "editor" | "viewer";
}

export interface PortfolioMembershipCompactResponse {
  resource_type: string;
  resource_subtype: string;
}

export interface PortfolioMembershipResponse {
}

export interface PortfolioRemoveItemRequest {
  /** The item to remove from the portfolio. */
  item: string;
}

export interface PortfolioRequest {
  workspace: string;
  public: boolean;
}

export interface PortfolioUpdateRequest {
  custom_fields: Record<string, string>;
}

export interface PortfolioResponse {
  created_at: string;
  created_by: UserCompact;
  custom_field_settings: CustomFieldSettingResponse[];
  current_status_update: StatusUpdateCompact & unknown;
  custom_fields: CustomFieldCompact[];
  members: UserCompact[];
  owner: UserCompact;
  workspace: WorkspaceCompact & Record<string, unknown>;
  permalink_url: string;
  public: boolean;
  privacy_setting: "public_to_domain" | "members_only";
  project_templates: ProjectTemplateCompact[];
}

/**
 * A collection of rich text that will be displayed as a preview to another app.

This is read-only except for a small group of whitelisted apps.
 */
export interface Preview {
  /** Some fallback text to display if unable to display the full preview. */
  fallback?: string;
  /** Text to display in the footer. */
  footer?: string;
  /** Text to display in the header. */
  header?: string;
  /** Where the header will link to. */
  header_link?: string;
  /** HTML formatted text for the body of the preview. */
  html_text?: string;
  /** Text for the body of the preview. */
  text?: string;
  /** Text to display as the title. */
  title?: string;
  /** Where to title will link to. */
  title_link?: string;
}

export interface ProjectBase {
  archived: boolean;
  color: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-brown" | "light-orange" | "light-purple" | "light-warm-gray" | "none" | "null";
  created_at: string;
  current_status: ProjectStatusResponse & Record<string, unknown>;
  current_status_update: StatusUpdateCompact & Record<string, unknown>;
  custom_field_settings: CustomFieldSettingResponse[];
  default_view: "list" | "board" | "calendar" | "timeline";
  due_date: string;
  due_on: string;
  html_notes: string;
  members: UserCompact[];
  modified_at: string;
  notes: string;
  public: boolean;
  privacy_setting: "public_to_workspace" | "private_to_team" | "private";
  start_on: string;
  default_access_level: "admin" | "editor" | "commenter" | "viewer";
  minimum_access_level_for_customization: "admin" | "editor";
  minimum_access_level_for_sharing: "admin" | "editor";
}

export interface ProjectBriefBase {
  title: string;
  html_text: string;
}

/**
 * A *Project Brief* allows you to explain the what and why of the project to your team.
 */
export interface ProjectBriefCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
}

export interface ProjectBriefRequest {
  text: string;
}

export interface ProjectBriefResponse {
  text: string;
  permalink_url: string;
  project: ProjectCompact & Record<string, unknown>;
}

/**
 * A *project* represents a prioritized list of tasks in Asana or a board with columns of tasks represented as cards. It exists in a single workspace or organization and is accessible to a subset of users in that workspace or organization, depending on its permissions.
 */
export interface ProjectCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** Name of the project. This is generally a short sentence fragment that fits on a line in the UI for maximum readability. However, it can be longer. */
  name?: string;
}

export interface ProjectDuplicateRequest {
  /** The name of the new project. */
  name: string;
  /** Sets the team of the new project. If team is not defined, the new project will be in the same team as the the original project. */
  team?: string;
  /** A comma-separated list of elements to include when duplicating a project.
Some elements are automatically included and cannot be excluded,
while others are **optional** and must be explicitly specified in this field.

**Auto-included fields (non-configurable)**
- Tasks
- [Project Views](https://asana.com/features/project-management/project-views)
(i.e., tabs in a project such as List, Board, Dashboard, etc.)
- [Rules](https://help.asana.com/s/article/rules)

*Note: The Owner of the Rules copied to the new project is the user who performs the API call.
If the duplication is performed using a [Service Account](/docs/authentication#/service-account),
note that Service Accounts cannot access the UI to modify or pause Rules.
To prevent unwanted automation behavior, consider pausing Rules in the source project before duplication —
their active/paused state is preserved in the new project.*

**Optional fields (configurable)**
- allocations
- forms
- members
- notes
- permissions
- task_assignee
- task_attachments
- task_dates
- task_dependencies
- task_followers
- task_notes
- task_projects
- task_subtasks
- task_tags
- task_templates
- task_type_default */
  include?: string;
  /** A dictionary of options to auto-shift dates. `task_dates` must be included to use this option. Requires `should_skip_weekends` and either `start_on` or `due_on`, but not both. */
  schedule_dates?: { should_skip_weekends?: boolean; due_on?: string; start_on?: string };
}

export interface CustomFieldMembershipBase {
}

/**
 * This object describes a user or team's membership to a custom field including their level of access (Admin, Editor, or User).
 */
export interface CustomFieldMembershipCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** Type of the membership. */
  resource_subtype?: string;
  parent?: CustomFieldCompact;
  member?: MemberCompact;
  /** Whether the member has admin, editor, or user access to the custom field. */
  access_level?: "admin" | "editor" | "user";
}

export interface CustomFieldMembershipResponse {
}

export interface ProjectMembershipBase {
}

/**
 * This object describes a team or a user's membership to a project including their level of access (Admin, Editor, Commenter, or Viewer).
 */
export interface ProjectMembershipCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  parent?: ProjectCompact;
  member?: MemberCompact;
  /** Whether the member has admin, editor, commenter, or viewer access to the project. */
  access_level?: "admin" | "editor" | "commenter" | "viewer";
}

export interface ProjectMembershipCompactResponse {
  resource_type: string;
  resource_subtype: string;
}

export interface ProjectMembershipNormalResponse {
  user: UserCompact;
  project: ProjectCompact;
  resource_type: string;
  write_access: "full_write" | "comment_only";
}

export interface ProjectRequest {
  custom_fields: Record<string, string>;
  followers: string;
  owner: string;
  team: string;
  workspace: string;
}

export interface ProjectUpdateRequest {
  custom_fields: Record<string, string>;
  followers: string;
  owner: string;
  team: string;
}

export interface ProjectResponse {
  custom_fields: CustomFieldCompact[];
  completed: boolean;
  completed_at: string;
  completed_by: UserCompact & unknown;
  followers: UserCompact[];
  owner: UserCompact & Record<string, unknown>;
  team: TeamCompact & Record<string, unknown>;
  icon: "list" | "board" | "timeline" | "calendar" | "rocket" | "people" | "graph" | "star" | "bug" | "light_bulb" | "globe" | "gear" | "notebook" | "computer" | "check" | "target" | "html" | "megaphone" | "chat_bubbles" | "briefcase" | "page_layout" | "mountain_flag" | "puzzle" | "presentation" | "line_and_symbols" | "speed_dial" | "ribbon" | "shoe" | "shopping_basket" | "map" | "ticket" | "coins";
  permalink_url: string;
  project_brief: ProjectBriefCompact & Record<string, unknown>;
  created_from_template: ProjectTemplateCompact & Record<string, unknown>;
  workspace: WorkspaceCompact & Record<string, unknown>;
}

export interface ProjectSectionInsertRequest {
  /** The section to reorder. */
  section: string;
  /** Insert the given section immediately before the section specified by this parameter. */
  before_section?: string;
  /** Insert the given section immediately after the section specified by this parameter. */
  after_section?: string;
}

export interface ProjectStatusBase {
  text: string;
  html_text: string;
  color: "green" | "yellow" | "red" | "blue" | "complete";
}

/**
 * *Deprecated: new integrations should prefer the `status_update` resource.*
A *project status* is an update on the progress of a particular project, and is sent out to all project followers when created. These updates include both text describing the update and a color code intended to represent the overall state of the project: "green" for projects that are on track, "yellow" for projects at risk, and "red" for projects that are behind.
 */
export interface ProjectStatusCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The title of the project status update. */
  title?: string;
}

export interface ProjectStatusRequest {
}

export interface ProjectStatusResponse {
  author: UserCompact;
  created_at: string;
  created_by: UserCompact;
  modified_at: string;
}

/**
 * A *project template* is an object that allows new projects to be created with a predefined setup, which may include tasks, sections, Rules, etc. It simplifies the process of running a workflow that involves a similar set of work every time.
 */
export interface ProjectTemplateCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** Name of the project template. */
  name?: string;
}

export interface ProjectTemplateBase {
  description: string;
  html_description: string;
  public: boolean;
  owner: UserCompact & Record<string, unknown>;
  team: TeamCompact;
  requested_dates: DateVariableCompact[];
  color: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-brown" | "light-orange" | "light-purple" | "light-warm-gray" | "null";
  requested_roles: TemplateRole[];
}

export interface ProjectTemplateResponse {
}

export interface ProjectTemplateInstantiateProjectRequest {
  /** The name of the new project. */
  name: string;
  /** *Optional*. Sets the team of the new project. If the project template exists in an _organization_, you may specify a value for `team`. If no value is provided then it defaults to the same team as the project template. */
  team?: string;
  /** *Deprecated:* new integrations use `privacy_setting` instead. */
  public?: boolean;
  /** The privacy setting of the project. *Note: Administrators in your organization may restrict the values of `privacy_setting`.* */
  privacy_setting?: "public_to_workspace" | "private_to_team" | "private";
  /** *Optional*. If set to `true`, the endpoint returns an "Unprocessable Entity" error if you fail to provide a calendar date value for any date variable. If set to `false`, a default date is used for each unfulfilled date variable (e.g., the current date is used as the Start Date of a project). */
  is_strict?: boolean;
  /** *Conditional*. Array of mappings of date variables to calendar dates. This property is required in the instantiation request if the project template includes dates (e.g., a start date on a task). */
  requested_dates?: DateVariableRequest[];
  /** Array of mappings of template roles to user ids */
  requested_roles?: RequestedRoleRequest[];
}

export interface DateVariableCompact {
  /** Globally unique identifier of the date field in the project template. A value of `1` refers to the project start date, while `2` refers to the project due date. */
  gid?: string;
  /** The name of the date variable. */
  name?: string;
  /** The description of what the date variable is used for when instantiating a project. */
  description?: string;
}

export interface DateVariableRequest {
  /** Globally unique identifier of the date field in the project template. A value of `1` refers to the project start date, while `2` refers to the project due date. */
  gid?: string;
  /** The date with which the date variable should be replaced when instantiating a project. This takes a date with `YYYY-MM-DD` format. */
  value?: string;
}

export interface RequestedRoleRequest {
  /** Globally unique identifier of the template role in the project template. */
  gid?: string;
  /** The user id that should be assigned to the template role. */
  value?: string;
}

export interface ProjectSaveAsTemplateRequest {
  /** The name of the new project template. */
  name: string;
  /** Sets the team of the new project template. If the project exists in an organization, specify team and not workspace. */
  team?: string;
  /** Sets the workspace of the new project template. Only specify workspace if the project exists in a workspace. */
  workspace?: string;
  /** Sets the project template to public to its team. */
  public: boolean;
}

export interface RuleTriggerRequest {
  /** The ID of the resource. For the duration of the beta, this resource is always a task, and this task must exist in the project in which the rule is created. */
  resource: string;
  /** The dynamic keys and values of the request. These fields are intended to be used in the action for the rule associated with this trigger. */
  action_data: Record<string, unknown>;
}

export interface RuleTriggerResponse {
  /** Message providing more detail about the result */
  message?: string;
}

export interface RemoveCustomFieldSettingRequest {
  /** The custom field to remove from this portfolio. */
  custom_field: string;
}

export interface RemoveFollowersRequest {
  /** An array of strings identifying users. These can either be the string "me", an email, or the gid of a user. */
  followers: string;
}

export interface RemoveMembersRequest {
  /** An array of strings identifying users. These can either be the string "me", an email, or the gid of a user. */
  members: string;
}

/**
 * Filters to apply to a resource that will be exported. These filters can be used to narrow down the resources that are included in the export.
 */
export interface ResourceExportFilters {
  /** Filter by the users who assigned the resource. This array accepts a list of user GIDs. This is only applicable to tasks. */
  "assigned_by.any"?: string[];
  /** Filter by the users who are assigned to the resource. This array accepts a list of user GIDs. This is only applicable to tasks. */
  "assignee.any"?: string[];
  /** Filter by the users who commented on the resource. This array accepts a list of user GIDs. */
  "commented_on_by.any"?: string[];
  /** Filter results to resources created after a specified date and time. */
  "created_at.after"?: string;
  /** Filter results to resources created before a specified date and time. */
  "created_at.before"?: string;
  /** Filter by the users who created the resource. This array accepts a list of user GIDs. */
  "created_by.any"?: string[];
  /** Filter by the users who are following the resource. This array accepts a list of user GIDs. */
  "followers.any"?: string[];
  /** Filter by the users who liked the resource. This array accepts a list of user GIDs. */
  "liked_by.any"?: string[];
  /** Filter results to resources modified after a specified date and time. */
  "modified_at.after"?: string;
  /** Filter results to resources modified before a specified date and time. */
  "modified_at.before"?: string;
}

export interface ResourceExportRequestParameter {
  /** The type of the resource to be exported. This can be a task, team, or message. */
  resource_type?: string;
  filters?: ResourceExportFilters;
  /** An array of fields to include for the resource type. If not provided, all non-optional fields for the resource type will be included. This conforms to the fields optional parameter available for all Asana endpoints which is documented [here](https://developers.asana.com/docs/inputoutput-options) */
  fields?: string[];
}

/**
 * A *resource_export* request starts a job to bulk export objects for one or more resources.
 */
export interface ResourceExportRequest {
  /** Gid of a workspace. */
  workspace?: string;
  /** An object containing the parameters for the export request. The keys of this object are the GIDs of the resources to be exported. The values are objects with additional parameters for each resource. */
  export_request_parameters?: ResourceExportRequestParameter[];
}

/**
 * A *resource_export* object represents a request to bulk export objects for one or more resources.
 */
export interface ResourceExportCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The time at which the resource export object was created. */
  created_at?: string;
  /** Download this URL to retrieve the full export
in [JSON Lines](https://jsonlines.org/) format. It will be compressed in a gzip (.gz) container.

*Note: May be null if the export is still in progress or failed.* */
  download_url?: string;
  /** The time at which this resource was completed. This will be null if the export is still in progress. */
  completed_at?: string;
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface ResourceExportResponse {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** A *resource_export* object represents a request to bulk export objects for one or more resources. */
  resource_subtype?: string;
  /** The current status of this job. */
  status?: "not_started" | "in_progress" | "succeeded" | "failed";
  new_resource_export?: ResourceExportCompact;
}

/**
 * A *graph_export* request starts a job to export data starting from a parent object.
 */
export interface GraphExportRequest {
  /** Globally unique ID of the parent object: goal, project, portfolio, or team. */
  parent?: string;
}

/**
 * A *graph_export* object represents a request to export the data starting from a parent object
 */
export interface GraphExportCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The time at which this resource was created. */
  created_at?: string;
  /** Download this URL to retrieve the full export
in JSON format. It will be compressed in a gzip (.gz) container.

*Note: May be null if the export is still in progress or
failed.  If present, this URL may only be valid for 1 hour from
the time of retrieval. You should avoid persisting this URL
somewhere and rather refresh on demand to ensure you do not keep
stale URLs.* */
  download_url?: string;
  /** The time at which this resource was completed. */
  completed_at?: string;
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface GraphExportResponse {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** A *graph_export* object represents a request to export the data starting from a parent object */
  resource_subtype?: string;
  /** The current status of this job. */
  status?: "not_started" | "in_progress" | "succeeded" | "failed";
  new_graph_export?: GraphExportCompact;
}

export interface RateBase {
}

/**
 * A *rate* is a monetary value assigned to a resource - `user` or `placeholder` - for a given `parent` object.
 */
export interface RateCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  parent?: ProjectCompact;
  resource?: UserCompact;
  /** The monetary value of the rate. */
  rate?: number;
  /** The currency code of the rate, set at the domain level. */
  currency_code?: string;
  created_by?: UserCompact;
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface RateRequest {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** Globally unique ID of the parent object: project. */
  parent: string;
  /** Globally unique ID of the resource object: user or placeholder. */
  resource: string;
  /** The monetary value of the rate. */
  rate: number;
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface RateUpdateRequest {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The monetary value of the rate. */
  rate?: number;
}

export interface RateResponse {
}

export interface RateOrPlaceholderCompact {
}

/**
 * A *placeholder* object represents a placeholder in Asana that can be used to represent a placeholder user.
 */
export interface PlaceholderCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The placeholder's name. */
  name?: string;
}

export interface PlaceholderRateCompact {
  resource: PlaceholderCompact;
}

export interface SectionBase {
}

/**
 * A *section* is a subdivision of a project that groups tasks together. It can either be a header above a list of tasks in a list view or a column in a board view of a project.
 */
export interface SectionCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the section (i.e. the text displayed as the section header). */
  name?: string;
}

export interface SectionRequest {
  /** The text to be displayed as the section name. This cannot be an empty string. */
  name: string;
  /** An existing section within this project before which the added section should be inserted. Cannot be provided together with insert_after. */
  insert_before?: string;
  /** An existing section within this project after which the added section should be inserted. Cannot be provided together with insert_before. */
  insert_after?: string;
}

export interface SectionResponse {
  created_at: string;
  project: ProjectCompact;
  projects: ProjectCompact[];
}

export interface SectionTaskInsertRequest {
  /** The task to add to this section. */
  task: string;
  /** An existing task within this section before which the added task should be inserted. Cannot be provided together with insert_after. */
  insert_before?: string;
  /** An existing task within this section after which the added task should be inserted. Cannot be provided together with insert_before. */
  insert_after?: string;
}

export interface StatusUpdateBase {
  text: string;
  html_text: string;
  status_type: "on_track" | "at_risk" | "off_track" | "on_hold" | "complete" | "achieved" | "partial" | "missed" | "dropped";
}

/**
 * A *status update* is an update on the progress of a particular project, portfolio, or goal, and is sent out to all of its parent's followers when created. These updates include both text describing the update and a `status_type` intended to represent the overall state of the project.
 */
export interface StatusUpdateCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The title of the status update. */
  title?: string;
  /** The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning.
The `resource_subtype`s for `status` objects represent the type of their parent. */
  resource_subtype?: "project_status_update" | "portfolio_status_update" | "goal_status_update";
}

export interface StatusUpdateRequest {
  parent: string;
}

export interface StatusUpdateResponse {
  author: UserCompact;
  created_at: string;
  created_by: UserCompact;
  hearted: boolean;
  hearts: Like[];
  liked: boolean;
  likes: Like[];
  reaction_summary: ReactionSummaryItemCompact[];
  modified_at: string;
  num_hearts: number;
  num_likes: number;
  parent: ProjectCompact & Record<string, unknown>;
}

/**
 * A story represents an activity associated with an object in the Asana system.
 */
export interface StoryBase {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The time at which this resource was created. */
  created_at?: string;
  /** The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning. */
  resource_subtype?: string;
  /** The plain text of the comment to add. Cannot be used with html_text. */
  text?: string;
  /** [Opt In](/docs/inputoutput-options). HTML formatted text for a comment. This will not include the name of the creator. */
  html_text?: string;
  /** *Conditional*. Whether the story should be pinned on the resource. */
  is_pinned?: boolean;
  /** The name of the sticker in this story. `null` if there is no sticker. */
  sticker_name?: "green_checkmark" | "people_dancing" | "dancing_unicorn" | "heart" | "party_popper" | "people_waving_flags" | "splashing_narwhal" | "trophy" | "yeti_riding_unicorn" | "celebrating_people" | "determined_climbers" | "phoenix_spreading_love";
}

/**
 * A story represents an activity associated with an object in the Asana system.
 */
export interface StoryCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The time at which this resource was created. */
  created_at?: string;
  created_by?: UserCompact;
  /** The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning. */
  resource_subtype?: string;
  /** *Create-only*. Human-readable text for the story or comment.
This will not include the name of the creator.
*Note: This is not guaranteed to be stable for a given type of story. For example, text for a reassignment may not always say “assigned to …” as the text for a story can both be edited and change based on the language settings of the user making the request.*
Use the `resource_subtype` property to discover the action that created the story. */
  text?: string;
}

export interface StoryRequest {
}

export interface StoryResponse {
  created_by: UserCompact;
  type: "comment" | "system";
  is_editable: boolean;
  is_edited: boolean;
  hearted: boolean;
  hearts: Like[];
  num_hearts: number;
  liked: boolean;
  likes: Like[];
  num_likes: number;
  reaction_summary: ReactionSummaryItemCompact[];
  previews: Preview[];
  old_name: string;
  new_name: string;
  old_dates: StoryResponseDates;
  new_dates: StoryResponseDates;
  old_resource_subtype: string;
  new_resource_subtype: string;
  story: StoryCompact;
  assignee: UserCompact;
  follower: UserCompact;
  old_section: SectionCompact;
  new_section: SectionCompact;
  task: TaskCompact;
  project: ProjectCompact;
  tag: TagCompact;
  custom_field: CustomFieldCompact;
  old_text_value: string;
  new_text_value: string;
  old_number_value: number;
  new_number_value: number;
  old_enum_value: EnumOption;
  new_enum_value: EnumOption;
  old_date_value: StoryResponseDates & unknown;
  new_date_value: StoryResponseDates & unknown;
  old_people_value: UserCompact[];
  new_people_value: UserCompact[];
  old_multi_enum_values: EnumOption[];
  new_multi_enum_values: EnumOption[];
  new_approval_status: string;
  old_approval_status: string;
  duplicate_of: TaskCompact;
  duplicated_from: TaskCompact;
  dependency: TaskCompact;
  source: "web" | "email" | "mobile" | "api" | "unknown";
  target: TaskCompact & Record<string, unknown>;
}

/**
 * *Conditional*
 */
export interface StoryResponseDates {
  /** The day on which work for this goal begins, or null if the goal has no start date. This takes a date with `YYYY-MM-DD` format, and cannot be set unless there is an accompanying due date. */
  start_on?: string;
  /** The UTC date and time on which this task is due, or null if the task has no due time. This takes an ISO 8601 date string in UTC and should not be used together with `due_on`. */
  due_at?: string;
  /** The localized day on which this goal is due. This takes a date with format `YYYY-MM-DD`. */
  due_on?: string;
}

export interface TagBase {
  color: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-brown" | "light-orange" | "light-purple" | "light-warm-gray" | "null";
  notes: string;
}

/**
 * A *tag* is a label that can be attached to any task in Asana. It exists in a single workspace or organization.
 */
export interface TagCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** Name of the tag. This is generally a short sentence fragment that fits on a line in the UI for maximum readability. However, it can be longer. */
  name?: string;
}

export interface TagCreateTagForWorkspaceRequest {
  followers: string[];
}

export interface TagBaseRequest {
}

export interface TagCreateRequest {
  followers: string[];
  workspace: string;
}

export interface TagUpdateRequest {
}

export interface TagResponse {
  created_at: string;
  followers: UserCompact[];
  workspace: WorkspaceCompact;
  permalink_url: string;
}

export interface TaskAddFollowersRequest {
  /** An array of strings identifying users. These can either be the string "me", an email, or the gid of a user. */
  followers: string[];
}

export interface TaskAddProjectRequest {
  /** The project to add the task to. */
  project: string;
  /** A task in the project to insert the task after, or `null` to insert at the beginning of the list. */
  insert_after?: string;
  /** A task in the project to insert the task before, or `null` to insert at the end of the list. */
  insert_before?: string;
  /** A section in the project to insert the task into. The task will be inserted at the bottom of the section. */
  section?: string;
}

export interface TaskAddTagRequest {
  /** The tag's gid to add to the task. */
  tag: string;
}

export interface TaskBase {
  approval_status: "pending" | "approved" | "rejected" | "changes_requested";
  assignee_status: "today" | "upcoming" | "later" | "new" | "inbox";
  completed: boolean;
  completed_at: string;
  completed_by: UserCompact & unknown;
  created_at: string;
  dependencies: AsanaResource[];
  dependents: AsanaResource[];
  due_at: string;
  due_on: string;
  external: { gid?: string; data?: string };
  html_notes: string;
  hearted: boolean;
  hearts: Like[];
  is_rendered_as_separator: boolean;
  liked: boolean;
  likes: Like[];
  memberships: { project?: ProjectCompact; section?: SectionCompact }[];
  modified_at: string;
  name: string;
  notes: string;
  num_hearts: number;
  num_likes: number;
  num_subtasks: number;
  start_at: string;
  start_on: string;
  actual_time_minutes: number;
}

/**
 * The *task* is the basic object around which many operations in Asana are centered.
 */
export interface TaskCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the task. */
  name?: string;
  /** The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning.
The resource_subtype `milestone` represent a single moment in time. This means tasks with this subtype cannot have a start_date. */
  resource_subtype?: "default_task" | "milestone" | "approval";
  /** [Opt In](/docs/inputoutput-options). A *user* object represents an account in Asana that can be given access to various workspaces, projects, and tasks. */
  created_by?: { gid?: string; resource_type?: string };
}

/**
 * A *task template* is an object that allows new tasks to be created with a predefined setup.
 */
export interface TaskTemplateCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** Name of the task template. */
  name?: string;
}

export interface TaskTemplateBase {
}

export interface TaskTemplateRecipeCompact {
  /** Name of the task that will be created from this template. */
  name?: string;
  /** The subtype of the task that will be created from this template. */
  task_resource_subtype?: "default_task" | "milestone_task" | "approval_task";
}

export interface TaskTemplateRecipe {
  description: string;
  html_description: string;
  memberships: ProjectCompact[];
  relative_start_on: number;
  relative_due_on: number;
  due_time: string;
  dependencies: TaskTemplateRecipeCompact[];
  dependents: TaskTemplateRecipeCompact[];
  followers: UserCompact[];
  attachments: AttachmentCompact[];
  subtasks: TaskTemplateRecipeCompact[];
  custom_fields: CustomFieldCompact[];
}

export interface TaskTemplateResponse {
  name: string;
  project: ProjectCompact;
  template: TaskTemplateRecipe;
  created_by: UserCompact;
  created_at: string;
}

/**
 * A response object returned from the task count endpoint.
 */
export interface TaskCountResponse {
  /** The number of tasks in a project. */
  num_tasks?: number;
  /** The number of incomplete tasks in a project. */
  num_incomplete_tasks?: number;
  /** The number of completed tasks in a project. */
  num_completed_tasks?: number;
  /** The number of milestones in a project. */
  num_milestones?: number;
  /** The number of incomplete milestones in a project. */
  num_incomplete_milestones?: number;
  /** The number of completed milestones in a project. */
  num_completed_milestones?: number;
}

export interface TaskDuplicateRequest {
  /** The name of the new task. */
  name?: string;
  /** A comma-separated list of fields that will be duplicated to the new task.
##### Fields
- assignee
- attachments
- dates
- dependencies
- followers
- notes
- parent
- projects
- subtasks
- tags */
  include?: string;
}

export interface TaskRemoveFollowersRequest {
  /** An array of strings identifying users. These can either be the string "me", an email, or the gid of a user. */
  followers: string[];
}

export interface TaskRemoveProjectRequest {
  /** The project to remove the task from. */
  project: string;
}

export interface TaskRemoveTagRequest {
  /** The tag's gid to remove from the task. */
  tag: string;
}

export interface TaskTemplateInstantiateTaskRequest {
  /** The name of the new task. If not provided, the name of the task template will be used. */
  name?: string;
}

export interface TaskRequest {
  assignee: string;
  assignee_section: string;
  custom_fields: Record<string, string>;
  followers: string[];
  parent: string;
  projects: string[];
  tags: string[];
  workspace: string;
  custom_type: string;
  custom_type_status_option: string;
}

export interface TaskResponse {
  assignee: UserCompact & unknown;
  assignee_section: SectionCompact & Record<string, unknown>;
  custom_fields: CustomFieldResponse[];
  custom_type: CustomTypeCompact & unknown;
  custom_type_status_option: CustomTypeStatusOptionCompact & unknown;
  followers: UserCompact[];
  parent: TaskCompact & Record<string, unknown>;
  projects: ProjectCompact[];
  tags: TagCompact[];
  workspace: WorkspaceCompact & Record<string, unknown>;
  permalink_url: string;
}

export interface TaskSetParentRequest {
  /** The new parent of the task, or `null` for no parent. */
  parent: string;
  /** A subtask of the parent to insert the task after, or `null` to insert at the beginning of the list. */
  insert_after?: string;
  /** A subtask of the parent to insert the task before, or `null` to insert at the end of the list. */
  insert_before?: string;
}

/**
 * A user identification object for specification with the addUser/removeUser endpoints.
 */
export interface TeamAddUserRequest {
  /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
  user?: string;
}

export interface TeamBase {
}

/**
 * <p><strong style={{ color: "#4573D2" }}>Full object requires scope: </strong><code>teams:read</code></p>

A *team* is used to group related projects and people together within an organization. Each project in an organization is associated with a team.
 */
export interface TeamCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the team. */
  name?: string;
}

export interface TeamMembershipBase {
}

/**
 * This object represents a user's connection to a team.
 */
export interface TeamMembershipCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  user?: UserCompact;
  team?: TeamCompact;
  /** Describes if the user is a guest in the team. */
  is_guest?: boolean;
  /** Describes if the user has limited access to the team. */
  is_limited_access?: boolean;
  /** Describes if the user is a team admin. */
  is_admin?: boolean;
}

export interface TeamMembershipResponse {
}

/**
 * A user identification object for specification with the addUser/removeUser endpoints.
 */
export interface TeamRemoveUserRequest {
  /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
  user?: string;
}

export interface TeamRequest {
  description: string;
  html_description: string;
  organization: string;
  visibility: "secret" | "request_to_join" | "public";
  edit_team_name_or_description_access_level: "all_team_members" | "only_team_admins";
  edit_team_visibility_or_trash_team_access_level: "all_team_members" | "only_team_admins";
  member_invite_management_access_level: "all_team_members" | "only_team_admins";
  guest_invite_management_access_level: "all_team_members" | "only_team_admins";
  join_request_management_access_level: "all_team_members" | "only_team_admins";
  team_member_removal_access_level: "all_team_members" | "only_team_admins";
  team_content_management_access_level: "no_restriction" | "only_team_admins";
  endorsed: boolean;
}

export interface TeamResponse {
  description: string;
  html_description: string;
  organization: WorkspaceCompact & Record<string, unknown>;
  permalink_url: string;
  visibility: "secret" | "request_to_join" | "public";
  edit_team_name_or_description_access_level: "all_team_members" | "only_team_admins";
  edit_team_visibility_or_trash_team_access_level: "all_team_members" | "only_team_admins";
  member_invite_management_access_level: "all_team_members" | "only_team_admins";
  guest_invite_management_access_level: "all_team_members" | "only_team_admins";
  join_request_management_access_level: "all_team_members" | "only_team_admins";
  team_member_removal_access_level: "all_team_members" | "only_team_admins";
  team_content_management_access_level: "no_restriction" | "only_team_admins";
  endorsed: boolean;
  custom_field_settings: CustomFieldSettingResponse[];
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface TemplateRole {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** Name of the template role. */
  name?: string;
}

export interface TimePeriodBase {
  parent: TimePeriodCompact & unknown;
}

/**
 * <p><strong style={{ color: "#4573D2" }}>Full object requires scope: </strong><code>time_periods:read</code></p>

A generic Asana Resource, containing a globally unique identifier.
 */
export interface TimePeriodCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The localized end date of the time period in `YYYY-MM-DD` format. */
  end_on?: string;
  /** The localized start date of the time period in `YYYY-MM-DD` format. */
  start_on?: string;
  /** The cadence and index of the time period. */
  period?: "FY" | "H1" | "H2" | "Q1" | "Q2" | "Q3" | "Q4";
  /** A string representing the cadence code and the fiscal year. */
  display_name?: string;
}

export interface TimePeriodResponse {
}

export interface UserBase {
}

/**
 * A *user* object represents an account in Asana that can be given access to various workspaces, projects, and tasks.
 */
export interface UserCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** *Read-only except when same user as requester*. The user's name. */
  name?: string;
}

export interface UserRequest {
}

export interface UserUpdateRequest {
  custom_fields: Record<string, string>;
}

export interface UserBaseResponse {
  email: string;
  photo: { image_21x21?: string; image_27x27?: string; image_36x36?: string; image_60x60?: string; image_128x128?: string; image_1024x1024?: string };
}

export interface UserResponse {
  workspaces: WorkspaceCompact[];
  custom_fields: CustomFieldCompact[];
}

export interface UserTaskListBase {
}

/**
 * A user task list represents the tasks assigned to a particular user. It provides API access to a user’s [My tasks](https://asana.com/guide/help/fundamentals/my-tasks) view in Asana.
 */
export interface UserTaskListCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the user task list. */
  name?: string;
  /** The owner of the user task list, i.e. the person whose My Tasks is represented by this resource. */
  owner?: UserCompact;
  /** The workspace in which the user task list is located. */
  workspace?: WorkspaceCompact;
}

export interface UserTaskListRequest {
}

export interface UserTaskListResponse {
}

/**
 * Webhook objects represent the state of an active subscription for a server to be updated with information from Asana. This schema represents the subscription itself, not the objects that are sent to the server. For information on those please refer to the [event](/reference/events) schema.
 */
export interface WebhookCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** If true, the webhook will send events - if false it is considered inactive and will not generate events. */
  active?: boolean;
  resource?: AsanaNamedResource;
  /** The URL to receive the HTTP POST. */
  target?: string;
}

/**
 * A WebhookFilter can be passed on creation of a webhook in order to filter the types of actions that trigger delivery of an [event](/reference/events)
 */
export interface WebhookFilter {
  /** The type of the resource which created the event when modified; for example, to filter to changes on regular tasks this field should be set to `task`. */
  resource_type?: string;
  /** The resource subtype of the resource that the filter applies to. This should be set to the same value as is returned on the `resource_subtype` field on the resources themselves. */
  resource_subtype?: string;
  /** The type of change on the **resource** to pass through the filter. For more information refer to `Event.action` in the [event](/reference/events) schema. This can be one of `changed`, `added`, `removed`, `deleted`, and `undeleted` depending on the nature of what has occurred on the resource. */
  action?: string;
  /** *Conditional.* A whitelist of fields for events which will pass the filter when the resource is changed. These can be any combination of the fields on the resources themselves. This field is only valid for `action` of type `changed`
*Note: Subscriptions created on higher-level resources such as a Workspace, Team, or Portfolio do not support fields.* */
  fields?: string[];
}

export interface WebhookRequest {
  /** A resource ID to subscribe to. Many Asana resources are valid to create webhooks on, but higher-level resources require filters. */
  resource: string;
  /** The URL to receive the HTTP POST. The full URL will be used to deliver events from this webhook (including parameters) which allows encoding of application-specific state when the webhook is created. */
  target: string;
  /** An array of WebhookFilter objects to specify a whitelist of filters to apply to events from this webhook. If a webhook event passes any of the filters the event will be delivered; otherwise no event will be sent to the receiving server. */
  filters?: WebhookFilter & unknown & Record<string, unknown>[];
}

export interface WebhookResponse {
  created_at: string;
  last_failure_at: string;
  last_failure_content: string;
  last_success_at: string;
  delivery_retry_count: number;
  next_attempt_after: string;
  failure_deletion_timestamp: string;
  filters: WebhookFilter & unknown & Record<string, unknown>[];
}

export interface WebhookUpdateRequest {
  /** An array of WebhookFilter objects to specify a whitelist of filters to apply to events from this webhook. If a webhook event passes any of the filters the event will be delivered; otherwise no event will be sent to the receiving server. */
  filters?: WebhookFilter & unknown & Record<string, unknown>[];
}

/**
 * A user identification object for specification with the addUser/removeUser endpoints.
 */
export interface WorkspaceAddUserRequest {
  /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
  user?: string;
}

export interface WorkspaceBase {
}

/**
 * A *workspace* is the highest-level organizational unit in Asana. All projects and tasks have an associated workspace.
 */
export interface WorkspaceCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The name of the workspace. */
  name?: string;
}

export interface WorkspaceMembershipBase {
}

/**
 * This object determines if a user is a member of a workspace.
 */
export interface WorkspaceMembershipCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  user?: UserCompact;
  workspace?: WorkspaceCompact;
}

export interface WorkspaceMembershipRequest {
}

export interface WorkspaceMembershipResponse {
  user_task_list: UserTaskListResponse;
  is_active: boolean;
  is_admin: boolean;
  is_guest: boolean;
  is_view_only: boolean;
  vacation_dates: { start_on?: string; end_on?: string };
  created_at: string;
}

/**
 * A user identification object for specification with the addUser/removeUser endpoints.
 */
export interface WorkspaceRemoveUserRequest {
  /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
  user?: string;
}

export interface WorkspaceRequest {
}

export interface WorkspaceResponse {
  email_domains: string[];
  is_organization: boolean;
}

/**
 * This object represents a user's connection to a goal.
 */
export interface GoalMembershipBase {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The type of membership. */
  resource_subtype?: string;
  member?: MemberCompact;
  parent?: GoalCompact & Record<string, unknown>;
  /** *Deprecated: Describes if the member is a commenter or editor in goal.* */
  role?: "commenter" | "editor";
  /** "Describes the membership access level for the goal. (`admin` and `viewer` are currently only available when you include the header: `Asana-Enable: goal_sals_api`.) This is preferred over role." */
  access_level?: "viewer" | "commenter" | "editor" | "admin";
  goal?: GoalCompact & Record<string, unknown>;
}

export interface GoalMembershipCompact {
  is_commenter: boolean;
  is_editor: boolean;
}

export interface GoalMembershipResponse {
  user: UserCompact & Record<string, unknown>;
  workspace: WorkspaceCompact & Record<string, unknown>;
}

export interface MembershipUpdateRequest {
  /** The role given to the member. Goals can have access levels `editor` or `commenter`. Projects can have access levels `admin`, `editor` or `commenter`. Portfolios can have access levels `admin`, `editor` or `viewer`. */
  access_level?: string;
}

export interface MembershipRequest {
  /** Sets the access level for the member. Goals can have access levels `viewer`, `commenter`, `editor` or `admin` (`viewer` and `admin` are currently only available for Goals when you include the `Asana-Enable: goal_sals_api` change flag header). Projects can have access levels `admin`, `editor` or `commenter`. Portfolios can have access levels `admin`, `editor` or `viewer`. Custom Fields can have access levels `admin`, `editor` or `user`. */
  access_level?: string;
}

export interface CreateMembershipRequest {
  member: string;
  parent: string;
  role: string;
}

export interface MembershipResponse {
}

export interface UpdateTimeTrackingEntryRequest {
  /** *Optional*. Time in minutes tracked by the entry */
  duration_minutes?: number;
  /** *Optional*. The day that this entry is logged on. Defaults to today if no day specified */
  entered_on?: string;
  /** *Optional*. The gid of the project which the time is attributable to. */
  attributable_to?: string;
}

export interface CreateTimeTrackingEntryRequest {
  /** Time in minutes tracked by the entry. Must be greater than 0 */
  duration_minutes?: number;
  /** *Optional*. The day that this entry is logged on. Defaults to today if not specified */
  entered_on?: string;
  /** *Optional*. The gid of the project which the time is attributable to. */
  attributable_to?: string;
}

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface TimeTrackingEntryCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** Time in minutes tracked by the entry. */
  duration_minutes?: number;
  /** The day that this entry is logged on. */
  entered_on?: string;
  attributable_to?: ProjectCompact & Record<string, unknown>;
  created_by?: UserCompact;
}

export interface TimeTrackingEntryBase {
  task: TaskCompact;
  created_at: string;
  approval_status: "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED";
  billable_status: "billable" | "nonBillable" | "notApplicable";
  description: string;
}

/**
 * A *access request* object represents a request to access a shareable resource within Asana. It includes the requester's information, approval status, and target resource details.
 */
export interface AccessRequestResponse {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
  /** The message included in the access request, if any. */
  message?: string;
  /** The current approval status of the request. */
  approval_status?: "pending" | "approved" | "denied";
  requester?: UserCompact;
  target?: AccessRequestTargetIdCompact;
}

/**
 * A *target id* object represents the target resource that the requester wants access to.
 */
export interface AccessRequestTargetIdCompact {
  /** Globally unique identifier of the resource, as a string. */
  gid?: string;
  /** The base type of this resource. */
  resource_type?: string;
}

/**
 * A request to create shareable access for a user.
 */
export interface AccessRequestCreateRequest {
  /** The access requestable object that the user is requesting access to. This is the gid of the target. Supports projects and portfolios. */
  target: string;
  /** The optional message to include with the access request. This can be used to provide context or additional information about the request. */
  message?: string;
}

/**
 * A request to approve access for a user.
 */
export interface AccessRequestApproveRequest {
  /** The ID of the access request that the user is approving. */
  access_request_gid?: string;
}

/**
 * A request to reject access for a user.
 */
export interface AccessRequestRejectRequest {
  /** The ID of the access request that the user is rejecting. */
  access_request_gid?: string;
}

/**
 * An emoji reaction on an object.
 */
export interface ReactionCompact {
  /** The ID of the reaction object. */
  gid?: string;
  /** The emoji string used in the reaction. */
  emoji?: string;
  user?: UserCompact;
}

/**
 * A summary of an emoji reaction on an object.
 */
export interface ReactionSummaryItemCompact {
  /** The emoji base character used in the reaction. */
  emoji_base?: string;
  /** The full emoji string used in the reaction. */
  variant?: string;
  /** The number of reactions with the emoji variant on the object. */
  count?: number;
  /** Whether the current user has reacted with the emoji variant on the object. */
  reacted?: boolean;
}
