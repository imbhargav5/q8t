import { z } from "zod";
import { WorkspaceRoleEnum, UserStatusEnum } from "./enums.schema";

// Base User Schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string().nullable(),
  avatar_url: z.string().url().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

// Workspace Member Schema
export const WorkspaceMemberSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  role: WorkspaceRoleEnum,
  status: UserStatusEnum.default("offline"),
  conversation_load: z.number().int().default(0), // Current number of assigned conversations
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type WorkspaceMember = z.infer<typeof WorkspaceMemberSchema>;

// User with Member Info (for team lists)
export const UserWithMemberInfoSchema = UserSchema.merge(
  z.object({
    role: WorkspaceRoleEnum,
    status: UserStatusEnum,
    conversation_load: z.number().int(),
  })
);

export type UserWithMemberInfo = z.infer<typeof UserWithMemberInfoSchema>;
