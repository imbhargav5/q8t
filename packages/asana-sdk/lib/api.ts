// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/asana_oas.yaml

import type { HttpClient } from "../src/auth/pat-client";
import type * as Types from "./types";

/**
 * Asana API client with all available endpoints
 * 
 * This class provides type-safe access to all Asana API endpoints.
 * Use createPATClient or createOAuth2Client to create an authenticated HTTP client,
 * then pass it to this class constructor.
 */
export class AsanaApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get access requests
   * 
   * Returns the pending access requests for a target object or a target object filtered by user.
   * @param params - Query parameters
   */
  async getAccessRequests(params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/access_requests", {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/access_requests");
  }

  /**
   * Create an access request
   * 
   * Submits a new access request for a private object. Currently supports projects and portfolios.
   * @param body - Request body
   */
  async createAccessRequest(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>("/access_requests", { data: body });
  }

  /**
   * Approve an access request
   * 
   * Approves an access request for a target object.
   * @param access_request_gid - Path parameter
   */
  async approveAccessRequest(access_request_gid: string): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/access_requests/${access_request_gid}/approve`);
  }

  /**
   * Reject an access request
   * 
   * Rejects an access request for a target object.
   * @param access_request_gid - Path parameter
   */
  async rejectAccessRequest(access_request_gid: string): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/access_requests/${access_request_gid}/reject`);
  }

  /**
   * Get an allocation
   * 
   * Returns the complete allocation record for a single allocation.
   * @param allocation_gid - Path parameter
   * @param params - Query parameters
   */
  async getAllocation(allocation_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/allocations/${allocation_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/allocations/${allocation_gid}`);
  }

  /**
   * Update an allocation
   * 
   * An existing allocation can be updated by making a PUT request on the URL for
that allocation. Only the fields provided in the `data` block will be updated;
any unspecified fields will remain unchanged.

Returns the complete updated allocation record.
   * @param allocation_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateAllocation(allocation_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/allocations/${allocation_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/allocations/${allocation_gid}`, { data: body });
  }

  /**
   * Delete an allocation
   * 
   * A specific, existing allocation can be deleted by making a DELETE request on the URL for that allocation.

Returns an empty data record.
   * @param allocation_gid - Path parameter
   */
  async deleteAllocation(allocation_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/allocations/${allocation_gid}`);
  }

  /**
   * Get multiple allocations
   * 
   * Returns a list of allocations filtered to a specific project, user or placeholder.
   * @param params - Query parameters
   */
  async getAllocations(params?: { parent?: string; assignee?: string; workspace?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/allocations", {
        "parent": params.parent,
        "assignee": params.assignee,
        "workspace": params.workspace,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/allocations");
  }

  /**
   * Create an allocation
   * 
   * Creates a new allocation.

Returns the full record of the newly created allocation.
   * @param body - Request body
   * @param params - Query parameters
   */
  async createAllocation(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/allocations", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/allocations", { data: body });
  }

  /**
   * Get an attachment
   * 
   * <b>Required scope: </b><code>attachments:read</code>

Get the full record for a single attachment.
   * @param attachment_gid - Path parameter
   * @param params - Query parameters
   */
  async getAttachment(attachment_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/attachments/${attachment_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/attachments/${attachment_gid}`);
  }

  /**
   * Delete an attachment
   * 
   * <b>Required scope: </b><code>attachments:delete</code>

Deletes a specific, existing attachment.

Returns an empty data record.
   * @param attachment_gid - Path parameter
   */
  async deleteAttachment(attachment_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/attachments/${attachment_gid}`);
  }

  /**
   * Get attachments from an object
   * 
   * <b>Required scope: </b><code>attachments:read</code>

Returns the compact records for all attachments on the object.
There are three possible `parent` values for this request: `project`, `project_brief`, and `task`. For a project, an attachment refers to a file uploaded to the "Key resources" section in the project Overview. For a project brief, an attachment refers to inline files in the project brief itself. For a task, an attachment refers to a file directly associated to that task.

Note that within the Asana app, inline images in the task description do not appear in the index of image thumbnails nor as stories in the task. However, requests made to `GET /attachments` for a task will return all of the images in the task, including inline images.
   * @param params - Query parameters
   */
  async getAttachmentsForObject(params?: { parent?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/attachments", {
        "parent": params.parent,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/attachments");
  }

  /**
   * Upload an attachment
   * 
   * <b>Required scope: </b><code>attachments:write</code>

Upload an attachment.

This method uploads an attachment on an object and returns the compact
record for the created attachment object. This is possible by either:

- Providing the URL of the external resource being attached, or
- Downloading the file content first and then uploading it as any other attachment. Note that it is not possible to attach
files from third party services such as Dropbox, Box, Vimeo & Google Drive via the API

The 100MB size limit on attachments in Asana is enforced on this endpoint.

This endpoint expects a multipart/form-data encoded request containing the full contents of the file to be uploaded.

Requests made should follow the HTTP/1.1 specification that line
terminators are of the form `CRLF` or `\r\n` outlined
[here](http://www.w3.org/Protocols/HTTP/1.1/draft-ietf-http-v11-spec-01#Basic-Rules) in order for the server to reliably and properly handle the request.

For file names that contain non-ASCII characters, the file name should be URL-encoded. For example, a file named `résumé.pdf` should be encoded as
`r%C3%A9sum%C3%A9.pdf` and the `filename` parameter in the `Content-Disposition` header should be set to the encoded file name.

Below is an example of a cURL request with the `Content-Disposition` header:

```
export ASANA_PAT="<YOUR_ASANA_PERSONAL_ACCESS_TOKEN>"
export PARENT_ID="<PARENT_GID>"
export ENCODED_NAME="r%C3%A9sum%C3%A9.pdf"
curl --location 'https://app.asana.com/api/1.0/attachments' \
  --header 'Content-Type: multipart/form-data' \
  --header 'Accept: application/json' \
  --header "Authorization: Bearer $ASANA_PAT" \
  --form "parent=$PARENT_ID" \
  --form "file=@/Users/exampleUser/Downloads/résumé.pdf;headers=\"Content-Disposition: form-data; name="file"; filename="$ENCODED_NAME.pdf"; filename*=UTF-8''$ENCODED_NAME.pdf\""
```
   * @param params - Query parameters
   */
  async createAttachmentForObject(params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/attachments", undefined, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/attachments");
  }

  /**
   * Get audit log events
   * 
   * Retrieve the audit log events that have been captured in your domain.

This endpoint will return a list of [AuditLogEvent](/reference/audit-log-api) objects, sorted by creation time in ascending order. Note that the Audit Log API captures events from October 8th, 2021 and later. Queries for events before this date will not return results.

There are a number of query parameters (below) that can be used to filter the set of [AuditLogEvent](/reference/audit-log-api) objects that are returned in the response. Any combination of query parameters is valid. When no filters are provided, all of the events that have been captured in your domain will match.

The list of events will always be [paginated](/docs/pagination). The default limit is 1000 events. The next set of events can be retrieved using the `offset` from the previous response. If there are no events that match the provided filters in your domain, the endpoint will return `null` for the `next_page` field. Querying again with the same filters may return new events if they were captured after the last request. Once a response includes a `next_page` with an `offset`, subsequent requests can be made with the latest `offset` to poll for new events that match the provided filters.

*Note: If the filters you provided match events in your domain and `next_page` is present in the response, we will continue to send `next_page` on subsequent requests even when there are no more events that match the filters. This was put in place so that you can implement an audit log stream that will return future events that match these filters. If you are not interested in future events that match the filters you have defined, you can rely on checking empty `data` response for the end of current events that match your filters.*

When no `offset` is provided, the response will begin with the oldest events that match the provided filters. It is important to note that [AuditLogEvent](/reference/audit-log-api) objects will be permanently deleted from our systems after 90 days. If you wish to keep a permanent record of these events, we recommend using a SIEM tool to ingest and store these logs.
   * @param workspace_gid - Path parameter
   */
  async getAuditLogEvents(workspace_gid: string): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/audit_log_events`);
  }

  /**
   * Submit parallel requests
   * 
   * Make multiple requests in parallel to Asana's API.
   * @param body - Request body
   * @param params - Query parameters
   */
  async createBatchRequest(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/batch", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/batch", { data: body });
  }

  /**
   * Get all budgets
   * 
   * Gets all budgets for a given *parent*. This will at most return a list of size 1 for a given *parent*.
   * @param params - Query parameters
   */
  async getBudgets(params?: { parent?: string }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/budgets", {
        "parent": params.parent,
      });
    }
    return this.client.get<Record<string, unknown>>("/budgets");
  }

  /**
   * Create a budget
   * 
   * Creates a new budget.
   * @param body - Request body
   */
  async createBudget(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>("/budgets", { data: body });
  }

  /**
   * Get a budget
   * 
   * Returns the complete budget record for a single budget.
   * @param budget_gid - Path parameter
   * @param params - Query parameters
   */
  async getBudget(budget_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/budgets/${budget_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/budgets/${budget_gid}`);
  }

  /**
   * Update a budget
   * 
   * An existing budget can be updated by making a PUT request on the URL for
that budget. Only the fields provided in the `data` block will be updated;
any unspecified fields will remain unchanged.
   * @param budget_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateBudget(budget_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/budgets/${budget_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/budgets/${budget_gid}`, { data: body });
  }

  /**
   * Delete a budget
   * 
   * A specific, existing budget can be deleted by making a DELETE request on the URL for that budget.

Returns an empty data record.
   * @param budget_gid - Path parameter
   */
  async deleteBudget(budget_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/budgets/${budget_gid}`);
  }

  /**
   * Get a project's custom fields
   * 
   * Returns a list of all of the custom fields settings on a project, in compact form. Note that, as in all queries to collections which return compact representation, `opt_fields` can be used to include more data than is returned in the compact representation. See the [documentation for input/output options](https://developers.asana.com/docs/inputoutput-options) for more information.
   * @param project_gid - Path parameter
   * @param params - Query parameters
   */
  async getCustomFieldSettingsForProject(project_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/projects/${project_gid}/custom_field_settings`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/projects/${project_gid}/custom_field_settings`);
  }

  /**
   * Get a portfolio's custom fields
   * 
   * Returns a list of all of the custom fields settings on a portfolio, in compact form.
   * @param portfolio_gid - Path parameter
   * @param params - Query parameters
   */
  async getCustomFieldSettingsForPortfolio(portfolio_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/portfolios/${portfolio_gid}/custom_field_settings`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/portfolios/${portfolio_gid}/custom_field_settings`);
  }

  /**
   * Get a team's custom fields
   * 
   * Returns a list of all of the custom fields settings on a team, in compact form. Note that, as in all queries to collections which return compact representation, `opt_fields` can be used to include more data than is returned in the compact representation. See the [documentation for input/output options](https://developers.asana.com/docs/inputoutput-options) for more information.
   * @param team_gid - Path parameter
   * @param params - Query parameters
   */
  async getCustomFieldSettingsForTeam(team_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/teams/${team_gid}/custom_field_settings`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/teams/${team_gid}/custom_field_settings`);
  }

  /**
   * Create a custom field
   * 
   * <b>Required scope: </b><code>custom_fields:write</code>

Creates a new custom field in a workspace. Every custom field is required
to be created in a specific workspace, and this workspace cannot be
changed once set.

A custom field’s name must be unique within a workspace and not conflict
with names of existing task properties such as `Due Date` or `Assignee`.
A custom field’s type must be one of `text`, `enum`, `multi_enum`, `number`,
`date`, or `people`.

Returns the full record of the newly created custom field.
   * @param body - Request body
   * @param params - Query parameters
   */
  async createCustomField(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/custom_fields", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/custom_fields", { data: body });
  }

  /**
   * Get a custom field
   * 
   * <b>Required scope: </b><code>custom_fields:read</code>

Get the complete definition of a custom field’s metadata.

Since custom fields can be defined for one of a number of types, and
these types have different data and behaviors, there are fields that are
relevant to a particular type. For instance, as noted above, enum_options
is only relevant for the enum type and defines the set of choices that
the enum could represent. The examples below show some of these
type-specific custom field definitions.
   * @param custom_field_gid - Path parameter
   * @param params - Query parameters
   */
  async getCustomField(custom_field_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/custom_fields/${custom_field_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/custom_fields/${custom_field_gid}`);
  }

  /**
   * Update a custom field
   * 
   * <b>Required scope: </b><code>custom_fields:write</code>

A specific, existing custom field can be updated by making a PUT request on the URL for that custom field. Only the fields provided in the `data` block will be updated; any unspecified fields will remain unchanged
When using this method, it is best to specify only those fields you wish to change, or else you may overwrite changes made by another user since you last retrieved the custom field.
A custom field’s `type` cannot be updated.
An enum custom field’s `enum_options` cannot be updated with this endpoint. Instead see “Work With Enum Options” for information on how to update `enum_options`.
Locked custom fields can only be updated by the user who locked the field.
Returns the complete updated custom field record.
   * @param custom_field_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateCustomField(custom_field_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/custom_fields/${custom_field_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/custom_fields/${custom_field_gid}`, { data: body });
  }

  /**
   * Delete a custom field
   * 
   * A specific, existing custom field can be deleted by making a DELETE request on the URL for that custom field.
Locked custom fields can only be deleted by the user who locked the field.
Returns an empty data record.
   * @param custom_field_gid - Path parameter
   */
  async deleteCustomField(custom_field_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/custom_fields/${custom_field_gid}`);
  }

  /**
   * Get a workspace's custom fields
   * 
   * <b>Required scope: </b><code>custom_fields:read</code>

Returns a list of the compact representation of all of the custom fields in a workspace.
   * @param workspace_gid - Path parameter
   * @param params - Query parameters
   */
  async getCustomFieldsForWorkspace(workspace_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/custom_fields`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/custom_fields`);
  }

  /**
   * Create an enum option
   * 
   * <b>Required scope: </b><code>custom_fields:write</code>

Creates an enum option and adds it to this custom field’s list of enum options. A custom field can have at most 500 enum options (including disabled options). By default new enum options are inserted at the end of a custom field’s list.
Locked custom fields can only have enum options added by the user who locked the field.
Returns the full record of the newly created enum option.
   * @param custom_field_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async createEnumOptionForCustomField(custom_field_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/custom_fields/${custom_field_gid}/enum_options`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/custom_fields/${custom_field_gid}/enum_options`, { data: body });
  }

  /**
   * Reorder a custom field's enum
   * 
   * <b>Required scope: </b><code>custom_fields:write</code>

Moves a particular enum option to be either before or after another specified enum option in the custom field.
Locked custom fields can only be reordered by the user who locked the field.
   * @param custom_field_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async insertEnumOptionForCustomField(custom_field_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/custom_fields/${custom_field_gid}/enum_options/insert`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/custom_fields/${custom_field_gid}/enum_options/insert`, { data: body });
  }

  /**
   * Update an enum option
   * 
   * <b>Required scope: </b><code>custom_fields:write</code>

Updates an existing enum option. Enum custom fields require at least one enabled enum option.
Locked custom fields can only be updated by the user who locked the field.
Returns the full record of the updated enum option.
   * @param enum_option_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateEnumOption(enum_option_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/enum_options/${enum_option_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/enum_options/${enum_option_gid}`, { data: body });
  }

  /**
   * Get all custom types associated with an object
   * 
   * Returns a list of all of the custom types associated with an object. Currently, only projects are supported. Note that, as in all queries to collections which return compact representation, `opt_fields` can be used to include more data than is returned in the compact representation. See the [documentation for input/output options](https://developers.asana.com/docs/inputoutput-options) for more information.
   * @param params - Query parameters
   */
  async getCustomTypes(params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/custom_types", {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/custom_types");
  }

  /**
   * Get a custom type
   * 
   * Returns the complete custom type record for a single custom type.
   * @param custom_type_gid - Path parameter
   * @param params - Query parameters
   */
  async getCustomType(custom_type_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/custom_types/${custom_type_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/custom_types/${custom_type_gid}`);
  }

  /**
   * Get events on a resource
   * 
   * Returns the full record for all events that have occurred since the sync
token was created.

A `GET` request to the endpoint `/[path_to_resource]/events` can be made in
lieu of including the resource ID in the data for the request.

Asana limits a single sync token to 100 events. If more than 100 events exist
for a given resource, `has_more: true` will be returned in the response, indicating
that there are more events to pull.

*Note: The resource returned will be the resource that triggered the
event. This may be different from the one that the events were requested
for. For example, a subscription to a project will contain events for
tasks contained within the project.*
   * @param params - Query parameters
   */
  async getEvents(params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/events", {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/events");
  }

  /**
   * Initiate a graph export
   * 
   * Initiates a graph export job for a given parent object
(goal, team, portfolio, or project). The export will be processed asynchronously.
Once initiated, use the [jobs](/reference/getjob) endpoint to monitor progress.

**Export Caching:** When exporting more than 1,000 tasks, the results are cached for 4 hours. Any new export requests made within this 4-hour window will return the same cached results rather than generating a fresh export.
   * @param body - Request body
   */
  async createGraphExport(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>("/exports/graph", { data: body });
  }

  /**
   * Initiate a resource export
   * 
   * Initiates a bulk export of resources for a workspace. The export will be processed asynchronously. Once the export has been requested, its progress can be monitored using the [jobs](/reference/getjob) endpoint.

## Supported resource types
This endpoint currently supports exporting tasks, teams and messages within a workspace. Resources can be requested to be part of the export by providing the `export_request_parameters` parameter. The following resource types are supported:

### Tasks:
Tasks are formatted for exports with some differences from their documented [schema](/reference/tasks):
  - `attachments` are included by default and returns an array of associated attachments.
  - Attachment objects do not include `download_url` or `view_url`. The `attachments` [endpoint](/reference/attachment) should be queried for up-to-date URLs.
  - `stories` are included by default and returns an array of comments and other changes made to a task

### Teams:
Teams are formatted for exports with these differences from their documented [schema](/reference/teams):
  - `members` are included by default and returns an array of Users that are members of the team
  - Filtering is not supported for teams.

### Messages:
The returned schema encompasses both default messages and status updates and is similar to the status update schema.
The available fields for messages are:
  - `gid` - The globally unique identifier for the message.
  - `resource_type` - The type of resource, which is always "message".
  - `resource_subtype` - Optional. The subtype of the message, which can be "default" or "status_update".
  - `status_type` - The type associated with the status update. This can be one of: “on_track”, “at_risk”, “off_track”, “on_hold”, “complete”, “achieved”, “partial”, “missed”, “dropped”
  - `created_by` - The user who created the message.
  - `created_at` - The time at which this resource was created and sent available to other users.
  - `modified_at` - The time at which this resource was last modified.
  - `title` - The title of the message.
  - `text` - The text content of the message.
  - `html_notes` - The text content of the message with formatting as HTML. Not included by default. Can be included by using “fields” in the initial request.
  - `num_likes` - The number of users who have liked this message.
  - `likes` - An array of users who have liked this message.
  - `stories` - Optional. Array of stories applied to the message.
  - `attachments` - Optional. Array of attachments added to the message.
  - `followers` - Optional. Array of users currently following the message. Users that were sent the message are treated as followers.
  - `parents` - Array of objects the message was sent to. Can be a Project, Portfolio, Team or Goal. Limited to a single object for status updates.


## Export file
The final export file will be in JSON Lines format and compressed in a gzip container.

Objects are formatted according to their corresponding API schema, or limited to the fields
included in the `fields` parameter. Exports currently include undeleted objects.

An object in the export will be up to date anywhere between the exports `created_at` and `completed_at`. There is no guaranteed ordering of objects in the export.

Access to the export file expires 30 days after its completion.

## Exporting specific fields
By default, each object in an export includes a predefined set of fields based on its schema. If a more limited set of fields
or fields not included by default are required, the Export API allows for specifying which fields to include in the requested export.

Fields can be specified using the `fields` parameter. The fields parameter conforms to the fields
optional parameter available for all Asana endpoints which is documented [here](https://developers.asana.com/docs/inputoutput-options).

Utilizing the `fields` parameter is recommended if the full object is not required, especially when a large number of objects are being exported, to reduce the overall export time.

## Filtering resources
A disjunction of two or more filters can be achieved by providing multiple `export_request_parameters` for the same resource, each with different filters.
However, this approach may result in duplicate resources being returned.

## Rate Limits
A workspace is currently limited to *one* in progress export request at a given time. The request will return with a 403 Forbidden status code if the limit is exceeded.
   * @param body - Request body
   */
  async createResourceExport(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>("/exports/resource", { data: body });
  }

  /**
   * Get a goal relationship
   * 
   * Returns the complete updated goal relationship record for a single goal relationship.
   * @param goal_relationship_gid - Path parameter
   * @param params - Query parameters
   */
  async getGoalRelationship(goal_relationship_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/goal_relationships/${goal_relationship_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/goal_relationships/${goal_relationship_gid}`);
  }

  /**
   * Update a goal relationship
   * 
   * An existing goal relationship can be updated by making a PUT request on the URL for
that goal relationship. Only the fields provided in the `data` block will be updated;
any unspecified fields will remain unchanged.

Returns the complete updated goal relationship record.
   * @param goal_relationship_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateGoalRelationship(goal_relationship_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/goal_relationships/${goal_relationship_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/goal_relationships/${goal_relationship_gid}`, { data: body });
  }

  /**
   * Get goal relationships
   * 
   * Returns compact goal relationship records.
   * @param params - Query parameters
   */
  async getGoalRelationships(params?: { supported_goal?: string; resource_subtype?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/goal_relationships", {
        "supported_goal": params.supported_goal,
        "resource_subtype": params.resource_subtype,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/goal_relationships");
  }

  /**
   * Add a supporting goal relationship
   * 
   * Creates a goal relationship by adding a supporting resource to a given goal.

Returns the newly created goal relationship record.
   * @param goal_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async addSupportingRelationship(goal_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/goals/${goal_gid}/addSupportingRelationship`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/goals/${goal_gid}/addSupportingRelationship`, { data: body });
  }

  /**
   * Removes a supporting goal relationship
   * 
   * Removes a goal relationship for a given parent goal.
   * @param goal_gid - Path parameter
   * @param body - Request body
   */
  async removeSupportingRelationship(goal_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/goals/${goal_gid}/removeSupportingRelationship`, { data: body });
  }

  /**
   * Get a goal
   * 
   * <b>Required scope: </b><code>goals:read</code>

<table>
  <tr>
    <th>Field</th>
    <th>Required Scope</th>
  </tr>
  <tr>
    <td><code>time_period</code></td>
    <td><code>time_periods:read</code></td>
  </tr>
  <tr>
    <td><code>custom_field_settings</code></td>
    <td><code>custom_fields:read</code></td>
  </tr>
</table>

Returns the complete goal record for a single goal.
   * @param goal_gid - Path parameter
   * @param params - Query parameters
   */
  async getGoal(goal_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/goals/${goal_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/goals/${goal_gid}`);
  }

  /**
   * Update a goal
   * 
   * An existing goal can be updated by making a PUT request on the URL for
that goal. Only the fields provided in the `data` block will be updated;
any unspecified fields will remain unchanged.

Returns the complete updated goal record.
   * @param goal_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateGoal(goal_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/goals/${goal_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/goals/${goal_gid}`, { data: body });
  }

  /**
   * Delete a goal
   * 
   * A specific, existing goal can be deleted by making a DELETE request on the URL for that goal.

Returns an empty data record.
   * @param goal_gid - Path parameter
   */
  async deleteGoal(goal_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/goals/${goal_gid}`);
  }

  /**
   * Get goals
   * 
   * <b>Required scope: </b><code>goals:read</code>

Returns compact goal records.
   * @param params - Query parameters
   */
  async getGoals(params?: { portfolio?: string; project?: string; task?: string; is_workspace_level?: boolean; team?: string; workspace?: string; time_periods?: string[]; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/goals", {
        "portfolio": params.portfolio,
        "project": params.project,
        "task": params.task,
        "is_workspace_level": params.is_workspace_level,
        "team": params.team,
        "workspace": params.workspace,
        "time_periods": params.time_periods,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/goals");
  }

  /**
   * Create a goal
   * 
   * Creates a new goal in a workspace or team.

Returns the full record of the newly created goal.
   * @param body - Request body
   * @param params - Query parameters
   */
  async createGoal(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/goals", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/goals", { data: body });
  }

  /**
   * Create a goal metric
   * 
   * Creates and adds a goal metric to a specified goal. Note that this replaces an existing goal metric if one already exists.
   * @param goal_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async createGoalMetric(goal_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/goals/${goal_gid}/setMetric`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/goals/${goal_gid}/setMetric`, { data: body });
  }

  /**
   * Update a goal metric
   * 
   * Updates a goal's existing metric's `current_number_value` if one exists,
otherwise responds with a 400 status code.

Returns the complete updated goal metric record.
   * @param goal_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateGoalMetric(goal_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/goals/${goal_gid}/setMetricCurrentValue`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/goals/${goal_gid}/setMetricCurrentValue`, { data: body });
  }

  /**
   * Add a collaborator to a goal
   * 
   * Adds followers to a goal. Returns the goal the followers were added to.
Each goal can be associated with zero or more followers in the system.
Requests to add/remove followers, if successful, will return the complete updated goal record, described above.
   * @param goal_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async addFollowers(goal_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/goals/${goal_gid}/addFollowers`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/goals/${goal_gid}/addFollowers`, { data: body });
  }

  /**
   * Remove a collaborator from a goal
   * 
   * Removes followers from a goal. Returns the goal the followers were removed from.
Each goal can be associated with zero or more followers in the system.
Requests to add/remove followers, if successful, will return the complete updated goal record, described above.
   * @param goal_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async removeFollowers(goal_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/goals/${goal_gid}/removeFollowers`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/goals/${goal_gid}/removeFollowers`, { data: body });
  }

  /**
   * Get parent goals from a goal
   * 
   * <b>Required scope: </b><code>goals:read</code>

Returns a compact representation of all of the parent goals of a goal.
   * @param goal_gid - Path parameter
   * @param params - Query parameters
   */
  async getParentGoalsForGoal(goal_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/goals/${goal_gid}/parentGoals`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/goals/${goal_gid}/parentGoals`);
  }

  /**
   * Get a job by id
   * 
   * Returns the full record for a job.
   * @param job_gid - Path parameter
   * @param params - Query parameters
   */
  async getJob(job_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/jobs/${job_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/jobs/${job_gid}`);
  }

  /**
   * Get multiple memberships
   * 
   * Returns compact `goal_membership`, `project_membership`, `portfolio_membership`, or `custom_field_membership` records. The possible types for `parent` in this request are `goal`, `project`, `portfolio`, or `custom_field`. An additional member (user GID or team GID) can be passed in to filter to a specific membership.
   * @param params - Query parameters
   */
  async getMemberships(params?: { parent?: string; member?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/memberships", {
        "parent": params.parent,
        "member": params.member,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/memberships");
  }

  /**
   * Create a membership
   * 
   * Creates a new membership in a `goal`, `project`, `portfolio`, or `custom_field`, where members can be Teams or Users.

Returns the full record of the newly created membership.
   * @param body - Request body
   */
  async createMembership(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>("/memberships", { data: body });
  }

  /**
   * Get a membership
   * 
   * Returns a `project_membership`, `goal_membership`, `portfolio_membership`, or `custom_field_membership` record for a membership id.
   * @param membership_gid - Path parameter
   */
  async getMembership(membership_gid: string): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>(`/memberships/${membership_gid}`);
  }

  /**
   * Update a membership
   * 
   * An existing membership can be updated by making a `PUT` request on the membership. Only the fields provided in the `data` block will be updated;
any unspecified fields will remain unchanged. Memberships on `goals`, `projects`, `portfolios`, and `custom_fields` can be updated.

Returns the full record of the updated membership.
   * @param membership_gid - Path parameter
   * @param body - Request body
   */
  async updateMembership(membership_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.put<Record<string, unknown>>(`/memberships/${membership_gid}`, { data: body });
  }

  /**
   * Delete a membership
   * 
   * A specific, existing membership for a `goal`, `project`, `portfolio` or `custom_field` can be deleted by making a `DELETE` request
on the URL for that membership.

Returns an empty data record.
   * @param membership_gid - Path parameter
   */
  async deleteMembership(membership_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/memberships/${membership_gid}`);
  }

  /**
   * Create an organization export request
   * 
   * This method creates a request to export an Organization. Asana will complete the export at some point after you create the request.
   * @param body - Request body
   * @param params - Query parameters
   */
  async createOrganizationExport(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/organization_exports", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/organization_exports", { data: body });
  }

  /**
   * Get details on an org export request
   * 
   * Returns details of a previously-requested Organization export.
   * @param organization_export_gid - Path parameter
   * @param params - Query parameters
   */
  async getOrganizationExport(organization_export_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/organization_exports/${organization_export_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/organization_exports/${organization_export_gid}`);
  }

  /**
   * Get multiple portfolio memberships
   * 
   * Returns a list of portfolio memberships in compact representation. You must specify `portfolio`, `portfolio` and `user`, or `workspace` and `user`.
   * @param params - Query parameters
   */
  async getPortfolioMemberships(params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/portfolio_memberships", {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/portfolio_memberships");
  }

  /**
   * Get a portfolio membership
   * 
   * Returns the complete portfolio record for a single portfolio membership.
   * @param portfolio_membership_gid - Path parameter
   * @param params - Query parameters
   */
  async getPortfolioMembership(portfolio_membership_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/portfolio_memberships/${portfolio_membership_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/portfolio_memberships/${portfolio_membership_gid}`);
  }

  /**
   * Get memberships from a portfolio
   * 
   * Returns the compact portfolio membership records for the portfolio.
   * @param portfolio_gid - Path parameter
   * @param params - Query parameters
   */
  async getPortfolioMembershipsForPortfolio(portfolio_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/portfolios/${portfolio_gid}/portfolio_memberships`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/portfolios/${portfolio_gid}/portfolio_memberships`);
  }

  /**
   * Get multiple portfolios
   * 
   * <b>Required scope: </b><code>portfolios:read</code>

Returns a list of the portfolios in compact representation that are owned by the current API user.
   * @param params - Query parameters
   */
  async getPortfolios(params?: { workspace?: string; owner?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/portfolios", {
        "workspace": params.workspace,
        "owner": params.owner,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/portfolios");
  }

  /**
   * Create a portfolio
   * 
   * <b>Required scope: </b><code>portfolios:write</code>

Creates a new portfolio in the given workspace with the supplied name.

Note that portfolios created in the Asana UI may have some state
(like the “Priority” custom field) which is automatically added
to the portfolio when it is created. Portfolios created via our
API will *not* be created with the same initial state to allow
integrations to create their own starting state on a portfolio.
   * @param body - Request body
   * @param params - Query parameters
   */
  async createPortfolio(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/portfolios", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/portfolios", { data: body });
  }

  /**
   * Get a portfolio
   * 
   * <b>Required scope: </b><code>portfolios:read</code>

<table>
  <tr>
    <th>Field</th>
    <th>Required Scope</th>
  </tr>
  <tr>
    <td><code>custom_field_settings</code></td>
    <td><code>custom_fields:read</code></td>
  </tr>
</table>

Returns the complete portfolio record for a single portfolio.
   * @param portfolio_gid - Path parameter
   * @param params - Query parameters
   */
  async getPortfolio(portfolio_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/portfolios/${portfolio_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/portfolios/${portfolio_gid}`);
  }

  /**
   * Update a portfolio
   * 
   * <b>Required scope: </b><code>portfolios:write</code>

An existing portfolio can be updated by making a PUT request on the URL for
that portfolio. Only the fields provided in the `data` block will be updated;
any unspecified fields will remain unchanged.

Returns the complete updated portfolio record.
   * @param portfolio_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updatePortfolio(portfolio_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/portfolios/${portfolio_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/portfolios/${portfolio_gid}`, { data: body });
  }

  /**
   * Delete a portfolio
   * 
   * An existing portfolio can be deleted by making a DELETE request on
the URL for that portfolio.

Returns an empty data record.
   * @param portfolio_gid - Path parameter
   */
  async deletePortfolio(portfolio_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/portfolios/${portfolio_gid}`);
  }

  /**
   * Get portfolio items
   * 
   * <b>Required scope: </b><code>portfolios:read</code>

Get a list of the items in compact form in a portfolio.
   * @param portfolio_gid - Path parameter
   * @param params - Query parameters
   */
  async getItemsForPortfolio(portfolio_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/portfolios/${portfolio_gid}/items`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/portfolios/${portfolio_gid}/items`);
  }

  /**
   * Add a portfolio item
   * 
   * <b>Required scope: </b><code>portfolios:write</code>

Add an item to a portfolio.
Returns an empty data block.
   * @param portfolio_gid - Path parameter
   * @param body - Request body
   */
  async addItemForPortfolio(portfolio_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/portfolios/${portfolio_gid}/addItem`, { data: body });
  }

  /**
   * Remove a portfolio item
   * 
   * <b>Required scope: </b><code>portfolios:write</code>

Remove an item from a portfolio.
Returns an empty data block.
   * @param portfolio_gid - Path parameter
   * @param body - Request body
   */
  async removeItemForPortfolio(portfolio_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/portfolios/${portfolio_gid}/removeItem`, { data: body });
  }

  /**
   * Add a custom field to a portfolio
   * 
   * <b>Required scope: </b><code>portfolios:write</code>

Custom fields are associated with portfolios by way of custom field settings.  This method creates a setting for the portfolio.
   * @param portfolio_gid - Path parameter
   * @param body - Request body
   */
  async addCustomFieldSettingForPortfolio(portfolio_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/portfolios/${portfolio_gid}/addCustomFieldSetting`, { data: body });
  }

  /**
   * Remove a custom field from a portfolio
   * 
   * <b>Required scope: </b><code>portfolios:write</code>

Removes a custom field setting from a portfolio.
   * @param portfolio_gid - Path parameter
   * @param body - Request body
   */
  async removeCustomFieldSettingForPortfolio(portfolio_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/portfolios/${portfolio_gid}/removeCustomFieldSetting`, { data: body });
  }

  /**
   * Add users to a portfolio
   * 
   * Adds the specified list of users as members of the portfolio.
Returns the updated portfolio record.
   * @param portfolio_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async addMembersForPortfolio(portfolio_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/portfolios/${portfolio_gid}/addMembers`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/portfolios/${portfolio_gid}/addMembers`, { data: body });
  }

  /**
   * Remove users from a portfolio
   * 
   * Removes the specified list of users from members of the portfolio.
Returns the updated portfolio record.
   * @param portfolio_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async removeMembersForPortfolio(portfolio_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/portfolios/${portfolio_gid}/removeMembers`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/portfolios/${portfolio_gid}/removeMembers`, { data: body });
  }

  /**
   * Get a project brief
   * 
   * Get the full record for a project brief.
   * @param project_brief_gid - Path parameter
   * @param params - Query parameters
   */
  async getProjectBrief(project_brief_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/project_briefs/${project_brief_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/project_briefs/${project_brief_gid}`);
  }

  /**
   * Update a project brief
   * 
   * An existing project brief can be updated by making a PUT request on the URL for
that project brief. Only the fields provided in the `data` block will be updated;
any unspecified fields will remain unchanged.

Returns the complete updated project brief record.
   * @param project_brief_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateProjectBrief(project_brief_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/project_briefs/${project_brief_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/project_briefs/${project_brief_gid}`, { data: body });
  }

  /**
   * Delete a project brief
   * 
   * Deletes a specific, existing project brief.

Returns an empty data record.
   * @param project_brief_gid - Path parameter
   */
  async deleteProjectBrief(project_brief_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/project_briefs/${project_brief_gid}`);
  }

  /**
   * Create a project brief
   * 
   * Creates a new project brief.

Returns the full record of the newly created project brief.
   * @param project_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async createProjectBrief(project_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/project_briefs`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/project_briefs`, { data: body });
  }

  /**
   * Get a project membership
   * 
   * Returns the complete project record for a single project membership.
   * @param project_membership_gid - Path parameter
   * @param params - Query parameters
   */
  async getProjectMembership(project_membership_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/project_memberships/${project_membership_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/project_memberships/${project_membership_gid}`);
  }

  /**
   * Get memberships from a project
   * 
   * Returns the compact project membership records for the project.
   * @param project_gid - Path parameter
   * @param params - Query parameters
   */
  async getProjectMembershipsForProject(project_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/projects/${project_gid}/project_memberships`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/projects/${project_gid}/project_memberships`);
  }

  /**
   * Get a project status
   * 
   * *Deprecated: new integrations should prefer the `/status_updates/{status_gid}` route.*

Returns the complete record for a single status update.
   * @param project_status_gid - Path parameter
   * @param params - Query parameters
   */
  async getProjectStatus(project_status_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/project_statuses/${project_status_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/project_statuses/${project_status_gid}`);
  }

  /**
   * Delete a project status
   * 
   * *Deprecated: new integrations should prefer the `/status_updates/{status_gid}` route.*

Deletes a specific, existing project status update.

Returns an empty data record.
   * @param project_status_gid - Path parameter
   */
  async deleteProjectStatus(project_status_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/project_statuses/${project_status_gid}`);
  }

  /**
   * Get statuses from a project
   * 
   * *Deprecated: new integrations should prefer the `/status_updates` route.*

Returns the compact project status update records for all updates on the project.
   * @param project_gid - Path parameter
   * @param params - Query parameters
   */
  async getProjectStatusesForProject(project_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/projects/${project_gid}/project_statuses`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/projects/${project_gid}/project_statuses`);
  }

  /**
   * Create a project status
   * 
   * *Deprecated: new integrations should prefer the `/status_updates` route.*

Creates a new status update on the project.

Returns the full record of the newly created project status update.
   * @param project_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async createProjectStatusForProject(project_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/project_statuses`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/project_statuses`, { data: body });
  }

  /**
   * Get a project template
   * 
   * <b>Required scope: </b><code>project_templates:read</code>

Returns the complete project template record for a single project template.
   * @param project_template_gid - Path parameter
   * @param params - Query parameters
   */
  async getProjectTemplate(project_template_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/project_templates/${project_template_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/project_templates/${project_template_gid}`);
  }

  /**
   * Delete a project template
   * 
   * A specific, existing project template can be deleted by making a DELETE request on the URL for that project template.

Returns an empty data record.
   * @param project_template_gid - Path parameter
   */
  async deleteProjectTemplate(project_template_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/project_templates/${project_template_gid}`);
  }

  /**
   * Get multiple project templates
   * 
   * <b>Required scope: </b><code>project_templates:read</code>

Returns the compact project template records for all project templates in the given team or workspace.
   * @param params - Query parameters
   */
  async getProjectTemplates(params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/project_templates", {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/project_templates");
  }

  /**
   * Get a team's project templates
   * 
   * <b>Required scope: </b><code>project_templates:read</code>

Returns the compact project template records for all project templates in the team.
   * @param team_gid - Path parameter
   * @param params - Query parameters
   */
  async getProjectTemplatesForTeam(team_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/teams/${team_gid}/project_templates`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/teams/${team_gid}/project_templates`);
  }

  /**
   * Instantiate a project from a project template
   * 
   * <b>Required scope: </b><code>projects:write</code>

Creates and returns a job that will asynchronously handle the project instantiation.

To form this request, it is recommended to first make a request to [get a project template](/reference/getprojecttemplate). Then, from the response, copy the `gid` from the object in the `requested_dates` array. This `gid` should be used in `requested_dates` to instantiate a project.

_Note: The body of this request will differ if your workspace is an organization. To determine if your workspace is an organization, use the [is_organization](/reference/workspaces) parameter._
   * @param project_template_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async instantiateProject(project_template_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/project_templates/${project_template_gid}/instantiateProject`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/project_templates/${project_template_gid}/instantiateProject`, { data: body });
  }

  /**
   * Get multiple projects
   * 
   * <b>Required scope: </b><code>projects:read</code>

Returns the compact project records for some filtered set of projects. Use one or more of the parameters provided to filter the projects returned.
*Note: This endpoint may timeout for large domains. Try filtering by team!*
   * @param params - Query parameters
   */
  async getProjects(params?: { workspace?: string; team?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/projects", {
        "workspace": params.workspace,
        "team": params.team,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/projects");
  }

  /**
   * Create a project
   * 
   * <b>Required scope: </b><code>projects:write</code>

Create a new project in a workspace or team.

Every project is required to be created in a specific workspace or
organization, and this cannot be changed once set. Note that you can use
the `workspace` parameter regardless of whether or not it is an
organization.

If the workspace for your project is an organization, you must also
supply a `team` to share the project with.

Returns the full record of the newly created project.
   * @param body - Request body
   * @param params - Query parameters
   */
  async createProject(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/projects", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/projects", { data: body });
  }

  /**
   * Get a project
   * 
   * <b>Required scope: </b><code>projects:read</code>

<table>
  <tr>
    <th>Field</th>
    <th>Required Scope</th>
  </tr>
  <tr>
    <td><code>custom_field_settings</code></td>
    <td><code>custom_fields:read</code></td>
  </tr>
  <tr>
    <td><code>team</code></td>
    <td><code>teams:read</code></td>
  </tr>
</table>

Returns the complete project record for a single project.
   * @param project_gid - Path parameter
   * @param params - Query parameters
   */
  async getProject(project_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/projects/${project_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/projects/${project_gid}`);
  }

  /**
   * Update a project
   * 
   * <b>Required scope: </b><code>projects:write</code>

A specific, existing project can be updated by making a PUT request on
the URL for that project. Only the fields provided in the `data` block
will be updated; any unspecified fields will remain unchanged.

When using this method, it is best to specify only those fields you wish
to change, or else you may overwrite changes made by another user since
you last retrieved the task.

Returns the complete updated project record.
   * @param project_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateProject(project_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/projects/${project_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/projects/${project_gid}`, { data: body });
  }

  /**
   * Delete a project
   * 
   * <b>Required scope: </b><code>projects:delete</code>

A specific, existing project can be deleted by making a DELETE request on
the URL for that project.

Returns an empty data record.
   * @param project_gid - Path parameter
   */
  async deleteProject(project_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/projects/${project_gid}`);
  }

  /**
   * Duplicate a project
   * 
   * <b>Required scope: </b><code>projects:write</code>

Creates and returns a job that will asynchronously handle the duplication.
   * @param project_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async duplicateProject(project_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/duplicate`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/duplicate`, { data: body });
  }

  /**
   * Get projects a task is in
   * 
   * <b>Required scope: </b><code>projects:read</code>

Returns a compact representation of all of the projects the task is in.
   * @param task_gid - Path parameter
   * @param params - Query parameters
   */
  async getProjectsForTask(task_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/projects`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/projects`);
  }

  /**
   * Get a team's projects
   * 
   * <b>Required scope: </b><code>projects:read</code>

Returns the compact project records for all projects in the team.
   * @param team_gid - Path parameter
   * @param params - Query parameters
   */
  async getProjectsForTeam(team_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/teams/${team_gid}/projects`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/teams/${team_gid}/projects`);
  }

  /**
   * Create a project in a team
   * 
   * <b>Required scope: </b><code>projects:write</code>

Creates a project shared with the given team.

Returns the full record of the newly created project.
   * @param team_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async createProjectForTeam(team_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/teams/${team_gid}/projects`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/teams/${team_gid}/projects`, { data: body });
  }

  /**
   * Get all projects in a workspace
   * 
   * <b>Required scope: </b><code>projects:read</code>

Returns the compact project records for all projects in the workspace.
*Note: This endpoint may timeout for large domains. Prefer the `/teams/{team_gid}/projects` endpoint.*
   * @param workspace_gid - Path parameter
   * @param params - Query parameters
   */
  async getProjectsForWorkspace(workspace_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/projects`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/projects`);
  }

  /**
   * Create a project in a workspace
   * 
   * <b>Required scope: </b><code>projects:write</code>

Creates a project in the workspace.

If the workspace for your project is an organization, you must also
supply a team to share the project with.

Returns the full record of the newly created project.
   * @param workspace_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async createProjectForWorkspace(workspace_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/workspaces/${workspace_gid}/projects`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/workspaces/${workspace_gid}/projects`, { data: body });
  }

  /**
   * Add a custom field to a project
   * 
   * <b>Required scope: </b><code>projects:write</code>

Custom fields are associated with projects by way of custom field settings.  This method creates a setting for the project.
   * @param project_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async addCustomFieldSettingForProject(project_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/addCustomFieldSetting`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/addCustomFieldSetting`, { data: body });
  }

  /**
   * Remove a custom field from a project
   * 
   * <b>Required scope: </b><code>projects:write</code>

Removes a custom field setting from a project.
   * @param project_gid - Path parameter
   * @param body - Request body
   */
  async removeCustomFieldSettingForProject(project_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/removeCustomFieldSetting`, { data: body });
  }

  /**
   * Get task count of a project
   * 
   * <b>Required scope: </b><code>projects:read</code>

<table>
  <tr>
    <th>Field</th>
    <th>Required Scope</th>
  </tr>
  <tr>
    <td><code>custom_field_settings</code></td>
    <td><code>custom_fields:read</code></td>
  </tr>
  <tr>
    <td><code>team</code></td>
    <td><code>teams:read</code></td>
  </tr>
</table>

Get an object that holds task count fields. **All fields are excluded by default**. You must [opt in](/docs/inputoutput-options) using `opt_fields` to get any information from this endpoint.

This endpoint has an additional [rate limit](/docs/rate-limits) and each field counts especially high against our [cost limits](/docs/rate-limits#cost-limits).

Milestones are just tasks, so they are included in the `num_tasks`, `num_incomplete_tasks`, and `num_completed_tasks` counts.
   * @param project_gid - Path parameter
   * @param params - Query parameters
   */
  async getTaskCountsForProject(project_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/projects/${project_gid}/task_counts`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/projects/${project_gid}/task_counts`);
  }

  /**
   * Add users to a project
   * 
   * Adds the specified list of users as members of the project. Note that a user being added as a member may also be added as a *follower* as a result of this operation. This is because the user's default notification settings (i.e., in the "Notifications" tab of "My Profile Settings") will override this endpoint's default behavior of setting "Tasks added" notifications to `false`.
Returns the updated project record.
   * @param project_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async addMembersForProject(project_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/addMembers`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/addMembers`, { data: body });
  }

  /**
   * Remove users from a project
   * 
   * Removes the specified list of users from members of the project.
Returns the updated project record.
   * @param project_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async removeMembersForProject(project_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/removeMembers`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/removeMembers`, { data: body });
  }

  /**
   * Add followers to a project
   * 
   * Adds the specified list of users as followers to the project. Followers are a subset of members who have opted in to receive "tasks added" notifications for a project. Therefore, if the users are not already members of the project, they will also become members as a result of this operation.
Returns the updated project record.
   * @param project_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async addFollowersForProject(project_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/addFollowers`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/addFollowers`, { data: body });
  }

  /**
   * Remove followers from a project
   * 
   * Removes the specified list of users from following the project, this will not affect project membership status.
Returns the updated project record.
   * @param project_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async removeFollowersForProject(project_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/removeFollowers`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/removeFollowers`, { data: body });
  }

  /**
   * Create a project template from a project
   * 
   * Creates and returns a job that will asynchronously handle the project template creation.
   * @param project_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async projectSaveAsTemplate(project_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/saveAsTemplate`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/saveAsTemplate`, { data: body });
  }

  /**
   * Get multiple rates
   * 
   * Returns a list of `rate` records. The possible types for `parent` in this request are `project`. An additional `resource` (`user` GID or `placeholder` GID) can be passed in to filter to a specific rate.

Modifying placeholder rates is only available for Enterprise and Enterprise+ users.
   * @param params - Query parameters
   */
  async getRates(params?: { parent?: string; resource?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/rates", {
        "parent": params.parent,
        "resource": params.resource,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/rates");
  }

  /**
   * Create a rate
   * 
   * Creates a new rate for a `parent` + `resource` combination.
   * @param body - Request body
   * @param params - Query parameters
   */
  async createRate(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/rates", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/rates", { data: body });
  }

  /**
   * Get a rate
   * 
   * Returns the complete rate record for a single rate.
   * @param rate_gid - Path parameter
   * @param params - Query parameters
   */
  async getRate(rate_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/rates/${rate_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/rates/${rate_gid}`);
  }

  /**
   * Update a rate
   * 
   * An existing rate can be updated by making a PUT request on the URL for
that rate. Only the fields provided in the `data` block will be updated;
any unspecified fields will remain unchanged. (note that at this time, the only field that can be updated is the `rate` field.)

Returns the complete updated rate record.
   * @param rate_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateRate(rate_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/rates/${rate_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/rates/${rate_gid}`, { data: body });
  }

  /**
   * Delete a rate
   * 
   * Deletes a rate.
   * @param rate_gid - Path parameter
   */
  async deleteRate(rate_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/rates/${rate_gid}`);
  }

  /**
   * Get reactions with an emoji base on an object.
   * 
   * Returns the reactions with a specified emoji base character on the object.
   * @param params - Query parameters
   */
  async getReactionsOnObject(params?: { target?: string; emoji_base?: string }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/reactions", {
        "target": params.target,
        "emoji_base": params.emoji_base,
      });
    }
    return this.client.get<Record<string, unknown>>("/reactions");
  }

  /**
   * Trigger a rule
   * 
   * Trigger a rule which uses an ["incoming web request"](/docs/incoming-web-requests) trigger.
   * @param rule_trigger_gid - Path parameter
   * @param body - Request body
   */
  async triggerRule(rule_trigger_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/rule_triggers/${rule_trigger_gid}/run`, { data: body });
  }

  /**
   * Get a section
   * 
   * Returns the complete record for a single section.
   * @param section_gid - Path parameter
   * @param params - Query parameters
   */
  async getSection(section_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/sections/${section_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/sections/${section_gid}`);
  }

  /**
   * Update a section
   * 
   * A specific, existing section can be updated by making a PUT request on
the URL for that project. Only the fields provided in the `data` block
will be updated; any unspecified fields will remain unchanged. (note that
at this time, the only field that can be updated is the `name` field.)

When using this method, it is best to specify only those fields you wish
to change, or else you may overwrite changes made by another user since
you last retrieved the task.

Returns the complete updated section record.
   * @param section_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateSection(section_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/sections/${section_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/sections/${section_gid}`, { data: body });
  }

  /**
   * Delete a section
   * 
   * A specific, existing section can be deleted by making a DELETE request on
the URL for that section.

Note that sections must be empty to be deleted.

The last remaining section cannot be deleted.

Returns an empty data block.
   * @param section_gid - Path parameter
   */
  async deleteSection(section_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/sections/${section_gid}`);
  }

  /**
   * Get sections in a project
   * 
   * Returns the compact records for all sections in the specified project.
   * @param project_gid - Path parameter
   * @param params - Query parameters
   */
  async getSectionsForProject(project_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/projects/${project_gid}/sections`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/projects/${project_gid}/sections`);
  }

  /**
   * Create a section in a project
   * 
   * Creates a new section in a project.
Returns the full record of the newly created section.
   * @param project_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async createSectionForProject(project_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/sections`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/sections`, { data: body });
  }

  /**
   * Add task to section
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Add a task to a specific, existing section. This will remove the task from other sections of the project.

The task will be inserted at the top of a section unless an insert_before or insert_after parameter is declared.

This does not work for separators (tasks with the resource_subtype of section).
   * @param section_gid - Path parameter
   * @param body - Request body
   */
  async addTaskForSection(section_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/sections/${section_gid}/addTask`, { data: body });
  }

  /**
   * Move or Insert sections
   * 
   * Move sections relative to each other. One of
`before_section` or `after_section` is required.

Sections cannot be moved between projects.

Returns an empty data block.
   * @param project_gid - Path parameter
   * @param body - Request body
   */
  async insertSectionForProject(project_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/projects/${project_gid}/sections/insert`, { data: body });
  }

  /**
   * Get a status update
   * 
   * Returns the complete record for a single status update.
   * @param status_update_gid - Path parameter
   * @param params - Query parameters
   */
  async getStatus(status_update_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/status_updates/${status_update_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/status_updates/${status_update_gid}`);
  }

  /**
   * Delete a status update
   * 
   * Deletes a specific, existing status update.

Returns an empty data record.
   * @param status_update_gid - Path parameter
   */
  async deleteStatus(status_update_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/status_updates/${status_update_gid}`);
  }

  /**
   * Get status updates from an object
   * 
   * Returns the compact status update records for all updates on the object.
   * @param params - Query parameters
   */
  async getStatusesForObject(params?: { parent?: string; created_since?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/status_updates", {
        "parent": params.parent,
        "created_since": params.created_since,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/status_updates");
  }

  /**
   * Create a status update
   * 
   * Creates a new status update on an object.
Returns the full record of the newly created status update.
   * @param body - Request body
   * @param params - Query parameters
   */
  async createStatusForObject(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/status_updates", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/status_updates", { data: body });
  }

  /**
   * Get a story
   * 
   * <b>Required scope: </b><code>stories:read</code>

<table>
  <tr>
    <th>Field</th>
    <th>Required Scope</th>
  </tr>
  <tr>
    <td><code>previews</code></td>
    <td><code>attachments:read</code></td>
  </tr>
  <tr>
    <td><code>attachments</code></td>
    <td><code>attachments:read</code></td>
  </tr>
</table>

Returns the full record for a single story.
   * @param story_gid - Path parameter
   * @param params - Query parameters
   */
  async getStory(story_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/stories/${story_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/stories/${story_gid}`);
  }

  /**
   * Update a story
   * 
   * <b>Required scope: </b><code>stories:write</code>

Updates the story and returns the full record for the updated story. Only comment stories can have their text updated, and only comment stories and attachment stories can be pinned. Only one of `text` and `html_text` can be specified.
   * @param story_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateStory(story_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/stories/${story_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/stories/${story_gid}`, { data: body });
  }

  /**
   * Delete a story
   * 
   * Deletes a story. A user can only delete stories they have created.

Returns an empty data record.
   * @param story_gid - Path parameter
   */
  async deleteStory(story_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/stories/${story_gid}`);
  }

  /**
   * Get stories from a task
   * 
   * <b>Required scope: </b><code>stories:read</code>

Returns the compact records for all stories on the task.
   * @param task_gid - Path parameter
   * @param params - Query parameters
   */
  async getStoriesForTask(task_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/stories`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/stories`);
  }

  /**
   * Create a story on a task
   * 
   * <b>Required scope: </b><code>stories:write</code>

Adds a story to a task. This endpoint currently only allows for comment
stories to be created. The comment will be authored by the currently
authenticated user, and timestamped when the server receives the request.

Returns the full record for the new story added to the task.
   * @param task_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async createStoryForTask(task_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/stories`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/stories`, { data: body });
  }

  /**
   * Get multiple tags
   * 
   * <b>Required scope: </b><code>tags:read</code>

Returns the compact tag records for some filtered set of tags. Use one or more of the parameters provided to filter the tags returned.
   * @param params - Query parameters
   */
  async getTags(params?: { workspace?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/tags", {
        "workspace": params.workspace,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/tags");
  }

  /**
   * Create a tag
   * 
   * <b>Required scope: </b><code>tags:write</code>

Creates a new tag in a workspace or organization.

Every tag is required to be created in a specific workspace or
organization, and this cannot be changed once set. Note that you can use
the workspace parameter regardless of whether or not it is an
organization.

Returns the full record of the newly created tag.
   * @param body - Request body
   * @param params - Query parameters
   */
  async createTag(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/tags", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/tags", { data: body });
  }

  /**
   * Get a tag
   * 
   * <b>Required scope: </b><code>tags:read</code>

Returns the complete tag record for a single tag.
   * @param tag_gid - Path parameter
   * @param params - Query parameters
   */
  async getTag(tag_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/tags/${tag_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/tags/${tag_gid}`);
  }

  /**
   * Update a tag
   * 
   * <b>Required scope: </b><code>tags:write</code>

Updates the properties of a tag. Only the fields provided in the `data`
block will be updated; any unspecified fields will remain unchanged.

When using this method, it is best to specify only those fields you wish
to change, or else you may overwrite changes made by another user since
you last retrieved the tag.

Returns the complete updated tag record.
   * @param tag_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateTag(tag_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/tags/${tag_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/tags/${tag_gid}`, { data: body });
  }

  /**
   * Delete a tag
   * 
   * A specific, existing tag can be deleted by making a DELETE request on
the URL for that tag.

Returns an empty data record.
   * @param tag_gid - Path parameter
   */
  async deleteTag(tag_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/tags/${tag_gid}`);
  }

  /**
   * Get a task's tags
   * 
   * <b>Required scope: </b><code>tags:read</code>

Get a compact representation of all of the tags the task has.
   * @param task_gid - Path parameter
   * @param params - Query parameters
   */
  async getTagsForTask(task_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/tags`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/tags`);
  }

  /**
   * Get tags in a workspace
   * 
   * <b>Required scope: </b><code>tags:read</code>

Returns the compact tag records for some filtered set of tags. Use one or more of the parameters provided to filter the tags returned.
   * @param workspace_gid - Path parameter
   * @param params - Query parameters
   */
  async getTagsForWorkspace(workspace_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/tags`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/tags`);
  }

  /**
   * Create a tag in a workspace
   * 
   * <b>Required scope: </b><code>tags:write</code>

Creates a new tag in a workspace or organization.

Every tag is required to be created in a specific workspace or
organization, and this cannot be changed once set. Note that you can use
the workspace parameter regardless of whether or not it is an
organization.

Returns the full record of the newly created tag.
   * @param workspace_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async createTagForWorkspace(workspace_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/workspaces/${workspace_gid}/tags`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/workspaces/${workspace_gid}/tags`, { data: body });
  }

  /**
   * Get multiple task templates
   * 
   * <b>Required scope: </b><code>task_templates:read</code>

Returns the compact task template records for some filtered set of task templates. You must specify a `project`
   * @param params - Query parameters
   */
  async getTaskTemplates(params?: { project?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/task_templates", {
        "project": params.project,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/task_templates");
  }

  /**
   * Get a task template
   * 
   * <b>Required scope: </b><code>task_templates:read</code>

Returns the complete task template record for a single task template.
   * @param task_template_gid - Path parameter
   * @param params - Query parameters
   */
  async getTaskTemplate(task_template_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/task_templates/${task_template_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/task_templates/${task_template_gid}`);
  }

  /**
   * Delete a task template
   * 
   * A specific, existing task template can be deleted by making a DELETE request on the URL for that task template. Returns an empty data record.
   * @param task_template_gid - Path parameter
   */
  async deleteTaskTemplate(task_template_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/task_templates/${task_template_gid}`);
  }

  /**
   * Instantiate a task from a task template
   * 
   * Creates and returns a job that will asynchronously handle the task instantiation.
   * @param task_template_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async instantiateTask(task_template_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/task_templates/${task_template_gid}/instantiateTask`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/task_templates/${task_template_gid}/instantiateTask`, { data: body });
  }

  /**
   * Get multiple tasks
   * 
   * <b>Required scope: </b><code>tasks:read</code>

Returns the compact task records for some filtered set of tasks. Use one or more of the parameters provided to filter the tasks returned. You must specify a `project` or `tag` if you do not specify `assignee` and `workspace`.

For more complex task retrieval, use [workspaces/{workspace_gid}/tasks/search](/reference/searchtasksforworkspace).
   * @param params - Query parameters
   */
  async getTasks(params?: { assignee?: string; project?: string; section?: string; workspace?: string; completed_since?: string; modified_since?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/tasks", {
        "assignee": params.assignee,
        "project": params.project,
        "section": params.section,
        "workspace": params.workspace,
        "completed_since": params.completed_since,
        "modified_since": params.modified_since,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/tasks");
  }

  /**
   * Create a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Creating a new task is as easy as POSTing to the `/tasks` endpoint with a
data block containing the fields you’d like to set on the task. Any
unspecified fields will take on default values.

Every task is required to be created in a specific workspace, and this
workspace cannot be changed once set. The workspace need not be set
explicitly if you specify `projects` or a `parent` task instead.
   * @param body - Request body
   * @param params - Query parameters
   */
  async createTask(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/tasks", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/tasks", { data: body });
  }

  /**
   * Get a task
   * 
   * <b>Required scope: </b><code>tasks:read</code>

<table>
  <tr>
    <th>Field</th>
    <th>Required Scope</th>
  </tr>
  <tr>
    <td><code>memberships</code></td>
    <td><code>projects:read</code>, <code>project_sections:read</code></td>
  </tr>
  <tr>
    <td><code>actual_time_minutes</code></td>
    <td><code>time_tracking_entries:read</code></td>
  </tr>
</table>

Returns the complete task record for a single task.
   * @param task_gid - Path parameter
   * @param params - Query parameters
   */
  async getTask(task_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}`);
  }

  /**
   * Update a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

A specific, existing task can be updated by making a PUT request on the
URL for that task. Only the fields provided in the `data` block will be
updated; any unspecified fields will remain unchanged.

When using this method, it is best to specify only those fields you wish
to change, or else you may overwrite changes made by another user since
you last retrieved the task.

Returns the complete updated task record.
   * @param task_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateTask(task_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/tasks/${task_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/tasks/${task_gid}`, { data: body });
  }

  /**
   * Delete a task
   * 
   * <b>Required scope: </b><code>tasks:delete</code>

A specific, existing task can be deleted by making a DELETE request on
the URL for that task. Deleted tasks go into the “trash” of the user
making the delete request. Tasks can be recovered from the trash within a
period of 30 days; afterward they are completely removed from the system.

Returns an empty data record.
   * @param task_gid - Path parameter
   */
  async deleteTask(task_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/tasks/${task_gid}`);
  }

  /**
   * Duplicate a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Creates and returns a job that will asynchronously handle the duplication.
   * @param task_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async duplicateTask(task_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/duplicate`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/duplicate`, { data: body });
  }

  /**
   * Get tasks from a project
   * 
   * <b>Required scope: </b><code>tasks:read</code>

Returns the compact task records for all tasks within the given project, ordered by their priority within the project. Tasks can exist in more than one project at a time.
   * @param project_gid - Path parameter
   * @param params - Query parameters
   */
  async getTasksForProject(project_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/projects/${project_gid}/tasks`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/projects/${project_gid}/tasks`);
  }

  /**
   * Get tasks from a section
   * 
   * <b>Required scope: </b><code>tasks:read</code>

*Board view only*: Returns the compact section records for all tasks within the given section.
   * @param section_gid - Path parameter
   * @param params - Query parameters
   */
  async getTasksForSection(section_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/sections/${section_gid}/tasks`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/sections/${section_gid}/tasks`);
  }

  /**
   * Get tasks from a tag
   * 
   * <b>Required scope: </b><code>tasks:read</code>

Returns the compact task records for all tasks with the given tag. Tasks can have more than one tag at a time.
   * @param tag_gid - Path parameter
   * @param params - Query parameters
   */
  async getTasksForTag(tag_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/tags/${tag_gid}/tasks`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/tags/${tag_gid}/tasks`);
  }

  /**
   * Get tasks from a user task list
   * 
   * <b>Required scope: </b><code>tasks:read</code>

Returns the compact list of tasks in a user’s My Tasks list.
*Note: Access control is enforced for this endpoint as with all Asana API endpoints, meaning a user’s private tasks will be filtered out if the API-authenticated user does not have access to them.*
*Note: Both complete and incomplete tasks are returned by default unless they are filtered out (for example, setting `completed_since=now` will return only incomplete tasks, which is the default view for “My Tasks” in Asana.)*
   * @param user_task_list_gid - Path parameter
   * @param params - Query parameters
   */
  async getTasksForUserTaskList(user_task_list_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/user_task_lists/${user_task_list_gid}/tasks`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/user_task_lists/${user_task_list_gid}/tasks`);
  }

  /**
   * Get subtasks from a task
   * 
   * <b>Required scope: </b><code>tasks:read</code>

Returns a compact representation of all of the subtasks of a task.
   * @param task_gid - Path parameter
   * @param params - Query parameters
   */
  async getSubtasksForTask(task_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/subtasks`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/subtasks`);
  }

  /**
   * Create a subtask
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Creates a new subtask and adds it to the parent task. Returns the full record for the newly created subtask.
   * @param task_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async createSubtaskForTask(task_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/subtasks`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/subtasks`, { data: body });
  }

  /**
   * Set the parent of a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Updates the parent of a given task. This endpoint can be used to make a task a subtask of another task, or to remove its existing parent.
When using `insert_before` and `insert_after`, at most one of those two options can be specified, and they must already be subtasks of the parent.
Returns the complete, updated record of the affected [task](/reference/tasks#/task).
   * @param task_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async setParentForTask(task_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/setParent`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/setParent`, { data: body });
  }

  /**
   * Get dependencies from a task
   * 
   * <b>Required scope: </b><code>tasks:read</code>

Returns the compact representations of all of the dependencies of a task.
   * @param task_gid - Path parameter
   * @param params - Query parameters
   */
  async getDependenciesForTask(task_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/dependencies`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/dependencies`);
  }

  /**
   * Set dependencies for a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Marks a set of tasks as dependencies of this task, if they are not already dependencies. *A task can have at most 30 dependents and dependencies combined*.
   * @param task_gid - Path parameter
   * @param body - Request body
   */
  async addDependenciesForTask(task_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/addDependencies`, { data: body });
  }

  /**
   * Unlink dependencies from a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Unlinks a set of dependencies from this task.
   * @param task_gid - Path parameter
   * @param body - Request body
   */
  async removeDependenciesForTask(task_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/removeDependencies`, { data: body });
  }

  /**
   * Get dependents from a task
   * 
   * <b>Required scope: </b><code>tasks:read</code>

Returns the compact representations of all of the dependents of a task.
   * @param task_gid - Path parameter
   * @param params - Query parameters
   */
  async getDependentsForTask(task_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/dependents`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/dependents`);
  }

  /**
   * Set dependents for a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Marks a set of tasks as dependents of this task, if they are not already dependents. *A task can have at most 30 dependents and dependencies combined*.
   * @param task_gid - Path parameter
   * @param body - Request body
   */
  async addDependentsForTask(task_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/addDependents`, { data: body });
  }

  /**
   * Unlink dependents from a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Unlinks a set of dependents from this task.
   * @param task_gid - Path parameter
   * @param body - Request body
   */
  async removeDependentsForTask(task_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/removeDependents`, { data: body });
  }

  /**
   * Add a project to a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Adds the task to the specified project, in the optional location
specified. If no location arguments are given, the task will be added to
the end of the project.

`addProject` can also be used to reorder a task within a project or
section that already contains it.

At most one of `insert_before`, `insert_after`, or `section` should be
specified. Inserting into a section in an non-order-dependent way can be
done by specifying section, otherwise, to insert within a section in a
particular place, specify `insert_before` or `insert_after` and a task
within the section to anchor the position of this task.

A task can have at most 20 projects multi-homed to it.

Returns an empty data block.
   * @param task_gid - Path parameter
   * @param body - Request body
   */
  async addProjectForTask(task_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/addProject`, { data: body });
  }

  /**
   * Remove a project from a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Removes the task from the specified project. The task will still exist in
the system, but it will not be in the project anymore.

Returns an empty data block.
   * @param task_gid - Path parameter
   * @param body - Request body
   */
  async removeProjectForTask(task_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/removeProject`, { data: body });
  }

  /**
   * Add a tag to a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Adds a tag to a task. Returns an empty data block.
   * @param task_gid - Path parameter
   * @param body - Request body
   */
  async addTagForTask(task_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/addTag`, { data: body });
  }

  /**
   * Remove a tag from a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Removes a tag from a task. Returns an empty data block.
   * @param task_gid - Path parameter
   * @param body - Request body
   */
  async removeTagForTask(task_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/removeTag`, { data: body });
  }

  /**
   * Add followers to a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Adds followers to a task. Returns an empty data block.
Each task can be associated with zero or more followers in the system.
Requests to add/remove followers, if successful, will return the complete updated task record, described above.
   * @param task_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async addFollowersForTask(task_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/addFollowers`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/addFollowers`, { data: body });
  }

  /**
   * Remove followers from a task
   * 
   * <b>Required scope: </b><code>tasks:write</code>

Removes each of the specified followers from the task if they are following. Returns the complete, updated record for the affected task.
   * @param task_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async removeFollowerForTask(task_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/removeFollowers`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/removeFollowers`, { data: body });
  }

  /**
   * Get a task for a given custom ID
   * 
   * <b>Required scope: </b><code>tasks:read</code>

<table>
  <tr>
    <th>Field</th>
    <th>Required Scope</th>
  </tr>
  <tr>
    <td><code>memberships</code></td>
    <td><code>projects:read</code>, <code>project_sections:read</code></td>
  </tr>
  <tr>
    <td><code>actual_time_minutes</code></td>
    <td><code>time_tracking_entries:read</code></td>
  </tr>
</table>

Returns a task given a custom ID shortcode.
   * @param workspace_gid - Path parameter
   * @param custom_id - Path parameter
   */
  async getTaskForCustomID(workspace_gid: string, custom_id: string): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/tasks/custom_id/${custom_id}`);
  }

  /**
   * Search tasks in a workspace
   * 
   * <b>Required scope: </b><code>tasks:read</code>

To mirror the functionality of the Asana web app's advanced search feature, the Asana API has a task search endpoint that allows you to build complex filters to find and retrieve the exact data you need.
#### Premium access
Like the Asana web product's advance search feature, this search endpoint will only be available to premium Asana users. A user is premium if any of the following is true:

- The workspace in which the search is being performed is a premium workspace - The user is a member of a premium team inside the workspace

Even if a user is only a member of a premium team inside a non-premium workspace, search will allow them to find data anywhere in the workspace, not just inside the premium team. Making a search request using credentials of a non-premium user will result in a `402 Payment Required` error.
#### Pagination
Search results are not stable; repeating the same query multiple times may return the data in a different order, even if the data do not change. Because of this, the traditional [pagination](https://developers.asana.com/docs/#pagination) available elsewhere in the Asana API is not available here. However, you can paginate manually by sorting the search results by their creation time and then modifying each subsequent query to exclude data you have already seen. Page sizes are limited to a maximum of 100 items, and can be specified by the `limit` query parameter.
#### Eventual consistency
Changes in Asana (regardless of whether they’re made though the web product or the API) are forwarded to our search infrastructure to be indexed. This process can take between 10 and 60 seconds to complete under normal operation, and longer during some production incidents. Making a change to a task that would alter its presence in a particular search query will not be reflected immediately. This is also true of the advanced search feature in the web product.
#### Rate limits
You may receive a `429 Too Many Requests` response if you hit any of our [rate limits](https://developers.asana.com/docs/#rate-limits).
#### Custom field parameters
| Parameter name | Custom field type | Accepted type |
|---|---|---|
| custom_fields.{gid}.is_set | All | Boolean |
| custom_fields.{gid}.value | Text | String |
| custom_fields.{gid}.value | Number | Number |
| custom_fields.{gid}.value | Enum | Enum option ID |
| custom_fields.{gid}.starts_with | Text only | String |
| custom_fields.{gid}.ends_with | Text only | String |
| custom_fields.{gid}.contains | Text only | String |
| custom_fields.{gid}.less_than | Number only | Number |
| custom_fields.{gid}.greater_than | Number only | Number |


For example, if the gid of the custom field is 12345, these query parameter to find tasks where it is set would be `custom_fields.12345.is_set=true`. To match an exact value for an enum custom field, use the gid of the desired enum option and not the name of the enum option: `custom_fields.12345.value=67890`.

**Not Supported**: searching for multiple exact matches of a custom field, searching for multi-enum custom field

*Note: If you specify `projects.any` and `sections.any`, you will receive tasks for the project **and** tasks for the section. If you're looking for only tasks in a section, omit the `projects.any` from the request.*
   * @param workspace_gid - Path parameter
   * @param params - Query parameters
   */
  async searchTasksForWorkspace(workspace_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/tasks/search`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/tasks/search`);
  }

  /**
   * Get a team membership
   * 
   * <b>Required scope: </b><code>team_memberships:read</code>

<table>
  <tr>
    <th>Field</th>
    <th>Required Scope</th>
  </tr>
  <tr>
    <td><code>team</code></td>
    <td><code>teams:read</code></td>
  </tr>
</table>

Returns the complete team membership record for a single team membership.
   * @param team_membership_gid - Path parameter
   * @param params - Query parameters
   */
  async getTeamMembership(team_membership_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/team_memberships/${team_membership_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/team_memberships/${team_membership_gid}`);
  }

  /**
   * Get team memberships
   * 
   * <b>Required scope: </b><code>team_memberships:read</code>

Returns compact team membership records.
   * @param params - Query parameters
   */
  async getTeamMemberships(params?: { team?: string; user?: string; workspace?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/team_memberships", {
        "team": params.team,
        "user": params.user,
        "workspace": params.workspace,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/team_memberships");
  }

  /**
   * Get memberships from a team
   * 
   * <b>Required scope: </b><code>team_memberships:read</code>

Returns the compact team memberships for the team.
   * @param team_gid - Path parameter
   * @param params - Query parameters
   */
  async getTeamMembershipsForTeam(team_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/teams/${team_gid}/team_memberships`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/teams/${team_gid}/team_memberships`);
  }

  /**
   * Get memberships from a user
   * 
   * <b>Required scope: </b><code>team_memberships:read</code>

Returns the compact team membership records for the user.
   * @param user_gid - Path parameter
   * @param params - Query parameters
   */
  async getTeamMembershipsForUser(user_gid: string, params?: { workspace?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/users/${user_gid}/team_memberships`, {
        "workspace": params.workspace,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/users/${user_gid}/team_memberships`);
  }

  /**
   * Create a team
   * 
   * Creates a team within the current workspace.
   * @param body - Request body
   * @param params - Query parameters
   */
  async createTeam(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/teams", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/teams", { data: body });
  }

  /**
   * Get a team
   * 
   * <b>Required scope: </b><code>teams:read</code>

Returns the full record for a single team.
   * @param team_gid - Path parameter
   * @param params - Query parameters
   */
  async getTeam(team_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/teams/${team_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/teams/${team_gid}`);
  }

  /**
   * Update a team
   * 
   * Updates a team within the current workspace.
   * @param team_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateTeam(team_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/teams/${team_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/teams/${team_gid}`, { data: body });
  }

  /**
   * Get teams in a workspace
   * 
   * <b>Required scope: </b><code>teams:read</code>

Returns the compact records for all teams in the workspace visible to the authorized user.
   * @param workspace_gid - Path parameter
   * @param params - Query parameters
   */
  async getTeamsForWorkspace(workspace_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/teams`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/teams`);
  }

  /**
   * Get teams for a user
   * 
   * <b>Required scope: </b><code>teams:read</code>

Returns the compact records for all teams to which the given user is assigned.
   * @param user_gid - Path parameter
   * @param params - Query parameters
   */
  async getTeamsForUser(user_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/users/${user_gid}/teams`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/users/${user_gid}/teams`);
  }

  /**
   * Add a user to a team
   * 
   * The user making this call must be a member of the team in order to add others. The user being added must exist in the same organization as the team.

Returns the complete team membership record for the newly added user.
   * @param team_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async addUserForTeam(team_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/teams/${team_gid}/addUser`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/teams/${team_gid}/addUser`, { data: body });
  }

  /**
   * Remove a user from a team
   * 
   * The user making this call must be a member of the team in order to remove themselves or others.
   * @param team_gid - Path parameter
   * @param body - Request body
   */
  async removeUserForTeam(team_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/teams/${team_gid}/removeUser`, { data: body });
  }

  /**
   * Get a time period
   * 
   * Returns the full record for a single time period.
   * @param time_period_gid - Path parameter
   * @param params - Query parameters
   */
  async getTimePeriod(time_period_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/time_periods/${time_period_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/time_periods/${time_period_gid}`);
  }

  /**
   * Get time periods
   * 
   * Returns compact time period records.
   * @param params - Query parameters
   */
  async getTimePeriods(params?: { start_on?: string; end_on?: string; workspace?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/time_periods", {
        "start_on": params.start_on,
        "end_on": params.end_on,
        "workspace": params.workspace,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/time_periods");
  }

  /**
   * Get time tracking entries for a task
   * 
   * <b>Required scope: </b><code>time_tracking_entries:read</code>

Returns time tracking entries for a given task.
   * @param task_gid - Path parameter
   * @param params - Query parameters
   */
  async getTimeTrackingEntriesForTask(task_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/time_tracking_entries`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/tasks/${task_gid}/time_tracking_entries`);
  }

  /**
   * Create a time tracking entry
   * 
   * Creates a time tracking entry on a given task.

Returns the record of the newly created time tracking entry.
   * @param task_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async createTimeTrackingEntry(task_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/time_tracking_entries`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/tasks/${task_gid}/time_tracking_entries`, { data: body });
  }

  /**
   * Get a time tracking entry
   * 
   * <b>Required scope: </b><code>time_tracking_entries:read</code>

Returns the complete time tracking entry record for a single time tracking entry.
   * @param time_tracking_entry_gid - Path parameter
   * @param params - Query parameters
   */
  async getTimeTrackingEntry(time_tracking_entry_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/time_tracking_entries/${time_tracking_entry_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/time_tracking_entries/${time_tracking_entry_gid}`);
  }

  /**
   * Update a time tracking entry
   * 
   * A specific, existing time tracking entry can be updated by making a `PUT` request on
the URL for that time tracking entry. Only the fields provided in the `data` block
will be updated; any unspecified fields will remain unchanged.

When using this method, it is best to specify only those fields you wish
to change, or else you may overwrite changes made by another user since
you last retrieved the task.

Returns the complete updated time tracking entry record.
   * @param time_tracking_entry_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateTimeTrackingEntry(time_tracking_entry_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/time_tracking_entries/${time_tracking_entry_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/time_tracking_entries/${time_tracking_entry_gid}`, { data: body });
  }

  /**
   * Delete a time tracking entry
   * 
   * A specific, existing time tracking entry can be deleted by making a `DELETE` request on
the URL for that time tracking entry.

Returns an empty data record.
   * @param time_tracking_entry_gid - Path parameter
   */
  async deleteTimeTrackingEntry(time_tracking_entry_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/time_tracking_entries/${time_tracking_entry_gid}`);
  }

  /**
   * Get multiple time tracking entries
   * 
   * <b>Required scope: </b><code>time_tracking_entries:read</code>

Returns a list of time tracking entries filtered to a task, attributed project, portfolio or user.
   * @param params - Query parameters
   */
  async getTimeTrackingEntries(params?: { task?: string; attributable_to?: string; portfolio?: string; user?: string; workspace?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/time_tracking_entries", {
        "task": params.task,
        "attributable_to": params.attributable_to,
        "portfolio": params.portfolio,
        "user": params.user,
        "workspace": params.workspace,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/time_tracking_entries");
  }

  /**
   * Get objects via typeahead
   * 
   * <b>Required scope: </b><code>workspace.typeahead:read</code>

Retrieves objects in the workspace based via an auto-completion/typeahead
search algorithm. This feature is meant to provide results quickly, so do
not rely on this API to provide extremely accurate search results. The
result set is limited to a single page of results with a maximum size, so
you won’t be able to fetch large numbers of results.

The typeahead search API provides search for objects from a single
workspace. This endpoint should be used to query for objects when
creating an auto-completion/typeahead search feature. This API is meant
to provide results quickly and should not be relied upon for accurate or
exhaustive search results. The results sets are limited in size and
cannot be paginated.

Queries return a compact representation of each object which is typically
the gid and name fields. Interested in a specific set of fields or all of
the fields?! Of course you are. Use field selectors to manipulate what
data is included in a response.

Resources with type `user` are returned in order of most contacted to
least contacted. This is determined by task assignments, adding the user
to projects, and adding the user as a follower to tasks, messages,
etc.

Resources with type `project` are returned in order of recency. This is
determined when the user visits the project, is added to the project, and
completes tasks in the project.

Resources with type `task` are returned with priority placed on tasks
the user is following, but no guarantee on the order of those tasks.

Resources with type `project_template` are returned with priority
placed on favorited project templates.

Leaving the `query` string empty or omitted will give you results, still
following the resource ordering above. This could be used to list users or
projects that are relevant for the requesting user's api token.
   * @param workspace_gid - Path parameter
   * @param params - Query parameters
   */
  async typeaheadForWorkspace(workspace_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/typeahead`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/typeahead`);
  }

  /**
   * Get a user task list
   * 
   * <b>Required scope: </b><code>tasks:read</code>

Returns the full record for a user task list.
   * @param user_task_list_gid - Path parameter
   * @param params - Query parameters
   */
  async getUserTaskList(user_task_list_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/user_task_lists/${user_task_list_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/user_task_lists/${user_task_list_gid}`);
  }

  /**
   * Get a user's task list
   * 
   * <b>Required scope: </b><code>tasks:read</code>

Returns the full record for a user's task list.
   * @param user_gid - Path parameter
   * @param params - Query parameters
   */
  async getUserTaskListForUser(user_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/users/${user_gid}/user_task_list`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/users/${user_gid}/user_task_list`);
  }

  /**
   * Get multiple users
   * 
   * <b>Required scope: </b><code>users:read</code>

Returns the user records for all users in all workspaces and organizations accessible to the authenticated user. Accepts an optional workspace ID parameter.
Results are sorted by user ID.
   * @param params - Query parameters
   */
  async getUsers(params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/users", {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/users");
  }

  /**
   * Get a user
   * 
   * <b>Required scope: </b><code>users:read</code>

Returns the full user record for the single user with the provided ID.
   * @param user_gid - Path parameter
   * @param params - Query parameters
   */
  async getUser(user_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/users/${user_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/users/${user_gid}`);
  }

  /**
   * Update a user
   * 
   * A specific, existing user can be updated by making a PUT request on the
URL for that user. Only the fields provided in the `data` block will be
updated; any unspecified fields will remain unchanged.

Returns the complete updated user record.
   * @param user_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateUser(user_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/users/${user_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/users/${user_gid}`, { data: body });
  }

  /**
   * Get a user's favorites
   * 
   * <b>Required scope: </b><code>users:read</code>

Returns all of a user's favorites within a specified workspace and of a given type. The results are ordered exactly as they appear in the user's Asana sidebar in the web application. Note that this endpoint currently only returns favorites for the current user (i.e., the user associated with the authentication token).
   * @param user_gid - Path parameter
   * @param params - Query parameters
   */
  async getFavoritesForUser(user_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/users/${user_gid}/favorites`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/users/${user_gid}/favorites`);
  }

  /**
   * Get users in a team
   * 
   * <b>Required scope: </b><code>users:read</code>

Returns the compact records for all users that are members of the team.
Results are sorted alphabetically and limited to 2000. For more results use the `/users` endpoint.
   * @param team_gid - Path parameter
   * @param params - Query parameters
   */
  async getUsersForTeam(team_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/teams/${team_gid}/users`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/teams/${team_gid}/users`);
  }

  /**
   * Get users in a workspace or organization
   * 
   * <b>Required scope: </b><code>users:read</code>

Returns the compact records for all users in the specified workspace or organization.
Results are sorted alphabetically and limited to 2000. For more results use the `/users` endpoint.
   * @param workspace_gid - Path parameter
   * @param params - Query parameters
   */
  async getUsersForWorkspace(workspace_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/users`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/users`);
  }

  /**
   * Get a user in a workspace or organization
   * 
   * <b>Required scope: </b><code>users:read</code>

Returns the full user record for the single user with the provided ID in the specified workspace or organization.
   * @param workspace_gid - Path parameter
   * @param user_gid - Path parameter
   * @param params - Query parameters
   */
  async getUserForWorkspace(workspace_gid: string, user_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/users/${user_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/users/${user_gid}`);
  }

  /**
   * Update a user in a workspace or organization
   * 
   * An existing user can be updated by making a PUT request on the URL for that user in the specified workspace or organization. Only the fields provided in the `data` block will be updated; any unspecified fields will remain unchanged.
   * @param workspace_gid - Path parameter
   * @param user_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateUserForWorkspace(workspace_gid: string, user_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/workspaces/${workspace_gid}/users/${user_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/workspaces/${workspace_gid}/users/${user_gid}`, { data: body });
  }

  /**
   * Get multiple webhooks
   * 
   * <b>Required scope: </b><code>webhooks:read</code>

Get the compact representation of all webhooks your app has registered for the authenticated user in the given workspace.
   * @param params - Query parameters
   */
  async getWebhooks(params?: { workspace?: string; resource?: string; opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/webhooks", {
        "workspace": params.workspace,
        "resource": params.resource,
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/webhooks");
  }

  /**
   * Establish a webhook
   * 
   * <b>Required scope: </b><code>webhooks:write</code>

Establishing a webhook is a two-part process. First, a simple HTTP POST
request initiates the creation similar to creating any other resource.

Next, in the middle of this request comes the confirmation handshake.
When a webhook is created, we will send a test POST to the target with an
`X-Hook-Secret` header. The target must respond with a `200 OK` or `204
No Content` and a matching `X-Hook-Secret` header to confirm that this
webhook subscription is indeed expected. We strongly recommend storing
this secret to be used to verify future webhook event signatures.

The POST request to create the webhook will then return with the status
of the request. If you do not acknowledge the webhook’s confirmation
handshake it will fail to setup, and you will receive an error in
response to your attempt to create it. This means you need to be able to
receive and complete the webhook *while* the POST request is in-flight
(in other words, have a server that can handle requests asynchronously).

Invalid hostnames like localhost will receive a 403 Forbidden status code.

```
# Request
curl -H "Authorization: Bearer <personal_access_token>" \
-X POST https://app.asana.com/api/1.0/webhooks \
-d "resource=8675309" \
-d "target=https://example.com/receive-webhook/7654"
```

```
# Handshake sent to https://example.com/
POST /receive-webhook/7654
X-Hook-Secret: b537207f20cbfa02357cf448134da559e8bd39d61597dcd5631b8012eae53e81
```

```
# Handshake response sent by example.com
HTTP/1.1 200
X-Hook-Secret: b537207f20cbfa02357cf448134da559e8bd39d61597dcd5631b8012eae53e81
```

```
# Response
HTTP/1.1 201
{
  "data": {
    "gid": "43214",
    "resource": {
      "gid": "8675309",
      "name": "Bugs"
    },
    "target": "https://example.com/receive-webhook/7654",
    "active": false,
    "last_success_at": null,
    "last_failure_at": null,
    "last_failure_content": null
  },
  "X-Hook-Secret": "b537207f20cbfa02357cf448134da559e8bd39d61597dcd5631b8012eae53e81"
}
```
   * @param body - Request body
   * @param params - Query parameters
   */
  async createWebhook(body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>("/webhooks", { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>("/webhooks", { data: body });
  }

  /**
   * Get a webhook
   * 
   * <b>Required scope: </b><code>webhooks:read</code>

Returns the full record for the given webhook.
   * @param webhook_gid - Path parameter
   * @param params - Query parameters
   */
  async getWebhook(webhook_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/webhooks/${webhook_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/webhooks/${webhook_gid}`);
  }

  /**
   * Update a webhook
   * 
   * <b>Required scope: </b><code>webhooks:write</code>

An existing webhook's filters can be updated by making a PUT request on the URL for that webhook. Note that the webhook's previous `filters` array will be completely overwritten by the `filters` sent in the PUT request.
   * @param webhook_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateWebhook(webhook_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/webhooks/${webhook_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/webhooks/${webhook_gid}`, { data: body });
  }

  /**
   * Delete a webhook
   * 
   * <b>Required scope: </b><code>webhooks:delete</code>

This method *permanently* removes a webhook. Note that it may be possible to receive a request that was already in flight after deleting the webhook, but no further requests will be issued.
   * @param webhook_gid - Path parameter
   */
  async deleteWebhook(webhook_gid: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/webhooks/${webhook_gid}`);
  }

  /**
   * Get a workspace membership
   * 
   * Returns the complete workspace record for a single workspace membership.
   * @param workspace_membership_gid - Path parameter
   * @param params - Query parameters
   */
  async getWorkspaceMembership(workspace_membership_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/workspace_memberships/${workspace_membership_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/workspace_memberships/${workspace_membership_gid}`);
  }

  /**
   * Get workspace memberships for a user
   * 
   * Returns the compact workspace membership records for the user.
   * @param user_gid - Path parameter
   * @param params - Query parameters
   */
  async getWorkspaceMembershipsForUser(user_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/users/${user_gid}/workspace_memberships`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/users/${user_gid}/workspace_memberships`);
  }

  /**
   * Get the workspace memberships for a workspace
   * 
   * Returns the compact workspace membership records for the workspace.
   * @param workspace_gid - Path parameter
   * @param params - Query parameters
   */
  async getWorkspaceMembershipsForWorkspace(workspace_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/workspace_memberships`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/workspace_memberships`);
  }

  /**
   * Get multiple workspaces
   * 
   * <b>Required scope: </b><code>workspaces:read</code>

Returns the compact records for all workspaces visible to the authorized user.
   * @param params - Query parameters
   */
  async getWorkspaces(params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>("/workspaces", {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>("/workspaces");
  }

  /**
   * Get a workspace
   * 
   * <b>Required scope: </b><code>workspaces:read</code>

Returns the full workspace record for a single workspace.
   * @param workspace_gid - Path parameter
   * @param params - Query parameters
   */
  async getWorkspace(workspace_gid: string, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}`, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}`);
  }

  /**
   * Update a workspace
   * 
   * A specific, existing workspace can be updated by making a PUT request on the URL for that workspace. Only the fields provided in the data block will be updated; any unspecified fields will remain unchanged.
Currently the only field that can be modified for a workspace is its name.
Returns the complete, updated workspace record.
   * @param workspace_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async updateWorkspace(workspace_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.put<Record<string, unknown>>(`/workspaces/${workspace_gid}`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.put<Record<string, unknown>>(`/workspaces/${workspace_gid}`, { data: body });
  }

  /**
   * Add a user to a workspace or organization
   * 
   * Add a user to a workspace or organization.
The user can be referenced by their globally unique user ID or their email address. Returns the full user record for the invited user.
   * @param workspace_gid - Path parameter
   * @param body - Request body
   * @param params - Query parameters
   */
  async addUserForWorkspace(workspace_gid: string, body: Record<string, unknown>, params?: { opt_fields?: string[] }): Promise<Record<string, unknown>> {
    if (params) {
      return this.client.post<Record<string, unknown>>(`/workspaces/${workspace_gid}/addUser`, { data: body }, {
        "opt_fields": params.opt_fields,
      });
    }
    return this.client.post<Record<string, unknown>>(`/workspaces/${workspace_gid}/addUser`, { data: body });
  }

  /**
   * Remove a user from a workspace or organization
   * 
   * Remove a user from a workspace or organization.

The user making this call must be an admin in the workspace. The user can
be referenced by their globally unique user ID or their email address.

When invoked using a **Service Account Token (SAT)**, this endpoint follows the same behavior as the
[SCIM API Delete endpoint](/docs/scim).
To learn more about how Asana handles user deprovisioning, refer to our
[Help Center article on deprovisioning users](https://help.asana.com/s/article/user-deprovisioning).

When invoked using a **Personal Access Token (PAT)**, the endpoint behaves similarly, except that
ownership of the user’s resources is transferred to the **PAT owner** instead of the admin
[specified in the Admin Console](https://help.asana.com/s/article/user-deprovisioning#gl-deprovisioning).

**Note:** If you wish to retain access to a user’s private resources
(i.e., those visible only to that user), you have to make them public manually
(or ask the user to do so) before removal.

Returns an empty data record.
   * @param workspace_gid - Path parameter
   * @param body - Request body
   */
  async removeUserForWorkspace(workspace_gid: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.post<Record<string, unknown>>(`/workspaces/${workspace_gid}/removeUser`, { data: body });
  }

  /**
   * Get workspace events
   * 
   * Returns the full record for all events that have occurred since the sync token was created.
The response is a list of events and the schema of each event is as described [here](/reference/events).
Asana limits a single sync token to 1000 events. If more than 1000 events exist for a given domain, `has_more: true` will be returned in the response, indicating that there are more events to pull.
   * @param workspace_gid - Path parameter
   */
  async getWorkspaceEvents(workspace_gid: string): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>(`/workspaces/${workspace_gid}/events`);
  }

}