// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Airtable OAuth API

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class AirtableOAuthApi {
  constructor() {}

  /**
   * Get current user info
   */
  whoami(): Effect.Effect<Types.UserInfo, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.UserInfo>("/meta/whoami");
    });
  }

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
  listTables(baseId: string): Effect.Effect<Record<string, unknown>, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Record<string, unknown>>(`/meta/bases/${baseId}/tables`);
    });
  }

}