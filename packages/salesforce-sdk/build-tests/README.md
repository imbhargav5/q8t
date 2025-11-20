# Salesforce SDK Build Tests

Comprehensive test suite to validate the generated SDK code.

## Test Files

### 1. `rest-api-methods.spec.ts` (27 tests)
Tests that all REST API methods exist in the generated `RestApi` class:
- Core operations (getResources, getLimits, describeGlobal, describeSObject)
- sObject CRUD operations (getSObject, createSObject, updateSObject, deleteSObject, etc.)
- Query & Search operations (query, queryMore, queryAll, search, parameterizedSearch)
- Composite operations (composite, compositeBatch, compositeGraph, compositeTree)
- sObject Collection operations (create/update/delete/upsert collections)
- Utility operations (getRecentItems)
- Method count validation (25 methods)

### 2. `bulk-api-methods.spec.ts` (17 tests)
Tests that all Bulk API 2.0 methods exist in the generated `BulkApi` class:
- Ingest job operations (9 methods)
- Query job operations (6 methods)
- Method count validation (15 methods)

### 3. `tooling-api-methods.spec.ts` (11 tests)
Tests that all Tooling API methods exist in the generated `ToolingApi` class:
- Query operations (toolingQuery)
- sObject CRUD operations (get/create/update/delete)
- Development tools (executeAnonymous, runTests, getCompletions)
- Method count validation (9 methods)

### 4. `api-integration.spec.ts` (26 tests)
Tests that API methods correctly call the HTTP client with expected parameters:
- **REST API Integration** (15 tests)
  - Core operations
  - sObject CRUD with path parameters
  - Query operations with SOQL/SOSL
  - Composite operations with request bodies
- **Bulk API Integration** (7 tests)
  - Ingest job operations
  - Query job operations
  - CSV data upload
- **Tooling API Integration** (4 tests)
  - Query operations
  - sObject operations
  - Development tools

### 5. `types.spec.ts` (30 tests)
Tests that all TypeScript types are correctly generated and exported:
- **REST API Types** (14 tests)
  - Core response types (QueryResult, SObjectRecord, CreateResponse, etc.)
  - Describe types (GlobalDescribe, SObjectDescribe, Field)
  - Composite request types
  - Collection types
- **Bulk API Types** (11 tests)
  - Ingest job types
  - Query job types
  - Job state enum values
  - Operation types
- **Tooling API Types** (5 tests)
  - Query types
  - Development tool types (ExecuteAnonymousResult, RunTestsRequest, etc.)
  - Response types

### 6. `sdk-integration.spec.ts` (23 tests)
Tests the main SDK class and factory methods:
- **SDK Constructor** (2 tests)
- **API Client Access** (6 tests)
  - REST, Bulk, and Tooling API client instances
  - HTTP client access
  - Instance caching
- **Factory Methods** (6 tests)
  - createWithAccessToken
  - createWithSessionId
- **Module Exports** (8 tests)
  - SalesforceSDK class export
  - Factory function exports
  - Type namespace exports
- **Complete API Surface** (1 test)
  - Validates all methods exist across all APIs

## Test Statistics

- **Total Tests**: 134
- **Test Files**: 6
- **Test Coverage**:
  - REST API: 25 methods tested
  - Bulk API: 15 methods tested
  - Tooling API: 9 methods tested
  - Total: 49 methods tested

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test -- --coverage
```

## Test Philosophy

These build tests are **structural tests** that verify:

1. **Method Existence**: All methods defined in OpenAPI specs are generated
2. **Method Signatures**: Methods have correct parameters and return types
3. **HTTP Integration**: Methods call the HTTP client with correct paths/parameters
4. **Type Exports**: All TypeScript types are generated and accessible
5. **SDK Integration**: Main SDK class correctly wires up all API clients

These tests do NOT:
- Make real HTTP requests to Salesforce
- Test authentication flows
- Validate business logic
- Test error handling

## Comparison with X SDK

Similar to the X SDK build tests, this test suite ensures:
- Complete API coverage (X SDK: 47 methods, Salesforce SDK: 49 methods)
- Proper method existence validation
- HTTP client integration testing
- Type generation validation
- SDK factory method testing

The Salesforce SDK tests are more comprehensive due to multiple API types:
- X SDK: 1 API client, 5 test files
- Salesforce SDK: 3 API clients, 6 test files

## Benefits

1. **Early Detection**: Catches code generation issues immediately
2. **Regression Prevention**: Ensures regenerating code doesn't break APIs
3. **Documentation**: Tests serve as usage examples
4. **Confidence**: 100% coverage of generated methods
5. **Fast Execution**: All tests run in <500ms

## Maintenance

When adding new endpoints to OpenAPI specs:
1. Regenerate code: `pnpm generate`
2. Update method count tests if needed
3. Add integration tests for new endpoints
4. Run tests: `pnpm test`

All tests should pass after regeneration!
