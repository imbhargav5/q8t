# Salesforce SDK

A comprehensive TypeScript SDK for Salesforce with support for multiple authentication methods and API types.

## Features

### Multiple Authentication Methods
- **OAuth 2.0** - Web Server Flow, User-Agent Flow, JWT Bearer Flow
- **JWT Bearer Flow** - Server-to-server authentication with certificates
- **Username-Password Flow** - Direct authentication with credentials
- **Session ID** - Use existing authenticated sessions

### Multiple API Clients
- **REST API** - Full CRUD operations, queries, searches, composite operations
- **Bulk API 2.0** - Asynchronous processing of large data sets
- **Tooling API** - Development tools and metadata operations

### Code Generation
All API clients are automatically generated from OpenAPI specifications, ensuring:
- Type-safe API calls
- Complete API coverage
- Up-to-date with Salesforce API v65.0

## Installation

```bash
pnpm install @q8t/salesforce-sdk
```

## Usage

### Authentication Examples

#### 1. OAuth 2.0 with Access Token
```typescript
import { createWithAccessToken } from '@q8t/salesforce-sdk';

const sdk = createWithAccessToken(
  'https://your-instance.my.salesforce.com',
  'your-access-token'
);
```

#### 2. JWT Bearer Flow (Server-to-Server)
```typescript
import { createWithJWT } from '@q8t/salesforce-sdk';

const sdk = await createWithJWT({
  clientId: 'your-client-id',
  username: 'user@example.com',
  privateKey: '-----BEGIN RSA PRIVATE KEY-----\n...',
  instanceUrl: 'https://your-instance.my.salesforce.com',
  loginUrl: 'https://login.salesforce.com', // or https://test.salesforce.com for sandbox
});
```

#### 3. Username-Password Flow
```typescript
import { createWithUsernamePassword } from '@q8t/salesforce-sdk';

const sdk = await createWithUsernamePassword({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  username: 'user@example.com',
  password: 'your-password',
  securityToken: 'your-security-token', // optional
  instanceUrl: 'https://your-instance.my.salesforce.com',
  loginUrl: 'https://login.salesforce.com',
});
```

#### 4. Session ID
```typescript
import { createWithSessionId } from '@q8t/salesforce-sdk';

const sdk = createWithSessionId({
  instanceUrl: 'https://your-instance.my.salesforce.com',
  sessionId: 'existing-session-id',
});
```

### API Usage Examples

#### REST API - Query Records
```typescript
// Query using SOQL
const result = await sdk.rest().query({
  q: 'SELECT Id, Name FROM Account LIMIT 10'
});

console.log(`Found ${result.totalSize} accounts`);
result.records.forEach(record => {
  console.log(record.Name);
});
```

#### REST API - Create Record
```typescript
const result = await sdk.rest().createSObject(
  'Account',
  {
    Name: 'Acme Corporation',
    Industry: 'Technology'
  }
);

console.log(`Created account with ID: ${result.id}`);
```

#### REST API - Update Record
```typescript
await sdk.rest().updateSObject(
  'Account',
  'account-id',
  {
    Name: 'Updated Name',
    Website: 'https://example.com'
  }
);
```

#### REST API - Composite Operations
```typescript
const result = await sdk.rest().composite({
  allOrNone: true,
  compositeRequest: [
    {
      method: 'POST',
      url: '/services/data/v65.0/sobjects/Account',
      referenceId: 'newAccount',
      body: { Name: 'New Account' }
    },
    {
      method: 'POST',
      url: '/services/data/v65.0/sobjects/Contact',
      referenceId: 'newContact',
      body: {
        FirstName: 'John',
        LastName: 'Doe',
        AccountId: '@{newAccount.id}'
      }
    }
  ]
});
```

#### Bulk API 2.0 - Create Ingest Job
```typescript
// Create a job to insert records
const job = await sdk.bulk().createIngestJob({
  object: 'Account',
  operation: 'insert',
  contentType: 'CSV',
});

console.log(`Created job: ${job.id}`);

// Upload CSV data
const csvData = `Name,Industry\nAcme Corp,Technology\nGlobex Inc,Manufacturing`;
await sdk.bulk().uploadJobData(job.id, csvData);

// Close the job
await sdk.bulk().updateIngestJobState(job.id, { state: 'UploadComplete' });

// Check job status
const jobStatus = await sdk.bulk().getIngestJob(job.id);
console.log(`Job state: ${jobStatus.state}`);
```

#### Bulk API 2.0 - Create Query Job
```typescript
// Create a query job
const queryJob = await sdk.bulk().createQueryJob({
  operation: 'query',
  query: 'SELECT Id, Name, Industry FROM Account WHERE CreatedDate = THIS_YEAR',
});

// Get results
const results = await sdk.bulk().getQueryResults(queryJob.id);
console.log(results); // CSV data
```

#### Tooling API - Execute Anonymous Apex
```typescript
const result = await sdk.tooling().executeAnonymous({
  anonymousBody: 'System.debug("Hello from Apex!");'
});

console.log(`Compiled: ${result.compiled}`);
console.log(`Success: ${result.success}`);
```

## Architecture

### Generated Code Structure
```
lib/
├── rest/           # REST API client
│   ├── types.ts    # TypeScript types
│   ├── api.ts      # API methods
│   └── index.ts
├── bulk/           # Bulk API 2.0 client
│   ├── types.ts
│   ├── api.ts
│   └── index.ts
├── tooling/        # Tooling API client
│   ├── types.ts
│   ├── api.ts
│   └── index.ts
└── index.ts        # Main exports
```

### YAML Specifications
Each API client is generated from OpenAPI YAML specifications:
- `api/rest-api.yaml` - REST API specification
- `api/bulk-api.yaml` - Bulk API 2.0 specification
- `api/tooling-api.yaml` - Tooling API specification

### Code Generation
To regenerate the SDK from YAML specs:

```bash
pnpm generate
```

This will:
1. Parse all OpenAPI YAML files
2. Generate TypeScript types for all schemas
3. Generate type-safe API methods
4. Create index files for easy imports

## Development

### Build
```bash
pnpm build
```

### Run Tests
```bash
pnpm test
```

### Lint
```bash
pnpm lint
```

## API Coverage

### REST API (v65.0)
- ✅ Versions and Resources
- ✅ Limits
- ✅ Describe Global and sObjects
- ✅ sObject CRUD operations
- ✅ Query (SOQL)
- ✅ Search (SOSL)
- ✅ Composite operations
- ✅ Composite Batch
- ✅ Composite Graph
- ✅ Composite Tree
- ✅ sObject Collections
- ✅ Recent Items
- ✅ Parameterized Search

### Bulk API 2.0 (v65.0)
- ✅ Ingest Jobs (insert, update, upsert, delete)
- ✅ Query Jobs
- ✅ Job management (create, get, update, delete)
- ✅ Upload CSV data
- ✅ Get successful/failed/unprocessed results
- ✅ Job listing with pagination

### Tooling API (v65.0)
- ✅ Query Tooling objects
- ✅ Tooling sObject CRUD operations
- ✅ Execute Anonymous Apex
- ✅ Run Tests (synchronous and asynchronous)
- ✅ Code completions

## License

Private package for Q8T project.
