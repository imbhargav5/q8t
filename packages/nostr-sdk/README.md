# @q8t/nostr-sdk

A comprehensive, type-safe TypeScript SDK for the Nostr protocol with full support for multiple authentication methods, relay management, and essential NIPs (Nostr Implementation Possibilities).

## Features

- **Multiple Authentication Methods**
  - Private key (direct signing)
  - NIP-07 (browser extension support)
  - Extensible signer interface

- **Comprehensive NIP Support**
  - NIP-01: Basic protocol (events, filters, subscriptions)
  - NIP-04: Encrypted direct messages (legacy)
  - NIP-05: DNS-based verification
  - NIP-13: Proof of work
  - NIP-19: Bech32 encoding (npub, nsec, note, nprofile, nevent, naddr)
  - NIP-44: Modern versioned encryption (recommended)

- **Advanced Relay Management**
  - Relay pool with auto-reconnection
  - Exponential backoff
  - Event deduplication across relays
  - WebSocket connection management

- **High-Level Client API**
  - Publish notes, reactions, reposts
  - Follow/unfollow users
  - Subscribe to feeds, mentions, profiles
  - Query events with filters

- **Low-Level Crypto Utilities**
  - Event signing and verification
  - Key generation and validation
  - Event serialization and hashing

## Installation

```bash
pnpm add @q8t/nostr-sdk
```

## Quick Start

### Using Private Key Authentication

```typescript
import { createPrivateKeyClient, generateSecretKey, getPublicKey } from '@q8t/nostr-sdk';

// Generate a new keypair
const secretKey = generateSecretKey();
const pubkey = getPublicKey(secretKey);

console.log('Public key:', pubkey);

// Create client
const client = createPrivateKeyClient(
  secretKey,
  ['wss://relay.damus.io', 'wss://relay.nostr.band']
);

// Publish a note
const event = await client.publishNote('Hello Nostr! 👋');
console.log('Published event:', event.id);

// Follow a user
await client.followUser('pubkey-here');

// Subscribe to your feed
const sub = await client.subscribeToFeed((event) => {
  console.log('New event:', event.content);
});

// Cleanup
sub.close();
client.disconnect();
```

### Using Browser Extension (NIP-07)

```typescript
import { createNip07Client } from '@q8t/nostr-sdk';

// Create client (requires browser extension like nos2x or Alby)
const client = createNip07Client([
  'wss://relay.damus.io',
  'wss://relay.nostr.band'
]);

// Publish a note
const event = await client.publishNote('Hello from browser! 🌐');
```

## Core Concepts

### Events

Events are the fundamental data structure in Nostr:

```typescript
import { Event, EventKind, createEvent, finishEvent } from '@q8t/nostr-sdk';

// Create an unsigned event
const unsigned = createEvent(
  pubkey,
  EventKind.Text,
  'Hello world!',
  [['t', 'nostr']] // tags
);

// Sign the event
const event = await finishEvent(unsigned, secretKey);
```

### Filters

Filters are used to query events:

```typescript
import { Filter } from '@q8t/nostr-sdk';

const filter: Filter = {
  authors: ['pubkey1', 'pubkey2'],
  kinds: [1, 6], // Text notes and reposts
  since: Math.floor(Date.now() / 1000) - 3600, // Last hour
  limit: 50
};

const events = await client.query([filter]);
```

## Client API

### Publishing

```typescript
// Publish a text note
await client.publishNote('Hello Nostr!');

// Publish a note with tags
await client.publishNote('GM! #nostr', [['t', 'nostr']]);

// Publish a reaction
await client.publishReaction(eventId, '+');
await client.publishReaction(eventId, '🔥');

// Repost an event
await client.repost(eventId, authorPubkey);

// Set user metadata
await client.setMetadata({
  name: 'Alice',
  about: 'Nostr enthusiast',
  picture: 'https://example.com/avatar.jpg',
  nip05: 'alice@example.com'
});

// Delete events
await client.deleteEvents([eventId1, eventId2], 'Spam');
```

### Querying

```typescript
// Get user metadata
const metadata = await client.getMetadata(pubkey);

// Get user's recent notes
const notes = await client.getUserNotes(pubkey, 20);

// Get reactions to an event
const reactions = await client.getReactions(eventId);

// Get replies to an event
const replies = await client.getReplies(eventId);

// Custom query
const events = await client.query([
  {
    kinds: [1],
    '#t': ['nostr'],
    limit: 100
  }
]);
```

