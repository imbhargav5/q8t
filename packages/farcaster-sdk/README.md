# @q8t/farcaster-sdk

Comprehensive TypeScript SDK for the Farcaster/Warpcast ecosystem with full support for all API layers.

## Features

- **Three Distinct API Clients** - Hub API (protocol layer), Warpcast API (application layer), and Signer API (authentication layer)
- **Type-Safe** - Full TypeScript support with generated types from OpenAPI specifications
- **Code Generation** - Automatically generated from YAML specifications
- **Modular Architecture** - Use only the APIs you need
- **Comprehensive Coverage** - Supports all Farcaster/Warpcast API endpoints

## Architecture

This SDK provides access to three layers of the Farcaster ecosystem:

### 1. Hub API (Protocol Layer)
Direct access to the decentralized Farcaster protocol:
- Read casts, reactions, links (follows), user data
- Access verifications, storage limits, onchain events
- Submit signed messages to the network

### 2. Warpcast API (Application Layer)
Application-level features:
- Manage channels (follow, create invites, etc.)
- Moderation (ban users, hide casts, pin content)
- User features (block users, primary addresses)
- Direct casts and discovery

### 3. Signer API (Authentication Layer)
Manage signer requests and approvals:
- Create signer requests
- Poll signer status
- Send frame notifications

## Installation

```bash
pnpm add @q8t/farcaster-sdk
```

## Usage

### Basic Example

```typescript
import { FarcasterSDK } from "@q8t/farcaster-sdk";

// Create SDK instance with Hub access only (read-only)
const sdk = new FarcasterSDK({
  hub: {
    hubUrl: "https://hub.pinata.cloud"
  }
});

// Get casts by FID
const casts = await sdk.hub.getCastsByFid({ fid: 123 });

// Get reactions by FID
const reactions = await sdk.hub.getReactionsByFid({ fid: 123 });
```

### Full Access Example

```typescript
import { FarcasterSDK } from "@q8t/farcaster-sdk";

// Create SDK with all three APIs
const sdk = new FarcasterSDK({
  // Hub API configuration
  hub: {
    hubUrl: "https://hub.pinata.cloud",
    signerPrivateKey: "0x...",
    fid: 123
  },
  // Warpcast API configuration
  warpcast: {
    accessToken: "your-warpcast-token"
  },
  // Signer API configuration
  signer: {
    appFid: 456,
    appPrivateKey: "0x..."
  }
});

// Use Hub API
const userCasts = await sdk.hub.getCastsByFid({ fid: 123 });

// Use Warpcast API
const channels = await sdk.warpcast.getAllChannels();
await sdk.warpcast.followChannel({ channelId: "farcaster" });

// Use Signer API
const signerRequest = await sdk.signer.createSignerRequest({
  key: "0x...",
  requestFid: 123,
  signature: "0x...",
  deadline: Math.floor(Date.now() / 1000) + 86400
});
```

## API Reference

### Hub API Methods

#### Casts
- `getCastsByFid(params)` - Get casts by FID
- `getCastsByParent(params)` - Get casts by parent cast or URL
- `getCastsByMention(params)` - Get casts mentioning a FID
- `getCastById(params)` - Get a specific cast

#### Reactions
- `getReactionsByFid(params)` - Get reactions by FID
- `getReactionsByCast(params)` - Get reactions to a cast
- `getReactionById(params)` - Get a specific reaction

#### Links (Follows)
- `getLinksByFid(params)` - Get links (follows) from a FID
- `getLinksByTargetFid(params)` - Get links to a FID
- `getLinkById(params)` - Get a specific link

#### User Data
- `getUserDataByFid(params)` - Get user profile data

#### Verifications
- `getVerificationsByFid(params)` - Get address verifications

#### Storage & OnChain
- `getStorageLimitsByFid(params)` - Get storage limits
- `getOnChainEventsByFid(params)` - Get onchain events
- `getOnChainSignersByFid(params)` - Get registered signers

#### Utility
- `getInfo(params)` - Get hub info and sync status
- `getFids(params)` - Get list of FIDs
- `submitMessage(body)` - Submit signed message to network

### Warpcast API Methods

#### Channels
- `getAllChannels(params)` - List all channels
- `getChannel(params)` - Get channel by ID
- `followChannel(body)` - Follow a channel
- `unfollowChannel(params)` - Unfollow a channel
- `getChannelFollowers(params)` - Get channel followers
- `getUserFollowingChannels(params)` - Get channels user follows

