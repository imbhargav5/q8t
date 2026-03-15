
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SocialPlatform } from "@/lib/zod-schemas";
import { PlatformIcon } from "../content-calendar/platform-badge";
import { PLATFORM_FEATURES, PLATFORM_CHARACTER_LIMITS } from "@/lib/compose/constants";
import { Info, Plus, X } from "lucide-react";

interface PlatformCustomization {
  contentOverride?: string;
  firstComment?: string;
  threadTweets?: string[];
  locationTag?: string;
  taggedUsers?: string[];
}

interface PlatformCustomizationProps {
  selectedPlatforms: SocialPlatform[];
  platformCustomizations: Record<SocialPlatform, PlatformCustomization>;
  onCustomizationChange: (
    platform: SocialPlatform,
    customization: PlatformCustomization
  ) => void;
}

export function PlatformCustomizationTabs({
  selectedPlatforms,
  platformCustomizations,
  onCustomizationChange,
}: PlatformCustomizationProps) {
  const updateCustomization = (
    platform: SocialPlatform,
    field: keyof PlatformCustomization,
    value: any
  ) => {
    const current = platformCustomizations[platform] || {};
    onCustomizationChange(platform, {
      ...current,
      [field]: value,
    });
  };

  const addThreadTweet = (platform: SocialPlatform) => {
    const current = platformCustomizations[platform] || {};
    const currentThreads = current.threadTweets || [];
    onCustomizationChange(platform, {
      ...current,
      threadTweets: [...currentThreads, ""],
    });
  };

  const removeThreadTweet = (platform: SocialPlatform, index: number) => {
    const current = platformCustomizations[platform] || {};
    const currentThreads = current.threadTweets || [];
    onCustomizationChange(platform, {
      ...current,
      threadTweets: currentThreads.filter((_, i) => i !== index),
    });
  };

  const updateThreadTweet = (
    platform: SocialPlatform,
    index: number,
    value: string
  ) => {
    const current = platformCustomizations[platform] || {};
    const currentThreads = current.threadTweets || [];
    const newThreads = [...currentThreads];
    newThreads[index] = value;
    onCustomizationChange(platform, {
      ...current,
      threadTweets: newThreads,
    });
  };

  if (selectedPlatforms.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">Select platforms to customize content</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="w-full justify-start overflow-x-auto">
        <TabsTrigger value="all">All Platforms</TabsTrigger>
        {selectedPlatforms.map((platform) => (
          <TabsTrigger key={platform} value={platform} className="gap-2">
            <PlatformIcon platform={platform} className="h-4 w-4" />
            <span className="capitalize">{platform}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="all" className="space-y-4 mt-4">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>
            The same content will be posted to all selected platforms. Use
            platform-specific tabs to customize content for each platform.
          </p>
        </div>
      </TabsContent>

      {selectedPlatforms.map((platform) => {
        const features = PLATFORM_FEATURES[platform];
        const customization = platformCustomizations[platform] || {};
        const charLimit = PLATFORM_CHARACTER_LIMITS[platform];

        return (
          <TabsContent key={platform} value={platform} className="space-y-4 mt-4">
            {/* Platform-specific content override */}
            <div className="space-y-2">
              <Label htmlFor={`content-${platform}`}>
                Custom Content for {platform}
                <Badge variant="outline" className="ml-2">
                  Optional
                </Badge>
              </Label>
              <Textarea
                id={`content-${platform}`}
                placeholder={`Custom content for ${platform} (leave empty to use main content)`}
                value={customization.contentOverride || ""}
                onChange={(e) =>
                  updateCustomization(platform, "contentOverride", e.target.value)
                }
                className="min-h-[100px]"
              />
              <div className="text-xs text-muted-foreground text-right">
                {(customization.contentOverride || "").length}/{charLimit}
              </div>
            </div>

            {/* First Comment (Instagram) */}
            {features.supportsFirstComment && (
              <div className="space-y-2">
                <Label htmlFor={`first-comment-${platform}`}>
                  First Comment
                  <Badge variant="secondary" className="ml-2">
                    Instagram Feature
                  </Badge>
                </Label>
                <Textarea
                  id={`first-comment-${platform}`}
                  placeholder="Add a first comment (great for calls-to-action)"
                  value={customization.firstComment || ""}
                  onChange={(e) =>
                    updateCustomization(platform, "firstComment", e.target.value)
                  }
                  className="min-h-[80px]"
                />
              </div>
            )}

            {/* Thread Builder (Twitter/X) */}
            {features.supportsThreads && (
              <div className="space-y-2">
                <Label>
                  Thread Tweets
                  <Badge variant="secondary" className="ml-2">
                    Thread Feature
                  </Badge>
                </Label>
                <div className="space-y-2">
                  {(customization.threadTweets || []).map((tweet, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1 space-y-1">
                        <Textarea
                          placeholder={`Tweet ${index + 1}`}
                          value={tweet}
                          onChange={(e) =>
                            updateThreadTweet(platform, index, e.target.value)
                          }
                          className="min-h-[80px]"
                        />
                        <div className="text-xs text-muted-foreground text-right">
                          {tweet.length}/280
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeThreadTweet(platform, index)}
                        className="flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addThreadTweet(platform)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tweet to Thread
                  </Button>
                </div>
              </div>
            )}

            {/* Location Tag */}
            {features.supportsLocationTag && (
              <div className="space-y-2">
                <Label htmlFor={`location-${platform}`}>
                  Location Tag
                  <Badge variant="outline" className="ml-2">
                    Optional
                  </Badge>
                </Label>
                <Input
                  id={`location-${platform}`}
                  placeholder="Add a location (e.g., New York, NY)"
                  value={customization.locationTag || ""}
                  onChange={(e) =>
                    updateCustomization(platform, "locationTag", e.target.value)
                  }
                />
              </div>
            )}

            {/* User Tags */}
            {features.supportsUserTags && (
              <div className="space-y-2">
                <Label htmlFor={`tags-${platform}`}>
                  Tag Users
                  <Badge variant="outline" className="ml-2">
                    Optional
                  </Badge>
                </Label>
                <Input
                  id={`tags-${platform}`}
                  placeholder="Tag users (e.g., @user1 @user2)"
                  value={(customization.taggedUsers || []).join(" ")}
                  onChange={(e) =>
                    updateCustomization(
                      platform,
                      "taggedUsers",
                      e.target.value.split(" ").filter((t) => t)
                    )
                  }
                />
              </div>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
