import type { SocialPlatform } from "../zod-schemas";

// Platform character limits
export const PLATFORM_CHARACTER_LIMITS: Record<SocialPlatform, number> = {
  twitter: 280,
  threads: 500,
  instagram: 2200,
  facebook: 63206,
  linkedin: 3000,
  tiktok: 2200,
  youtube: 5000,
  pinterest: 500,
  reddit: 40000,
  whatsapp: 65536,
  slack: 40000,
  discord: 2000,
  telegram: 4096,
  bluesky: 300,
  mastodon: 500,
  farcaster: 320,
  nostr: 280,
};

// AI tone options
export const AI_TONES = [
  { value: "professional", label: "Professional", icon: "💼" },
  { value: "casual", label: "Casual", icon: "😊" },
  { value: "friendly", label: "Friendly", icon: "🤝" },
  { value: "witty", label: "Witty", icon: "😄" },
  { value: "formal", label: "Formal", icon: "🎩" },
  { value: "enthusiastic", label: "Enthusiastic", icon: "🎉" },
  { value: "empathetic", label: "Empathetic", icon: "❤️" },
  { value: "persuasive", label: "Persuasive", icon: "🎯" },
] as const;

export type AITone = (typeof AI_TONES)[number]["value"];

// AI action options
export const AI_ACTIONS = [
  {
    id: "generate-scratch",
    label: "Generate from scratch",
    icon: "✨",
    description: "Create a new post with AI",
  },
  {
    id: "rewrite",
    label: "Rewrite",
    icon: "🔄",
    description: "Rewrite the current content",
    hasSubMenu: true,
  },
  {
    id: "shorten",
    label: "Shorten",
    icon: "✂️",
    description: "Make the content more concise",
  },
  {
    id: "expand",
    label: "Expand",
    icon: "📝",
    description: "Add more detail to the content",
  },
  {
    id: "fix-grammar",
    label: "Fix grammar & spelling",
    icon: "📖",
    description: "Correct grammar and spelling errors",
  },
  {
    id: "generate-top-performing",
    label: "Generate from top post",
    icon: "🎯",
    description: "Create content based on your best posts",
  },
  {
    id: "generate-from-url",
    label: "Generate from article",
    icon: "🔗",
    description: "Create a post from a URL",
  },
  {
    id: "translate",
    label: "Translate",
    icon: "🌍",
    description: "Translate to another language",
  },
  {
    id: "add-emojis",
    label: "Add emojis",
    icon: "😊",
    description: "Make it more engaging with emojis",
  },
  {
    id: "generate-hashtags",
    label: "Generate hashtags",
    icon: "#️⃣",
    description: "Suggest relevant hashtags",
  },
] as const;

export type AIAction = (typeof AI_ACTIONS)[number]["id"];

// Best time to post suggestions (mock data)
export const BEST_TIME_SUGGESTIONS: Record<
  SocialPlatform,
  { day: string; time: string; reason: string }[]
> = {
  twitter: [
    { day: "Wednesday", time: "12:00 PM", reason: "Highest engagement" },
    { day: "Friday", time: "9:00 AM", reason: "Best reach" },
  ],
  instagram: [
    { day: "Wednesday", time: "11:00 AM", reason: "Peak activity" },
    { day: "Friday", time: "6:00 PM", reason: "Evening engagement" },
  ],
  facebook: [
    { day: "Thursday", time: "1:00 PM", reason: "Lunch break spike" },
    { day: "Friday", time: "3:00 PM", reason: "Weekend planning" },
  ],
  linkedin: [
    { day: "Tuesday", time: "10:00 AM", reason: "Business hours peak" },
    { day: "Wednesday", time: "12:00 PM", reason: "Lunch browsing" },
  ],
  tiktok: [
    { day: "Tuesday", time: "9:00 AM", reason: "Morning commute" },
    { day: "Thursday", time: "7:00 PM", reason: "Evening relaxation" },
  ],
  threads: [
    { day: "Wednesday", time: "12:00 PM", reason: "Midday engagement" },
    { day: "Friday", time: "5:00 PM", reason: "End of workday" },
  ],
  youtube: [
    { day: "Thursday", time: "2:00 PM", reason: "Afternoon views" },
    { day: "Sunday", time: "10:00 AM", reason: "Weekend browsing" },
  ],
  pinterest: [
    { day: "Saturday", time: "8:00 PM", reason: "Weekend planning" },
    { day: "Tuesday", time: "9:00 PM", reason: "Evening inspiration" },
  ],
  reddit: [
    { day: "Monday", time: "6:00 AM", reason: "Morning browsing" },
    { day: "Sunday", time: "8:00 AM", reason: "Weekend reading" },
  ],
  whatsapp: [
    { day: "Any day", time: "Any time", reason: "Always active" },
  ],
  slack: [
    { day: "Weekdays", time: "10:00 AM", reason: "Business hours" },
  ],
  discord: [
    { day: "Any day", time: "Any time", reason: "24/7 community" },
  ],
  telegram: [
    { day: "Any day", time: "Any time", reason: "Always connected" },
  ],
  bluesky: [
    { day: "Wednesday", time: "12:00 PM", reason: "Midday peak" },
  ],
  mastodon: [
    { day: "Tuesday", time: "10:00 AM", reason: "Morning activity" },
  ],
  farcaster: [
    { day: "Wednesday", time: "3:00 PM", reason: "Afternoon engagement" },
  ],
  nostr: [
    { day: "Any day", time: "Any time", reason: "Decentralized timing" },
  ],
};

