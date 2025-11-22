"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { PostWithAuthor } from "@/lib/zod-schemas";
import { CalendarPostCard } from "./calendar-post-card";
import { format, isSameDay, isToday, isPast, isFuture } from "date-fns";
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
  const isPastDay = isPast(date) && !isCurrentDay;

  return (
    <div
      className={cn(
        "min-h-[120px] border-r border-b p-2 flex flex-col gap-2",
        !isCurrentMonth && "bg-muted/30",
        isCurrentDay && "bg-primary/5",
        isPastDay && "bg-muted/10"
      )}
    >
      {/* Day number header */}
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex items-center justify-center h-6 w-6 rounded-full text-sm font-medium",
            isCurrentDay && "bg-primary text-primary-foreground",
            !isCurrentMonth && "text-muted-foreground"
          )}
        >
          {format(date, "d")}
        </div>

        {/* Add post button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground transition-opacity"
          onClick={() => onAddPost(date)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Posts for this day */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {dayPosts.slice(0, 3).map((post) => (
          <CalendarPostCard
            key={post.id}
            post={post}
            onClick={() => onPostClick(post)}
          />
        ))}

        {/* Show count if more than 3 posts */}
        {dayPosts.length > 3 && (
          <div className="text-xs text-center text-muted-foreground py-1">
            +{dayPosts.length - 3} more
          </div>
        )}

        {/* Show add button when no posts */}
        {dayPosts.length === 0 && isCurrentMonth && (
          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 border-dashed"
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
