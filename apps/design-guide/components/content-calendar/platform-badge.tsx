import { Badge } from "@/components/ui/badge";
import type { SocialPlatform } from "@/lib/zod-schemas";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";

interface PlatformBadgeProps {
  platform: SocialPlatform;
}

const platformConfig: Record<
  SocialPlatform,
  { icon: LucideIcon; label: string }
> = {
  twitter: { icon: Twitter, label: "Twitter" },
  facebook: { icon: Facebook, label: "Facebook" },
  instagram: { icon: Instagram, label: "Instagram" },
  linkedin: { icon: Linkedin, label: "LinkedIn" },
  youtube: { icon: Youtube, label: "YouTube" },
  tiktok: { icon: Twitter, label: "TikTok" },
  threads: { icon: Twitter, label: "Threads" },
  pinterest: { icon: Twitter, label: "Pinterest" },
  reddit: { icon: Twitter, label: "Reddit" },
  whatsapp: { icon: Twitter, label: "WhatsApp" },
  slack: { icon: Twitter, label: "Slack" },
  discord: { icon: Twitter, label: "Discord" },
  telegram: { icon: Twitter, label: "Telegram" },
  bluesky: { icon: Twitter, label: "Bluesky" },
  mastodon: { icon: Twitter, label: "Mastodon" },
  farcaster: { icon: Twitter, label: "Farcaster" },
  nostr: { icon: Twitter, label: "Nostr" },
};

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <Badge variant="secondary">
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}

export function PlatformIcon({ platform, className }: { platform: SocialPlatform; className?: string }) {
  const config = platformConfig[platform];
  const Icon = config.icon;
  return <Icon className={className} />;
}
