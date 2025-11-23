# @q8t/validation

Content and media validation for social media platforms.

## Features

- **Text Validation**: Character limits, encoding, special characters
- **Media Validation**: File sizes, formats, dimensions, aspect ratios
- **URL Validation**: Link checking and shortening
- **Hashtag Validation**: Count limits, format rules
- **Platform Rules**: Platform-specific validation (Instagram, Twitter, etc.)
- **Multi-Platform**: Validate against multiple platforms at once

## Installation

```bash
pnpm add @q8t/validation
```

## Usage

### Single Platform Validation

```typescript
import { PostValidator } from '@q8t/validation'

const result = PostValidator.validate({
  content: {
    text: "Check out this amazing product! #awesome",
    mediaUrls: ["https://example.com/image.jpg"],
    hashtags: ["#awesome", "#product"]
  },
  platform: 'instagram',
  postType: 'feed'
})

// Result:
// {
//   valid: true,
//   errors: [],
//   warnings: ["Consider adding more hashtags (max 30)"]
// }
```

### Multi-Platform Validation

```typescript
const result = PostValidator.validateMulti({
  content: {
    text: "Long text that might exceed Twitter's limit...",
    mediaUrls: ["https://example.com/image.jpg"]
  },
  platforms: ['instagram', 'twitter', 'facebook']
})

// Result:
// {
//   instagram: { valid: true, errors: [], warnings: [] },
//   twitter: { valid: false, errors: ["Text exceeds 280 characters"], warnings: [] },
//   facebook: { valid: true, errors: [], warnings: [] }
// }
```

### Media Validation

```typescript
import { MediaValidator } from '@q8t/validation'

const result = MediaValidator.validateImage({
  width: 1920,
  height: 1080,
  format: 'jpg',
  sizeBytes: 5_000_000,
  platform: 'instagram',
  postType: 'feed'
})

// Result:
// {
//   valid: true,
//   errors: [],
//   warnings: [],
//   recommendations: {
//     optimalDimensions: { width: 1080, height: 1080 },
//     optimalAspectRatio: '1:1'
//   }
// }
```

## Architecture

This package contains **pure validation logic** with no dependencies on:
- ❌ Platform SDKs
- ❌ Database clients
- ❌ HTTP clients
- ❌ Job queues (Inngest)

All validators accept plain data objects and return validation results.

## Testing

```bash
pnpm test
```

All validation functions are pure and easily testable without mocks.
