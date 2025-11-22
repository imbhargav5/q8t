"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { PostWithAuthor } from "@/lib/zod-schemas";
import { PlatformIcon } from "./platform-badge";
import { PostStatusBadge } from "./post-status-badge";
import { Clock, Image as ImageIcon, Video, Link as LinkIcon, BarChart2 } from "lucide-react";
import { format } from "date-fns";

interface CalendarPostCardProps {
  post: PostWithAuthor;
  onClick?: () => void;
}

export function CalendarPostCard({ post, onClick }: CalendarPostCardProps) {
  const scheduledTime = post.scheduled_for || post.published_at;

  return (
    <Card
      className="p-2 cursor-pointer hover:shadow-md transition-all border-l-4"
      style={{
        borderLeftColor: post.status === "published"
          ? "#22c55e"
          : post.status === "scheduled"
          ? "#3b82f6"
          : post.status === "failed"
          ? "#ef4444"
          : "#6b7280",
      }}
      onClick={onClick}
    >
      <div className="space-y-2">
        {/* Header with time and status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {scheduledTime && format(new Date(scheduledTime), "HH:mm")}
          </div>
          <PostStatusBadge status={post.status} />
        </div>

        {/* Content preview */}
        <p className="text-xs line-clamp-2 text-foreground">
          {post.content}
        </p>

        {/* Media indicators */}
        {post.media.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {post.media[0].type === "video" ? (
              <Video className="h-3 w-3" />
            ) : (
              <ImageIcon className="h-3 w-3" />
            )}
            <span>{post.media.length} {post.media.length === 1 ? "file" : "files"}</span>
          </div>
        )}

        {/* Link preview indicator */}
        {post.link_preview && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <LinkIcon className="h-3 w-3" />
            <span className="truncate">{post.link_preview.title || "Link"}</span>
          </div>
        )}

        {/* Platforms and engagement */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {post.platforms.slice(0, 3).map((platform) => (
              <div
                key={platform}
                className="flex items-center justify-center h-5 w-5 rounded-full bg-secondary"
              >
                <PlatformIcon platform={platform} className="h-3 w-3" />
              </div>
            ))}
            {post.platforms.length > 3 && (
              <span className="text-xs text-muted-foreground">+{post.platforms.length - 3}</span>
            )}
          </div>

          {/* Engagement metrics for published posts */}
          {post.engagement && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BarChart2 className="h-3 w-3" />
              <span>{post.engagement.likes}</span>
            </div>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center gap-1.5 pt-1 border-t">
          <Avatar className="h-4 w-4">
            <AvatarImage src={post.author.avatar_url || undefined} />
            <AvatarFallback className="text-[8px]">
              {post.author.full_name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground truncate">
            {post.author.full_name}
          </span>
        </div>
      </div>
    </Card>
  );
}
