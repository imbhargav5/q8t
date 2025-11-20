// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Salesforce Tooling API

export interface QueryResult {
  totalSize?: number;
  done?: boolean;
  records?: ToolingSObjectRecord[];
}

export interface ToolingSObjectRecord {
  Id?: string;
  attributes?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface CreateResponse {
  id?: string;
  success?: boolean;
  errors?: Record<string, unknown>[];
}

export interface SuccessResponse {
  success?: boolean;
}

export interface ExecuteAnonymousResult {
  compiled?: boolean;
  success?: boolean;
  line?: number;
  column?: number;
  compileProblem?: string;
  exceptionMessage?: string;
  exceptionStackTrace?: string;
}

export interface RunTestsRequest {
  tests?: { classId?: string; testMethods?: string[] }[];
}

export interface RunTestsResult {
  numFailures?: number;
  numTestsRun?: number;
  successes?: Record<string, unknown>[];
  failures?: Record<string, unknown>[];
  codeCoverage?: Record<string, unknown>[];
}

export interface CompletionsResult {
  publicDeclarations?: Record<string, unknown>;
}
