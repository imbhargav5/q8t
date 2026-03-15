
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Repeat2,
  MessageCircle,
  Eye,
  Star,
  BadgeCheck,
  TrendingUp,
  ExternalLink,
  Inbox,
  Archive,
  Tag,
  User,
  MapPin,
  Calendar,
  BarChart3,
} from "lucide-react";
import type { ListeningMention } from "@/lib/mock-data";
import { format, formatDistanceToNow } from "date-fns";

interface ListenerMentionDetailProps {
  mention: ListeningMention;
}

export function ListenerMentionDetail({ mention }: ListenerMentionDetailProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header Actions */}
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="default">
            <Inbox className="h-4 w-4 mr-2" />
            Move to Inbox
          </Button>
          <Button size="sm" variant="outline">
            <Star className="h-4 w-4 mr-2" />
            Star
          </Button>
          <Button size="sm" variant="outline">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
          <Button size="sm" variant="outline">
            <Tag className="h-4 w-4 mr-2" />
            Tag
          </Button>
          <Button size="sm" variant="ghost" className="ml-auto" asChild>
            <a href={mention.platformPostUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on {mention.platform}
            </a>
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Author Information */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={mention.authorAvatarUrl} alt={mention.authorDisplayName} />
                <AvatarFallback>{mention.authorDisplayName[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold">{mention.authorDisplayName}</h3>
                  {mention.authorVerified && (
                    <BadgeCheck className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  @{mention.authorUsername}
                </div>
                {mention.authorBio && (
                  <p className="text-sm text-muted-foreground">{mention.authorBio}</p>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div>
                    <span className="font-semibold">
                      {formatNumber(mention.authorFollowerCount)}
                    </span>
                    <span className="text-muted-foreground ml-1">followers</span>
                  </div>
                  {mention.isInfluencer && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                      Influencer
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Post Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Post Content</h4>
              <div className="text-sm text-muted-foreground">
                {format(mention.publishedAt, "PPp")}
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap">{mention.content}</p>
            </div>

            {/* Media */}
            {mention.hasMedia && mention.mediaUrls.length > 0 && (
              <div className="space-y-2">
                {mention.mediaUrls.map((url, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border">
                    <img src={url} alt={`Media ${index + 1}`} className="w-full" />
                  </div>
                ))}
              </div>
            )}

            {/* Links */}
            {mention.hasLinks && mention.linkUrls.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Links</h5>
                {mention.linkUrls.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {url}
                  </a>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Engagement Metrics */}
          <div className="space-y-4">
            <h4 className="font-semibold">Engagement</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Heart className="h-5 w-5 text-red-500" />
                <div>
                  <div className="text-sm text-muted-foreground">Likes</div>
                  <div className="text-lg font-semibold">
                    {formatNumber(mention.likesCount)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Repeat2 className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-sm text-muted-foreground">Shares</div>
                  <div className="text-lg font-semibold">
                    {formatNumber(mention.sharesCount)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm text-muted-foreground">Comments</div>
                  <div className="text-lg font-semibold">
                    {formatNumber(mention.commentsCount)}
                  </div>
                </div>
              </div>

              {mention.viewsCount && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Eye className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">Views</div>
                    <div className="text-lg font-semibold">
                      {formatNumber(mention.viewsCount)}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg col-span-2">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-sm text-muted-foreground">Engagement Score</div>
                  <div className="text-lg font-semibold">
                    {formatNumber(mention.engagementScore)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg col-span-2">
                <TrendingUp className="h-5 w-5 text-indigo-500" />
                <div>
                  <div className="text-sm text-muted-foreground">Potential Reach</div>
                  <div className="text-lg font-semibold">
                    {formatNumber(mention.potentialReach)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Sentiment Analysis */}
          <div className="space-y-4">
            <h4 className="font-semibold">Sentiment Analysis</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sentiment</span>
                <Badge
                  variant={
                    mention.sentiment === "positive"
                      ? "default"
                      : mention.sentiment === "negative"
                        ? "destructive"
                        : "secondary"
                  }
                  className="capitalize"
                >
                  {mention.sentiment}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sentiment Score</span>
                  <span className="font-medium">
                    {mention.sentimentScore > 0 ? "+" : ""}
                    {mention.sentimentScore.toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      mention.sentiment === "positive"
                        ? "bg-green-500"
                        : mention.sentiment === "negative"
                          ? "bg-red-500"
                          : "bg-gray-400"
                    }`}
                    style={{
                      width: `${((mention.sentimentScore + 1) / 2) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-medium">
                  {(mention.sentimentConfidence * 100).toFixed(0)}%
                </span>
              </div>

              {mention.sentimentKeywords.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Key indicators</div>
                  <div className="flex flex-wrap gap-2">
                    {mention.sentimentKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Classification & Metadata */}
          <div className="space-y-4">
            <h4 className="font-semibold">Classification</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="capitalize">{mention.mentionType.replace(/_/g, " ")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Priority</span>
                <Badge
                  variant="outline"
                  className={
                    mention.priority === "critical"
                      ? "border-red-500 text-red-700"
                      : mention.priority === "high"
                        ? "border-orange-500 text-orange-700"
                        : ""
                  }
                >
                  {mention.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Platform</span>
                <span className="capitalize">{mention.platform}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Language</span>
                <span className="uppercase">{mention.language}</span>
              </div>
              {mention.locationName && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {mention.locationName}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Matched Keywords */}
          {(mention.matchedKeywords.length > 0 ||
            mention.matchedHashtags.length > 0 ||
            mention.matchedMentions.length > 0) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-semibold">Matched Terms</h4>
                {mention.matchedKeywords.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Keywords</div>
                    <div className="flex flex-wrap gap-2">
                      {mention.matchedKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {mention.matchedHashtags.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Hashtags</div>
                    <div className="flex flex-wrap gap-2">
                      {mention.matchedHashtags.map((hashtag) => (
                        <span
                          key={hashtag}
                          className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs"
                        >
                          #{hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {mention.matchedMentions.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Mentions</div>
                    <div className="flex flex-wrap gap-2">
                      {mention.matchedMentions.map((mentionText) => (
                        <span
                          key={mentionText}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                        >
                          @{mentionText}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Timestamps */}
          <Separator />
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Published {formatDistanceToNow(mention.publishedAt, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Captured {formatDistanceToNow(mention.capturedAt, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toLocaleString();
}
