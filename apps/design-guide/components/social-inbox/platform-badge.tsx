import { cn } from "@/lib/utils";
import {
  MessageCircle,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Send,
  MessageSquare,
} from "lucide-react";
import type { SocialPlatform } from "@/lib/zod-schemas";

const platformConfig: Record<SocialPlatform, { icon: React.ElementType; color: string; label: string }> = {
  twitter: { icon: Twitter, color: "text-sky-500", label: "Twitter" },
  instagram: { icon: Instagram, color: "text-pink-500", label: "Instagram" },
  facebook: { icon: Facebook, color: "text-blue-600", label: "Facebook" },
  linkedin: { icon: Linkedin, color: "text-blue-700", label: "LinkedIn" },
  whatsapp: { icon: MessageCircle, color: "text-green-600", label: "WhatsApp" },
  telegram: { icon: Send, color: "text-sky-600", label: "Telegram" },
  discord: { icon: MessageSquare, color: "text-indigo-500", label: "Discord" },
  youtube: { icon: Youtube, color: "text-red-600", label: "YouTube" },
  tiktok: { icon: MessageCircle, color: "text-black dark:text-white", label: "TikTok" },
  slack: { icon: MessageSquare, color: "text-purple-600", label: "Slack" },
  reddit: { icon: MessageCircle, color: "text-orange-600", label: "Reddit" },
  pinterest: { icon: MessageCircle, color: "text-red-600", label: "Pinterest" },
  threads: { icon: MessageCircle, color: "text-black dark:text-white", label: "Threads" },
  bluesky: { icon: MessageCircle, color: "text-blue-500", label: "Bluesky" },
  mastodon: { icon: MessageCircle, color: "text-purple-500", label: "Mastodon" },
  farcaster: { icon: MessageCircle, color: "text-purple-600", label: "Farcaster" },
  nostr: { icon: MessageCircle, color: "text-orange-500", label: "Nostr" },
};

interface PlatformBadgeProps {
  platform: SocialPlatform;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PlatformBadge({ platform, showLabel = false, size = "md", className }: PlatformBadgeProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <Icon className={cn(config.color, sizeClasses[size])} />
      {showLabel && <span className="text-sm">{config.label}</span>}
    </div>
  );
}