### Subscriptions

```typescript
// Subscribe to a user's profile
const sub1 = client.subscribeToProfile(pubkey, (event) => {
  console.log('Profile update:', event);
});

// Subscribe to your feed
const sub2 = await client.subscribeToFeed((event) => {
  console.log('Feed event:', event);
});

// Subscribe to mentions
const sub3 = await client.subscribeToMentions((event) => {
  console.log('Mentioned in:', event);
});

// Cleanup
sub1.close();
sub2.close();
sub3.close();
```

### Social Features

```typescript
// Follow a user
await client.followUser(pubkey);

// Unfollow a user
await client.unfollowUser(pubkey);

// Get contacts
const contacts = await client.getContacts(pubkey);

// Set contact list
await client.setContacts([
  { pubkey: 'abc...', relay: 'wss://relay.example.com', petname: 'Alice' },
  { pubkey: 'def...' }
]);
```

### Encrypted Messaging

```typescript
// Send encrypted DM (NIP-04 - deprecated)
await client.sendEncryptedDM(recipientPubkey, 'Secret message');

// Using NIP-44 (modern encryption)
import { nip44 } from '@q8t/nostr-sdk';

const conversationKey = nip44.getConversationKey(secretKey, recipientPubkey);
const ciphertext = nip44.encrypt(conversationKey, 'Secret message');
const plaintext = nip44.decrypt(conversationKey, ciphertext);
```

## Relay Management

### Relay Pool

```typescript
import { RelayPool } from '@q8t/nostr-sdk';

const pool = new RelayPool([
  'wss://relay.damus.io',
  'wss://relay.nostr.band'
]);

// Add/remove relays
pool.addRelay('wss://relay.example.com');
pool.removeRelay('wss://relay.example.com');

// Connect to all relays
await pool.connectAll();

// Publish to specific relays
await pool.publish(event, ['wss://relay.damus.io']);

// Subscribe across relays
const sub = pool.subscribe(
  [{ kinds: [1], limit: 10 }],
  (event) => console.log(event)
);

// Get relay statuses
const statuses = pool.getRelays();
console.log('Connected relays:', pool.getConnectedCount());

// Cleanup
sub.close();
pool.disconnectAll();
```

### Single Relay

```typescript
import { Relay } from '@q8t/nostr-sdk';

const relay = new Relay('wss://relay.damus.io', {
  onConnect: () => console.log('Connected'),
  onDisconnect: () => console.log('Disconnected'),
  onError: (err) => console.error('Error:', err),
  onNotice: (msg) => console.log('Notice:', msg)
});

await relay.connect();
await relay.publish(event);
const sub = relay.subscribe([{ kinds: [1] }], (event) => {
  console.log(event);
});

sub.close();
relay.disconnect();
```

## NIP Implementations

### NIP-19: Bech32 Encoding

```typescript
import { nip19 } from '@q8t/nostr-sdk';

// Encode
const npub = nip19.npubEncode(pubkey);
const nsec = nip19.nsecEncode(secretKey);
const note = nip19.noteEncode(eventId);

const nprofile = nip19.nprofileEncode({
  pubkey,
  relays: ['wss://relay.damus.io']
});

const nevent = nip19.neventEncode({
  id: eventId,
  relays: ['wss://relay.damus.io'],
  author: pubkey
});

const naddr = nip19.naddrEncode({
  identifier: 'my-article',
  pubkey,
  kind: 30023,
  relays: ['wss://relay.damus.io']
});

// Decode
const decoded = nip19.decode(npub);
console.log(decoded.type); // 'npub'
console.log(decoded.data); // pubkey hex
```

### NIP-05: DNS Verification

```typescript
import { nip05 } from '@q8t/nostr-sdk';

// Verify a NIP-05 identifier
const isValid = await nip05.verifyNip05(pubkey, 'alice@example.com');

// Query a NIP-05 profile
const profile = await nip05.queryProfile('alice@example.com');
if (profile) {
  console.log('Public key:', profile.pubkey);
  console.log('Relays:', profile.relays);
}
```

### NIP-13: Proof of Work

