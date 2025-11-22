# Social Media Platform

A modern open source social media management platform with comprehensive features for content creation, publishing, and customer engagement.

## Features

- **Social Inbox** - Unified inbox for managing messages across multiple social media platforms
- **Multi-Platform Publishing** - Publish content to multiple social media platforms simultaneously
- **AI Content Creator** - AI-powered content generation and optimization
- **Post Timing Analytics** - Analyze and recommend optimal times to post content
- **Built-in CRM** - Customer relationship management for social media support
- **Social Mention Tracking** - Monitor and track brand mentions across social platforms

## Tech Stack

- **Next.js** - React framework for production
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Re-usable component library
- **Zod** - Schema validation and type inference

## Development Approach

This is currently a **design and preview application** focused on building out the user interface and experience before implementing backend functionality.

### Mock Data Strategy

- All data is **mock/fake data** hard-coded in the application
- Mock data is organized in a dedicated `mock-data` folder within the app
- **Zod schemas** define the structure and validation for all data models
- TypeScript types are **derived from Zod schemas** for type safety
- This approach is consistent across all pages and features

### No Database or Dynamic Data

At this stage, the application does not include:
- Database integration
- API endpoints
- Real-time data fetching
- Authentication/authorization

The focus is on designing and implementing the complete UI/UX before adding backend functionality.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
q8t/
├── apps/
│   └── design-guide/    # Main Next.js application
│       └── mock-data/   # Hard-coded mock data
├── packages/
│   └── ...             # Shared packages and utilities
└── ...
```

## Contributing

This is an open source project. Contributions are welcome!

## License

[License information to be added]
