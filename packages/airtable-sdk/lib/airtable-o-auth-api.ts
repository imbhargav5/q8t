// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Airtable OAuth API

import type { OAuthHttpClient } from "../src/auth/oauth-client";
import type * as Types from "./types";

export class AirtableOAuthApi {
  private client: OAuthHttpClient;

  constructor(client: OAuthHttpClient) {
    this.client = client;
  }

  /**
   * Get current user info
   */
  async whoami(): Promise<Types.UserInfo> {
    return this.client.get<Types.UserInfo>("/meta/whoami");
  }

  /**
   * List records
   */
  async listRecords(baseId: string, tableIdOrName: string, queryParams?: { fields?: string[]; filterByFormula?: string; maxRecords?: number; pageSize?: number; sort?: string[]; view?: string; offset?: string }): Promise<Types.AirtableRecordList> {
    const params: Record<string, string | number | boolean | string[] | undefined> = {};
    if (queryParams?.fields !== undefined) params["fields"] = queryParams.fields;
    if (queryParams?.filterByFormula !== undefined) params["filterByFormula"] = queryParams.filterByFormula;
    if (queryParams?.maxRecords !== undefined) params["maxRecords"] = queryParams.maxRecords;
    if (queryParams?.pageSize !== undefined) params["pageSize"] = queryParams.pageSize;
    if (queryParams?.sort !== undefined) params["sort"] = queryParams.sort;
    if (queryParams?.view !== undefined) params["view"] = queryParams.view;
    if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
    return this.client.get<Types.AirtableRecordList>(`/${baseId}/${tableIdOrName}`, params);
  }

  /**
   * Create records
   */
  async createRecords(baseId: string, tableIdOrName: string, body: Types.AirtableRecordsRequest): Promise<Types.AirtableRecordList> {
    return this.client.post<Types.AirtableRecordList>(`/${baseId}/${tableIdOrName}`, body);
  }

  /**
   * Delete records
   */
  async deleteRecords(baseId: string, tableIdOrName: string, queryParams?: { records?: string[] }): Promise<Types.AirtableRecordsResponse> {
    const params: Record<string, string | number | boolean | string[] | undefined> = {};
    if (queryParams?.records !== undefined) params["records"] = queryParams.records;
    return this.client.delete<Types.AirtableRecordsResponse>(`/${baseId}/${tableIdOrName}`, params);
  }

  /**
   * Update records
   */
  async updateRecords(baseId: string, tableIdOrName: string, body: Types.AirtableRecordsRequest): Promise<Types.AirtableRecordList> {
    return this.client.patch<Types.AirtableRecordList>(`/${baseId}/${tableIdOrName}`, body);
  }

  /**
   * List bases
   */
  async listBases(queryParams?: { offset?: string }): Promise<Types.BaseList> {
    const params: Record<string, string | number | boolean | string[] | undefined> = {};
    if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
    return this.client.get<Types.BaseList>("/meta/bases", params);
  }

  /**
   * List tables
   */
  async listTables(baseId: string): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>(`/meta/bases/${baseId}/tables`);
  }

}