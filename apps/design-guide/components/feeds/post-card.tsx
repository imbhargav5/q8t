import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { PostWithAuthor } from "@/lib/zod-schemas";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Eye,
  ExternalLink,
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
  TrendingUp,
  MoreHorizontal,
  AlertCircle,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: PostWithAuthor;
}

const platformIcons: Record<string, React.ElementType> = {
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
};

const platformColors: Record<string, string> = {
  twitter: "text-blue-500",
  instagram: "text-pink-500",
  linkedin: "text-blue-600",
  facebook: "text-blue-700",
  tiktok: "text-black",
  threads: "text-black",
  youtube: "text-red-600",
};

const statusColors: Record<string, string> = {
  published: "bg-green-500/10 text-green-700 border-green-200",
  scheduled: "bg-blue-500/10 text-blue-700 border-blue-200",
  draft: "bg-gray-500/10 text-gray-700 border-gray-200",
  failed: "bg-red-500/10 text-red-700 border-red-200",
};

const statusIcons: Record<string, React.ElementType> = {
  published: Eye,
  scheduled: Clock,
  failed: AlertCircle,
};

export function PostCard({ post }: PostCardProps) {
  const StatusIcon = statusIcons[post.status];
  const mainPlatform = post.platforms[0];
  const PlatformIcon = platformIcons[mainPlatform];

  // Truncate content
  const truncatedContent =
    post.content.length > 200 ? post.content.substring(0, 200) + "..." : post.content;

  // Calculate total engagement
  const totalEngagement = post.engagement
    ? post.engagement.likes + post.engagement.comments + post.engagement.shares
    : 0;

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={post.author.avatar_url || undefined} />
              <AvatarFallback>{post.author.full_name[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{post.author.full_name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(
                  new Date(post.published_at || post.scheduled_for || post.created_at),
                  { addSuffix: true }
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {PlatformIcon && (
              <PlatformIcon
                className={cn("h-4 w-4", platformColors[mainPlatform])}
              />
            )}
            {post.platforms.length > 1 && (
              <Badge variant="secondary" className="text-xs">
                +{post.platforms.length - 1}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-sm text-foreground whitespace-pre-wrap">{truncatedContent}</p>

          {/* Media Preview */}
          {post.media && post.media.length > 0 && (
            <div className="relative rounded-md overflow-hidden">
              <img
                src={post.media[0].thumbnail_url || post.media[0].url}
                alt={post.media[0].alt_text || "Post media"}
                className="w-full h-48 object-cover"
              />
              {post.media.length > 1 && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  +{post.media.length - 1}
                </div>
              )}
            </div>
          )}

          {/* Link Preview */}
          {post.link_preview && (
            <div className="border rounded-md overflow-hidden">
              {post.link_preview.image_url && (
                <img
                  src={post.link_preview.image_url}
                  alt={post.link_preview.title || "Link preview"}
                  className="w-full h-32 object-cover"
                />
              )}
              <div className="p-3 space-y-1">
                <p className="text-sm font-medium line-clamp-1">
                  {post.link_preview.title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {post.link_preview.description}
                </p>
              </div>
            </div>
          )}

          {/* Hashtags */}
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.hashtags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {post.hashtags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{post.hashtags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Engagement Metrics */}
        {post.engagement && post.status === "published" && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span>{post.engagement.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              <span>{post.engagement.comments.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Repeat2 className="h-3 w-3" />
              <span>{post.engagement.shares.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <Eye className="h-3 w-3" />
              <span>{post.engagement.impressions.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="flex items-center justify-between pt-2">
          <Badge
            variant="outline"
            className={cn("text-xs", statusColors[post.status])}
          >
            {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
          </Badge>

          {/* High Engagement Indicator */}
          {totalEngagement > 500 && (
            <div className="flex items-center gap-1 text-xs text-orange-600">
              <TrendingUp className="h-3 w-3" />
              <span>High engagement</span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="outline" size="sm" className="flex-1 text-xs h-7">
            View
          </Button>
          {(post.status === "draft" || post.status === "scheduled") && (
            <Button variant="outline" size="sm" className="flex-1 text-xs h-7">
              Edit
            </Button>
          )}
          {post.status === "failed" && (
            <Button variant="outline" size="sm" className="flex-1 text-xs h-7">
              Retry
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
