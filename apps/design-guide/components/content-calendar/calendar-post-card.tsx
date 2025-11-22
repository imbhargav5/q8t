"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {scheduledTime && format(new Date(scheduledTime), "HH:mm")}
          </div>
          <PostStatusBadge status={post.status} />
        </div>

        <p className="text-xs line-clamp-2">
          {post.content}
        </p>

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

        {post.link_preview && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <LinkIcon className="h-3 w-3" />
            <span className="truncate">{post.link_preview.title || "Link"}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {post.platforms.slice(0, 3).map((platform) => (
              <Avatar key={platform} className="h-5 w-5">
                <AvatarFallback>
                  <PlatformIcon platform={platform} className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
            ))}
            {post.platforms.length > 3 && (
              <span className="text-xs text-muted-foreground">+{post.platforms.length - 3}</span>
            )}
          </div>

          {post.engagement && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BarChart2 className="h-3 w-3" />
              <span>{post.engagement.likes}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex items-center gap-2">
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
      </CardContent>
    </Card>
  );
}
