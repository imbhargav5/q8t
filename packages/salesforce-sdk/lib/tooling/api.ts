// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Salesforce Tooling API

import type { HttpClient } from "../auth/client";
import type * as Types from "./types";

export class ToolingApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Execute Tooling API query
   */
  async toolingQuery(params?: { q?: string }): Promise<Types.QueryResult> {
    return this.client.get<Types.QueryResult>("/query", {
      q: params?.q,
    });
  }

  /**
   * Get Tooling sObject by ID
   */
  async getToolingSObject(sobjectType: string, id: string): Promise<Types.ToolingSObjectRecord> {
    return this.client.get<Types.ToolingSObjectRecord>(`/sobjects/${sobjectType}/${id}`);
  }

  /**
   * Delete Tooling sObject
   */
  async deleteToolingSObject(sobjectType: string, id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/sobjects/${sobjectType}/${id}`);
  }

  /**
   * Update Tooling sObject
   */
  async updateToolingSObject(
    sobjectType: string,
    id: string,
    body: Record<string, unknown>,
  ): Promise<Types.SuccessResponse> {
    return this.client.patch<Types.SuccessResponse>(`/sobjects/${sobjectType}/${id}`, body);
  }

  /**
   * Create Tooling sObject
   */
  async createToolingSObject(
    sobjectType: string,
    body: Record<string, unknown>,
  ): Promise<Types.CreateResponse> {
    return this.client.post<Types.CreateResponse>(`/sobjects/${sobjectType}`, body);
  }

  /**
   * Execute Anonymous Apex
   */
  async executeAnonymous(params?: {
    anonymousBody?: string;
  }): Promise<Types.ExecuteAnonymousResult> {
    return this.client.get<Types.ExecuteAnonymousResult>("/executeAnonymous", {
      anonymousBody: params?.anonymousBody,
    });
  }

  /**
   * Run Apex tests asynchronously
   */
  async runTestsAsynchronous(body: Types.RunTestsRequest): Promise<unknown> {
    return this.client.post<unknown>("/runTestsAsynchronous", body);
  }

  /**
   * Run Apex tests synchronously
   */
  async runTestsSynchronous(body: Types.RunTestsRequest): Promise<Types.RunTestsResult> {
    return this.client.post<Types.RunTestsResult>("/runTestsSynchronous", body);
  }

  /**
   * Get code completions
   */
  async getCompletions(params?: { type?: string }): Promise<Types.CompletionsResult> {
    return this.client.get<Types.CompletionsResult>("/completions", {
      type: params?.type,
    });
  }
}
