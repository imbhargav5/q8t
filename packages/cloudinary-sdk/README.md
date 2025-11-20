# @q8t/cloudinary-sdk

A comprehensive TypeScript SDK for the Cloudinary API with full support for all API layers and authentication methods.

## Features

- **Complete API Coverage**: Upload API, Admin API, Unsigned Upload, and Provisioning API
- **Multiple Authentication Methods**: Signature-based (SHA-1/SHA-256), unsigned uploads, and Basic Auth
- **Type-Safe**: Auto-generated TypeScript types from OpenAPI specifications
- **Modular Design**: Separate clients for different use cases
- **Code Generation**: SDK generated from YAML specifications

## Installation

```bash
pnpm add @q8t/cloudinary-sdk
```

## Quick Start

### Signed API Client (Upload & Admin)

For server-side operations with full access to Upload and Admin APIs:

```typescript
import { CloudinarySDK } from '@q8t/cloudinary-sdk';

const client = CloudinarySDK.createSignedClient({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret',
  signature_algorithm: 'sha256' // optional, defaults to 'sha1'
});

// Upload an image
const uploadResult = await client.upload.upload('image', {
  file: 'https://example.com/image.jpg',
  public_id: 'sample-image',
  folder: 'my-folder',
  tags: 'sample,demo'
});

// List all images
const resources = await client.admin.getResources('image', {
  max_results: 30,
  tags: true,
  context: true
});

// Search for assets
const searchResults = await client.admin.search({
  expression: 'folder:my-folder AND tags:sample',
  max_results: 50
});

// Delete an asset
await client.upload.destroy('image', {
  public_id: 'sample-image',
  invalidate: true
});
```

### Unsigned Upload Client (Client-Side)

For client-side uploads without exposing API secrets:

```typescript
import { CloudinarySDK } from '@q8t/cloudinary-sdk';

const client = CloudinarySDK.createUnsignedClient({
  cloud_name: 'your-cloud-name',
  upload_preset: 'your-unsigned-preset' // Created in Cloudinary console
});

// Upload from browser
const result = await client.upload.unsignedUpload({
  file: fileInputElement.files[0], // or base64, or URL
  upload_preset: 'your-unsigned-preset',
  tags: 'user-upload',
  folder: 'user-uploads'
});
```

### Provisioning API Client (Enterprise)

For managing users, sub-accounts, and access keys (Enterprise plans only):

```typescript
import { CloudinarySDK } from '@q8t/cloudinary-sdk';

const client = CloudinarySDK.createProvisioningClient({
  account_id: 'your-account-id',
  provisioning_key: 'your-provisioning-key',
  provisioning_secret: 'your-provisioning-secret'
});

// Create a new user
const user = await client.users.createUser({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin'
});

// Create a sub-account
const subAccount = await client.subAccounts.createSubAccount({
  name: 'Production Environment',
  cloud_name: 'prod-cloud'
});

// List all users
const users = await client.users.listUsers();
```

## API Reference

### Upload API (Signed)

The Upload API provides methods for uploading and managing assets:

- `upload(resource_type, body)` - Upload a new asset
- `destroy(resource_type, body)` - Delete an asset
- `explicit(resource_type, body)` - Apply actions to uploaded asset
- `rename(resource_type, body)` - Rename an asset's public ID
- `explode(resource_type, body)` - Generate pages from multi-page files
- `generateArchive(resource_type, body)` - Create ZIP/TAR archive
- `manageTags(resource_type, body)` - Add/remove/replace tags
- `manageContext(resource_type, body)` - Manage contextual metadata
- `updateMetadata(resource_type, body)` - Update structured metadata

### Admin API (Signed)

The Admin API provides methods for browsing and managing assets at scale:

**Resources:**
- `getResources(resource_type, queryParams?)` - List all assets
- `getResource(resource_type, public_id, queryParams?)` - Get asset details
- `deleteResources(resource_type, queryParams?)` - Delete multiple assets
- `restoreResource(resource_type, public_id)` - Restore deleted asset
- `updateResource(resource_type, public_id, body)` - Update asset attributes

