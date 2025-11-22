import type { User, UserWithMemberInfo } from "../zod-schemas";

// Team members for the workspace
export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "you@company.com",
    full_name: "You (Current User)",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    created_at: new Date("2024-01-15").toISOString(),
    updated_at: new Date("2024-01-15").toISOString(),
  },
  {
    id: "user-2",
    email: "sarah.johnson@company.com",
    full_name: "Sarah Johnson",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    created_at: new Date("2024-01-15").toISOString(),
    updated_at: new Date("2024-01-15").toISOString(),
  },
  {
    id: "user-3",
    email: "mike.peters@company.com",
    full_name: "Mike Peters",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    created_at: new Date("2024-01-15").toISOString(),
    updated_at: new Date("2024-01-15").toISOString(),
  },
  {
    id: "user-4",
    email: "emma.wilson@company.com",
    full_name: "Emma Wilson",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    created_at: new Date("2024-01-15").toISOString(),
    updated_at: new Date("2024-01-15").toISOString(),
  },
  {
    id: "user-5",
    email: "james.lee@company.com",
    full_name: "James Lee",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    created_at: new Date("2024-01-15").toISOString(),
    updated_at: new Date("2024-01-15").toISOString(),
  },
];

// Team members with workspace info
export const mockTeamMembers: UserWithMemberInfo[] = [
  {
    ...mockUsers[0],
    role: "admin",
    status: "online",
    conversation_load: 5,
  },
  {
    ...mockUsers[1],
    role: "member",
    status: "online",
    conversation_load: 3,
  },
  {
    ...mockUsers[2],
    role: "member",
    status: "away",
    conversation_load: 7,
  },
  {
    ...mockUsers[3],
    role: "member",
    status: "online",
    conversation_load: 2,
  },
  {
    ...mockUsers[4],
    role: "member",
    status: "offline",
    conversation_load: 0,
  },
];
