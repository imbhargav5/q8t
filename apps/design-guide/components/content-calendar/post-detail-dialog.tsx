"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { PostWithAuthor } from "@/lib/zod-schemas";
import { PostStatusBadge } from "./post-status-badge";
import { PlatformBadge } from "./platform-badge";
import {
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  TrendingUp,
  Edit,
  Trash2,
  Copy,
} from "lucide-react";
import { format } from "date-fns";

interface PostDetailDialogProps {
  post: PostWithAuthor | null;
  open: boolean;
  onClose: () => void;
}

export function PostDetailDialog({
  post,
  open,
  onClose,
}: PostDetailDialogProps) {
  if (!post) return null;

  const scheduledTime = post.scheduled_for || post.published_at;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle>Post Details</DialogTitle>
              <div className="flex items-center gap-2">
                <PostStatusBadge status={post.status} />
                {post.is_pinned && (
                  <Badge variant="secondary">Pinned</Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Author and time */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.author.avatar_url || undefined} />
              <AvatarFallback>
                {post.author.full_name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.full_name}</p>
              {scheduledTime && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(scheduledTime), "MMM d, yyyy 'at' h:mm a")}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Content */}
          <div className="space-y-3">
            <h3 className="font-semibold">Content</h3>
            <p className="text-sm whitespace-pre-wrap">{post.content}</p>

            {/* Media preview */}
            {post.media.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {post.media.map((media) => (
                  <div
                    key={media.id}
                    className="aspect-video bg-muted rounded-md overflow-hidden"
                  >
                    <img
                      src={media.url}
                      alt={media.alt_text || "Post media"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Link preview */}
            {post.link_preview && (
              <div className="border rounded-lg p-3 space-y-2">
                {post.link_preview.image_url && (
                  <img
                    src={post.link_preview.image_url}
                    alt=""
                    className="w-full h-32 object-cover rounded"
                  />
                )}
                <div>
                  <h4 className="font-medium text-sm">
                    {post.link_preview.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {post.link_preview.description}
                  </p>
                  <a
                    href={post.link_preview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    {post.link_preview.url}
                  </a>
                </div>
              </div>
            )}

            {/* Hashtags */}
            {post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.hashtags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Platforms */}
          <div className="space-y-3">
            <h3 className="font-semibold">Publishing Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {post.platforms.map((platform) => (
                <PlatformBadge key={platform} platform={platform} size="md" />
              ))}
            </div>
          </div>

          {/* Engagement metrics (if published) */}
          {post.engagement && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold">Performance Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Heart className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Likes</p>
                      <p className="text-lg font-semibold">
                        {post.engagement.likes.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Comments</p>
                      <p className="text-lg font-semibold">
                        {post.engagement.comments.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Share2 className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Shares</p>
                      <p className="text-lg font-semibold">
                        {post.engagement.shares.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Eye className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Impressions</p>
                      <p className="text-lg font-semibold">
                        {post.engagement.impressions.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Engagement Rate
                    </p>
                    <p className="text-xl font-bold text-primary">
                      {post.engagement.engagement_rate}%
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Platform-specific errors */}
          {post.status === "failed" && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold text-red-500">Publishing Errors</h3>
                {post.platform_settings
                  .filter((ps) => ps.status === "failed")
                  .map((ps) => (
                    <div
                      key={ps.platform}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <PlatformBadge platform={ps.platform} size="sm" />
                        <p className="text-sm text-red-600">{ps.error_message}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
