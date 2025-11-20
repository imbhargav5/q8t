// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Salesforce REST API

import type { HttpClient } from "../auth/client";
import type * as Types from "./types";

export class RestApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get available resources
   */
  async getResources(): Promise<Types.Resources> {
    return this.client.get<Types.Resources>("/");
  }

  /**
   * Get organization limits
   */
  async getLimits(): Promise<Types.Limits> {
    return this.client.get<Types.Limits>("/limits");
  }

  /**
   * List all available objects
   */
  async describeGlobal(): Promise<Types.GlobalDescribe> {
    return this.client.get<Types.GlobalDescribe>("/sobjects");
  }

  /**
   * Describe an sObject
   */
  async describeSObject(sobjectType: string): Promise<Types.SObjectDescribe> {
    return this.client.get<Types.SObjectDescribe>(`/sobjects/${sobjectType}/describe`);
  }

  /**
   * Get sObject by ID
   */
  async getSObject(
    sobjectType: string,
    id: string,
    params?: { fields?: string },
  ): Promise<Types.SObjectRecord> {
    return this.client.get<Types.SObjectRecord>(`/sobjects/${sobjectType}/${id}`, {
      fields: params?.fields,
    });
  }

  /**
   * Delete sObject
   */
  async deleteSObject(sobjectType: string, id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/sobjects/${sobjectType}/${id}`);
  }

  /**
   * Update sObject
   */
  async updateSObject(
    sobjectType: string,
    id: string,
    body: Record<string, unknown>,
  ): Promise<Types.SuccessResponse> {
    return this.client.patch<Types.SuccessResponse>(`/sobjects/${sobjectType}/${id}`, body);
  }

  /**
   * Create sObject
   */
  async createSObject(
    sobjectType: string,
    body: Record<string, unknown>,
  ): Promise<Types.CreateResponse> {
    return this.client.post<Types.CreateResponse>(`/sobjects/${sobjectType}`, body);
  }

  /**
   * Get sObject by external ID
   */
  async getSObjectByExternalId(
    sobjectType: string,
    fieldName: string,
    fieldValue: string,
  ): Promise<Types.SObjectRecord> {
    return this.client.get<Types.SObjectRecord>(
      `/sobjects/${sobjectType}/${fieldName}/${fieldValue}`,
    );
  }

  /**
   * Upsert sObject by external ID
   */
  async upsertSObject(
    sobjectType: string,
    fieldName: string,
    fieldValue: string,
    body: Record<string, unknown>,
  ): Promise<Types.UpsertResponse> {
    return this.client.patch<Types.UpsertResponse>(
      `/sobjects/${sobjectType}/${fieldName}/${fieldValue}`,
      body,
    );
  }

  /**
   * Execute SOQL query
   */
  async query(params?: { q?: string }): Promise<Types.QueryResult> {
    return this.client.get<Types.QueryResult>("/query", {
      q: params?.q,
    });
  }

  /**
   * Get next batch of query results
   */
  async queryMore(queryLocator: string): Promise<Types.QueryResult> {
    return this.client.get<Types.QueryResult>(`/query/${queryLocator}`);
  }

  /**
   * Execute SOQL query including deleted and archived records
   */
  async queryAll(params?: { q?: string }): Promise<Types.QueryResult> {
    return this.client.get<Types.QueryResult>("/queryAll", {
      q: params?.q,
    });
  }

  /**
   * Execute SOSL search
   */
  async search(params?: { q?: string }): Promise<Types.SearchResult> {
    return this.client.get<Types.SearchResult>("/search", {
      q: params?.q,
    });
  }

  /**
   * Execute composite request
   */
  async composite(body: Types.CompositeRequest): Promise<Types.CompositeResponse> {
    return this.client.post<Types.CompositeResponse>("/composite", body);
  }

  /**
   * Execute batch request
   */
  async compositeBatch(body: Types.CompositeBatchRequest): Promise<Types.CompositeBatchResponse> {
    return this.client.post<Types.CompositeBatchResponse>("/composite/batch", body);
  }

  /**
   * Execute graph request
   */
  async compositeGraph(body: Types.CompositeGraphRequest): Promise<Types.CompositeGraphResponse> {
    return this.client.post<Types.CompositeGraphResponse>("/composite/graph", body);
  }

  /**
   * Create multiple records
   */
  async createSObjectCollection(
    body: Types.SObjectCollectionCreateRequest,
  ): Promise<Types.SaveResult[]> {
    return this.client.post<Types.SaveResult[]>("/composite/sobjects", body);
  }

  /**
   * Delete multiple records
   */
  async deleteSObjectCollection(params?: { ids?: string; allOrNone?: boolean }): Promise<
    Types.DeleteResult[]
  > {
    return this.client.delete<Types.DeleteResult[]>("/composite/sobjects");
  }

  /**
   * Update multiple records
   */
  async updateSObjectCollection(
    body: Types.SObjectCollectionUpdateRequest,
  ): Promise<Types.SaveResult[]> {
    return this.client.patch<Types.SaveResult[]>("/composite/sobjects", body);
  }

  /**
   * Get multiple records by ID
   */
  async getSObjectCollection(body: Types.SObjectCollectionRequest): Promise<Types.SObjectRecord[]> {
    return this.client.post<Types.SObjectRecord[]>("/composite/sobjects/retrieve", body);
  }

  /**
   * Upsert multiple records
   */
  async upsertSObjectCollection(
    sobjectType: string,
    externalIdField: string,
    body: Types.SObjectCollectionUpsertRequest,
  ): Promise<Types.UpsertResult[]> {
    return this.client.patch<Types.UpsertResult[]>(
      `/composite/sobjects/${sobjectType}/${externalIdField}`,
      body,
    );
  }

  /**
   * Create record tree
   */
  async compositeTree(
    sobjectType: string,
    body: Types.CompositeTreeRequest,
  ): Promise<Types.CompositeTreeResponse> {
    return this.client.post<Types.CompositeTreeResponse>(`/composite/tree/${sobjectType}`, body);
  }

  /**
   * Get recently viewed items
   */
  async getRecentItems(params?: { limit?: number }): Promise<Types.RecentItem[]> {
    return this.client.get<Types.RecentItem[]>("/recent", {
      limit: params?.limit,
    });
  }

  /**
   * Execute parameterized search
   */
  async parameterizedSearch(params?: {
    q?: string;
    sobject?: string;
    fields?: string;
    limit?: number;
  }): Promise<Types.ParameterizedSearchResult> {
    return this.client.get<Types.ParameterizedSearchResult>("/parameterizedSearch", {
      q: params?.q,
      sobject: params?.sobject,
      fields: params?.fields,
      limit: params?.limit,
    });
  }
}