```typescript
import { nip13, createEvent } from '@q8t/nostr-sdk';

const unsigned = createEvent(pubkey, 1, 'Hello with PoW!');

// Mine PoW (synchronous)
const withPow = nip13.minePow(unsigned, 20); // 20 leading zero bits

// Mine PoW (async, non-blocking)
const withPowAsync = await nip13.minePowAsync(unsigned, 20);

// Validate PoW
const difficulty = nip13.getPowDifficulty(event);
const isValid = nip13.validatePow(event, 20);
```

### NIP-44: Modern Encryption

```typescript
import { nip44 } from '@q8t/nostr-sdk';

// Get conversation key (reusable)
const ck = nip44.getConversationKey(secretKey, recipientPubkey);

// Encrypt
const ciphertext = nip44.encrypt(ck, 'Secret message');

// Decrypt
const plaintext = nip44.decrypt(ck, ciphertext);

// One-shot encryption (derives key each time)
const ct = nip44.encryptMessage(secretKey, recipientPubkey, 'Hello');
const pt = nip44.decryptMessage(secretKey, recipientPubkey, ct);
```

## Low-Level Crypto API

### Key Management

```typescript
import {
  generateSecretKey,
  getPublicKey,
  isValidPrivateKey,
  isValidPublicKey
} from '@q8t/nostr-sdk';

// Generate keypair
const sk = generateSecretKey();
const pk = getPublicKey(sk);

// Validate keys
console.log(isValidPrivateKey(sk)); // true
console.log(isValidPublicKey(pk)); // true
```

### Event Signing

```typescript
import {
  createEvent,
  finishEvent,
  validateEvent,
  getEventHash
} from '@q8t/nostr-sdk';

// Create and sign
const unsigned = createEvent(pubkey, 1, 'Hello');
const hash = getEventHash(unsigned);
const event = await finishEvent(unsigned, secretKey);

// Validate
const isValid = await validateEvent(event);
```

### Event Validation

```typescript
import {
  validateEvent,
  matchFilter,
  matchFilters,
  isExpired
} from '@q8t/nostr-sdk';

// Validate event structure and signature
const isValid = await validateEvent(event);

// Check if event matches filter
const matches = matchFilter({ kinds: [1], authors: [pubkey] }, event);

// Check if event matches any filter
const matchesAny = matchFilters([filter1, filter2], event);

// Check expiration
const expired = isExpired(event);
```

## Custom Signers

Implement your own signer:

```typescript
import { Signer, UnsignedEvent, Event } from '@q8t/nostr-sdk';

class CustomSigner implements Signer {
  async getPublicKey(): Promise<string> {
    // Return public key
  }

  async signEvent(event: UnsignedEvent): Promise<Event> {
    // Sign event and return complete event
  }

  // Optional: NIP-04 support
  nip04 = {
    async encrypt(pubkey: string, plaintext: string): Promise<string> {
      // Encrypt
    },
    async decrypt(pubkey: string, ciphertext: string): Promise<string> {
      // Decrypt
    }
  };
}

const client = new NostrClient({
  relays: ['wss://relay.damus.io'],
  signer: new CustomSigner()
});
```

## Event Kinds Reference

```typescript
import { EventKind } from '@q8t/nostr-sdk';

EventKind.Metadata              // 0: User metadata
EventKind.Text                  // 1: Short text note
EventKind.Contacts              // 3: Contact list
EventKind.EncryptedDirectMessage // 4: Encrypted DM (deprecated)
EventKind.EventDeletion         // 5: Event deletion
EventKind.Repost                // 6: Repost
EventKind.Reaction              // 7: Reaction
EventKind.ZapRequest            // 9734: Lightning zap request
EventKind.ZapReceipt            // 9735: Lightning zap receipt
EventKind.MuteList              // 10000: Mute list
EventKind.RelayList             // 10002: Relay list
EventKind.LongFormContent       // 30023: Long-form article
// ... and more
```

## TypeScript Support

This SDK is written in TypeScript and provides full type safety:

```typescript
import type {
  Event,
  UnsignedEvent,
  Filter,
  Subscription,
  UserMetadata,
  Signer
} from '@q8t/nostr-sdk';
```

## Contributing

Contributions are welcome! Please ensure all tests pass before submitting a PR.

```bash
# Run tests
pnpm test

# Build
pnpm build

# Lint
pnpm lint

# Format
pnpm format
```

## License

MIT

## Resources

- [Nostr Protocol](https://nostr.com)
- [NIPs Repository](https://github.com/nostr-protocol/nips)
- [Nostr Clients](https://nostr.net)

## Support

For issues and questions, please open an issue on GitHub.
