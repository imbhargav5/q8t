// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Salesforce Bulk API 2.0

import type { HttpClient } from "../auth/client";
import type * as Types from "./types";

export class BulkApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get all ingest jobs
   */
  async getAllIngestJobs(params?: {
    isPkChunkingEnabled?: boolean;
    jobType?: string;
    queryLocator?: string;
  }): Promise<Types.IngestJobList> {
    return this.client.get<Types.IngestJobList>("/jobs/ingest", {
      isPkChunkingEnabled: params?.isPkChunkingEnabled,
      jobType: params?.jobType,
      queryLocator: params?.queryLocator,
    });
  }

  /**
   * Create an ingest job
   */
  async createIngestJob(body: Types.CreateIngestJobRequest): Promise<Types.IngestJob> {
    return this.client.post<Types.IngestJob>("/jobs/ingest", body);
  }

  /**
   * Get ingest job details
   */
  async getIngestJob(jobId: string): Promise<Types.IngestJob> {
    return this.client.get<Types.IngestJob>(`/jobs/ingest/${jobId}`);
  }

  /**
   * Delete an ingest job
   */
  async deleteIngestJob(jobId: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/jobs/ingest/${jobId}`);
  }

  /**
   * Update ingest job state
   */
  async updateIngestJobState(
    jobId: string,
    body: Types.UpdateIngestJobStateRequest,
  ): Promise<Types.IngestJob> {
    return this.client.patch<Types.IngestJob>(`/jobs/ingest/${jobId}`, body);
  }

  /**
   * Upload job data
   */
  async uploadJobData(jobId: string, body: string): Promise<Types.SuccessResponse> {
    return this.client.put<Types.SuccessResponse>(`/jobs/ingest/${jobId}/batches`, body);
  }

  /**
   * Get successful results
   */
  async getSuccessfulResults(jobId: string): Promise<string> {
    return this.client.get<string>(`/jobs/ingest/${jobId}/successfulResults`);
  }

  /**
   * Get failed results
   */
  async getFailedResults(jobId: string): Promise<string> {
    return this.client.get<string>(`/jobs/ingest/${jobId}/failedResults`);
  }

  /**
   * Get unprocessed records
   */
  async getUnprocessedRecords(jobId: string): Promise<string> {
    return this.client.get<string>(`/jobs/ingest/${jobId}/unprocessedrecords`);
  }

  /**
   * Get all query jobs
   */
  async getAllQueryJobs(params?: {
    isPkChunkingEnabled?: boolean;
    jobType?: string;
    queryLocator?: string;
  }): Promise<Types.QueryJobList> {
    return this.client.get<Types.QueryJobList>("/jobs/query", {
      isPkChunkingEnabled: params?.isPkChunkingEnabled,
      jobType: params?.jobType,
      queryLocator: params?.queryLocator,
    });
  }

  /**
   * Create a query job
   */
  async createQueryJob(body: Types.CreateQueryJobRequest): Promise<Types.QueryJob> {
    return this.client.post<Types.QueryJob>("/jobs/query", body);
  }

  /**
   * Get query job details
   */
  async getQueryJob(jobId: string): Promise<Types.QueryJob> {
    return this.client.get<Types.QueryJob>(`/jobs/query/${jobId}`);
  }

  /**
   * Delete a query job
   */
  async deleteQueryJob(jobId: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/jobs/query/${jobId}`);
  }

  /**
   * Abort a query job
   */
  async abortQueryJob(jobId: string, body: Types.AbortJobRequest): Promise<Types.QueryJob> {
    return this.client.patch<Types.QueryJob>(`/jobs/query/${jobId}`, body);
  }

  /**
   * Get query results
   */
  async getQueryResults(
    jobId: string,
    params?: { locator?: string; maxRecords?: number },
  ): Promise<string> {
    return this.client.get<string>(`/jobs/query/${jobId}/results`, {
      locator: params?.locator,
      maxRecords: params?.maxRecords,
    });
  }
}
