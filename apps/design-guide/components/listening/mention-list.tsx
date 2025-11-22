"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Heart,
  Repeat2,
  MessageCircle,
  Star,
  BadgeCheck,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import type { ListeningMention } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import { Listbox, ListboxGroup, ListboxItem } from "@/components/ui/listbox";

interface ListenerMentionListProps {
  mentions: ListeningMention[];
  selectedId?: string;
  onSelect: (mention: ListeningMention) => void;
}

export function ListenerMentionList({ mentions, selectedId, onSelect }: ListenerMentionListProps) {
  return (
    <ScrollArea className="flex-1">
      <Listbox orientation="vertical">
        <ListboxGroup className="divide-y">
          {mentions.map((mention) => (
            <ListboxItem
              key={mention.id}
              value={mention.id}
              onClick={() => onSelect(mention)}
              className={cn(
                "w-full text-left p-4 transition-colors hover:bg-accent cursor-pointer",
                selectedId === mention.id && "bg-accent",
                !mention.isRead && "border-l-4 border-l-blue-500"
              )}
            >
            {/* Author Header */}
            <div className="flex items-start gap-3 mb-2">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={mention.authorAvatarUrl} alt={mention.authorDisplayName} />
                <AvatarFallback>{mention.authorDisplayName[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-semibold text-sm truncate">
                    {mention.authorDisplayName}
                  </span>
                  {mention.authorVerified && (
                    <BadgeCheck className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  )}
                  {mention.isStarred && (
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0 ml-auto" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  @{mention.authorUsername} · {formatDistanceToNow(mention.publishedAt, { addSuffix: true })}
                </div>
              </div>
            </div>

            {/* Content Preview */}
            <div className="text-sm mb-3 line-clamp-3">{mention.contentPreview}</div>

            {/* Media Preview */}
            {mention.hasMedia && mention.mediaUrls.length > 0 && (
              <div className="mb-3">
                <div className="relative rounded-lg overflow-hidden bg-muted">
                  <img
                    src={mention.mediaUrls[0]}
                    alt="Media"
                    className="w-full h-32 object-cover"
                  />
                  {mention.mediaCount > 1 && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      +{mention.mediaCount - 1}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge
                variant={
                  mention.sentiment === "positive"
                    ? "default"
                    : mention.sentiment === "negative"
                      ? "destructive"
                      : "secondary"
                }
                className="text-xs capitalize"
              >
                {mention.sentiment}
              </Badge>

              <Badge
                variant="outline"
                className={cn(
                  "text-xs capitalize",
                  mention.priority === "critical" && "border-red-500 text-red-700",
                  mention.priority === "high" && "border-orange-500 text-orange-700"
                )}
              >
                {mention.priority}
              </Badge>

              <Badge variant="outline" className="text-xs capitalize">
                {mention.platform}
              </Badge>

              {mention.isViral && (
                <Badge variant="outline" className="text-xs border-purple-500 text-purple-700">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Viral
                </Badge>
              )}

              {mention.isInfluencer && (
                <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-700">
                  Influencer
                </Badge>
              )}
            </div>

            {/* Engagement Metrics */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" />
                <span>{formatNumber(mention.likesCount)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Repeat2 className="h-3.5 w-3.5" />
                <span>{formatNumber(mention.sharesCount)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />
                <span>{formatNumber(mention.commentsCount)}</span>
              </div>
              {mention.potentialReach > 0 && (
                <div className="flex items-center gap-1">
                  <span>Reach:</span>
                  <span className="font-medium">{formatNumber(mention.potentialReach)}</span>
                </div>
              )}
            </div>

            {/* Matched Keywords */}
            {mention.matchedKeywords.length > 0 && (
              <div className="mt-2 flex items-center gap-1 flex-wrap">
                <span className="text-xs text-muted-foreground">Matched:</span>
                {mention.matchedKeywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded"
                  >
                    {keyword}
                  </span>
                ))}
                {mention.matchedKeywords.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{mention.matchedKeywords.length - 3} more
                  </span>
                )}
              </div>
            )}
            </ListboxItem>
          ))}
        </ListboxGroup>
      </Listbox>
    </ScrollArea>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}
