# Telegram SDK

A comprehensive TypeScript SDK for Telegram with support for **three complete API types**:

- **Bot API**: HTTP-based interface for creating bots (~100 methods)
- **Gateway API**: Verification code delivery via Telegram
- **Client API**: MTProto protocol for user clients (742+ methods)

## Features

✨ **Comprehensive Coverage**: All Telegram API types in one SDK
🔐 **Type-Safe**: Full TypeScript support with generated types
🔄 **Auto-Generated**: API methods and types generated from OpenAPI specs
📦 **Modular**: Use only what you need - Bot, Gateway, or Client API
🎯 **Modern**: ESM support, async/await, clean interfaces

## Installation

```bash
pnpm add @q8t/telegram-sdk
```

## Quick Start

### Bot API

Create bots for automation, customer service, and more.

```typescript
import { TelegramSDK } from "@q8t/telegram-sdk";

// Create bot client
const bot = TelegramSDK.createBotClient({
  botToken: "123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ" // Get from @BotFather
});

// Get bot info
const me = await bot.getMe();
console.log(`Bot: @${me.username}`);

// Send message
await bot.sendMessage({
  chat_id: 123456,
  text: "Hello from Telegram Bot! 👋"
});

// Send photo
await bot.sendPhoto({
  chat_id: 123456,
  photo: "https://example.com/image.jpg",
  caption: "Check out this image!"
});

// Listen for updates
const updates = await bot.getUpdates({
  offset: 0,
  limit: 100,
  timeout: 30
});

for (const update of updates) {
  if (update.message) {
    console.log(`Message from ${update.message.from?.first_name}: ${update.message.text}`);
  }
}
```

### Gateway API

Send verification codes via Telegram instead of SMS ($0.01 vs $0.50).

```typescript
import { TelegramSDK } from "@q8t/telegram-sdk";

// Create gateway client
const gateway = TelegramSDK.createGatewayClient({
  accessToken: "your-token" // Get from @VerificationBot
});

// Send verification code
const result = await gateway.sendVerificationMessage({
  phone_number: "+1234567890",
  code_length: 6,
  ttl: 300, // 5 minutes
  callback_url: "https://your-app.com/webhook"
});

console.log(`Code sent! Request ID: ${result.request_id}`);

// Check status
const status = await gateway.checkVerificationStatus({
  request_id: result.request_id
});

console.log(`Status: ${status.status}`);
console.log(`Verified: ${status.verification_status?.verified}`);
```

### Client API (MTProto)

Full access to Telegram features with user authentication.

```typescript
import { TelegramSDK } from "@q8t/telegram-sdk";

// Create client with existing session
const client = await TelegramSDK.createClientClient({
  apiId: 12345, // Get from https://my.telegram.org
  apiHash: "your-api-hash",
  session: sessionData // Persisted session
});

// Send message as user
await client.messagesSendMessage({
  peer: {
    user_id: 123456,
    access_hash: "user-access-hash"
  },
  message: "Hello from Client API!",
  random_id: Date.now()
});

// Get chat list (dialogs)
const dialogs = await client.messagesGetDialogs({
  offset_date: 0,
  offset_id: 0,
  offset_peer: { user_id: 0, access_hash: "0" },
  limit: 100,
  hash: 0
});

// Update profile
await client.accountUpdateProfile({
  first_name: "John",
  last_name: "Doe",
  about: "Using Telegram Client API!"
});
```

## API Types Overview

### 1. Bot API

**Use Cases**: Bots, automation, customer service, games, payments

**Authentication**: Bot token from @BotFather

**Key Methods**:
- `sendMessage`, `sendPhoto`, `sendVideo`, `sendDocument`
- `getUpdates`, `setWebhook`, `deleteWebhook`
- `editMessageText`, `deleteMessage`
- `getChatMember`, `banChatMember`, `restrictChatMember`
- `sendPoll`, `sendSticker`, `sendLocation`
- `answerInlineQuery`, `answerCallbackQuery`

### 2. Gateway API

**Use Cases**: Verification codes, authentication, 2FA

**Authentication**: Access token from @VerificationBot

**Key Methods**:
- `sendVerificationMessage` - Send code to user
- `checkSendAbility` - Check if user can receive codes
- `checkVerificationStatus` - Check delivery status
- `revokeVerificationMessage` - Cancel sent code

**Pricing**: $0.01 per delivered code (vs SMS at $0.50)

### 3. Client API (MTProto)

**Use Cases**: Custom clients, advanced features, full Telegram access

**Authentication**: Phone number + API ID/Hash from my.telegram.org

**Key Method Categories** (742+ total):
- **auth**: `sendCode`, `signIn`, `signUp`, `checkPassword`
- **account**: `updateProfile`, `updateStatus`, `setPrivacy`
- **users**: `getUsers`, `getFullUser`
- **contacts**: `getContacts`, `importContacts`, `block`, `unblock`
- **messages**: `sendMessage`, `sendMedia`, `getHistory`, `getDialogs`
- **channels**: `getChannels`, `createChannel`, `joinChannel`
- **updates**: `getState`, `getDifference`
- **business**: `updateBusinessWorkHours`, `updateBusinessLocation`

## Authentication

### Bot API

