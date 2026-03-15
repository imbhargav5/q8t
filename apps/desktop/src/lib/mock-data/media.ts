import type { MediaAttachment } from "../zod-schemas";

const now = Date.now();

export const mockMedia: MediaAttachment[] = [
  // Media for Instagram story mention (msg-2-1)
  {
    id: "media-1",
    workspace_id: "workspace-1",
    message_id: "msg-2-1",
    platform: "instagram",
    platform_media_id: "ig-media-1",
    media_type: "image",
    mime_type: "image/jpeg",
    file_extension: "jpg",
    original_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    original_expires_at: null,
    thumbnail_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    thumbnail_storage_path: "workspace-1/2024/11/thumb-1.jpg",
    processing_status: "completed",
    processing_error: null,
    processed_at: new Date(now - 3600000).toISOString(),
    file_size_bytes: 2456789,
    width: 1080,
    height: 1920,
    duration_seconds: null,
    thumbnail_width: 400,
    thumbnail_height: 711,
    thumbnail_size_bytes: 45678,
    alt_text: "Fashion collection showcase",
    caption: "Check out the new collection!",
    metadata: {},
    created_at: new Date(now - 3600000).toISOString(),
    updated_at: new Date(now - 3600000).toISOString(),
  },

  // Additional media examples
  {
    id: "media-2",
    workspace_id: "workspace-1",
    message_id: "msg-12-1", // From David Kim Instagram conversation
    platform: "instagram",
    platform_media_id: "ig-media-2",
    media_type: "video",
    mime_type: "video/mp4",
    file_extension: "mp4",
    original_url: "https://example.com/video1.mp4",
    original_expires_at: null,
    thumbnail_url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400",
    thumbnail_storage_path: "workspace-1/2024/11/thumb-2.jpg",
    processing_status: "completed",
    processing_error: null,
    processed_at: new Date(now - 1200000000).toISOString(),
    file_size_bytes: 15678901,
    width: 1920,
    height: 1080,
    duration_seconds: 45,
    thumbnail_width: 400,
    thumbnail_height: 225,
    thumbnail_size_bytes: 32456,
    alt_text: "Brand collaboration video",
    caption: null,
    metadata: {},
    created_at: new Date(now - 1200000000).toISOString(),
    updated_at: new Date(now - 1200000000).toISOString(),
  },

  {
    id: "media-3",
    workspace_id: "workspace-1",
    message_id: "msg-12-2", // From David Kim Instagram conversation
    platform: "instagram",
    platform_media_id: "ig-media-3",
    media_type: "image",
    mime_type: "image/jpeg",
    file_extension: "jpg",
    original_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    original_expires_at: null,
    thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    thumbnail_storage_path: "workspace-1/2024/11/thumb-3.jpg",
    processing_status: "completed",
    processing_error: null,
    processed_at: new Date(now - 1000000000).toISOString(),
    file_size_bytes: 3456789,
    width: 1200,
    height: 800,
    duration_seconds: null,
    thumbnail_width: 400,
    thumbnail_height: 267,
    thumbnail_size_bytes: 23456,
    alt_text: "Product mockup",
    caption: "What do you think about this?",
    metadata: {},
    created_at: new Date(now - 1000000000).toISOString(),
    updated_at: new Date(now - 1000000000).toISOString(),
  },
];

// Export function to get media by message
export function getMediaByMessage(messageId: string): MediaAttachment[] {
  return mockMedia.filter(m => m.message_id === messageId);
}

// Export function to get media by conversation
export function getMediaByConversation(conversationId: string): MediaAttachment[] {
  // This would typically join with messages, but for simplicity we'll use a map
  const conversationMessages = new Map([
    ["conv-2", ["msg-2-1"]],
    ["conv-12", ["msg-12-1", "msg-12-2"]],
  ]);

  const messageIds = conversationMessages.get(conversationId) || [];
  return mockMedia.filter(m => messageIds.includes(m.message_id));
}
