
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { SocialPlatform, PostMedia } from "@/lib/zod-schemas";
import { PlatformIcon } from "../content-calendar/platform-badge";
import { PLATFORM_CHARACTER_LIMITS } from "@/lib/compose/constants";
import { Heart, MessageCircle, Repeat2, Share, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlatformPreviewProps {
  content: string;
  media: PostMedia[];
  selectedPlatforms: SocialPlatform[];
  platformCustomizations: Record<string, { contentOverride?: string }>;
}

export function PlatformPreview({
  content,
  media,
  selectedPlatforms,
  platformCustomizations,
}: PlatformPreviewProps) {
  const getContentForPlatform = (platform: SocialPlatform) => {
    return platformCustomizations[platform]?.contentOverride || content;
  };

  const getCharacterCount = (platform: SocialPlatform) => {
    const platformContent = getContentForPlatform(platform);
    const limit = PLATFORM_CHARACTER_LIMITS[platform];
    return {
      count: platformContent.length,
      limit,
      isOverLimit: platformContent.length > limit,
    };
  };

  const renderPreview = (platform: SocialPlatform) => {
    const platformContent = getContentForPlatform(platform);
    const charInfo = getCharacterCount(platform);

    // Mock user data
    const user = {
      name: "Chatsian",
      handle: "@chatsian",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=chatsian",
    };

    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PlatformIcon platform={platform} className="h-5 w-5" />
              <span className="text-sm font-medium capitalize">{platform}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs",
                  charInfo.isOverLimit
                    ? "text-destructive font-medium"
                    : "text-muted-foreground"
                )}
              >
                {charInfo.count}/{charInfo.limit}
              </span>
              {charInfo.isOverLimit && (
                <Badge variant="destructive" className="h-5 text-xs">
                  Over limit
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Post Preview */}
          <div className="bg-background border rounded-lg p-4 space-y-3">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{user.name}</span>
                  <PlatformIcon platform={platform} className="h-3 w-3" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {user.handle} • Just now
                </span>
              </div>
            </div>

            {/* Content */}
            {platformContent && (
              <p className="text-sm whitespace-pre-wrap break-words">
                {platformContent}
              </p>
            )}

            {/* Media */}
            {media.length > 0 && (
              <div
                className={cn(
                  "grid gap-2",
                  media.length === 1
                    ? "grid-cols-1"
                    : media.length === 2
                    ? "grid-cols-2"
                    : media.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-2"
                )}
              >
                {media.slice(0, 4).map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "relative rounded-lg overflow-hidden",
                      media.length === 1
                        ? "aspect-video"
                        : "aspect-square"
                    )}
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.alt_text || ""}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {index === 3 && media.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          +{media.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Engagement Buttons */}
            <div className="flex items-center gap-6 pt-2 border-t">
              {platform === "twitter" && (
                <>
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 cursor-pointer">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">0</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-green-500 cursor-pointer">
                    <Repeat2 className="h-4 w-4" />
                    <span className="text-xs">0</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-red-500 cursor-pointer">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">0</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 cursor-pointer">
                    <Share className="h-4 w-4" />
                  </div>
                </>
              )}
              {(platform === "instagram" || platform === "facebook") && (
                <>
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-red-500 cursor-pointer">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 cursor-pointer">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-primary cursor-pointer">
                    <Share className="h-5 w-5" />
                  </div>
                  {platform === "instagram" && (
                    <div className="ml-auto flex items-center gap-2 text-muted-foreground hover:text-primary cursor-pointer">
                      <Bookmark className="h-5 w-5" />
                    </div>
                  )}
                </>
              )}
              {platform === "linkedin" && (
                <>
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 cursor-pointer">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">Like</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 cursor-pointer">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">Comment</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 cursor-pointer">
                    <Repeat2 className="h-4 w-4" />
                    <span className="text-xs">Repost</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 cursor-pointer">
                    <Share className="h-4 w-4" />
                    <span className="text-xs">Send</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (selectedPlatforms.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          <p className="text-sm">Select platforms to see preview</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Preview</h3>
      <Tabs defaultValue={selectedPlatforms[0]} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {selectedPlatforms.map((platform) => (
            <TabsTrigger key={platform} value={platform} className="gap-2">
              <PlatformIcon platform={platform} className="h-4 w-4" />
              <span className="capitalize">{platform}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {selectedPlatforms.map((platform) => (
          <TabsContent key={platform} value={platform} className="mt-4">
            {renderPreview(platform)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