1. Message @BotFather on Telegram
2. Send `/newbot` command
3. Follow prompts to create bot
4. Receive bot token

### Gateway API

1. Message @VerificationBot on Telegram
2. Follow setup instructions
3. Receive access token

### Client API

1. Visit https://my.telegram.org
2. Login with phone number
3. Create an application
4. Get `api_id` and `api_hash`

**Note**: Client API requires MTProto protocol implementation. Consider using libraries like `telegram-mtproto` or `gramjs` for full support.

## Examples

### Bot: Echo Bot

```typescript
const bot = TelegramSDK.createBotClient({ botToken: process.env.BOT_TOKEN! });

async function pollUpdates(offset = 0) {
  const updates = await bot.getUpdates({ offset, timeout: 30 });

  for (const update of updates) {
    if (update.message?.text) {
      await bot.sendMessage({
        chat_id: update.message.chat.id,
        text: `You said: ${update.message.text}`
      });
    }
    offset = update.update_id + 1;
  }

  pollUpdates(offset);
}

pollUpdates();
```

### Gateway: Authentication Flow

```typescript
const gateway = TelegramSDK.createGatewayClient({
  accessToken: process.env.GATEWAY_TOKEN!
});

// Step 1: Check if user can receive codes
const canSend = await gateway.checkSendAbility({
  phone_number: phoneNumber
});

if (!canSend.can_send) {
  throw new Error(`Cannot send: ${canSend.reason}`);
}

// Step 2: Send code
const result = await gateway.sendVerificationMessage({
  phone_number: phoneNumber,
  code_length: 6,
  ttl: 300
});

// Step 3: User enters code in your app
// Step 4: Verify code (implement your own verification logic)

// Step 5: Check status
const status = await gateway.checkVerificationStatus({
  request_id: result.request_id
});

if (status.verification_status?.verified) {
  console.log("User verified!");
}
```

## Type Safety

The SDK provides full TypeScript types for all APIs:

```typescript
import type { BotTypes, GatewayTypes, ClientTypes } from "@q8t/telegram-sdk";

// Bot types
const message: BotTypes.Message = {
  message_id: 123,
  date: Date.now(),
  chat: { id: 456, type: "private" },
  text: "Hello!"
};

// Gateway types
const request: GatewayTypes.SendVerificationMessageRequest = {
  phone_number: "+1234567890",
  code_length: 6
};

// Client types
const peer: ClientTypes.InputPeerUser = {
  user_id: 123456,
  access_hash: "hash"
};
```

## Code Generation

This SDK uses code generation from OpenAPI specifications:

```bash
# Generate all APIs
pnpm generate

# Build SDK
pnpm build
```

Generated files:
- `lib/bot-api.ts` - Bot API methods
- `lib/bot-types.ts` - Bot API types
- `lib/gateway-api.ts` - Gateway API methods
- `lib/gateway-types.ts` - Gateway API types
- `lib/client-api.ts` - Client API methods
- `lib/client-types.ts` - Client API types

## Architecture

```
telegram-sdk/
├── api/                      # OpenAPI specifications
│   ├── bot-api.yaml         # Bot API spec (100+ methods)
│   ├── gateway-api.yaml     # Gateway API spec
│   └── client-api.yaml      # Client API spec (742+ methods)
├── src/
│   ├── bot/                 # Bot API implementation
│   │   ├── config.ts
│   │   ├── client.ts
│   │   └── index.ts
│   ├── gateway/             # Gateway API implementation
│   │   ├── config.ts
│   │   ├── client.ts
│   │   └── index.ts
│   ├── client/              # Client API implementation
│   │   ├── config.ts
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── generator/           # Code generation
│   │   ├── index.ts
│   │   ├── parser.ts
│   │   ├── type-generator.ts
│   │   └── api-generator.ts
│   └── index.ts             # Main SDK entry
└── lib/                     # Generated code
    ├── bot-api.ts
    ├── bot-types.ts
    ├── gateway-api.ts
    ├── gateway-types.ts
    ├── client-api.ts
    ├── client-types.ts
    └── index.ts
```

## Comparison with Other Libraries

| Feature | @q8t/telegram-sdk | node-telegram-bot-api | telegraf | gramjs |
|---------|-------------------|----------------------|----------|--------|
| Bot API | ✅ | ✅ | ✅ | ❌ |
| Gateway API | ✅ | ❌ | ❌ | ❌ |
| Client API (MTProto) | ✅ | ❌ | ❌ | ✅ |
| TypeScript | ✅ | Partial | ✅ | ✅ |
| Auto-generated | ✅ | ❌ | ❌ | Partial |
| All-in-one | ✅ | ❌ | ❌ | ❌ |

## Contributing

Contributions are welcome! Please follow these steps:

1. Update OpenAPI specs in `api/` directory
2. Run `pnpm generate` to regenerate code
3. Update tests if needed
4. Submit a PR

## License

MIT

## Resources

- [Telegram Bot API Docs](https://core.telegram.org/bots/api)
- [Telegram Gateway API Docs](https://core.telegram.org/gateway/api)
- [Telegram Client API Docs](https://core.telegram.org/methods)
- [Get API Credentials](https://my.telegram.org)

## Credits

Built with ❤️ by the Q8T team
