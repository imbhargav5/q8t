"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import type { PostWithAuthor } from "@/lib/zod-schemas";
import { CalendarPostCard } from "./calendar-post-card";
import { format, isSameDay, isToday } from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarDayCellProps {
  date: Date;
  posts: PostWithAuthor[];
  isCurrentMonth: boolean;
  onAddPost: (date: Date) => void;
  onPostClick: (post: PostWithAuthor) => void;
}

export function CalendarDayCell({
  date,
  posts,
  isCurrentMonth,
  onAddPost,
  onPostClick,
}: CalendarDayCellProps) {
  const dayPosts = posts.filter((post) => {
    const postDate = new Date(post.scheduled_for || post.published_at || "");
    return isSameDay(postDate, date);
  });

  const isCurrentDay = isToday(date);

  return (
    <div
      className={cn(
        "min-h-[120px] border-r border-b p-2 flex flex-col gap-2",
        !isCurrentMonth && "bg-muted/50",
        isCurrentDay && "bg-accent"
      )}
    >
      <div className="flex items-center justify-between">
        {isCurrentDay ? (
          <Badge variant="default" className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
            {format(date, "d")}
          </Badge>
        ) : (
          <span className={cn(
            "text-sm font-medium",
            !isCurrentMonth && "text-muted-foreground"
          )}>
            {format(date, "d")}
          </span>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100"
          onClick={() => onAddPost(date)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {dayPosts.slice(0, 3).map((post) => (
          <CalendarPostCard
            key={post.id}
            post={post}
            onClick={() => onPostClick(post)}
          />
        ))}

        {dayPosts.length > 3 && (
          <p className="text-xs text-center text-muted-foreground">
            +{dayPosts.length - 3} more
          </p>
        )}

        {dayPosts.length === 0 && isCurrentMonth && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onAddPost(date)}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Post
          </Button>
        )}
      </div>
    </div>
  );
}