#### Channel Management
- `getChannelInvites(params)` - Get channel invites
- `createChannelInvite(body)` - Invite user to channel
- `deleteChannelInvite(params)` - Remove channel invite
- `respondToChannelInvite(body)` - Accept or decline invite

#### Moderation
- `getModeratedCasts(params)` - Get moderated casts
- `moderateCast(body)` - Hide or unhide a cast
- `getChannelBans(params)` - Get banned users
- `banUser(body)` - Ban user from channel
- `unbanUser(params)` - Unban user from channel

#### Pinning
- `pinCast(body)` - Pin cast to channel
- `unpinCast(params)` - Unpin cast from channel

#### User Features
- `getMe()` - Get authenticated user info
- `getBlockedUsers(params)` - Get blocked users
- `blockUser(body)` - Block a user
- `unblockUser(params)` - Unblock a user
- `getPrimaryAddress(params)` - Get primary Ethereum address

#### Direct Casts
- `sendDirectCast(body)` - Send direct message to user

### Signer API Methods

- `createSignerRequest(body)` - Create new signer request
- `getSignerRequest(params)` - Poll signer request status
- `sendFrameNotification(body)` - Send frame notification

## Testing

The SDK includes comprehensive test coverage:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

**Test Coverage:**
- 76 total tests across 2 test suites
- All 55 API methods validated (19 Hub + 33 Warpcast + 3 Signer)
- SDK initialization and configuration tests
- Type export validation tests
- Error handling tests for missing credentials

## Development

### Code Generation

This SDK uses code generation from OpenAPI specifications:

```bash
# Generate API code from YAML specs
pnpm generate

# Build the SDK
pnpm build

# Run tests
pnpm test

# Type check
pnpm check

# Format code
pnpm format

# Lint code
pnpm lint
```

### Project Structure

```
farcaster-sdk/
├── api/                    # OpenAPI specifications
│   ├── hub-openapi.yaml
│   ├── warpcast-openapi.yaml
│   └── signer-openapi.yaml
├── src/
│   ├── auth/              # Authentication layer
│   │   ├── config.ts
│   │   ├── hub-client.ts
│   │   ├── warpcast-client.ts
│   │   ├── signer-client.ts
│   │   └── utils.ts
│   ├── generator/          # Code generation scripts
│   │   ├── index.ts
│   │   ├── parser.ts
│   │   ├── type-generator.ts
│   │   └── api-generator.ts
│   └── index.ts            # Main SDK entry point
└── lib/                    # Generated API code
    ├── hub-api.ts
    ├── hub-types.ts
    ├── warpcast-api.ts
    ├── warpcast-types.ts
    ├── signer-api.ts
    ├── signer-types.ts
    └── index.ts
```

## Authentication

### Hub API
- No authentication required for read operations
- Signed messages required for writes (using Ed25519 private key)

### Warpcast API
- Requires Bearer token (access token)
- Obtain from Warpcast dashboard or OAuth flow

### Signer API
- Requires App FID and App private key
- Used for managing signer requests

## Examples

### Get User's Casts and Reactions

```typescript
const sdk = new FarcasterSDK({
  hub: { hubUrl: "https://hub.pinata.cloud" }
});

const fid = 123;

// Get all casts
const casts = await sdk.hub.getCastsByFid({ fid });

// Get all reactions
const reactions = await sdk.hub.getReactionsByFid({ fid });
```

### Manage Channel Membership

```typescript
const sdk = new FarcasterSDK({
  warpcast: { accessToken: "your-token" }
});

// Follow a channel
await sdk.warpcast.followChannel({ channelId: "farcaster" });

// Get all channels
const channels = await sdk.warpcast.getAllChannels();

// Unfollow a channel
await sdk.warpcast.unfollowChannel({ channelId: "farcaster" });
```

### Create Signer Request

```typescript
const sdk = new FarcasterSDK({
  signer: {
    appFid: 456,
    appPrivateKey: "0x..."
  }
});

// Create signer request
const request = await sdk.signer.createSignerRequest({
  key: "0x...",
  requestFid: 123,
  signature: "0x...",
  deadline: Math.floor(Date.now() / 1000) + 86400
});

// Poll status
const status = await sdk.signer.getSignerRequest({
  token: request.result.signedKeyRequest.token
});
```

## Contributing

This SDK is generated from OpenAPI specifications. To add new endpoints:

1. Update the appropriate YAML file in `api/`
2. Run `pnpm generate` to regenerate the API code
3. Test the changes

## License

MIT
