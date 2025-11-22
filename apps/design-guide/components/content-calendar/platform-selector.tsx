"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { SocialPlatform } from "@/lib/zod-schemas";
import { PlatformIcon } from "./platform-badge";
import { Card } from "@/components/ui/card";

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
      <Label className="text-sm font-medium">Select Platforms</Label>
      <div className="grid grid-cols-2 gap-3">
        {availablePlatforms.map((platform) => (
          <Card
            key={platform}
            className={`p-3 cursor-pointer transition-all ${
              selected.includes(platform)
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
            onClick={() => handleToggle(platform)}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                id={`platform-${platform}`}
                checked={selected.includes(platform)}
                onCheckedChange={() => handleToggle(platform)}
              />
              <div className="flex items-center gap-2 flex-1">
                <PlatformIcon platform={platform} className="h-4 w-4" />
                <Label
                  htmlFor={`platform-${platform}`}
                  className="cursor-pointer font-normal"
                >
                  {platformLabels[platform]}
                </Label>
              </div>
            </div>
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
