import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ListeningStreamItem } from "@/lib/zod-schemas";
import {
  Heart,
  MessageCircle,
  Share2,
  Eye,
  ExternalLink,
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Play,
  MoreHorizontal,
  Star,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface SocialSignalCardProps {
  signal: ListeningStreamItem;
  compact?: boolean;
}

const platformConfig: Record<
  string,
  {
    icon: React.ElementType;
    color: string;
    bgColor: string;
    name: string;
  }
> = {
  twitter: {
    icon: Twitter,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    name: "Twitter",
  },
  instagram: {
    icon: Instagram,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    name: "Instagram",
  },
  youtube: {
    icon: Youtube,
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    name: "YouTube",
  },
  facebook: {
    icon: Facebook,
    color: "text-blue-700",
    bgColor: "bg-blue-700/10",
    name: "Facebook",
  },
  linkedin: {
    icon: Linkedin,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    name: "LinkedIn",
  },
  tiktok: {
    icon: Play,
    color: "text-black dark:text-white",
    bgColor: "bg-black/10 dark:bg-white/10",
    name: "TikTok",
  },
  reddit: {
    icon: MessageCircle,
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    name: "Reddit",
  },
  trustpilot: {
    icon: Star,
    color: "text-green-600",
    bgColor: "bg-green-600/10",
    name: "Trustpilot",
  },
  "google-my-business": {
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-600/10",
    name: "Google",
  },
};

function getSentimentColor(score?: number): string {
  if (!score) return "bg-gray-500";
  if (score >= 0.3) return "bg-green-500";
  if (score >= -0.3) return "bg-yellow-500";
  return "bg-red-500";
}

function getSentimentBadgeColor(score?: number): string {
  if (!score) return "bg-gray-500/10 text-gray-700 border-gray-200";
  if (score >= 0.3) return "bg-green-500/10 text-green-700 border-green-200";
  if (score >= -0.3) return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
  return "bg-red-500/10 text-red-700 border-red-200";
}

export function SocialSignalCard({ signal, compact = false }: SocialSignalCardProps) {
  const config = platformConfig[signal.platform] || platformConfig.twitter;
  const PlatformIcon = config.icon;
  const sentimentColor = getSentimentColor(signal.sentimentScore);
  const sentimentBadgeColor = getSentimentBadgeColor(signal.sentimentScore);

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer">
        <div className={cn("p-2 rounded-full", config.bgColor)}>
          <PlatformIcon className={cn("h-4 w-4", config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium truncate">
              {signal.authorName || signal.authorHandle}
            </span>
            {signal.authorVerified && (
              <CheckCircle2 className="h-3 w-3 text-blue-500 flex-shrink-0" />
            )}
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {signal.postedAt && formatDistanceToNow(new Date(signal.postedAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {signal.contentPreview || signal.content}
          </p>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            {signal.likesCount > 0 && (
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" /> {signal.likesCount}
              </span>
            )}
            {signal.commentsCount > 0 && (
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" /> {signal.commentsCount}
              </span>
            )}
            {signal.sharesCount > 0 && (
              <span className="flex items-center gap-1">
                <Share2 className="h-3 w-3" /> {signal.sharesCount}
              </span>
            )}
          </div>
        </div>
        <Badge className={cn("flex-shrink-0", sentimentBadgeColor)}>
          {signal.sentimentScore?.toFixed(2)}
        </Badge>
      </div>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={signal.authorAvatarUrl || undefined} />
              <AvatarFallback>
                {(signal.authorName || signal.authorHandle || "?")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium truncate">{signal.authorName}</p>
                {signal.authorVerified && (
                  <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="truncate">{signal.authorHandle}</span>
                {signal.followerCount && (
                  <>
                    <span>•</span>
                    <span className="flex-shrink-0">
                      {signal.followerCount >= 1000
                        ? `${(signal.followerCount / 1000).toFixed(1)}K`
                        : signal.followerCount}{" "}
                      followers
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className={cn("p-1.5 rounded-full", config.bgColor)}>
              <PlatformIcon className={cn("h-4 w-4", config.color)} />
            </div>
            <Badge className={sentimentBadgeColor}>
              {signal.sentiment === "positive" && "🟢"}
              {signal.sentiment === "neutral" && "🟡"}
              {signal.sentiment === "negative" && "🔴"}
              {signal.sentimentScore?.toFixed(2)}
            </Badge>
          </div>
        </div>

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground">
          {signal.postedAt && formatDistanceToNow(new Date(signal.postedAt), { addSuffix: true })}
        </p>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-sm whitespace-pre-wrap">{signal.content}</p>

          {/* Media */}
          {signal.mediaUrls && signal.mediaUrls.length > 0 && (
            <div
              className={cn(
                "grid gap-2 rounded-lg overflow-hidden",
                signal.mediaUrls.length === 1 && "grid-cols-1",
                signal.mediaUrls.length === 2 && "grid-cols-2",
                signal.mediaUrls.length >= 3 && "grid-cols-2"
              )}
            >
              {signal.mediaUrls.slice(0, 4).map((url, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "relative bg-muted aspect-video overflow-hidden",
                    signal.mediaUrls.length === 3 && idx === 0 && "col-span-2"
                  )}
                >
                  <img
                    src={url}
                    alt={`Media ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {signal.mediaUrls.length > 4 && idx === 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                      +{signal.mediaUrls.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Hashtags */}
          {signal.hashtags && signal.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {signal.hashtags.slice(0, 5).map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {signal.hashtags.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{signal.hashtags.length - 5}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Engagement Metrics */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
          {signal.likesCount > 0 && (
            <span className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" />
              {signal.likesCount >= 1000
                ? `${(signal.likesCount / 1000).toFixed(1)}K`
                : signal.likesCount}
            </span>
          )}
          {signal.commentsCount > 0 && (
            <span className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              {signal.commentsCount >= 1000
                ? `${(signal.commentsCount / 1000).toFixed(1)}K`
                : signal.commentsCount}
            </span>
          )}
          {signal.sharesCount > 0 && (
            <span className="flex items-center gap-1.5">
              <Share2 className="h-4 w-4" />
              {signal.sharesCount >= 1000
                ? `${(signal.sharesCount / 1000).toFixed(1)}K`
                : signal.sharesCount}
            </span>
          )}
          {signal.viewsCount && signal.viewsCount > 0 && (
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {signal.viewsCount >= 1000
                ? `${(signal.viewsCount / 1000).toFixed(1)}K`
                : signal.viewsCount}
            </span>
          )}
        </div>

        {/* Sentiment Analysis */}
        {signal.sentimentKeywords && signal.sentimentKeywords.length > 0 && (
          <div className="pt-2 border-t space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Keywords:</p>
            <div className="flex flex-wrap gap-1">
              {signal.sentimentKeywords.slice(0, 6).map((keyword, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {signal.emotions && Object.keys(signal.emotions).length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Emotions:</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.entries(signal.emotions)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .slice(0, 3)
                .map(([emotion, value], idx) => (
                  <span key={idx} className="text-muted-foreground">
                    {emotion.charAt(0).toUpperCase() + emotion.slice(1)} ({((value as number) * 100).toFixed(0)}%)
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <Button size="sm" variant="outline" className="flex-1" asChild>
            <a href={signal.platformUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" />
              View on {config.name}
            </a>
          </Button>
          <Button size="sm" variant="outline">
            <MessageSquare className="h-3 w-3 mr-1" />
            Respond
          </Button>
          <Button size="sm" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
