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
  size?: "sm" | "md" | "lg";
}

const platformConfig: Record<
  SocialPlatform,
  { icon: LucideIcon; color: string; label: string }
> = {
  twitter: {
    icon: Twitter,
    color: "bg-blue-500 text-white",
    label: "Twitter",
  },
  facebook: {
    icon: Facebook,
    color: "bg-blue-600 text-white",
    label: "Facebook",
  },
  instagram: {
    icon: Instagram,
    color: "bg-pink-500 text-white",
    label: "Instagram",
  },
  linkedin: {
    icon: Linkedin,
    color: "bg-blue-700 text-white",
    label: "LinkedIn",
  },
  youtube: {
    icon: Youtube,
    color: "bg-red-600 text-white",
    label: "YouTube",
  },
  tiktok: {
    icon: Twitter, // Using Twitter as placeholder
    color: "bg-black text-white",
    label: "TikTok",
  },
  threads: {
    icon: Twitter, // Using Twitter as placeholder
    color: "bg-gray-800 text-white",
    label: "Threads",
  },
  pinterest: {
    icon: Twitter, // Using Twitter as placeholder
    color: "bg-red-500 text-white",
    label: "Pinterest",
  },
  reddit: {
    icon: Twitter, // Using Twitter as placeholder
    color: "bg-orange-500 text-white",
    label: "Reddit",
  },
  whatsapp: {
    icon: Twitter, // Using Twitter as placeholder
    color: "bg-green-500 text-white",
    label: "WhatsApp",
  },
  slack: {
    icon: Twitter, // Using Twitter as placeholder
    color: "bg-purple-600 text-white",
    label: "Slack",
  },
  discord: {
    icon: Twitter, // Using Twitter as placeholder
    color: "bg-indigo-600 text-white",
    label: "Discord",
  },
  telegram: {
    icon: Twitter, // Using Twitter as placeholder
    color: "bg-blue-400 text-white",
    label: "Telegram",
  },
  bluesky: {
    icon: Twitter, // Using Twitter as placeholder
    color: "bg-sky-500 text-white",
    label: "Bluesky",
  },
  mastodon: {
    icon: Twitter, // Using Twitter as placeholder
    color: "bg-purple-500 text-white",
    label: "Mastodon",
  },
  farcaster: {
    icon: Twitter, // Using Twitter as placeholder
    color: "bg-violet-600 text-white",
    label: "Farcaster",
  },
  nostr: {
    icon: Twitter, // Using Twitter as placeholder
    color: "bg-amber-600 text-white",
    label: "Nostr",
  },
};

export function PlatformBadge({ platform, size = "sm" }: PlatformBadgeProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

  const sizeClass = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size];

  return (
    <Badge variant="secondary" className={`${config.color} gap-1 px-1.5 py-0.5`}>
      <Icon className={sizeClass} />
      <span className="text-xs">{config.label}</span>
    </Badge>
  );
}

export function PlatformIcon({ platform, className }: { platform: SocialPlatform; className?: string }) {
  const config = platformConfig[platform];
  const Icon = config.icon;
  return <Icon className={className} />;
}