**Transformations:**
- `listTransformations(queryParams?)` - List all named transformations
- `getTransformation(transformation)` - Get transformation details
- `deleteTransformation(transformation)` - Delete a transformation

**Upload Presets:**
- `listUploadPresets(queryParams?)` - List all upload presets
- `getUploadPreset(name)` - Get preset details
- `createUploadPreset(body)` - Create new preset
- `updateUploadPreset(name, body)` - Update preset
- `deleteUploadPreset(name)` - Delete preset

**Tags & Folders:**
- `listTags(resource_type, queryParams?)` - List all tags
- `listSubFolders(asset_folder)` - List subfolders
- `deleteFolder(asset_folder)` - Delete folder and contents

**Search:**
- `search(body)` - Search assets with query expressions

**Metadata:**
- `listMetadataFields()` - List metadata field definitions
- `getMetadataField(field_external_id)` - Get field details
- `createMetadataField(body)` - Create metadata field
- `updateMetadataField(field_external_id, body)` - Update field
- `deleteMetadataField(field_external_id)` - Delete field

### Unsigned Upload API

- `unsignedUpload(body)` - Upload without signature using preset

### Provisioning API (Enterprise)

**Users:**
- `listUsers(queryParams?)` - List all users
- `getUser(user_id)` - Get user details
- `createUser(body)` - Create new user
- `updateUser(user_id, body)` - Update user
- `deleteUser(user_id)` - Delete user

**User Groups:**
- `listUserGroups()` - List all user groups
- `getUserGroup(group_id)` - Get group details
- `createUserGroup(body)` - Create user group
- `updateUserGroup(group_id, body)` - Update group
- `deleteUserGroup(group_id)` - Delete group
- `addUserToGroup(group_id, user_id)` - Add user to group
- `removeUserFromGroup(group_id, user_id)` - Remove user from group

**Sub-Accounts:**
- `listSubAccounts(queryParams?)` - List sub-accounts
- `getSubAccount(sub_account_id)` - Get sub-account details
- `createSubAccount(body)` - Create sub-account
- `updateSubAccount(sub_account_id, body)` - Update sub-account
- `deleteSubAccount(sub_account_id)` - Delete sub-account

**Access Keys:**
- `listAccessKeys(sub_account_id)` - List access keys
- `generateAccessKey(sub_account_id, body?)` - Generate new key
- `updateAccessKey(sub_account_id, key, body)` - Update key
- `deleteAccessKey(sub_account_id, key)` - Delete key

## Authentication Methods

### 1. Signature-Based (Upload & Admin APIs)

Uses `cloud_name`, `api_key`, and `api_secret` to generate SHA-1 or SHA-256 signatures:

```typescript
const client = CloudinarySDK.createSignedClient({
  cloud_name: 'demo',
  api_key: '123456789012345',
  api_secret: 'abcdefghijklmnopqrstuvwxyz12',
  signature_algorithm: 'sha256' // or 'sha1' (default)
});
```

**Security:** Never expose `api_secret` in client-side code.

### 2. Unsigned Upload (Client-Side)

Uses `cloud_name` and `upload_preset` for secure client-side uploads:

```typescript
const client = CloudinarySDK.createUnsignedClient({
  cloud_name: 'demo',
  upload_preset: 'my_preset_name'
});
```

**Setup:** Create unsigned upload preset in Cloudinary Console Settings > Upload.

### 3. Basic Auth (Provisioning API)

Uses `account_id`, `provisioning_key`, and `provisioning_secret`:

```typescript
const client = CloudinarySDK.createProvisioningClient({
  account_id: 'abc123',
  provisioning_key: 'pk_abc123',
  provisioning_secret: 'ps_secret123'
});
```

**Availability:** Enterprise plans only.

## Configuration

### Environment Variables

```bash
# Signed API
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Unsigned Upload
CLOUDINARY_UPLOAD_PRESET=your-preset-name

# Provisioning API
CLOUDINARY_ACCOUNT_ID=your-account-id
CLOUDINARY_PROVISIONING_KEY=your-provisioning-key
CLOUDINARY_PROVISIONING_SECRET=your-provisioning-secret
```

