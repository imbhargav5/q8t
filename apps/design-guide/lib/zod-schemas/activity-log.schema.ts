import { z } from "zod";

export const ActivityLogSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  user_id: z.string(),
  actor_id: z.string().nullable(),
  actor_name: z.string(),
  actor_avatar: z.string().nullable(),
  action: z.string(),
  entity_type: z.string().nullable(),
  entity_id: z.string().nullable(),
  entity_name: z.string().nullable(),
  details: z.string(),
  ip_address: z.string().nullable(),
  user_agent: z.string().nullable(),
  metadata: z.record(z.any()).default({}),
  created_at: z.string(),
});

export type ActivityLog = z.infer<typeof ActivityLogSchema>;
