// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Salesforce Bulk API 2.0

export interface CreateIngestJobRequest {
  object: string;
  operation: "insert" | "update" | "upsert" | "delete" | "hardDelete";
  externalIdFieldName?: string;
  contentType?: "CSV";
  lineEnding?: "LF" | "CRLF";
  columnDelimiter?: "BACKQUOTE" | "CARET" | "COMMA" | "PIPE" | "SEMICOLON" | "TAB";
  assignmentRuleId?: string;
}

export interface IngestJob {
  id?: string;
  object?: string;
  operation?: string;
  state?: "Open" | "UploadComplete" | "InProgress" | "Aborted" | "JobComplete" | "Failed";
  createdDate?: string;
  systemModstamp?: string;
  createdById?: string;
  numberRecordsProcessed?: number;
  numberRecordsFailed?: number;
  retries?: number;
  totalProcessingTime?: number;
  apiVersion?: number;
  contentType?: string;
  lineEnding?: string;
  columnDelimiter?: string;
  externalIdFieldName?: string;
}

export interface IngestJobList {
  done?: boolean;
  records?: IngestJob[];
  nextRecordsUrl?: string;
}

export interface UpdateIngestJobStateRequest {
  state: "UploadComplete" | "Aborted";
}

export interface CreateQueryJobRequest {
  operation: "query" | "queryAll";
  query: string;
  contentType?: "CSV";
  columnDelimiter?: "BACKQUOTE" | "CARET" | "COMMA" | "PIPE" | "SEMICOLON" | "TAB";
  lineEnding?: "LF" | "CRLF";
}

export interface QueryJob {
  id?: string;
  operation?: string;
  object?: string;
  createdById?: string;
  createdDate?: string;
  systemModstamp?: string;
  state?: "UploadComplete" | "InProgress" | "Aborted" | "JobComplete" | "Failed";
  query?: string;
  numberRecordsProcessed?: number;
  retries?: number;
  totalProcessingTime?: number;
  apiVersion?: number;
  contentType?: string;
  columnDelimiter?: string;
  lineEnding?: string;
}

export interface QueryJobList {
  done?: boolean;
  records?: QueryJob[];
  nextRecordsUrl?: string;
}

export interface AbortJobRequest {
  state: "Aborted";
}

export interface SuccessResponse {
  success?: boolean;
}
