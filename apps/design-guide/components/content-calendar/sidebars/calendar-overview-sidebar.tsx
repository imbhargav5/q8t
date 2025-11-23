"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PostWithAuthor } from "@/lib/zod-schemas";
import { PostStatusBadge } from "../post-status-badge";
import {
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  TrendingUp,
} from "lucide-react";
import { format, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { Listbox, ListboxGroup, ListboxItem } from "@/components/ui/listbox";
import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from "@/components/kibo-ui/mini-calendar";

interface CalendarOverviewSidebarProps {
  posts: PostWithAuthor[];
  currentDate: Date;
  onDateChange?: (date: Date) => void;
}

export function CalendarOverviewSidebar({
  posts,
  currentDate,
  onDateChange,
}: CalendarOverviewSidebarProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  // Filter posts for current month
  const monthPosts = posts.filter((post) => {
    const postDate = new Date(post.scheduled_for || post.published_at || "");
    return isWithinInterval(postDate, { start: monthStart, end: monthEnd });
  });

  const scheduledCount = posts.filter((p) => p.status === "scheduled").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;
  const publishedCount = posts.filter((p) => p.status === "published").length;

  // Upcoming posts (next 7 days)
  const now = new Date();
  const upcomingPosts = posts
    .filter((p) => {
      if (!p.scheduled_for || p.status !== "scheduled") return false;
      const postDate = new Date(p.scheduled_for);
      const diffTime = postDate.getTime() - now.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 7;
    })
    .sort(
      (a, b) =>
        new Date(a.scheduled_for!).getTime() - new Date(b.scheduled_for!).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Overview</h3>
        <p className="text-sm text-muted-foreground">
          {format(currentDate, "MMMM yyyy")}
        </p>
      </div>

      {/* Mini Calendar */}
      <Card>
        <CardContent className="pt-4">
          <MiniCalendar defaultDate={currentDate} selectedDate={currentDate} onSelectDate={onDateChange}>
            <MiniCalendarNavigation direction="prev" />
            <MiniCalendarNavigation direction="next" />
          </MiniCalendar>
          <MiniCalendarDays>
            {(date) => <MiniCalendarDay date={date} key={date.toISOString()} />}
          </MiniCalendarDays>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <div>
                <p className="text-xs text-muted-foreground">Scheduled</p>
                <p className="text-lg font-bold">{scheduledCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <div>
                <p className="text-xs text-muted-foreground">Drafts</p>
                <p className="text-lg font-bold">{draftCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <div>
                <p className="text-xs text-muted-foreground">Published</p>
                <p className="text-lg font-bold">{publishedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <div>
                <p className="text-xs text-muted-foreground">This Month</p>
                <p className="text-lg font-bold">{monthPosts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming posts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Upcoming Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingPosts.length > 0 ? (
            <Listbox orientation="vertical">
              <ListboxGroup>
                {upcomingPosts.map((post) => (
                  <ListboxItem key={post.id} value={post.id} className="space-y-1 p-3 rounded-md hover:bg-accent">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">
                        {post.scheduled_for &&
                          format(new Date(post.scheduled_for), "MMM d, h:mm a")}
                      </span>
                      <PostStatusBadge status={post.status} />
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex gap-1">
                      {post.platforms.slice(0, 2).map((platform) => (
                        <Badge key={platform} variant="secondary" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                      {post.platforms.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{post.platforms.length - 2}
                        </Badge>
                      )}
                    </div>
                  </ListboxItem>
                ))}
              </ListboxGroup>
            </Listbox>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No upcoming posts scheduled
            </p>
          )}
        </CardContent>
      </Card>

      {/* Best performing post */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Top Performing
          </CardTitle>
        </CardHeader>
        <CardContent>
          {posts.find((p) => p.engagement) ? (
            <Listbox orientation="vertical">
              <ListboxGroup>
                {posts
                  .filter((p) => p.engagement)
                  .sort(
                    (a, b) =>
                      (b.engagement?.engagement_rate || 0) -
                      (a.engagement?.engagement_rate || 0)
                  )
                  .slice(0, 1)
                  .map((post) => (
                    <ListboxItem key={post.id} value={post.id} className="space-y-1 p-3 rounded-md hover:bg-accent">
                      <p className="text-sm font-medium">
                        {post.engagement?.engagement_rate}% engagement
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>❤️ {post.engagement?.likes}</span>
                        <span>💬 {post.engagement?.comments}</span>
                        <span>🔁 {post.engagement?.shares}</span>
                      </div>
                    </ListboxItem>
                  ))}
              </ListboxGroup>
            </Listbox>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No published posts yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
