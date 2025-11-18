# @q8t/bluesky-sdk

Bluesky API SDK with code generation from YAML definitions.

## Features

- AT Protocol authentication
- Auto-generated TypeScript types from OpenAPI YAML
- Type-safe API methods
- Session management with JWT tokens

## Usage

```typescript
import { createBlueskyClient, BlueskyApi } from "@q8t/bluesky-sdk";

// Create authenticated client
const client = await createBlueskyClient({
  identifier: "your-handle.bsky.social",
  password: "your-app-password",
});

// Use generated API methods
const api = new BlueskyApi(client);
const profile = await api.getProfile({ actor: "your-handle.bsky.social" });
const post = await api.createPost({ text: "Hello from Bluesky SDK!" });
```

## Authentication

The SDK uses AT Protocol authentication:

```typescript
import { createSession, refreshSession } from "@q8t/bluesky-sdk";

// Create a new session
const session = await createSession({
  identifier: "your-handle.bsky.social",
  password: "your-app-password",
});

// Refresh an existing session
const newSession = await refreshSession(session.refreshJwt);
```

## Code Generation

```bash
pnpm generate  # Generate lib/ from api/openapi.yaml
pnpm build     # Build the package
```
