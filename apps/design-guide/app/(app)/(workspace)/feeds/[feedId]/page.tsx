"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { getFeedById, mockPosts } from "@/lib/mock-data";
import { ArrowLeft, Plus, RefreshCw, Edit3, MoreVertical, Play } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/feeds/post-card";
import { StreamColumn } from "@/components/feeds/stream-column";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockStories, mockReels } from "@/lib/mock-data/stories-reels";
import type { PostWithAuthor, StreamConfig } from "@/lib/zod-schemas";

interface FeedViewPageProps {
  params: Promise<{
    feedId: string;
  }>;
}

// Helper function to filter posts based on stream configuration
function getPostsForStream(
  stream: StreamConfig,
  workspaceId: string,
  allPosts: PostWithAuthor[]
): PostWithAuthor[] {
  let filtered = allPosts.filter((post) => post.workspace_id === workspaceId);

  // Filter by stream type
  switch (stream.stream_type) {
    case "home":
      // All posts
      break;
    case "mentions":
      // Posts with mentions (for simplicity, filter by posts that have mentions array)
      filtered = filtered.filter((post) => post.mentions && post.mentions.length > 0);
      break;
    case "scheduled":
      filtered = filtered.filter((post) => post.status === "scheduled");
      break;
    case "published":
      filtered = filtered.filter((post) => post.status === "published");
      break;
    case "drafts":
      filtered = filtered.filter((post) => post.status === "draft");
      break;
    case "failed":
      filtered = filtered.filter((post) => post.status === "failed");
      break;
    case "high_engagement":
      filtered = filtered.filter(
        (post) =>
          post.status === "published" &&
          post.engagement &&
          (post.engagement.likes + post.engagement.comments + post.engagement.shares) >=
            stream.filters.min_engagement
      );
      break;
    case "low_engagement":
      filtered = filtered.filter(
        (post) =>
          post.status === "published" &&
          post.engagement &&
          (post.engagement.likes + post.engagement.comments + post.engagement.shares) < 100
      );
      break;
    case "platform_specific":
      if (stream.platform_filters.length > 0) {
        filtered = filtered.filter((post) =>
          post.platforms.some((platform) => stream.platform_filters.includes(platform))
        );
      }
      break;
  }

  // Apply platform filters if specified
  if (stream.platform_filters.length > 0 && stream.stream_type !== "platform_specific") {
    filtered = filtered.filter((post) =>
      post.platforms.some((platform) => stream.platform_filters.includes(platform))
    );
  }

  // Apply time range filter
  const now = Date.now();
  const timeRanges: Record<string, number> = {
    "24h": 86400000,
    "7d": 604800000,
    "30d": 2592000000,
    all: Infinity,
  };
  const timeLimit = now - timeRanges[stream.time_range];

  filtered = filtered.filter((post) => {
    const postDate = post.published_at || post.scheduled_for || post.created_at;
    return postDate && new Date(postDate).getTime() >= timeLimit;
  });

  // Apply content type filters
  if (stream.filters.content_types.length > 0) {
    filtered = filtered.filter((post) => stream.filters.content_types.includes(post.type));
  }

  // Apply media filter
  if (stream.filters.show_media_only) {
    filtered = filtered.filter((post) => post.media && post.media.length > 0);
  }

  // Sort posts
  filtered.sort((a, b) => {
    if (stream.sort_order === "newest") {
      const dateA = new Date(a.published_at || a.scheduled_for || a.created_at).getTime();
      const dateB = new Date(b.published_at || b.scheduled_for || b.created_at).getTime();
      return dateB - dateA;
    } else if (stream.sort_order === "oldest") {
      const dateA = new Date(a.published_at || a.scheduled_for || a.created_at).getTime();
      const dateB = new Date(b.published_at || b.scheduled_for || b.created_at).getTime();
      return dateA - dateB;
    } else if (stream.sort_order === "most_engaged") {
      const engagementA = a.engagement
        ? a.engagement.likes + a.engagement.comments + a.engagement.shares
        : 0;
      const engagementB = b.engagement
        ? b.engagement.likes + b.engagement.comments + b.engagement.shares
        : 0;
      return engagementB - engagementA;
    }
    return 0;
  });

  return filtered;
}

export default function FeedViewPage({ params }: FeedViewPageProps) {
  const { feedId } = use(params);
  const workspaceId = "workspace-1";
  const feed = getFeedById(feedId);

  if (!feed) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Feed not found</h2>
          <p className="text-muted-foreground mb-4">
            The feed you're looking for doesn't exist.
          </p>
          <Link href="/feeds">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Feeds
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Sort streams by order
  const sortedStreams = [...feed.streams].sort((a, b) => a.order - b.order);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/feeds">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xl">{feed.icon || "📊"}</span>
                <h1 className="text-xl font-semibold">{feed.name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Stream
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh All
              </Button>
              <Button size="sm">
                <Edit3 className="h-4 w-4 mr-2" />
                Compose
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Rename Feed</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate Feed</DropdownMenuItem>
                  <DropdownMenuItem>Feed Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Delete Feed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <div className="border-b bg-background p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Stories</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3">
            {mockStories.map((story) => (
              <button
                key={story.id}
                className="flex flex-col items-center gap-2 transition-transform hover:scale-105"
              >
                <div
                  className={`relative rounded-full p-[2px] ${
                    story.seen
                      ? "bg-muted"
                      : "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500"
                  }`}
                >
                  <Avatar className="h-14 w-14 border-2 border-background">
                    <AvatarImage src={story.user.avatar} alt={story.user.name} />
                    <AvatarFallback>{story.user.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <span className="max-w-[60px] truncate text-xs">{story.user.name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Reels Section */}
      <div className="border-b bg-background p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Reels</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3">
            {mockReels.map((reel) => (
              <Card
                key={reel.id}
                className="relative w-[140px] cursor-pointer overflow-hidden transition-transform hover:scale-105"
              >
                <div className="aspect-[9/16] overflow-hidden">
                  <img
                    src={reel.video.thumbnail}
                    alt={reel.caption}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="rounded-full bg-white/90 p-2">
                      <Play className="h-6 w-6 fill-black text-black" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border border-white">
                        <AvatarImage src={reel.user.avatar} alt={reel.user.name} />
                        <AvatarFallback>{reel.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-white">{reel.user.name}</span>
                      {reel.user.verified && (
                        <Badge variant="default" className="h-4 bg-blue-500 px-1 text-[10px]">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-white">{reel.caption}</p>
                    <div className="mt-1 flex gap-3 text-xs text-white">
                      <span>
                        {reel.likes >= 1000
                          ? `${(reel.likes / 1000).toFixed(1)}K`
                          : reel.likes}{" "}
                        likes
                      </span>
                      <span>
                        {reel.comments >= 1000
                          ? `${(reel.comments / 1000).toFixed(1)}K`
                          : reel.comments}{" "}
                        comments
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Streams Container - Horizontal Scroll */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-4 p-4">
          {sortedStreams.map((stream) => {
            const posts = getPostsForStream(stream, workspaceId, mockPosts);
            return (
              <StreamColumn
                key={stream.id}
                stream={stream}
                posts={posts}
                workspaceId={workspaceId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
