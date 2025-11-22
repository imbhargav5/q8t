import { z } from "zod";

export const WorkspacePlanEnum = z.enum(["free", "starter", "professional", "enterprise"]);
export type WorkspacePlan = z.infer<typeof WorkspacePlanEnum>;

export const BillingPeriodEnum = z.enum(["monthly", "yearly"]);
export type BillingPeriod = z.infer<typeof BillingPeriodEnum>;

export const WorkspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo_url: z.string().nullable(),
  branding: z.object({
    primary_color: z.string(),
    secondary_color: z.string(),
  }),
  settings: z.object({
    timezone: z.string(),
    language: z.string(),
    date_format: z.string(),
    time_format: z.enum(["12h", "24h"]),
  }),
  created_by: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Workspace = z.infer<typeof WorkspaceSchema>;

export const WorkspaceSubscriptionSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  plan: WorkspacePlanEnum,
  billing_period: BillingPeriodEnum,
  status: z.enum(["active", "past_due", "canceled", "trialing"]),
  seats: z.number(),
  used_seats: z.number(),
  price_per_seat: z.number(),
  total_price: z.number(),
  trial_ends_at: z.string().nullable(),
  current_period_start: z.string(),
  current_period_end: z.string(),
  cancel_at_period_end: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type WorkspaceSubscription = z.infer<typeof WorkspaceSubscriptionSchema>;

export const PlanFeatureSchema = z.object({
  name: z.string(),
  included: z.boolean(),
  limit: z.number().nullable(),
  description: z.string().optional(),
});

export type PlanFeature = z.infer<typeof PlanFeatureSchema>;

export const PlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price_monthly: z.number(),
  price_yearly: z.number(),
  features: z.array(PlanFeatureSchema),
  popular: z.boolean().optional(),
  max_seats: z.number().nullable(),
});

export type Plan = z.infer<typeof PlanSchema>;

export const InvitationStatusEnum = z.enum(["pending", "accepted", "expired"]);
export type InvitationStatus = z.infer<typeof InvitationStatusEnum>;

export const WorkspaceInvitationSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  email: z.string(),
  role: z.enum(["owner", "admin", "member", "guest"]),
  status: InvitationStatusEnum,
  invited_by: z.string(),
  expires_at: z.string(),
  created_at: z.string(),
});

export type WorkspaceInvitation = z.infer<typeof WorkspaceInvitationSchema>;