// Media upload limits
export const MEDIA_UPLOAD_LIMITS = {
  image: {
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 10,
    acceptedFormats: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  },
  video: {
    maxSize: 500 * 1024 * 1024, // 500MB
    maxFiles: 1,
    acceptedFormats: ["video/mp4", "video/quicktime", "video/x-msvideo"],
  },
  gif: {
    maxSize: 15 * 1024 * 1024, // 15MB
    maxFiles: 1,
    acceptedFormats: ["image/gif"],
  },
};

// Platform-specific feature support
export const PLATFORM_FEATURES: Record<
  SocialPlatform,
  {
    supportsFirstComment: boolean;
    supportsThreads: boolean;
    supportsLocationTag: boolean;
    supportsUserTags: boolean;
    supportsPolls: boolean;
    supportsCarousel: boolean;
    supportsVideo: boolean;
    supportsStories: boolean;
  }
> = {
  twitter: {
    supportsFirstComment: false,
    supportsThreads: true,
    supportsLocationTag: true,
    supportsUserTags: true,
    supportsPolls: true,
    supportsCarousel: false,
    supportsVideo: true,
    supportsStories: false,
  },
  instagram: {
    supportsFirstComment: true,
    supportsThreads: false,
    supportsLocationTag: true,
    supportsUserTags: true,
    supportsPolls: true,
    supportsCarousel: true,
    supportsVideo: true,
    supportsStories: true,
  },
  facebook: {
    supportsFirstComment: false,
    supportsThreads: false,
    supportsLocationTag: true,
    supportsUserTags: true,
    supportsPolls: true,
    supportsCarousel: true,
    supportsVideo: true,
    supportsStories: true,
  },
  linkedin: {
    supportsFirstComment: false,
    supportsThreads: false,
    supportsLocationTag: false,
    supportsUserTags: true,
    supportsPolls: true,
    supportsCarousel: true,
    supportsVideo: true,
    supportsStories: false,
  },
  tiktok: {
    supportsFirstComment: false,
    supportsThreads: false,
    supportsLocationTag: true,
    supportsUserTags: true,
    supportsPolls: false,
    supportsCarousel: false,
    supportsVideo: true,
    supportsStories: false,
  },
  youtube: {
    supportsFirstComment: false,
    supportsThreads: false,
    supportsLocationTag: false,
    supportsUserTags: false,
    supportsPolls: false,
    supportsCarousel: false,
    supportsVideo: true,
    supportsStories: true,
  },
  threads: {
    supportsFirstComment: false,
    supportsThreads: true,
    supportsLocationTag: false,
    supportsUserTags: true,
    supportsPolls: false,
    supportsCarousel: true,
    supportsVideo: true,
    supportsStories: false,
  },
  pinterest: {
    supportsFirstComment: false,
    supportsThreads: false,
    supportsLocationTag: false,
    supportsUserTags: false,
    supportsPolls: false,
    supportsCarousel: false,
    supportsVideo: true,
    supportsStories: false,
  },
  reddit: {
    supportsFirstComment: false,
    supportsThreads: false,
    supportsLocationTag: false,
    supportsUserTags: false,
    supportsPolls: true,
    supportsCarousel: false,
    supportsVideo: true,
    supportsStories: false,
  },
  whatsapp: {
    supportsFirstComment: false,
    supportsThreads: false,
    supportsLocationTag: false,
    supportsUserTags: false,
    supportsPolls: false,
    supportsCarousel: false,
    supportsVideo: true,
    supportsStories: true,
  },
  slack: {
    supportsFirstComment: false,
    supportsThreads: true,
    supportsLocationTag: false,
    supportsUserTags: true,
    supportsPolls: false,
    supportsCarousel: false,
    supportsVideo: false,
    supportsStories: false,
  },
  discord: {
    supportsFirstComment: false,
    supportsThreads: true,
    supportsLocationTag: false,
    supportsUserTags: true,
    supportsPolls: false,
    supportsCarousel: false,
    supportsVideo: true,
    supportsStories: false,
  },
  telegram: {
    supportsFirstComment: false,
    supportsThreads: false,
    supportsLocationTag: false,
    supportsUserTags: true,
    supportsPolls: true,
    supportsCarousel: false,
    supportsVideo: true,
    supportsStories: false,
  },
  bluesky: {
    supportsFirstComment: false,
    supportsThreads: true,
    supportsLocationTag: false,
    supportsUserTags: true,
    supportsPolls: false,
    supportsCarousel: false,
    supportsVideo: true,
    supportsStories: false,
  },
  mastodon: {
    supportsFirstComment: false,
    supportsThreads: true,
    supportsLocationTag: false,
    supportsUserTags: true,
    supportsPolls: true,
    supportsCarousel: true,
    supportsVideo: true,
    supportsStories: false,
  },
  farcaster: {
    supportsFirstComment: false,
    supportsThreads: true,
    supportsLocationTag: false,
    supportsUserTags: true,
    supportsPolls: false,
    supportsCarousel: false,
    supportsVideo: true,
    supportsStories: false,
  },
  nostr: {
    supportsFirstComment: false,
    supportsThreads: true,
    supportsLocationTag: false,
    supportsUserTags: true,
    supportsPolls: false,
    supportsCarousel: false,
    supportsVideo: false,
    supportsStories: false,
  },
};
