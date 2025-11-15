# @q8t/whatsapp-sdk

A TypeScript SDK for the WhatsApp Cloud API with code generation from OpenAPI/YAML definitions.

## Features

- Type-safe API client for WhatsApp Cloud API
- Auto-generated types from OpenAPI specification
- Access token-based authentication via Meta Business Platform
- Support for sending messages, managing templates, and phone numbers

## Installation

```bash
pnpm add @q8t/whatsapp-sdk
```

## Usage

```typescript
import { WhatsAppConfig, TokenManager, HttpClient } from "@q8t/whatsapp-sdk";
import { WhatsAppApi } from "@q8t/whatsapp-sdk/lib";

// Configure the SDK
const config: WhatsAppConfig = {
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID!,
  businessId: process.env.WHATSAPP_BUSINESS_ID,
};

// Create token manager and HTTP client
const tokenManager = new TokenManager(config);
const httpClient = new HttpClient(tokenManager, config);

// Create API instance
const api = new WhatsAppApi(httpClient);

// Send a text message
const response = await api.sendMessage(config.phoneNumberId, {
  messaging_product: "whatsapp",
  recipient_type: "individual",
  to: "15551234567",
  type: "text",
  text: {
    body: "Hello from WhatsApp SDK!",
  },
});

// List message templates
const templates = await api.getMessageTemplates(config.phoneNumberId);

// List phone numbers
const phoneNumbers = await api.getPhoneNumbers(config.businessId!);
```

## Configuration

### Environment Variables

```bash
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ID=your_business_id
```

### Getting Access Tokens

1. Create a Meta Business account at [business.facebook.com](https://business.facebook.com)
2. Set up WhatsApp Business API in the Meta Developer Portal
3. Generate a permanent access token from the System Users section
4. Use the Phone Number ID from your WhatsApp Business Account

## API Reference

### Messages

- `sendMessage(phoneNumberId, body)` - Send a message (text, template, media, etc.)

### Templates

- `getMessageTemplates(phoneNumberId)` - List all message templates

### Phone Numbers

- `getPhoneNumbers(businessId)` - List all phone numbers for a business

## Code Generation

The SDK includes a code generator that reads the OpenAPI specification and generates TypeScript types and API methods:

```bash
pnpm generate
```

This generates:
- `lib/types.ts` - TypeScript interfaces from schema definitions
- `lib/api.ts` - API client with typed methods
- `lib/index.ts` - Re-exports for easy importing

## WhatsApp Cloud API Base URL

```
https://graph.facebook.com/v18.0
```

## License

MIT
