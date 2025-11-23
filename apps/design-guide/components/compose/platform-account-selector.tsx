"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SocialPlatform } from "@/lib/zod-schemas";
import { PlatformIcon } from "../content-calendar/platform-badge";
import { cn } from "@/lib/utils";
import { mockSocialAccounts } from "@/lib/mock-data/social-accounts";
import { Users } from "lucide-react";

interface PlatformAccount {
  id: string;
  platform: SocialPlatform;
  name: string;
  handle: string;
  avatar: string;
  followers: number;
}

interface PlatformAccountSelectorProps {
  selectedPlatforms: SocialPlatform[];
  selectedAccounts: string[];
  onChange: (platforms: SocialPlatform[], accounts: string[]) => void;
}

export function PlatformAccountSelector({
  selectedPlatforms,
  selectedAccounts,
  onChange,
}: PlatformAccountSelectorProps) {
  const [showAllAccounts, setShowAllAccounts] = useState(false);

  // Group accounts by platform
  const accountsByPlatform = mockSocialAccounts.reduce((acc, account) => {
    if (!acc[account.platform]) {
      acc[account.platform] = [];
    }
    acc[account.platform].push({
      id: account.id,
      platform: account.platform,
      name: account.account_name,
      handle: account.handle,
      avatar: account.avatar_url || "",
      followers: account.followers_count || 0,
    });
    return acc;
  }, {} as Record<SocialPlatform, PlatformAccount[]>);

  const toggleAccount = (account: PlatformAccount) => {
    let newAccounts: string[];
    let newPlatforms: SocialPlatform[];

    if (selectedAccounts.includes(account.id)) {
      // Remove account
      newAccounts = selectedAccounts.filter((id) => id !== account.id);

      // Check if we should remove the platform
      const platformStillHasAccounts = newAccounts.some(
        (id) => mockSocialAccounts.find((a) => a.id === id)?.platform === account.platform
      );

      if (!platformStillHasAccounts) {
        newPlatforms = selectedPlatforms.filter((p) => p !== account.platform);
      } else {
        newPlatforms = selectedPlatforms;
      }
    } else {
      // Add account
      newAccounts = [...selectedAccounts, account.id];

      // Add platform if not already there
      if (!selectedPlatforms.includes(account.platform)) {
        newPlatforms = [...selectedPlatforms, account.platform];
      } else {
        newPlatforms = selectedPlatforms;
      }
    }

    onChange(newPlatforms, newAccounts);
  };

  const selectAllForPlatform = (platform: SocialPlatform) => {
    const platformAccounts = accountsByPlatform[platform] || [];
    const platformAccountIds = platformAccounts.map((a) => a.id);

    const allSelected = platformAccountIds.every((id) =>
      selectedAccounts.includes(id)
    );

    let newAccounts: string[];
    let newPlatforms: SocialPlatform[];

    if (allSelected) {
      // Deselect all
      newAccounts = selectedAccounts.filter(
        (id) => !platformAccountIds.includes(id)
      );
      newPlatforms = selectedPlatforms.filter((p) => p !== platform);
    } else {
      // Select all
      newAccounts = [
        ...selectedAccounts.filter((id) => !platformAccountIds.includes(id)),
        ...platformAccountIds,
      ];
      newPlatforms = selectedPlatforms.includes(platform)
        ? selectedPlatforms
        : [...selectedPlatforms, platform];
    }

    onChange(newPlatforms, newAccounts);
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base">Select Accounts</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowAllAccounts(!showAllAccounts)}
        >
          {showAllAccounts ? "Show Less" : "Show All"}
        </Button>
      </div>

      <div className="space-y-3">
        {Object.entries(accountsByPlatform).map(([platform, accounts]) => {
          const platformKey = platform as SocialPlatform;
          const selectedCount = accounts.filter((a) =>
            selectedAccounts.includes(a.id)
          ).length;
          const allSelected = selectedCount === accounts.length;

          return (
            <div key={platform} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={platformKey} className="h-4 w-4" />
                  <span className="text-sm font-medium capitalize">
                    {platform}
                  </span>
                  {selectedCount > 0 && (
                    <Badge variant="secondary" className="h-5 text-xs">
                      {selectedCount}/{accounts.length}
                    </Badge>
                  )}
                </div>
                {accounts.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => selectAllForPlatform(platformKey)}
                    className="h-7 text-xs"
                  >
                    {allSelected ? "Deselect All" : "Select All"}
                  </Button>
                )}
              </div>

              <div
                className={cn(
                  "grid gap-2",
                  showAllAccounts || accounts.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-1"
                )}
              >
                {(showAllAccounts ? accounts : accounts.slice(0, 2)).map(
                  (account) => (
                    <Card
                      key={account.id}
                      className={cn(
                        "cursor-pointer transition-all hover:bg-accent",
                        selectedAccounts.includes(account.id) &&
                          "bg-accent border-primary"
                      )}
                      onClick={() => toggleAccount(account)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={`account-${account.id}`}
                            checked={selectedAccounts.includes(account.id)}
                            onCheckedChange={() => toggleAccount(account)}
                          />
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={account.avatar} alt={account.name} />
                            <AvatarFallback>
                              {account.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <Label
                                htmlFor={`account-${account.id}`}
                                className="cursor-pointer font-medium truncate"
                              >
                                {account.name}
                              </Label>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="truncate">{account.handle}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {formatFollowers(account.followers)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>

              {!showAllAccounts && accounts.length > 2 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setShowAllAccounts(true)}
                >
                  Show {accounts.length - 2} more {platform} account
                  {accounts.length - 2 > 1 ? "s" : ""}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {selectedAccounts.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          Select at least one account to publish
        </p>
      )}
    </div>
  );
}
