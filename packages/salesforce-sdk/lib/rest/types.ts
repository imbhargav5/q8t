// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Salesforce REST API

export interface Version {
  label?: string;
  url?: string;
  version?: string;
}

export interface Resources {
  [key: string]: string;
}

export interface Limits {
  [key: string]: unknown;
}

export interface GlobalDescribe {
  encoding?: string;
  maxBatchSize?: number;
  sobjects?: SObjectBasicInfo[];
}

export interface SObjectBasicInfo {
  name?: string;
  label?: string;
  custom?: boolean;
  keyPrefix?: string;
  updateable?: boolean;
  createable?: boolean;
  deletable?: boolean;
  queryable?: boolean;
}

export interface SObjectDescribe {
  name?: string;
  label?: string;
  fields?: Field[];
  recordTypeInfos?: Record<string, unknown>[];
  childRelationships?: Record<string, unknown>[];
}

export interface Field {
  name?: string;
  label?: string;
  type?: string;
  length?: number;
  updateable?: boolean;
  createable?: boolean;
  required?: boolean;
}

export interface SObjectRecord {
  Id?: string;
  attributes?: { type?: string; url?: string };
  [key: string]: unknown;
}

export interface CreateResponse {
  id?: string;
  success?: boolean;
  errors?: Record<string, unknown>[];
}

export interface UpsertResponse {
  id?: string;
  success?: boolean;
  created?: boolean;
  errors?: Record<string, unknown>[];
}

export interface SuccessResponse {
  success?: boolean;
}

export interface QueryResult {
  totalSize?: number;
  done?: boolean;
  nextRecordsUrl?: string;
  records?: SObjectRecord[];
}

export interface SearchResult {
  searchRecords?: SObjectRecord[];
}

export interface CompositeRequest {
  allOrNone: boolean;
  compositeRequest: Record<string, unknown>[];
}

export interface CompositeResponse {
  compositeResponse?: Record<string, unknown>[];
}

export interface CompositeBatchRequest {
  haltOnError?: boolean;
  batchRequests: Record<string, unknown>[];
}

export interface CompositeBatchResponse {
  hasErrors?: boolean;
  results?: Record<string, unknown>[];
}

export interface CompositeGraphRequest {
  graphs: Record<string, unknown>[];
}

export interface CompositeGraphResponse {
  graphs?: Record<string, unknown>[];
}

export interface SObjectCollectionRequest {
  ids: string[];
  fields?: string[];
}

export interface SObjectCollectionCreateRequest {
  allOrNone?: boolean;
  records: Record<string, unknown>[];
}

export interface SObjectCollectionUpdateRequest {
  allOrNone?: boolean;
  records: Record<string, unknown>[];
}

export interface SObjectCollectionUpsertRequest {
  allOrNone?: boolean;
  records: Record<string, unknown>[];
}

export interface SaveResult {
  id?: string;
  success?: boolean;
  errors?: Record<string, unknown>[];
}

export interface UpsertResult {
  id?: string;
  success?: boolean;
  created?: boolean;
  errors?: Record<string, unknown>[];
}

export interface DeleteResult {
  id?: string;
  success?: boolean;
  errors?: Record<string, unknown>[];
}

export interface CompositeTreeRequest {
  records: Record<string, unknown>[];
}

export interface CompositeTreeResponse {
  hasErrors?: boolean;
  results?: Record<string, unknown>[];
}

export interface RecentItem {
  Id?: string;
  Name?: string;
  attributes?: Record<string, unknown>;
}

export interface ParameterizedSearchResult {
  searchRecords?: SObjectRecord[];
  metadata?: Record<string, unknown>;
}
