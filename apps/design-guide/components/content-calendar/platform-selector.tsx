"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { SocialPlatform } from "@/lib/zod-schemas";
import { PlatformIcon } from "./platform-badge";
import { cn } from "@/lib/utils";

interface PlatformSelectorProps {
  selected: SocialPlatform[];
  onChange: (platforms: SocialPlatform[]) => void;
  availablePlatforms?: SocialPlatform[];
}

const defaultPlatforms: SocialPlatform[] = [
  "twitter",
  "instagram",
  "facebook",
  "linkedin",
  "tiktok",
  "youtube",
  "threads",
];

const platformLabels: Record<SocialPlatform, string> = {
  twitter: "Twitter/X",
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  youtube: "YouTube",
  threads: "Threads",
  pinterest: "Pinterest",
  reddit: "Reddit",
  whatsapp: "WhatsApp",
  slack: "Slack",
  discord: "Discord",
  telegram: "Telegram",
  bluesky: "Bluesky",
  mastodon: "Mastodon",
  farcaster: "Farcaster",
  nostr: "Nostr",
};

export function PlatformSelector({
  selected,
  onChange,
  availablePlatforms = defaultPlatforms,
}: PlatformSelectorProps) {
  const handleToggle = (platform: SocialPlatform) => {
    if (selected.includes(platform)) {
      onChange(selected.filter((p) => p !== platform));
    } else {
      onChange([...selected, platform]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Select Platforms</Label>
      <div className="grid grid-cols-2 gap-3">
        {availablePlatforms.map((platform) => (
          <Card
            key={platform}
            className={cn(
              "cursor-pointer transition-colors",
              selected.includes(platform) && "bg-accent"
            )}
            onClick={() => handleToggle(platform)}
          >
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`platform-${platform}`}
                  checked={selected.includes(platform)}
                  onCheckedChange={() => handleToggle(platform)}
                />
                <PlatformIcon platform={platform} className="h-4 w-4" />
                <Label
                  htmlFor={`platform-${platform}`}
                  className="cursor-pointer"
                >
                  {platformLabels[platform]}
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selected.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Select at least one platform to publish
        </p>
      )}
    </div>
  );
}
