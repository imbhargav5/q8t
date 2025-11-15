export interface DiscordAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: DiscordScope[];
}

export type DiscordScope =
  | "identify"
  | "email"
  | "guilds"
  | "guilds.join"
  | "guilds.members.read"
  | "gdm.join"
  | "messages.read"
  | "bot"
  | "webhook.incoming"
  | "applications.commands"
  | "applications.commands.update"
  | "applications.commands.permissions.update"
  | "applications.builds.read"
  | "applications.builds.upload"
  | "applications.store.update"
  | "applications.entitlements"
  | "connections"
  | "rpc"
  | "rpc.notifications.read"
  | "rpc.voice.read"
  | "rpc.voice.write"
  | "rpc.activities.write"
  | "activities.read"
  | "activities.write"
  | "relationships.read"
  | "voice"
  | "dm_channels.read";

export const DISCORD_AUTH_ENDPOINTS = {
  authorize: "https://discord.com/oauth2/authorize",
  token: "https://discord.com/api/oauth2/token",
  revoke: "https://discord.com/api/oauth2/token/revoke",
} as const;

export const DISCORD_API_BASE_URL = "https://discord.com/api/v10";
