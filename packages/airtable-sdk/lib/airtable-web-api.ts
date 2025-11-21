// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Airtable Web API

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class AirtableWebApi {
  constructor() {}

  /**
   * List records
   */
  listRecords(baseId: string, tableIdOrName: string, queryParams?: { fields?: string[]; filterByFormula?: string; maxRecords?: number; pageSize?: number; sort?: string[]; view?: string; offset?: string }): Effect.Effect<Types.AirtableRecordList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      const params: Record<string, string | number | boolean | string[] | undefined> = {};
      if (queryParams?.fields !== undefined) params["fields"] = queryParams.fields;
      if (queryParams?.filterByFormula !== undefined) params["filterByFormula"] = queryParams.filterByFormula;
      if (queryParams?.maxRecords !== undefined) params["maxRecords"] = queryParams.maxRecords;
      if (queryParams?.pageSize !== undefined) params["pageSize"] = queryParams.pageSize;
      if (queryParams?.sort !== undefined) params["sort"] = queryParams.sort;
      if (queryParams?.view !== undefined) params["view"] = queryParams.view;
      if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
      return yield* client.get<Types.AirtableRecordList>(`/${baseId}/${tableIdOrName}`, { queryParams: params });
    });
  }

  /**
   * Create records
   */
  createRecords(baseId: string, tableIdOrName: string, body: Types.AirtableRecordsRequest): Effect.Effect<Types.AirtableRecordList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.AirtableRecordList>(`/${baseId}/${tableIdOrName}`, { body });
    });
  }

  /**
   * Delete records
   */
  deleteRecords(baseId: string, tableIdOrName: string, queryParams?: { records?: string[] }): Effect.Effect<Types.AirtableRecordsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      const params: Record<string, string | number | boolean | string[] | undefined> = {};
      if (queryParams?.records !== undefined) params["records"] = queryParams.records;
      return yield* client.delete<Types.AirtableRecordsResponse>(`/${baseId}/${tableIdOrName}`, { queryParams: params });
    });
  }

  /**
   * Update records
   */
  updateRecords(baseId: string, tableIdOrName: string, body: Types.AirtableRecordsRequest): Effect.Effect<Types.AirtableRecordList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.patch<Types.AirtableRecordList>(`/${baseId}/${tableIdOrName}`, { body });
    });
  }

  /**
   * Get record
   */
  getAirtableRecord(baseId: string, tableIdOrName: string, recordId: string): Effect.Effect<Types.AirtableRecord, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.AirtableRecord>(`/${baseId}/${tableIdOrName}/${recordId}`);
    });
  }

  /**
   * Delete record
   */
  deleteAirtableRecord(baseId: string, tableIdOrName: string, recordId: string): Effect.Effect<Record<string, unknown>, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.delete<Record<string, unknown>>(`/${baseId}/${tableIdOrName}/${recordId}`);
    });
  }

  /**
   * Update record
   */
  updateAirtableRecord(baseId: string, tableIdOrName: string, recordId: string, body: Types.AirtableRecordRequest): Effect.Effect<Types.AirtableRecord, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.patch<Types.AirtableRecord>(`/${baseId}/${tableIdOrName}/${recordId}`, { body });
    });
  }

  /**
   * List bases
   */
  listBases(queryParams?: { offset?: string }): Effect.Effect<Types.BaseList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      const params: Record<string, string | number | boolean | string[] | undefined> = {};
      if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
      return yield* client.get<Types.BaseList>("/meta/bases", { queryParams: params });
    });
  }

  /**
   * List tables
   */
  listTables(baseId: string): Effect.Effect<Types.TableList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.TableList>(`/meta/bases/${baseId}/tables`);
    });
  }

  /**
   * Create table
   */
  createTable(baseId: string, body: Types.CreateTableRequest): Effect.Effect<Types.Table, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.Table>(`/meta/bases/${baseId}/tables`, { body });
    });
  }

  /**
   * Get table schema
   */
  getTableSchema(baseId: string, tableIdOrName: string): Effect.Effect<Types.Table, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.Table>(`/meta/bases/${baseId}/tables/${tableIdOrName}`);
    });
  }

  /**
   * Update table
   */
  updateTable(baseId: string, tableIdOrName: string, body: Record<string, unknown>): Effect.Effect<Types.Table, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.patch<Types.Table>(`/meta/bases/${baseId}/tables/${tableIdOrName}`, { body });
    });
  }

  /**
   * Create field
   */
  createField(baseId: string, tableIdOrName: string, body: Types.CreateFieldRequest): Effect.Effect<Types.Field, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.Field>(`/meta/bases/${baseId}/tables/${tableIdOrName}/fields`, { body });
    });
  }

  /**
   * Update field
   */
  updateField(baseId: string, tableIdOrName: string, fieldId: string, body: Types.UpdateFieldRequest): Effect.Effect<Types.Field, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.patch<Types.Field>(`/meta/bases/${baseId}/tables/${tableIdOrName}/fields/${fieldId}`, { body });
    });
  }

}