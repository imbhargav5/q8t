
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PostWithAuthor } from "@/lib/zod-schemas";
import { PostStatusBadge } from "../post-status-badge";
import { PlatformBadge } from "../platform-badge";
import {
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Edit,
  Copy,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";

interface PostDetailSidebarProps {
  post: PostWithAuthor;
}

export function PostDetailSidebar({ post }: PostDetailSidebarProps) {
  const scheduledTime = post.scheduled_for || post.published_at;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Post Details</h3>
        <PostStatusBadge status={post.status} />
      </div>

      {/* Author */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Author</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.author.avatar_url || undefined} />
              <AvatarFallback>
                {post.author.full_name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author.full_name}</p>
              {scheduledTime && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(scheduledTime), "MMM d, h:mm a")}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platforms */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Platforms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {post.platforms.map((platform) => (
              <PlatformBadge key={platform} platform={platform} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Engagement (if published) */}
      {post.engagement && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Engagement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Heart className="h-4 w-4" />
                <span>Likes</span>
              </div>
              <span className="font-semibold">
                {post.engagement.likes.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4" />
                <span>Comments</span>
              </div>
              <span className="font-semibold">
                {post.engagement.comments.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Share2 className="h-4 w-4" />
                <span>Shares</span>
              </div>
              <span className="font-semibold">
                {post.engagement.shares.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Eye className="h-4 w-4" />
                <span>Impressions</span>
              </div>
              <span className="font-semibold">
                {post.engagement.impressions.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Engagement Rate</span>
                <span className="text-lg font-bold">
                  {post.engagement.engagement_rate}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hashtags */}
      {post.hashtags.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Hashtags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {post.hashtags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Post
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Duplicate Post
          </Button>
          <Button
            variant="destructive"
            className="w-full justify-start"
            size="sm"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Post
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
