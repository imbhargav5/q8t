// AUTO-GENERATED FILE - DO NOT EDIT
// Salesforce SDK - Main exports

// Export authentication modules
export * from "../src/auth";

// Export REST API
export * as RestApi from "./rest";

// Export Bulk API 2.0
export * as BulkApi from "./bulk";

// Export Tooling API
export * as ToolingApi from "./tooling";

// Re-export API classes for convenience
export { RestApi as SalesforceRestApi } from "./rest/api";
export { BulkApi as SalesforceBulkApi } from "./bulk/api";
export { ToolingApi as SalesforceToolingApi } from "./tooling/api";
