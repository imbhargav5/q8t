import type { SocialPlatform, PostMedia } from "../zod-schemas";

export interface ComposeDraft {
  id: string;
  content: string;
  platforms: SocialPlatform[];
  media: PostMedia[];
  scheduledDate: string | null;
  scheduledTime: string | null;
  hashtags: string[];

  // Platform-specific customizations
  platformCustomizations: Record<
    SocialPlatform,
    {
      contentOverride?: string;
      firstComment?: string;
      threadTweets?: string[];
      locationTag?: string;
      taggedUsers?: string[];
    }
  >;

  // Poll data
  poll: {
    question: string;
    options: string[];
    durationHours: number;
  } | null;

  // Link preview
  linkPreview: {
    url: string;
    title: string | null;
    description: string | null;
    imageUrl: string | null;
  } | null;

  // Metadata
  lastModified: string;
  createdAt: string;
}

export interface ComposeState extends Omit<ComposeDraft, "id" | "lastModified" | "createdAt"> {
  // Additional UI state
  isExpanded: boolean;
  activeTab: "all" | SocialPlatform;
  aiMenuOpen: boolean;
  mediaUploadOpen: boolean;
}

export const createEmptyDraft = (): ComposeDraft => ({
  id: crypto.randomUUID(),
  content: "",
  platforms: [],
  media: [],
  scheduledDate: null,
  scheduledTime: null,
  hashtags: [],
  platformCustomizations: {} as any,
  poll: null,
  linkPreview: null,
  lastModified: new Date().toISOString(),
  createdAt: new Date().toISOString(),
});

export const createEmptyComposeState = (): ComposeState => ({
  content: "",
  platforms: [],
  media: [],
  scheduledDate: null,
  scheduledTime: null,
  hashtags: [],
  platformCustomizations: {} as any,
  poll: null,
  linkPreview: null,
  isExpanded: false,
  activeTab: "all",
  aiMenuOpen: false,
  mediaUploadOpen: false,
});