### Getting Credentials

1. **Cloud Name, API Key, API Secret:**
   - Log in to [Cloudinary Console](https://cloudinary.com/console)
   - Navigate to Settings > Access Keys
   - Find or generate API credentials

2. **Upload Preset:**
   - Go to Settings > Upload
   - Create a new upload preset
   - Set signing mode to "Unsigned"

3. **Provisioning Credentials:**
   - Available in Settings > Account > Provisioning API Access
   - Enterprise plans only

## Code Generation

The SDK is auto-generated from OpenAPI specifications. To regenerate:

```bash
pnpm generate
```

This generates:
- `lib/types.ts` - TypeScript interfaces from all schemas
- `lib/upload-api.ts` - Upload API methods
- `lib/admin-api.ts` - Admin API methods
- `lib/unsigned-upload-api.ts` - Unsigned upload methods
- `lib/provisioning-api.ts` - Provisioning API methods
- `lib/index.ts` - Unified exports

## Architecture

```
packages/cloudinary-sdk/
├── api/
│   ├── upload.yaml              # Upload API OpenAPI spec
│   ├── admin.yaml               # Admin API OpenAPI spec
│   ├── unsigned-upload.yaml     # Unsigned upload spec
│   └── provisioning.yaml        # Provisioning API spec
├── src/
│   ├── auth/
│   │   ├── signature.ts         # SHA-1/SHA-256 signature generation
│   │   ├── signature-client.ts  # Signed HTTP client
│   │   ├── unsigned-client.ts   # Unsigned HTTP client
│   │   ├── provisioning-client.ts # Provisioning HTTP client
│   │   └── config.ts            # Configuration types
│   ├── generator/
│   │   ├── parser.ts            # OpenAPI parser
│   │   ├── type-generator.ts    # TypeScript type generator
│   │   ├── api-generator.ts     # API class generator
│   │   └── index.ts             # Main generator orchestrator
│   └── index.ts                 # Main SDK export
└── lib/                         # Generated code (gitignored)
```

## Advanced Examples

### Upload with Transformation

```typescript
const result = await client.upload.upload('image', {
  file: 'image.jpg',
  public_id: 'hero-image',
  transformation: 'w_800,h_600,c_fill,g_auto',
  eager: 'w_400,h_300,c_thumb',
  tags: 'homepage,hero'
});
```

### Search with Aggregations

```typescript
const results = await client.admin.search({
  expression: 'resource_type:image AND uploaded_at>1m',
  max_results: 100,
  sort_by: [{ created_at: 'desc' }],
  aggregate: 'format',
  with_field: ['tags', 'context']
});
```

### Manage Upload Presets

```typescript
// Create preset
const preset = await client.admin.createUploadPreset({
  name: 'user_avatars',
  unsigned: true,
  folder: 'avatars',
  transformation: 'w_200,h_200,c_fill,g_face',
  tags: 'avatar',
  allowed_formats: 'jpg,png,webp'
});

// Update preset
await client.admin.updateUploadPreset('user_avatars', {
  folder: 'user/avatars',
  tags: 'avatar,user-upload'
});
```

### Generate Archive

```typescript
const archive = await client.upload.generateArchive('image', {
  tags: ['export'],
  target_format: 'zip',
  flatten_folders: true,
  async: true,
  notification_url: 'https://example.com/webhook'
});
```

## Rate Limits

- **Upload API**: Unlimited (rate-unlimited)
- **Admin API**: Rate-limited (check response headers for quota)
- **Provisioning API**: Rate-limited

Response headers include:
- `X-FeatureRateLimit-Limit`: Total allowed requests per hour
- `X-FeatureRateLimit-Remaining`: Remaining requests
- `X-FeatureRateLimit-Reset`: Time when limit resets

## Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Upload API Reference](https://cloudinary.com/documentation/image_upload_api_reference)
- [Admin API Reference](https://cloudinary.com/documentation/admin_api)
- [Provisioning API Reference](https://cloudinary.com/documentation/provisioning_api)
- [Search API](https://cloudinary.com/documentation/search_method)

## License

MIT
