// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Airtable Web API

import type { PATHttpClient } from "../src/auth/pat-client";
import type * as Types from "./types";

export class AirtableWebApi {
  private client: PATHttpClient;

  constructor(client: PATHttpClient) {
    this.client = client;
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
   * Get record
   */
  async getAirtableRecord(baseId: string, tableIdOrName: string, recordId: string): Promise<Types.AirtableRecord> {
    return this.client.get<Types.AirtableRecord>(`/${baseId}/${tableIdOrName}/${recordId}`);
  }

  /**
   * Delete record
   */
  async deleteAirtableRecord(baseId: string, tableIdOrName: string, recordId: string): Promise<Record<string, unknown>> {
    return this.client.delete<Record<string, unknown>>(`/${baseId}/${tableIdOrName}/${recordId}`);
  }

  /**
   * Update record
   */
  async updateAirtableRecord(baseId: string, tableIdOrName: string, recordId: string, body: Types.AirtableRecordRequest): Promise<Types.AirtableRecord> {
    return this.client.patch<Types.AirtableRecord>(`/${baseId}/${tableIdOrName}/${recordId}`, body);
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
  async listTables(baseId: string): Promise<Types.TableList> {
    return this.client.get<Types.TableList>(`/meta/bases/${baseId}/tables`);
  }

  /**
   * Create table
   */
  async createTable(baseId: string, body: Types.CreateTableRequest): Promise<Types.Table> {
    return this.client.post<Types.Table>(`/meta/bases/${baseId}/tables`, body);
  }

  /**
   * Get table schema
   */
  async getTableSchema(baseId: string, tableIdOrName: string): Promise<Types.Table> {
    return this.client.get<Types.Table>(`/meta/bases/${baseId}/tables/${tableIdOrName}`);
  }

  /**
   * Update table
   */
  async updateTable(baseId: string, tableIdOrName: string, body: Record<string, unknown>): Promise<Types.Table> {
    return this.client.patch<Types.Table>(`/meta/bases/${baseId}/tables/${tableIdOrName}`, body);
  }

  /**
   * Create field
   */
  async createField(baseId: string, tableIdOrName: string, body: Types.CreateFieldRequest): Promise<Types.Field> {
    return this.client.post<Types.Field>(`/meta/bases/${baseId}/tables/${tableIdOrName}/fields`, body);
  }

  /**
   * Update field
   */
  async updateField(baseId: string, tableIdOrName: string, fieldId: string, body: Types.UpdateFieldRequest): Promise<Types.Field> {
    return this.client.patch<Types.Field>(`/meta/bases/${baseId}/tables/${tableIdOrName}/fields/${fieldId}`, body);
  }

}