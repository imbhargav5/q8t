import {
  Workspace,
  WorkspaceSubscription,
  Plan,
  WorkspaceInvitation,
} from "../zod-schemas/workspace.schema";

export const mockWorkspace: Workspace = {
  id: "workspace-1",
  name: "Chatsian",
  slug: "chatsian",
  logo_url: null,
  branding: {
    primary_color: "#6366f1",
    secondary_color: "#8b5cf6",
  },
  settings: {
    timezone: "America/New_York",
    language: "en",
    date_format: "MM/DD/YYYY",
    time_format: "12h",
  },
  created_by: "user-1",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-12-01T14:30:00Z",
};

export const mockPlans: Plan[] = [
  {
    id: "plan-free",
    name: "Free",
    description: "Perfect for trying out Chatsian",
    price_monthly: 0,
    price_yearly: 0,
    max_seats: 2,
    features: [
      { name: "Social accounts", included: true, limit: 2 },
      { name: "Monthly messages", included: true, limit: 100 },
      { name: "Team members", included: true, limit: 2 },
      { name: "Conversation history", included: true, limit: 30, description: "30 days" },
      { name: "Basic analytics", included: true, limit: null },
      { name: "Mobile app", included: false, limit: null },
      { name: "Advanced automation", included: false, limit: null },
      { name: "Priority support", included: false, limit: null },
      { name: "Custom integrations", included: false, limit: null },
    ],
  },
  {
    id: "plan-starter",
    name: "Starter",
    description: "Great for small teams getting started",
    price_monthly: 29,
    price_yearly: 290,
    max_seats: 5,
    popular: true,
    features: [
      { name: "Social accounts", included: true, limit: 5 },
      { name: "Monthly messages", included: true, limit: 1000 },
      { name: "Team members", included: true, limit: 5 },
      { name: "Conversation history", included: true, limit: null, description: "Unlimited" },
      { name: "Basic analytics", included: true, limit: null },
      { name: "Mobile app", included: true, limit: null },
      { name: "Advanced automation", included: false, limit: null },
      { name: "Priority support", included: false, limit: null },
      { name: "Custom integrations", included: false, limit: null },
    ],
  },
  {
    id: "plan-professional",
    name: "Professional",
    description: "For growing teams with advanced needs",
    price_monthly: 79,
    price_yearly: 790,
    max_seats: 20,
    features: [
      { name: "Social accounts", included: true, limit: 15 },
      { name: "Monthly messages", included: true, limit: null, description: "Unlimited" },
      { name: "Team members", included: true, limit: 20 },
      { name: "Conversation history", included: true, limit: null, description: "Unlimited" },
      { name: "Basic analytics", included: true, limit: null },
      { name: "Mobile app", included: true, limit: null },
      { name: "Advanced automation", included: true, limit: null },
      { name: "Priority support", included: true, limit: null },
      { name: "Custom integrations", included: false, limit: null },
    ],
  },
  {
    id: "plan-enterprise",
    name: "Enterprise",
    description: "Custom solution for large organizations",
    price_monthly: 299,
    price_yearly: 2990,
    max_seats: null,
    features: [
      { name: "Social accounts", included: true, limit: null, description: "Unlimited" },
      { name: "Monthly messages", included: true, limit: null, description: "Unlimited" },
      { name: "Team members", included: true, limit: null, description: "Unlimited" },
      { name: "Conversation history", included: true, limit: null, description: "Unlimited" },
      { name: "Basic analytics", included: true, limit: null },
      { name: "Mobile app", included: true, limit: null },
      { name: "Advanced automation", included: true, limit: null },
      { name: "Priority support", included: true, limit: null },
      { name: "Custom integrations", included: true, limit: null },
    ],
  },
];

export const mockSubscription: WorkspaceSubscription = {
  id: "sub-1",
  workspace_id: "workspace-1",
  plan: "professional",
  billing_period: "monthly",
  status: "active",
  seats: 10,
  used_seats: 5,
  price_per_seat: 79,
  total_price: 79,
  trial_ends_at: null,
  current_period_start: "2024-12-01T00:00:00Z",
  current_period_end: "2025-01-01T00:00:00Z",
  cancel_at_period_end: false,
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-12-01T00:00:00Z",
};

export const mockInvitations: WorkspaceInvitation[] = [
  {
    id: "inv-1",
    workspace_id: "workspace-1",
    email: "alex.martinez@example.com",
    role: "member",
    status: "pending",
    invited_by: "user-1",
    expires_at: "2025-01-15T10:00:00Z",
    created_at: "2024-12-15T10:00:00Z",
  },
  {
    id: "inv-2",
    workspace_id: "workspace-1",
    email: "lisa.chen@example.com",
    role: "admin",
    status: "pending",
    invited_by: "user-1",
    expires_at: "2025-01-20T10:00:00Z",
    created_at: "2024-12-18T10:00:00Z",
  },
];

export function getPlanById(planId: string): Plan | undefined {
  return mockPlans.find((plan) => plan.id === planId);
}

export function getCurrentPlan(): Plan | undefined {
  return mockPlans.find((plan) => plan.id === `plan-${mockSubscription.plan}`);
}
