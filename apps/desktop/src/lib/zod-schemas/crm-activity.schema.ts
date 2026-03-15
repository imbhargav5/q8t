import { z } from "zod";

// CRM Activity Type Enum
export const CRMActivityTypeEnum = z.enum([
  "person_created",
  "person_updated",
  "person_deleted",
  "profile_updated",
  "tag_added",
  "tag_removed",
  "note_added",
  "note_updated",
  "note_deleted",
  "social_identity_added",
  "social_identity_removed",
  "vip_status_changed",
  "blocked_status_changed",
  "verified_status_changed",
  "conversation_started",
  "conversation_resolved",
  "message_sent",
  "message_received",
  "assigned_to_user",
  "unassigned_from_user",
  "custom_field_updated",
  "merged_with_person",
  "exported",
  "imported",
  "bulk_action",
]);

export type CRMActivityType = z.infer<typeof CRMActivityTypeEnum>;

// CRM Activity Log Schema
export const CRMActivityLogSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  person_id: z.string().uuid().nullable(),

  // Activity details
  activity_type: CRMActivityTypeEnum,
  activity_description: z.string().nullable(),
  activity_data: z.record(z.string(), z.unknown()).default({}),

  // Actor tracking
  performed_by: z.string().uuid().nullable(),
  performed_by_name: z.string().nullable(),

  // Related entities
  related_conversation_id: z.string().uuid().nullable(),
  related_note_id: z.string().uuid().nullable(),
  related_message_id: z.string().uuid().nullable(),

  // Visibility
  is_visible_in_timeline: z.boolean().default(true),

  created_at: z.string().datetime(),
});

export type CRMActivityLog = z.infer<typeof CRMActivityLogSchema>;

// Timeline Item Schema (for UI display)
export const TimelineItemSchema = z.object({
  id: z.string().uuid(),
  type: CRMActivityTypeEnum,
  title: z.string(),
  description: z.string().nullable(),
  icon: z.string(), // Icon name or emoji
  iconColor: z.string(), // Tailwind color class
  data: z.record(z.string(), z.unknown()).optional(),
  performedBy: z.object({
    id: z.string().uuid(),
    name: z.string(),
    avatar: z.string().url().nullable(),
  }).nullable(),
  timestamp: z.string().datetime(),
  relatedEntities: z.object({
    conversationId: z.string().uuid().nullable(),
    noteId: z.string().uuid().nullable(),
    messageId: z.string().uuid().nullable(),
  }).optional(),
});

export type TimelineItem = z.infer<typeof TimelineItemSchema>;
